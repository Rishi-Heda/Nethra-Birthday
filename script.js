
/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
const revealTargets = document.querySelectorAll(
  '.glass-card, .glass-quote-card, .love-item, .letter-glass-card, .finale-details-glass, .vintage-stamp-badge'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 55);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


/* ══════════════════════════════════════════
   CONFETTI BURST ON LOAD
══════════════════════════════════════════ */
const confettiColors = ['#8b1a1a', '#c0526f', '#e8a4b0', '#b8960c', '#1a1209', '#e8dcc8'];
const confettiShapes = ['♥', '✦', '✿', '●', '▲', '🌸'];

function spawnConfetti(count = 60) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
    el.style.cssText = `
      position: fixed;
      top: -24px;
      left: ${Math.random() * 100}vw;
      pointer-events: none;
      z-index: 9999;
      color: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
      font-size: ${0.8 + Math.random() * 1.4}rem;
      opacity: ${0.6 + Math.random() * 0.4};
      animation: confettiFall ${2.2 + Math.random() * 2.8}s ease-in ${Math.random() * 1.5}s forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }
}

// Inject confetti keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    to { transform: translateY(110vh) rotate(${Math.random() > 0.5 ? '' : '-'}720deg); opacity: 0; }
  }
  @keyframes sparkleOut {
    0%   { opacity: 1; transform: translate(0, 0) scale(1.2); }
    100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
  }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
  setTimeout(() => spawnConfetti(55), 500);
  setTimeout(() => spawnConfetti(30), 3000);
});


/* ══════════════════════════════════════════
   LOVE ITEM CLICK SPARKLE
══════════════════════════════════════════ */
document.querySelectorAll('.love-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const emojis = ['♥', '✦', '🌸', '✿', '★'];
    for (let i = 0; i < 7; i++) {
      const s     = document.createElement('span');
      const angle = (i / 7) * 360;
      const dist  = 38 + Math.random() * 38;
      s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      s.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        z-index: 9999;
        color: #8b1a1a;
        font-size: ${0.8 + Math.random() * 0.6}rem;
        --dx: ${Math.cos(angle * Math.PI / 180) * dist}px;
        --dy: ${Math.sin(angle * Math.PI / 180) * dist}px;
        animation: sparkleOut 0.75s ease forwards;
      `;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  });
});



