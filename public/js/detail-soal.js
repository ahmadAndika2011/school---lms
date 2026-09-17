/* ================= VIDEO MODAL ================= */

function openVideoModal(videoElement) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  const source = videoElement.querySelector("source");
  if (!source) return;

  modalVideo.src = source.src;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  modalVideo.play().catch(function () {
    // Browser bisa memblokir autoplay; video tetap bisa dimainkan manual.
  });
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();

  modal.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("videoModal").addEventListener("click", function (e) {
    if (e.target === this) closeVideoModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("videoModal");
      if (modal.classList.contains("active")) closeVideoModal();
    }
  });

  /* ================= HAPUS VIDEO SETELAH 15 MENIT ================= */

  document.querySelectorAll(".ds-video-cell").forEach(function (cell) {
    const expireAt = Number(cell.dataset.expireAt);
    const hasilId = cell.dataset.hasilId;

    if (!expireAt || !hasilId) return;

    const sisaWaktu = expireAt - Date.now();

    async function hapusVideoSekarang() {
      try {
        await fetch(`/hapus-video/${hasilId}`, { method: "DELETE" });
      } catch (err) {
        console.error("Gagal menghapus video:", err);
      }

      const video = cell.querySelector(".ds-video");
      if (video) video.remove();

      const hint = cell.querySelector(".ds-video-hint");
      if (hint) hint.remove();

      if (!cell.querySelector(".ds-video-kosong")) {
        const span = document.createElement("span");
        span.className = "ds-video-kosong";
        span.textContent = "Video sudah terhapus (lebih dari 15 menit)";
        cell.appendChild(span);
      }
    }

    if (sisaWaktu <= 0) {
      hapusVideoSekarang();
    } else {
      setTimeout(hapusVideoSekarang, sisaWaktu);
    }
  });
});