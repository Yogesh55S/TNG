"use client";

import { useState, useEffect } from "react";

/**
 * Scroll spy hook that observes sections on the page and returns the currently
 * visible section ID. Used by Navbar to highlight the active nav link on the homepage.
 *
 * @param {string[]} sectionIds - Array of DOM element IDs to observe
 * @param {object} options - IntersectionObserver options
 * @returns {string|null} - The ID of the currently visible section
 */
export default function useScrollSpy(sectionIds = [], options = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is in the upper-middle of viewport
        threshold: [0, 0.1, 0.2, 0.3, 0.5],
        ...options,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [sectionIds, options]);

  return activeId;
}
