(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const toTop = document.querySelector('[data-to-top]');
  const dialog = document.querySelector('[data-dialog]');
  const dialogTitle = document.querySelector('[data-dialog-title]');
  const dialogCopy = document.querySelector('[data-dialog-copy]');
  const policyButtons = document.querySelectorAll('[data-policy]');

  const setMenu = (open) => {
    if (!menuToggle || !menu) return;
    menuToggle.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  menuToggle?.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    toTop?.classList.toggle('is-visible', window.scrollY > 550);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const policies = {
    terms: {
      title: 'Terms of Use',
      copy: '<p>iCASH is designed to make everyday financial services easier to access. By using this website or the iCASH app, you agree to use the service lawfully and keep your account details secure.</p><p>Product availability, fees and eligibility may vary. Please review the current terms presented in the app before completing a transaction.</p>'
    },
    privacy: {
      title: 'Privacy Policy',
      copy: '<p>We respect your privacy. iCASH uses information needed to provide secure wallet services, improve the experience and help prevent fraud.</p><p>For questions about your information or your account, contact our team at <a href="mailto:hello@icash.ph">hello@icash.ph</a>.</p>'
    }
  };

  const closeDialog = () => {
    if (dialog?.open) dialog.close();
  };
  policyButtons.forEach((button) => button.addEventListener('click', () => {
    const policy = policies[button.dataset.policy];
    if (!policy || !dialog) return;
    dialogTitle.textContent = policy.title;
    dialogCopy.innerHTML = policy.copy;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }));
  document.querySelector('[data-dialog-close]')?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
  document.querySelector('[data-year]')?.replaceChildren(String(new Date().getFullYear()));
})();
