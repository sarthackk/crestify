import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const attach = () => {
      document.querySelectorAll('.reveal:not(.in), .reveal-fade:not(.in)').forEach((el) =>
        observer.observe(el)
      );
    };

    const timers = [50, 300, 800, 1600].map((ms) => setTimeout(attach, ms));
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach(clearTimeout);
      mo.disconnect();
      observer.disconnect();
    };
  }, []);
}
