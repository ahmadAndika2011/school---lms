// ============================================= //
// CURSOR.JS - Custom cursor effect              //
// Taruh script ini di semua halaman (sebelum    //
// tutup </body>), setelah cursor.css di-load     //
// ============================================= //

(function () {
  // Jangan jalankan di perangkat sentuh (tidak ada mouse)
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    return;
  }

  // Buat elemen cursor custom
  const cursorDot = document.createElement("div");
  cursorDot.className = "custom-cursor";

  const cursorRing = document.createElement("div");
  cursorRing.className = "custom-cursor-ring";

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
  });

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Posisi titik utama mengikuti mouse secara instan
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    cursorDot.classList.remove("cursor-hidden");
    cursorRing.classList.remove("cursor-hidden");
  });

  // Ring mengikuti dengan sedikit delay (efek smooth trailing)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Sembunyikan cursor custom saat mouse keluar dari window
  document.addEventListener("mouseleave", function () {
    cursorDot.classList.add("cursor-hidden");
    cursorRing.classList.add("cursor-hidden");
  });

  // Efek membesar saat hover ke elemen interaktif
  const interactiveSelectors = "a, button, input, textarea, select, [role='button'], .clickable";

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(interactiveSelectors)) {
      cursorDot.classList.add("cursor-hover");
      cursorRing.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(interactiveSelectors)) {
      cursorDot.classList.remove("cursor-hover");
      cursorRing.classList.remove("cursor-hover");
    }
  });

  // Efek mengecil saat klik
  document.addEventListener("mousedown", function () {
    cursorDot.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", function () {
    cursorDot.classList.remove("cursor-click");
  });
})();