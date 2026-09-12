(function () {
  const images = Array.from(document.querySelectorAll(".js-lightbox-img"));
  if (images.length === 0) return;

  const sources = images
    .sort(function (a, b) {
      return Number(a.dataset.index) - Number(b.dataset.index);
    })
    .map(function (img) {
      return { src: img.src, alt: img.alt };
    });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + sources.length) % sources.length;
    const item = sources[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCounter.textContent = currentIndex + 1 + " / " + sources.length;

    const showNav = sources.length > 1;
    btnPrev.style.display = showNav ? "flex" : "none";
    btnNext.style.display = showNav ? "flex" : "none";
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  images.forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(Number(img.dataset.index));
    });
  });

  btnClose.addEventListener("click", closeLightbox);
  btnNext.addEventListener("click", function () {
    showImage(currentIndex + 1);
  });
  btnPrev.addEventListener("click", function () {
    showImage(currentIndex - 1);
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  });
})();
