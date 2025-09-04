// Basic interactivity & validation
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links (progressive enhancement)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Country CTAs -> prefill select
  document.querySelectorAll('.country-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const country = btn.dataset.country;
      const select = document.querySelector('select[name="country"]');
      if (select) {
        select.value = country;
        document.getElementById('apply').scrollIntoView({ behavior: 'smooth' });
      }
      // Track event
      if (typeof gtag === 'function') gtag('event', 'country_cta_click', { country });
      if (typeof fbq === 'function') fbq('trackCustom', 'CountryCTAClick', { country });
    });
  });

  // Form validation
  const form = document.getElementById('leadForm');
  const msg = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneRegex = /^[0-9+\-()\s]{7,20}$/;

  form.addEventListener('submit', (e) => {
    msg.textContent = '';
    msg.className = 'mt-4 text-sm';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const country = form.country.value.trim();
    const consent = form.consent.checked;

    const errors = [];
    if (name.length < 2) errors.push('Please enter your full name.');
    if (!emailRegex.test(email)) errors.push('Enter a valid email address.');
    if (!phoneRegex.test(phone)) errors.push('Enter a valid phone number.');
    if (!country) errors.push('Please select a preferred country.');
    if (!consent) errors.push('Please agree to be contacted.');

    if (errors.length) {
      e.preventDefault();
      msg.textContent = errors.join(' ');
      msg.classList.add('text-red-600');
      // Track validation failure
      if (typeof gtag === 'function') gtag('event', 'lead_form_error', { errors_count: errors.length });
      if (typeof fbq === 'function') fbq('trackCustom', 'LeadFormError', { errors_count: errors.length });
      return;
    }

    // Disable and show submitting
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Track submit attempt
    if (typeof gtag === 'function') gtag('event', 'lead_form_submit_attempt');
    if (typeof fbq === 'function') fbq('track', 'Lead');

    // Allow normal POST (PHP handler). If no backend, prevent and simulate success:
    const usingDemo = true; // set to false when hooking to real backend
    if (usingDemo) {
      e.preventDefault();
      setTimeout(() => {
        msg.textContent = 'Thanks! Your application has been received. We will contact you shortly.';
        msg.classList.add('text-green-600');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
        if (typeof gtag === 'function') gtag('event', 'lead_form_submit_success');
        if (typeof fbq === 'function') fbq('trackCustom', 'LeadFormSubmitSuccess');
      }, 700);
    }
  });
});
