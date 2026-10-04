// =====================================================
// Bloom Café - script.js
// =====================================================

// ---------- 1. SIDEBAR MENU ----------
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');

// Opening adds the "open" class; CSS handles the smooth slide animation.
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  openSidebarBtn.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  sidebar.setAttribute('aria-hidden', 'true');
  openSidebarBtn.setAttribute('aria-expanded', 'false');
}

openSidebarBtn.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);                 // click outside closes it
sidebar.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', closeSidebar));                 // close after choosing a page

// ---------- 2. VIDEO MODAL ----------
const videoModal = document.getElementById('videoModal');
const cafeVideo = document.getElementById('cafeVideo');
const playBtn = document.getElementById('playBtn');
const closeModalBtn = document.getElementById('closeModal');

// Show the modal and start the video (only after the user clicked Play).
function openVideo() {
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  const attempt = cafeVideo.play();
  if (attempt) attempt.catch(() => {});  // ignore if browser blocks autoplay; controls are visible
}

// Hide the modal, pause the video, and rewind it to the start.
function closeVideo() {
  cafeVideo.pause();
  cafeVideo.currentTime = 0;
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
}

playBtn.addEventListener('click', openVideo);
closeModalBtn.addEventListener('click', closeVideo);
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) closeVideo();   // only the dark background, not the video itself
});

// Escape key closes whichever panel is open.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (videoModal.classList.contains('open')) closeVideo();
  if (sidebar.classList.contains('open')) closeSidebar();
});

// ---------- 3. CONTACT FORM VALIDATION ----------
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Show or clear an error message under a field.
function setError(id, message) {
  document.getElementById(id).classList.toggle('invalid', !!message);
  document.getElementById(id + 'Error').textContent = message;
  return !message;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();               // no backend, so stop the real submit
  success.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // Run every check (no short-circuit) so all errors show at once.
  const results = [
    setError('name', name ? '' : 'Please enter your full name.'),
    setError('email', !email ? 'Please enter your email.' :
                      !emailPattern.test(email) ? 'Please enter a valid email address.' : ''),
    setError('phone', !phone ? 'Please enter your phone number.' :
                      !/^[+\d][\d\s-]{6,}$/.test(phone) ? 'Please enter a valid phone number.' : ''),
    setError('message', message ? '' : 'Please write a message.')
  ];

  if (results.every(Boolean)) {
    success.textContent = 'Thank you! Your message has been sent (demo only).';
    form.reset();
  }
});
