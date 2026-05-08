// Image toggle for detail pages
function initImageToggle() {
  const toggleBtns = document.querySelectorAll('.image-toggle button');
  const mainImage = document.querySelector('.detail-image img');
  if (!toggleBtns.length || !mainImage) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mainImage.src = btn.dataset.src;
    });
  });
}

// Modal system
function openModal(type, data) {
  const overlay = document.getElementById('modal-overlay');
  const header = overlay.querySelector('.modal-header h3');
  const body = overlay.querySelector('.modal-body');

  header.textContent = data.title;
  body.innerHTML = '';

  if (type === 'pdf') {
    body.innerHTML = `<iframe src="${data.src}" title="${data.title}"></iframe>`;
  } else if (type === 'video') {
    body.innerHTML = `<video controls autoplay><source src="${data.src}" type="video/mp4">浏览器不支持视频播放</video>`;
  } else if (type === 'image') {
    body.innerHTML = `<div class="modal-image-wrap"><img src="${data.src}" alt="${data.title}">${data.desc ? `<div class="modal-image-desc">${data.desc}</div>` : ''}</div>`;
  } else if (type === 'report') {
    body.innerHTML = `<div class="report-content">${data.content}</div>`;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  // Stop video if playing
  const video = overlay.querySelector('video');
  if (video) video.pause();
}

// Close modal on overlay click or Escape key
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
  if (e.target.classList.contains('modal-close')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initImageToggle();
});
