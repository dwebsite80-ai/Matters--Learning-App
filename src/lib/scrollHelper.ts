import { useLayoutEffect, useEffect, type DependencyList } from 'react';

export interface ScrollToTopOptions {
  behavior?: 'smooth' | 'instant' | 'auto';
  targetElement?: HTMLElement | null;
  delay?: number;
}

/**
 * Resilient cross-browser scroll-to-top helper that handles window,
 * documentElement, body, and nested container elements.
 */
export function scrollToTop(options: ScrollToTopOptions = {}): void {
  const behavior = options.behavior || 'instant';

  const executeScroll = () => {
    // 1. Target element if explicitly provided
    if (options.targetElement) {
      try {
        options.targetElement.scrollTo({
          top: 0,
          left: 0,
          behavior: behavior as ScrollBehavior,
        });
      } catch {
        options.targetElement.scrollTop = 0;
      }
    }

    // 2. Global window scroll
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior as ScrollBehavior,
      });
    } catch {
      window.scrollTo(0, 0);
    }

    // 3. DocumentElement (html) and Body (vital for mobile webviews & iframes)
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        if (behavior === 'smooth') {
          try {
            document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          } catch {
            document.documentElement.scrollTop = 0;
          }
        } else {
          document.documentElement.scrollTop = 0;
        }
      }

      if (document.body) {
        if (behavior === 'smooth') {
          try {
            document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          } catch {
            document.body.scrollTop = 0;
          }
        } else {
          document.body.scrollTop = 0;
        }
      }

      // 4. Any potential scroll containers in the app
      const scrollContainers = document.querySelectorAll(
        '#root, main, [data-scroll-container], .overflow-y-auto'
      );
      scrollContainers.forEach((el) => {
        if (el instanceof HTMLElement && el.scrollTop > 0) {
          el.scrollTop = 0;
        }
      });
    }
  };

  // Immediate execution
  executeScroll();

  // Next animation frame execution to catch any asynchronous layout reflows
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    window.requestAnimationFrame(() => {
      executeScroll();
    });
  }

  // Optional delayed backup pass
  if (options.delay && options.delay > 0) {
    setTimeout(executeScroll, options.delay);
  }
}

/**
 * Hook to reset scroll whenever key dependencies change (e.g. screen, question, lesson).
 */
export function useScrollToTop(
  deps: DependencyList,
  options: ScrollToTopOptions = { behavior: 'instant' }
): void {
  // Use useLayoutEffect in browser to prevent visual flicker before paint
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    scrollToTop(options);
  }, deps);
}
