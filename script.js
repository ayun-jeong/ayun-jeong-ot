// 탭 전환
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      panel.hidden = !on;
    });
  });
});

// 현재 섹션 표시
const links = [...document.querySelectorAll('.gnb a')];
const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-60px 0px -70% 0px', threshold: 0 });
sections.forEach(s => spy.observe(s));

// 이미지 확대
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
function closeLb() {
  lb.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
}
lb.addEventListener('click', closeLb);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

// 맨 위로
const toTop = document.getElementById('totop');
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

// 복사 방지 — 무심코 가져가는 것을 막는 수준입니다
['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach(evt => {
  document.addEventListener(evt, e => {
    // 임베드(Figma·목업) 안쪽은 건드리지 않음
    if (e.target.closest && e.target.closest('.embed')) return;
    e.preventDefault();
  });
});

// 저장·소스보기·인쇄 단축키
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if ((e.metaKey || e.ctrlKey) && ['s', 'u', 'p', 'c'].includes(k)) {
    if (k === 'c' && window.getSelection().toString() === '') return;
    e.preventDefault();
  }
});
