function initializeSlider(sliderContainerSelector) {
  const sliderContainer = document.querySelector(sliderContainerSelector);
  if (!sliderContainer) return;

  const sliderItems = sliderContainer.querySelectorAll(".slider__item");
  const prevButton = sliderContainer.querySelector(".arrow-slider--prev");
  const nextButton = sliderContainer.querySelector(".arrow-slider--next");

  function setActiveItem(item) {
    sliderItems.forEach((slider) => slider.classList.remove("active"));
    item.classList.add("active");
  }

  function getActiveIndex() {
    return [...sliderItems].findIndex((item) =>
      item.classList.contains("active")
    );
  }

  function updateActiveItem(index) {
    const boundedIndex = (index + sliderItems.length) % sliderItems.length;
    setActiveItem(sliderItems[boundedIndex]);
  }

  // Обработка кнопок "вперед" и "назад"
  prevButton.addEventListener("click", () => {
    const currentIndex = getActiveIndex();
    updateActiveItem(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    const currentIndex = getActiveIndex();
    updateActiveItem(currentIndex + 1);
  });

  // Добавляем обработку смахивания
  let startX = 0;
  let endX = 0;

  sliderContainer.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX; // Запоминаем начальную точку касания
  });

  sliderContainer.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX; // Запоминаем текущую точку касания
  });

  sliderContainer.addEventListener("touchend", () => {
    const swipeThreshold = 50; // Пороговое значение для распознавания смахивания
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > swipeThreshold) {
      const currentIndex = getActiveIndex();
      if (deltaX > 0) {
        // Смахивание вправо
        updateActiveItem(currentIndex - 1);
      } else {
        // Смахивание влево
        updateActiveItem(currentIndex + 1);
      }
    }
  });

  // Добавляем hover для активации слайдов
  sliderItems.forEach((item) => {
    item.addEventListener("mouseover", () => setActiveItem(item));
  });

  // Устанавливаем активный элемент по умолчанию
  if (sliderItems.length > 0) {
    setActiveItem(sliderItems[2]);
  }
}

// Инициализация слайдеров
initializeSlider(".slider--boom-crane");
initializeSlider(".slider--weapon");
initializeSlider(".slider--archer");
initializeSlider(".slider--tarcus");
