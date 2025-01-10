document.querySelectorAll(".nav__item").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".nav__item")
      .forEach((el) => el.classList.remove("is-active"));
    this.classList.add("is-active");
  });
});
