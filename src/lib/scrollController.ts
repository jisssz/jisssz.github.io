// ============================================================================
// MASTER SCROLL CONTROLLER
// Single authoritative scroll progress system across the portfolio.
// Exactly ONE window scroll listener and ONE synchronous requestAnimationFrame scheduler.
// Synchronously updates 300-frame canvas, 3D projects, and 3D honeycomb in the SAME frame.
// Zero layout thrashing, zero double-rAF delay, zero competing scroll listeners.
// ============================================================================

export const TOTAL_CANVAS_FRAMES = 300;

export interface SectionRange {
  start: number; // document scrollY where section begins sticky interaction
  end: number;   // document scrollY where section finishes
}

type CanvasSubscriber = (targetFrame: number, progress: number) => void;
type SectionSubscriber = (localProgress: number, scrollY: number) => void;
type GlobalSubscriber = (globalProgress: number, scrollY: number) => void;

class MasterScrollController {
  private scheduled = false;
  private scrollY = 0;
  private maxScroll = 1;
  private windowHeight = 800;

  private canvasCallbacks = new Set<CanvasSubscriber>();
  private sectionCallbacks = new Map<string, SectionSubscriber>();
  private globalCallbacks = new Set<GlobalSubscriber>();

  // Cached section DOM elements and their document top/height
  private sectionElements = new Map<string, HTMLElement>();
  private sectionRanges = new Map<string, SectionRange>();

  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.recalculateLayout();

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('orientationchange', this.handleResize, { passive: true });
  }

  public recalculateLayout = () => {
    if (typeof window === 'undefined') return;

    this.windowHeight = window.innerHeight || 800;
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      this.windowHeight
    );
    this.maxScroll = Math.max(1, docHeight - this.windowHeight);
    this.scrollY = window.scrollY || window.pageYOffset || 0;

    // Cache exact document coordinates of registered sections
    this.sectionElements.forEach((el, id) => {
      if (el && el.isConnected) {
        const box = el.getBoundingClientRect();
        const top = box.top + this.scrollY;
        const height = box.height;
        const scrollDist = height - this.windowHeight;

        this.sectionRanges.set(id, {
          start: top,
          end: top + Math.max(1, scrollDist),
        });
      }
    });

    // Schedule immediate update
    this.scheduleFrame();
  };

  private handleScroll = () => {
    this.scheduleFrame();
  };

  private handleResize = () => {
    this.recalculateLayout();
  };

  private scheduleFrame = () => {
    if (this.scheduled) return;
    this.scheduled = true;
    requestAnimationFrame(this.renderTick);
  };

  private renderTick = () => {
    this.scheduled = false;
    this.scrollY = window.scrollY || window.pageYOffset || 0;

    const globalProgress = Math.min(1, Math.max(0, this.scrollY / this.maxScroll));
    const targetFrame = Math.min(
      TOTAL_CANVAS_FRAMES - 1,
      Math.max(0, Math.round(globalProgress * (TOTAL_CANVAS_FRAMES - 1)))
    );

    // 1. Draw 300-Frame Canvas IMMEDIATELY on this exact frame (no second rAF!)
    this.canvasCallbacks.forEach((cb) => {
      try {
        cb(targetFrame, globalProgress);
      } catch (err) {
        console.error('Canvas render error in scroll controller:', err);
      }
    });

    // 2. Dispatch section progress to registered sections (Projects, Skills, etc.)
    this.sectionCallbacks.forEach((cb, id) => {
      const range = this.sectionRanges.get(id);
      let localProgress = 0;
      if (range) {
        const dist = range.end - range.start;
        if (dist > 0) {
          localProgress = Math.min(1, Math.max(0, (this.scrollY - range.start) / dist));
        }
      }
      try {
        cb(localProgress, this.scrollY);
      } catch (err) {
        console.error(`Section render error (${id}):`, err);
      }
    });

    // 3. Dispatch global progress (header progress bar, etc.)
    this.globalCallbacks.forEach((cb) => {
      try {
        cb(globalProgress, this.scrollY);
      } catch (err) {
        console.error('Global subscriber error in scroll controller:', err);
      }
    });
  };

  // Register the 300-frame canvas painter
  public subscribeCanvas(callback: CanvasSubscriber): () => void {
    this.canvasCallbacks.add(callback);
    // Initial paint
    const globalProgress = Math.min(1, Math.max(0, this.scrollY / this.maxScroll));
    const targetFrame = Math.min(
      TOTAL_CANVAS_FRAMES - 1,
      Math.max(0, Math.round(globalProgress * (TOTAL_CANVAS_FRAMES - 1)))
    );
    callback(targetFrame, globalProgress);

    return () => {
      this.canvasCallbacks.delete(callback);
    };
  }

  // Register a tall sticky section by DOM element ref
  public registerSection(id: string, element: HTMLElement, callback: SectionSubscriber): () => void {
    if (!element) return () => {};

    this.sectionElements.set(id, element);
    this.sectionCallbacks.set(id, callback);

    const box = element.getBoundingClientRect();
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY || 0 : 0;
    const top = box.top + currentScrollY;
    const height = box.height;
    const scrollDist = height - (typeof window !== 'undefined' ? window.innerHeight : 800);

    this.sectionRanges.set(id, {
      start: top,
      end: top + Math.max(1, scrollDist),
    });

    // Initial trigger
    const range = this.sectionRanges.get(id)!;
    const dist = range.end - range.start;
    const localProgress = dist > 0 ? Math.min(1, Math.max(0, (currentScrollY - range.start) / dist)) : 0;
    callback(localProgress, currentScrollY);

    return () => {
      this.sectionElements.delete(id);
      this.sectionRanges.delete(id);
      this.sectionCallbacks.delete(id);
    };
  }

  // Register global UI subscriber (header line, etc.)
  public subscribeGlobal(callback: GlobalSubscriber): () => void {
    this.globalCallbacks.add(callback);
    const globalProgress = Math.min(1, Math.max(0, this.scrollY / this.maxScroll));
    callback(globalProgress, this.scrollY);

    return () => {
      this.globalCallbacks.delete(callback);
    };
  }

  public destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('orientationchange', this.handleResize);
    }
    this.canvasCallbacks.clear();
    this.sectionCallbacks.clear();
    this.globalCallbacks.clear();
    this.sectionElements.clear();
    this.sectionRanges.clear();
    this.isInitialized = false;
  }
}

export const scrollController = new MasterScrollController();
