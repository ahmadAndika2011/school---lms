document.addEventListener("DOMContentLoaded", function () {
  const HURUF = ["a", "b", "c", "d"];

  const btnGenerate = document.getElementById("btn-generate");
  const inputJumlah = document.getElementById("jumlah_soal");
  const soalContainer = document.getElementById("soal-container");
  const submitRow = document.getElementById("ts-submit-row");

  const templateCard = document.getElementById("template-card-soal");
  const templateGambar = document.getElementById("template-input-gambar");

  btnGenerate.addEventListener("click", function () {
    const jumlah = parseInt(inputJumlah.value, 10);

    if (!jumlah || jumlah < 1) {
      alert("Isi jumlah soal terlebih dahulu (minimal 1).");
      return;
    }

    if (soalContainer.children.length > 0) {
      const konfirmasi = confirm(
        "Mengubah jumlah soal akan menghapus card yang sudah diisi. Lanjutkan?"
      );
      if (!konfirmasi) return;
    }

    soalContainer.innerHTML = "";

    for (let i = 0; i < jumlah; i++) {
      const card = buatCardSoal(i);
      soalContainer.appendChild(card);
    }

    submitRow.style.display = "flex";
  });

  function buatCardSoal(index) {
    const fragment = templateCard.content.cloneNode(true);
    const card = fragment.querySelector(".ts-card-soal");

    // tombol hapus soal
    card.querySelector('[data-role="hapus"]').addEventListener("click", function () {
      const yakin = confirm("Hapus soal ini?");
      if (!yakin) return;
      card.remove();
      renumberSemuaCard();
    });

    // pertanyaan
    const pertanyaan = card.querySelector('[data-role="pertanyaan"]');
    pertanyaan.dataset.field = "pertanyaan";

    // daftar gambar: mulai dengan 1 input
    const gambarList = card.querySelector('[data-role="gambar-list"]');
    gambarList.appendChild(buatInputGambar());

    // tombol tambah gambar
    card.querySelector('[data-role="tambah-gambar"]').addEventListener("click", function () {
      gambarList.appendChild(buatInputGambar());
    });

    // pilihan jawaban a-d
    const pilihanList = card.querySelector('[data-role="pilihan-list"]');
    HURUF.forEach(function (huruf) {
      pilihanList.appendChild(buatPilihanItem(huruf));
    });

    setIndexCard(card, index);

    return card;
  }

  function buatInputGambar() {
    const fragment = templateGambar.content.cloneNode(true);
    const item = fragment.querySelector('[data-role="gambar-item"]');
    const input = item.querySelector('[data-role="gambar-input"]');
    const nama = item.querySelector('[data-role="gambar-nama"]');
    const hapus = item.querySelector('[data-role="hapus-gambar"]');

    input.addEventListener("change", function () {
      nama.textContent = input.files.length > 0 ? input.files[0].name : "Belum ada file";
    });

    hapus.addEventListener("click", function () {
      const list = item.parentElement;
      // minimal sisakan 1 baris input gambar per soal
      if (list.children.length > 1) {
        item.remove();
      } else {
        input.value = "";
        nama.textContent = "Belum ada file";
      }
    });

    return item;
  }

  function buatPilihanItem(huruf) {
    const wrapper = document.createElement("div");
    wrapper.className = "ts-pilihan-item";
    wrapper.dataset.huruf = huruf;

    wrapper.innerHTML =
      '<input type="radio" data-field="jawaban_benar" value="' + huruf + '">' +
      '<span class="ts-pilihan-huruf">' + huruf + "</span>" +
      '<input type="text" data-field="pilihan-' + huruf + '" placeholder="Teks pilihan ' + huruf.toUpperCase() + '" required>';

    return wrapper;
  }

  // Menetapkan attribute "name" pada semua input di dalam sebuah card
  // berdasarkan index soal (dipanggil saat card dibuat & saat renumbering).
  function setIndexCard(card, index) {
    card.dataset.index = index;
    card.querySelector('[data-role="nomor"]').textContent = index + 1;

    const pertanyaan = card.querySelector('[data-field="pertanyaan"]');
    pertanyaan.name = "soal[" + index + "][pertanyaan]";

    card.querySelectorAll('[data-role="gambar-input"]').forEach(function (input) {
      input.name = "soal[" + index + "][gambar][]";
    });

    card.querySelectorAll(".ts-pilihan-item").forEach(function (item) {
      const huruf = item.dataset.huruf;
      const radio = item.querySelector('[data-field="jawaban_benar"]');
      const teks = item.querySelector('[data-field="pilihan-' + huruf + '"]');
      radio.name = "soal[" + index + "][jawaban_benar]";
      teks.name = "soal[" + index + "][pilihan][" + huruf + "]";
    });
  }

  function renumberSemuaCard() {
    const cards = soalContainer.querySelectorAll(".ts-card-soal");
    cards.forEach(function (card, i) {
      setIndexCard(card, i);
    });
  }

  // Validasi ringan sebelum submit: pastikan tiap soal punya jawaban benar terpilih.
  document.getElementById("form-tambah-soal").addEventListener("submit", function (e) {
    const cards = soalContainer.querySelectorAll(".ts-card-soal");

    if (cards.length === 0) {
      e.preventDefault();
      alert("Buat minimal 1 soal terlebih dahulu.");
      return;
    }

    for (const card of cards) {
      const adaJawabanBenar = card.querySelector('[data-field="jawaban_benar"]:checked');
      if (!adaJawabanBenar) {
        e.preventDefault();
        const nomor = card.querySelector('[data-role="nomor"]').textContent;
        alert("Pilih jawaban benar untuk Soal #" + nomor + ".");
        return;
      }
    }
  });
});