/* ============================================================
   Rute Correia Psi — Shared JS
   ============================================================ */

/* ── Mobile menu ── */
function initMobileMenu() {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    }
  });
}

/* ── Accordion ── */
function initAccordions() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const inner = item.querySelector('.accordion-body__inner');
      const isOpen = item.classList.contains('open');

      // Close all siblings (optional: comment out for independent mode)
      // btn.closest('.accordion').querySelectorAll('.accordion-item.open').forEach(openItem => {
      //   if (openItem !== item) {
      //     openItem.classList.remove('open');
      //     openItem.querySelector('.accordion-body').style.maxHeight = null;
      //   }
      // });

      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = null;
      } else {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
}

/* ── Active nav link ── */
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link[data-page]').forEach(link => {
    if (link.dataset.page === path) {
      link.classList.add('active');
    }
  });
}

/* ── Contact form — sends via FormSubmit to geral@rutecorreiapsi.pt ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'A enviar…';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('https://formsubmit.co/ajax/geral@rutecorreiapsi.pt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'Nova mensagem — Rute Correia Psi' }),
      });
      if (!res.ok) throw new Error('send failed');
      btn.textContent = 'Mensagem enviada ✓';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 4000);
    } catch {
      btn.textContent = 'Erro ao enviar — tente novamente';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 4000);
    }
  });
}

/* ── Hide navbar on scroll down, reveal on scroll up ── */
function initHideOnScroll() {
  const navbar = document.querySelector('.navbar');
  const mobileNav = document.getElementById('mobile-nav');
  if (!navbar) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastY && currentY > 80) {
      navbar.classList.add('navbar--hidden');
      mobileNav?.classList.remove('open');
    } else {
      navbar.classList.remove('navbar--hidden');
    }
    lastY = currentY;
  }, { passive: true });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
  setActiveNavLink();
  initContactForm();
  initHideOnScroll();
});
