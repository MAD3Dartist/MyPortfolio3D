// Добавляем обработчики событий
document.querySelectorAll(".gallery__item").forEach((wrapper) => {
  wrapper.addEventListener("mousemove", (event) => {
    const { offsetWidth: width, offsetHeight: height } = wrapper;
    const { offsetX: x, offsetY: y } = event;

    const rotateX = (y / height - 0.5) * -35;
    const rotateY = (x / width - 0.5) * 25;

    // Устанавливаем значения в CSS-переменные
    wrapper.style.setProperty("--rotateX", `${rotateX}deg`);
    wrapper.style.setProperty("--rotateY", `${rotateY}deg`);
    const gradientX = (x / width) * 100;
    const gradientY = (y / height) * 100;

    wrapper.style.setProperty("--gradientX", `${gradientX}%`);
    wrapper.style.setProperty("--gradientY", `${gradientY}%`);

    // Добавляем класс активного состояния
    wrapper.classList.add("rotate-hover");
  });

  wrapper.addEventListener("mouseleave", () => {
    // Сбрасываем активный класс при покидании мыши
    wrapper.classList.remove("rotate-hover");
  });
});
