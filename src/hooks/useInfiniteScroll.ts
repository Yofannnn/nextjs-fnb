"use client";

import { useCallback, useEffect, useState } from "react";

type Options = {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  rootMargin?: string;
};

export function useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin = "300px" }: Options) {
  const [element, setElement] = useState<Element | null>(null);

  const loadMoreRef = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

  return loadMoreRef;
}
