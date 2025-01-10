document.addEventListener("DOMContentLoaded", () => {
  const parents = document.querySelectorAll(".list"); // Получаем все элементы с классом .list

  parents.forEach((parent) => {
    const children = parent.children;

    Array.from(children).forEach((child) => {
      child.classList.add("track-section");
    });
  });

  const sections = document.querySelectorAll(".track-section");

  sections.forEach((section) => {
    const thresholdValue = parseFloat(
      section.getAttribute("data-threshold")
    ) || [0.8, 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in-view", "true");
          } else {
            entry.target.setAttribute("data-in-view", "false");
          }
        });
      },
      {
        root: null,
        threshold: thresholdValue,
      }
    );

    observer.observe(section);
  });
});
