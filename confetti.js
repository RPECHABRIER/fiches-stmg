/* =========================================================================
   Mini moteur de confettis / étincelles — 100% vanilla, sans dépendance.
   Fonctionne hors-ligne (utile en salle de classe sans wifi fiable).
   ========================================================================= */

(function () {
  "use strict";

  const canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const COLORS = ["#4f46e5", "#fb7a24", "#ec4899", "#16a34a", "#facc15", "#2563eb"];
  let particles = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function spawn(x, y, count, opts) {
    opts = opts || {};
    const spread = opts.spread || 360;
    const power = opts.power || 9;
    const gravity = opts.gravity || 0.18;
    const size = opts.size || 8;
    const life = opts.life || 70;

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * spread - spread / 2 - 90) * (Math.PI / 180);
      const speed = power * (0.5 + Math.random());
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 14,
        size: size * (0.6 + Math.random() * 0.8),
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life,
        age: 0,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      });
    }
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.age++;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;

      const fade = Math.max(0, 1 - p.age / p.life);
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    particles = particles.filter((p) => p.age < p.life && p.y < canvas.height + 40);

    if (particles.length > 0) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  window.Confetti = {
    burst(x, y, count) {
      spawn(x, y, count || 40, { spread: 360, power: 10, size: 9, life: 75 });
    },
    sparkle(x, y) {
      spawn(x, y, 10, { spread: 360, power: 3.5, size: 5, life: 40, gravity: 0.05 });
    },
  };
})();
