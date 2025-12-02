
document.addEventListener('DOMContentLoaded', () => {
  // Grab elements safely
  const header  = document.getElementById('navigation-menu');
  const navBtn  = document.getElementById('navBtn');
  const nav     = document.getElementById('primaryNav');

  // If any critical element is missing, bail out gracefully
  if (!header || !navBtn || !nav) {
    console.warn('[Nav] Missing header/navBtn/nav elements. Check IDs: #navigation-menu, #navBtn, #primaryNav');
    return;
  }

  // Collect section links INSIDE the nav
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

  // Collect target sections by hrefs that actually exist
  const sections = links
    .map(a => (a.getAttribute('href') || '').trim().slice(1))
    .filter(id => id.length)
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // --- Scroll handler: header shadow + active link ---
  const setActiveOnScroll = () => {
    // shadow on scroll
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // active link: pick last section that crossed the top offset
    const offset = 120; // adjust if your header is taller/shorter
    let activeId = '';
    for (const sec of sections) {
      const top = sec.getBoundingClientRect().top;
      if (top <= offset) activeId = sec.id;
    }
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  };

  // Initial run + listeners
  setActiveOnScroll();
  window.addEventListener('scroll', setActiveOnScroll, { passive: true });

  // --- Mobile toggle ---
  navBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navBtn.classList.toggle('active', open);
    navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    // lock background scroll when menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close menu on link click (mobile)
  links.forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navBtn.classList.remove('active');
      navBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }));
});


document.addEventListener("DOMContentLoaded", () => {
  const skills = [
    "Python","JavaScript","React.js","Node.js","PostgreSQL",
    "Django","Azure","Agile Development","CI/CD","Software Optimization"
  ];
  let i = 0, j = 0;
  const typedText = document.getElementById("typed-text");
  const typeDelay = 100, eraseDelay = 50, pause = 1000;

  function type() {
    if (!typedText) return;
    if (j < skills[i].length) {
      typedText.textContent += skills[i].charAt(j++);
      setTimeout(type, typeDelay);
    } else {
      setTimeout(erase, pause);
    }
  }
  function erase() {
    if (!typedText) return;
    if (j > 0) {
      typedText.textContent = skills[i].substring(0, j - 1);
      j--;
      setTimeout(erase, eraseDelay);
    } else {
      i = (i + 1) % skills.length;
      setTimeout(type, typeDelay + 300);
    }
  }
  if (typedText) setTimeout(type, pause + 250);
});
