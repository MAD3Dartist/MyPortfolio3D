document.addEventListener("DOMContentLoaded", () => {
  const portfolioLinks = document.querySelectorAll(".fullscreen-video");

  portfolioLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const video = link.querySelector("video");

      if (!video) return;

      // Пометим активное видео
      video.setAttribute("data-active", "true");

      // Запрос полноэкранного режима
      const enterFullscreen = () => {
        if (video.requestFullscreen) {
          return video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          return video.webkitRequestFullscreen(); // Для Safari
        } else if (video.mozRequestFullScreen) {
          return video.mozRequestFullScreen(); // Для Firefox
        } else if (video.msRequestFullscreen) {
          return video.msRequestFullscreen(); // Для Internet Explorer/Edge
        } else {
          console.error("Fullscreen API не поддерживается.");
          return Promise.reject();
        }
      };

      enterFullscreen()
        .then(() => {
          // Применение стилей для полноэкранного режима
          video.style.width = "100%";
          video.style.height = "100%";
          video.style.objectFit = "contain";

          // Блокировка ориентации экрана
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation
              .lock("landscape")
              .catch((err) =>
                console.warn("Ошибка блокировки ориентации:", err)
              );
          }
        })
        .catch((err) =>
          console.error("Ошибка перехода в полноэкранный режим:", err)
        );
    });
  });

  // Снятие блокировки ориентации и стилей при выходе из полноэкранного режима
  document.addEventListener("fullscreenchange", () => {
    const video = document.querySelector("video[data-active='true']");
    if (!document.fullscreenElement && video) {
      // Удаление инлайновых стилей
      video.style.removeProperty("width");
      video.style.removeProperty("height");
      video.style.removeProperty("object-fit");

      // Удаляем атрибут data-active
      video.removeAttribute("data-active");

      // Разблокировка ориентации экрана (если поддерживается)
      if (screen.orientation && screen.orientation.unlock) {
        try {
          screen.orientation.unlock();
        } catch (err) {
          console.warn("Ошибка разблокировки ориентации:", err);
        }
      }
    }
  });
});
