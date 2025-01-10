document.addEventListener("DOMContentLoaded", () => {
  const galleryes = document.querySelectorAll(".lightbox-list");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox.querySelector(".lightbox__image");
  const lightboxClose = lightbox.querySelector(".lightbox__close");

  galleryes.forEach((gallery) => {
    gallery.addEventListener("click", (event) => {
      const target = event.target.closest(".gallery__item");
      if (target) {
        const fullImageSrc = target.getAttribute("data-full-src");
        if (fullImageSrc) {
          lightboxImage.src = fullImageSrc;
          lightbox.setAttribute("aria-hidden", "false");
        }
      }
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
    }
  });
});
