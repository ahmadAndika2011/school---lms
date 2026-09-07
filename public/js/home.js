document.addEventListener('DOMContentLoaded', function () {

  /* =========================================================
     PARALLAX SEDERHANA PADA HERO
  ========================================================= */
  const heroBg = document.getElementById('heroBg');

  function handleParallax() {
    const scrollY = window.scrollY;
    const speed = 0.35;
    heroBg.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
  }
  window.addEventListener('scroll', handleParallax);

  /* =========================================================
     COUNTER ANIMATION (Intersection Observer)
     Dipakai untuk: statistik hero & jumlah fasilitas
  ========================================================= */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString('id-ID');

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('id-ID');
      }
    }
    requestAnimationFrame(tick);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counterEls.forEach(function (el) {
    counterObserver.observe(el);
  });

  /* =========================================================
     SCROLL REVEAL UNTUK SECTION
  ========================================================= */
  const revealTargets = document.querySelectorAll(
    '.facility-card, .service-card, .news-card, .teacher-card, .extracurricular-card, .section__title, .section__desc'
  );
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* =========================================================
     FLOATING AI CHAT BUTTON
  ========================================================= */
  const aiChatBtn = document.getElementById('aiChatBtn');
  const aiChatBox = document.getElementById('aiChatBox');
  const aiChatClose = document.getElementById('aiChatClose');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatBody = document.getElementById('aiChatBody');

  aiChatBtn.addEventListener('click', function () {
    aiChatBox.classList.toggle('open');
    if (aiChatBox.classList.contains('open')) {
      aiChatInput.focus();
    }
  });

  aiChatClose.addEventListener('click', function () {
    aiChatBox.classList.remove('open');
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

    // TODO: ganti bagian ini dengan pemanggilan API AI chat yang sesungguhnya
    setTimeout(function () {
      const botMsg = document.createElement('p');
      botMsg.className = 'ai-chat-box__msg ai-chat-box__msg--bot';
      botMsg.textContent = 'Terima kasih atas pertanyaannya, tim kami akan segera membantu.';
      aiChatBody.appendChild(botMsg);
      aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }, 600);
  });

});