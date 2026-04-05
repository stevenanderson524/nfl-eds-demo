// add delayed functionality here

// Scroll reveal for sections — respects prefers-reduced-motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sections = document.querySelectorAll('main > .section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  sections.forEach((section) => {
    // First section is never animated (it is the LCP section)
    if (!section.matches(':first-of-type')) observer.observe(section);
  });
}
