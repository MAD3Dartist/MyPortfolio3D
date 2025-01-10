document.addEventListener("DOMContentLoaded", () => {
  const portfolioLinks = document.querySelectorAll(".fullscreen-video");

  portfolioLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const video = link.querySelector("video");

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

  // Снятие блокировки ориентации при выходе из полноэкранного режима
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  });
});
