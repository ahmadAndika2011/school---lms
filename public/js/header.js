document.addEventListener('DOMContentLoaded', function () {

  /* =========================================================
     NAVBAR: efek scroll + toggle menu mobile
  ========================================================= */
  const navbar = document.getElementById('navbar');
  const navBurger = document.getElementById('navBurger');
  const navMenu = document.getElementById('navMenu');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);

  navBurger.addEventListener('click', function () {
    navMenu.classList.toggle('open');
    navBurger.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navBurger.classList.remove('active');
    });
  });

});