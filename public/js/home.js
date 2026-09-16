document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     PARALLAX SEDERHANA PADA HERO
  ========================================================= */
  const heroBg = document.getElementById("heroBg");

  function handleParallax() {
    const scrollY = window.scrollY;
    const speed = 0.35;
    heroBg.style.transform = "translateY(" + scrollY * speed + "px)";
  }
  window.addEventListener("scroll", handleParallax);

  /* =========================================================
     COUNTER ANIMATION (Intersection Observer)
     Dipakai untuk: statistik hero & jumlah fasilitas
  ========================================================= */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString("id-ID");

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString("id-ID");
      }
    }
    requestAnimationFrame(tick);
  }

  const counterEls = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  counterEls.forEach(function (el) {
    counterObserver.observe(el);
  });

  /* =========================================================
     SCROLL REVEAL UNTUK SECTION
  ========================================================= */
  const revealTargets = document.querySelectorAll(
    ".facility-card, .service-card, .news-card, .teacher-card, .extracurricular-card, .section__title, .section__desc",
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* =========================================================
     FLOATING CHAT BUTTON (PILIHAN: WHATSAPP / AI)
  ========================================================= */
  const chatFab = document.getElementById('chatFab');
  const aiChatBtn = document.getElementById('aiChatBtn');
  const chatFabOptions = document.getElementById('chatFabOptions');
  const chatFabAiBtn = document.getElementById('chatFabAiBtn');
  const aiChatBox = document.getElementById('aiChatBox');
  const aiChatClose = document.getElementById('aiChatClose');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatBody = document.getElementById('aiChatBody');

  // Tombol utama -> buka/tutup menu pilihan (WA / AI)
  aiChatBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    chatFabOptions.classList.toggle('open');
  });

  // Pilih "Chat AI" -> tutup menu pilihan, buka popup asisten AI
  chatFabAiBtn.addEventListener('click', function () {
    chatFabOptions.classList.remove('open');
    aiChatBox.classList.add('open');
    aiChatInput.focus();
  });

  // Tutup popup AI
  aiChatClose.addEventListener('click', function () {
    aiChatBox.classList.remove('open');
  });

  // Klik di luar area -> tutup menu pilihan (bukan popup AI yang sedang aktif)
  document.addEventListener('click', function (e) {
    if (chatFab && !chatFab.contains(e.target)) {
      chatFabOptions.classList.remove('open');
    }
  });

  aiChatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = aiChatInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement('p');
    userMsg.className = 'ai-chat-box__msg ai-chat-box__msg--user';
    userMsg.textContent = message;
    aiChatBody.appendChild(userMsg);

    aiChatInput.value = '';
    aiChatBody.scrollTop = aiChatBody.scrollHeight;

    // Tampilkan indikator "mengetik..."
    const typingMsg = document.createElement('p');
    typingMsg.className = 'ai-chat-box__msg ai-chat-box__msg--bot';
    typingMsg.textContent = 'Mengetik...';
    typingMsg.id = 'aiTypingIndicator';
    aiChatBody.appendChild(typingMsg);
    aiChatBody.scrollTop = aiChatBody.scrollHeight;

    fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        const typingEl = document.getElementById('aiTypingIndicator');
        if (typingEl) typingEl.remove();

        const botMsg = document.createElement('p');
        botMsg.className = 'ai-chat-box__msg ai-chat-box__msg--bot';
        botMsg.textContent = data.reply || data.error || 'Maaf, terjadi kesalahan.';
        aiChatBody.appendChild(botMsg);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
      })
      .catch(function (err) {
        console.error(err);
        const typingEl = document.getElementById('aiTypingIndicator');
        if (typingEl) typingEl.remove();

        const errMsg = document.createElement('p');
        errMsg.className = 'ai-chat-box__msg ai-chat-box__msg--bot';
        errMsg.textContent = 'Maaf, tidak bisa terhubung ke server saat ini.';
        aiChatBody.appendChild(errMsg);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
      });
  });
});
