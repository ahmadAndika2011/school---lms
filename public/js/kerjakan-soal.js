// update progress bar berdasarkan jumlah pertanyaan yang sudah dijawab
    const form = document.getElementById("form-kerjakan-soal");
    const totalSoal = <%= soal.soal.length %>;
    const progressFill = document.getElementById("ks-progress-fill");
    const progressLabel = document.getElementById("ks-progress-label");

    function updateProgress() {
      const namaTerjawab = new Set();
      form.querySelectorAll('input[type="radio"]:checked').forEach(function (input) {
        namaTerjawab.add(input.name);
      });
      const jumlah = namaTerjawab.size;
      const persen = totalSoal > 0 ? (jumlah / totalSoal) * 100 : 0;
      progressFill.style.width = persen + "%";
      progressLabel.textContent = jumlah + " dari " + totalSoal + " soal terjawab";
    }

    form.addEventListener("change", updateProgress);

    form.addEventListener("submit", function (e) {
      const namaTerjawab = new Set();
      form.querySelectorAll('input[type="radio"]:checked').forEach(function (input) {
        namaTerjawab.add(input.name);
      });
      if (namaTerjawab.size < totalSoal) {
        e.preventDefault();
        alert("Masih ada soal yang belum dijawab. Pastikan semua soal sudah diisi sebelum mengumpulkan.");
      }
    });