/* ============================================================
   SALT05 — Portfolio JavaScript
   Typewriter, Scroll Reveal, Navigation, Glitch, Proficiency
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. TYPEWRITER EFFECT ----
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const lines = [
      { text: 'Xin chào, tôi là ', cls: '' },
      { text: 'Phát Phạm (Salt05)', cls: 'name' },
      { text: ' 👋', cls: '' },
    ];

    let lineIdx = 0;
    let charIdx = 0;
    let currentHTML = '';
    const speed = 55; // ms per character
    const startDelay = 800; // wait before starting

    function typeNext() {
      if (lineIdx >= lines.length) {
        // Done — keep cursor blinking
        return;
      }

      const segment = lines[lineIdx];
      const char = segment.text[charIdx];

      if (charIdx === 0 && segment.cls) {
        currentHTML += `<span class="${segment.cls}" data-text="${segment.text}">`;
      }

      currentHTML += char;

      if (charIdx === segment.text.length - 1 && segment.cls) {
        currentHTML += '</span>';
      }

      typewriterEl.innerHTML = currentHTML + '<span class="cursor"></span>';
      charIdx++;

      if (charIdx >= segment.text.length) {
        lineIdx++;
        charIdx = 0;
      }

      const delay = char === ' ' ? speed * 0.5 : speed;
      setTimeout(typeNext, delay);
    }

    setTimeout(typeNext, startDelay);
  }


  // ---- 2. NAVBAR SCROLL BEHAVIOR ----
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initial check


  // ---- 3. ACTIVE NAV LINK HIGHLIGHTING ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  // ---- 4. MOBILE NAV TOGGLE ----
  const toggleBtn = document.getElementById('navToggle');
  const navLinksWrapper = document.getElementById('navLinks');

  if (toggleBtn && navLinksWrapper) {
    toggleBtn.addEventListener('click', () => {
      navLinksWrapper.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (navLinksWrapper.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close nav on link click (mobile)
    navLinksWrapper.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksWrapper.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        icon.className = 'fas fa-bars';
      });
    });
  }


  // ---- 5. SCROLL REVEAL ----
  const revealElements = document.querySelectorAll('.reveal-element');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---- 6. SKILL PROFICIENCY BAR ANIMATION ----
  const proficiencyBars = document.querySelectorAll('.skill-proficiency__fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        if (width) {
          target.style.width = width;
        }
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  proficiencyBars.forEach(bar => barObserver.observe(bar));


  // ---- 7. SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ---- 8. TERMINAL TEXT SCRAMBLE (mini effect for section headings) ----
  const terminalHeadings = document.querySelectorAll('.section-heading .path');
  const chars = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrambleText(entry.target);
        headingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  terminalHeadings.forEach(h => headingObserver.observe(h));

  function scrambleText(el) {
    const original = el.getAttribute('data-text') || el.textContent;
    el.setAttribute('data-text', original);
    let iterations = 0;
    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, idx) => {
          if (idx < iterations) return original[idx];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      iterations += 1 / 2;
      if (iterations >= original.length) {
        clearInterval(interval);
        el.textContent = original;
      }
    }, 30);
  }


  // ---- 9. MATRIX RAIN CANVAS (Background subtle effect) ----
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    function drawMatrix() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 255, 65, 0.06)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 80);
  }

});
