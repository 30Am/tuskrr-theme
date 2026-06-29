/* TUSKRR Theme JS */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const backdrop = document.querySelector('.mobile-menu-backdrop');

  function openMenu() {
    mobileMenu && mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu && mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', openMenu);
  mobileClose && mobileClose.addEventListener('click', closeMenu);
  backdrop && backdrop.addEventListener('click', closeMenu);

  /* ── Accordion ── */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isOpen = content.classList.contains('open');
      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.accordion-trigger .acc-icon').forEach(i => i.textContent = '+');
      if (!isOpen) {
        content.classList.add('open');
        this.querySelector('.acc-icon').textContent = '−';
      }
    });
  });

  /* ── Product Gallery ── */
  const mainImg = document.querySelector('.product-gallery-main img');
  document.querySelectorAll('.product-gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', function () {
      document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      if (mainImg && this.dataset.src) mainImg.src = this.dataset.src;
    });
  });

  /* ── Variant Selection ── */
  document.querySelectorAll('.variant-option').forEach(opt => {
    opt.addEventListener('click', function () {
      const group = this.closest('.variant-options');
      group.querySelectorAll('.variant-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  /* ── Cart ── */
  const atcBtn = document.querySelector('.atc-btn');
  atcBtn && atcBtn.addEventListener('click', function () {
    const form = this.closest('form');
    if (!form) return;
    const formData = new FormData(form);
    fetch('/cart/add.js', { method: 'POST', body: formData })
      .then(r => r.json())
      .then(() => {
        return fetch('/cart.js');
      })
      .then(r => r.json())
      .then(cart => {
        const badge = document.querySelector('.cart-badge');
        if (badge) badge.textContent = cart.item_count;
        atcBtn.textContent = 'Added to bag ✓';
        setTimeout(() => { atcBtn.textContent = 'Add to bag'; }, 2000);
      })
      .catch(err => console.error(err));
  });

  /* ── Newsletter Form ── */
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm && newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('.newsletter-input');
    const btn = this.querySelector('.newsletter-btn');
    if (!input.value) return;
    btn.textContent = 'Subscribed ✓';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; }, 3000);
  });

});
