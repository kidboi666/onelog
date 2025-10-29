"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 *
 * @param {IntersectionObserverInit} opt 옵션 파라미터
 * @param {boolean} once 관찰을 한번만 할지 정하는 불리언, true -> 한번만, false -> 무한
 * @returns {RefObject} target - 관찰할 요소에 걸 ref
 * @returns {boolean} isIntersecting - 관찰 되고 있는지 여부를 알려주는 불리언
 */
export default function useIntersect<T extends HTMLElement>(
  opt?: IntersectionObserverInit,
  once: boolean | undefined = false,
): [RefObject<T | null>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const target = useRef<T>(null);

  const handleIntersect = useCallback(
    (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ): void => {
      entries.forEach((entry) => {
        setIntersecting(entry.isIntersecting);
        if (once && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    [once],
  );

  useEffect(() => {
    if (target.current === null) return;

    const observer = new IntersectionObserver(handleIntersect, opt);

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [handleIntersect, opt]);

  return [target, isIntersecting];
}
