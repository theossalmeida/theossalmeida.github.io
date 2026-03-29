/* ─── Particles canvas ─── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let pts = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', () => { resize(); buildPts(); });

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - .5) * .32;
      this.vy = (Math.random() - .5) * .32;
      this.r  = Math.random() * 1.3 + .4;
      this.a  = Math.random() * .35 + .12;
    }
    step() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(88,166,255,${this.a})`;
      ctx.fill();
    }
  }

  function buildPts() {
    const n = Math.min(65, Math.floor(canvas.width * canvas.height / 13000));
    pts = Array.from({ length: n }, () => new Pt());
  }
  buildPts();

  function drawEdges() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 125) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(88,166,255,${.1 * (1 - d / 125)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => { p.step(); p.draw(); });
    drawEdges();
    requestAnimationFrame(frame);
  }
  frame();
}

/* ─── Age calculation ─── */
function calcAge() {
  const dob = new Date(2000, 8, 4); // Sep 4, 2000
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (now.getMonth() < 8 || (now.getMonth() === 8 && now.getDate() < 4)) age--;
  document.querySelectorAll('.age-display').forEach(el => { el.textContent = age; });
}

/* ─── Typing animation ─── */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const lang = document.documentElement.lang;
  const phrases = lang === 'pt-BR'
    ? ['whoami', 'Backend Engineer', 'Engenheiro de Software', '.NET & Python Dev']
    : ['whoami', 'Backend Engineer', 'Software Engineer', '.NET & Python Dev'];

  let pi = 0, ci = 0, del = false, paused = false;

  function tick() {
    const phrase = phrases[pi];

    if (paused) {
      paused = false;
      setTimeout(tick, 1600);
      return;
    }

    if (!del) {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) { del = true; paused = true; }
    } else {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }

    setTimeout(tick, del ? 42 : 92);
  }
  tick();
}

/* ─── Scroll reveal ─── */
function initScrollAnim() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll('.animate-in, .animate-left').forEach(el => io.observe(el));
}

/* ─── Smooth scroll ─── */
function initScroll() {
  const nav = document.querySelector('nav');
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
}

/* ─── Boot ─── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTyping();
  initScrollAnim();
  initScroll();
  calcAge();
});
