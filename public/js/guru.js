document.querySelectorAll(".gr-hapus-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    const nama = form.dataset.nama;
    const konfirmasi = confirm(`Yakin ingin menghapus guru ${nama}?`);
    if (!konfirmasi) {
      e.preventDefault();
    }
  });
});