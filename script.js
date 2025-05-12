document.addEventListener("mousemove", (e) => {
  const svg = document.querySelector(".svg-eyes");
  const rect = svg.getBoundingClientRect();

  const centerX1 = rect.left + 40;
  const centerY1 = rect.top + 25;

  const centerX2 = rect.left + 96;
  const centerY2 = rect.top + 25;

  const maxMove = 9;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  function calcPupil(cx, cy) {
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const angle = Math.atan2(dy, dx);
    const x = Math.cos(angle) * maxMove;
    const y = Math.sin(angle) * maxMove;
    return { x, y };
  }

  const p1 = calcPupil(centerX1, centerY1);
  const p2 = calcPupil(centerX2, centerY2);

  document.querySelector(".pupil.left").setAttribute("cx", 40 + p1.x);
  document.querySelector(".pupil.left").setAttribute("cy", 25 + p1.y);
  document.querySelector(".pupil.right").setAttribute("cx", 96 + p2.x);
  document.querySelector(".pupil.right").setAttribute("cy", 25 + p2.y);
});

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // 滾動進來後只觸發一次
    }
  });
}, {
  threshold: 0.3 // 進入畫面 30% 時觸發動畫
});

cards.forEach(card => observer.observe(card));

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
});

document.addEventListener('DOMContentLoaded', () => {
  const logos = document.querySelectorAll('.brand-logos img');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  logos.forEach(logo => observer.observe(logo));
});

const areas = document.querySelectorAll('#pentagon-group path');
let activeId = null;

// 放大時每個區塊的背景框（rect）位移與尺寸配置
const rectConfig = {
  'area-marketing': { id: 'bg-marketing', x: 140, y: 210, width: 370, height: 100 },
  'area-web':       { id: 'bg-web',       x: 50, y: 560, width: 370, height: 100 },
  'area-content':   { id: 'bg-content',   x: 350, y: 820, width: 370, height: 100 },
  'area-design':    { id: 'bg-design',    x: 650, y: 560, width: 370, height: 100 },
  'area-brand':     { id: 'bg-brand',     x: 562, y: 210, width: 370, height: 100 },
};

// 所有 label-bg 的初始位置與尺寸（可還原用）
const rectReset = {
  'bg-marketing': { x: 230, y: 275, width: 250, height: 70 },
  'bg-web':       { x: 170, y: 578, width: 250, height: 70 },
  'bg-content':   { x: 410, y: 800, width: 250, height: 70 },
  'bg-design':    { x: 665, y: 578, width: 250, height: 70 },
  'bg-brand':     { x: 590, y: 275, width: 250, height: 70 },
};

areas.forEach(area => {
  area.addEventListener('click', () => {
    const id = area.dataset.id;

    // 如果點同一塊就不重複執行
    if (activeId === id) return;

    // ✅ 還原所有區塊底色
    areas.forEach(el => el.setAttribute('fill', el.dataset.original));

    // ✅ 還原所有 label-bg 的大小與位置
    Object.entries(rectReset).forEach(([rectId, attrs]) => {
      const el = document.getElementById(rectId);
      if (el) {
        el.setAttribute('x', attrs.x);
        el.setAttribute('y', attrs.y);
        el.setAttribute('width', attrs.width);
        el.setAttribute('height', attrs.height);
      }
    });

    // ✅ 高亮當前區塊
    const highlightColors = {
  'area-marketing': '#63CAFA',
  'area-web': '#FF4C84',
  'area-content': '#FF8418',
  'area-design': '#FFC726',
  'area-brand': '#77EBE6'
};

const highlight = highlightColors[id] || '#63CAFA';
area.setAttribute('fill', highlight);

    // ✅ 放大對應的 label-bg
    const cfg = rectConfig[id];
    if (cfg) {
      const el = document.getElementById(cfg.id);
      el?.setAttribute('x', cfg.x);
      el?.setAttribute('y', cfg.y);
      el?.setAttribute('width', cfg.width);
      el?.setAttribute('height', cfg.height);
    }

    // ✅ 切換 info-box 顯示
    document.querySelectorAll('.info-box').forEach(box => {
      box.classList.remove('show');
    });
    const targetBox = document.querySelector(`.info-box[data-id="${id}"]`);
    targetBox?.classList.add('show');

    // ✅ 切換文字樣式（文字與 label-bg 加上 .active）
    document.querySelectorAll('.label-zh, .label-en, .label-bg').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelectorAll(`[data-id="${id}"]`).forEach(el => {
      el.classList.add('active');
    });

    activeId = id;
  });
});

document.querySelector('.float-btn.to-top')?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});