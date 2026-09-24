// ============================================================================
// CENTRALIZED SCROLL CONTROLLER
// Single source of truth for all scroll progress in the portfolio.
// Exactly ONE window scroll listener and ONE requestAnimationFrame scheduler.
// Zero layout thrashing, zero multiple RAF loops, deterministic synchronization.
// ============================================================================

export interface SectionMetrics {
  id: string;
  element: HTMLElement;
  top: number;
  height: number;
}

export interface ScrollState {
  globalProgress: number; // 0.0 to 1.0
  scrollY: number;
  maxScroll: number;
  getSectionProgress: (sectionId: string) => number;
}

type ScrollSubscriber = (state: ScrollState) => void;

class ScrollController {
  private subscribers = new Set<ScrollSubscriber>();
  private sections = new Map<string, SectionMetrics>();
  private scheduled = false;
  private scrollY = 0;
  private maxScroll = 1;
  private windowHeight = 1;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.recalculateMetrics();

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('orientationchange', this.handleResize, { passive: true });
  }

  public recalculateMetrics = () => {
    if (typeof window === 'undefined') return;

    this.windowHeight = window.innerHeight || 1;
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      this.windowHeight
    );
    this.maxScroll = Math.max(1, docHeight - this.windowHeight);
    this.scrollY = window.scrollY || window.pageYOffset || 0;

    // Cache section document positions without reading in scroll loop
    this.sections.forEach((metric) => {
      if (metric.element && metric.element.isConnected) {
        const box = metric.element.getBoundingClientRect();
        metric.top = box.top + this.scrollY;
        metric.height = box.height;
      }
    });

    this.scheduleTick();
  };

  private handleScroll = () => {
    this.scheduleTick();
  };

  private handleResize = () => {
    this.recalculateMetrics();
  };

  private scheduleTick = () => {
    if (this.scheduled) return;
    this.scheduled = true;
    requestAnimationFrame(this.tick);
  };

  private tick = () => {
    this.scheduled = false;
    this.scrollY = window.scrollY || window.pageYOffset || 0;

    const globalProgress = Math.min(1, Math.max(0, this.scrollY / this.maxScroll));

    const state: ScrollState = {
      globalProgress,
      scrollY: this.scrollY,
      maxScroll: this.maxScroll,
      getSectionProgress: this.getSectionProgress,
    };

    // Broadcast state to all subscribers within the same frame
    this.subscribers.forEach((callback) => {
      try {
        callback(state);
      } catch (err) {
        console.error('ScrollController subscriber error:', err);
      }
    });
  };

  public getSectionProgress = (sectionId: string): number => {
    const section = this.sections.get(sectionId);
    if (!section) return 0;

    const scrollDist = section.height - this.windowHeight;
    if (scrollDist <= 0) {
      // Normal single viewport section: progress based on viewport entry
      const relativeTop = section.top - this.scrollY;
      const progress = (this.windowHeight - relativeTop) / (this.windowHeight + section.height);
      return Math.min(1, Math.max(0, progress));
    }

    // Tall sticky scroll tracks (e.g. #showcase, #skills):
    // 0.0 when top of section meets top of viewport, 1.0 when scroll reaches bottom
    const rawProgress = (this.scrollY - section.top) / scrollDist;
    return Math.min(1, Math.max(0, rawProgress));
  };

  public registerSection(id: string, element: HTMLElement): () => void {
    if (!element) return () => {};

    const box = element.getBoundingClientRect();
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY || 0 : 0;

    this.sections.set(id, {
      id,
      element,
      top: box.top + currentScrollY,
      height: box.height,
    });

    // Schedule update so initial progress is immediately known
    this.scheduleTick();

    return () => {
      this.sections.delete(id);
    };
  }

  public subscribe(callback: ScrollSubscriber): () => void {
    this.subscribers.add(callback);

    // Initial broadcast to immediately synchronize on mount
    const globalProgress = Math.min(1, Math.max(0, this.scrollY / this.maxScroll));
    callback({
      globalProgress,
      scrollY: this.scrollY,
      maxScroll: this.maxScroll,
      getSectionProgress: this.getSectionProgress,
    });

    return () => {
      this.subscribers.delete(callback);
    };
  }

  public destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('orientationchange', this.handleResize);
    }
    this.subscribers.clear();
    this.sections.clear();
    this.isInitialized = false;
  }
}

// Global singleton instance
export const scrollController = new ScrollController();
