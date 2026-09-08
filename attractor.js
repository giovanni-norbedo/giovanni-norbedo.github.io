(function () {
  const canvas = document.getElementById('hastings-attractor');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const a1 = 5.0;
  const a2 = 0.1;
  const b1 = 3.0;
  const b2 = 2.0;
  const d1 = 0.4;
  const d2 = 0.01;

  function rk4Step(s, dt) {
    const x = s[0];
    const y = s[1];
    const z = s[2];

    function f(cx, cy, cz) {
      const f1 = (a1 * cx) / (1.0 + b1 * cx);
      const f2 = (a2 * cy) / (1.0 + b2 * cy);
      const dxdt = cx * (1.0 - cx) - f1 * cy;
      const dydt = f1 * cy - f2 * cz - d1 * cy;
      const dzdt = f2 * cz - d2 * cz;
      return [dxdt, dydt, dzdt];
    }

    const [k1x, k1y, k1z] = f(x, y, z);
    const [k2x, k2y, k2z] = f(
      x + 0.5 * dt * k1x,
      y + 0.5 * dt * k1y,
      z + 0.5 * dt * k1z
    );
    const [k3x, k3y, k3z] = f(
      x + 0.5 * dt * k2x,
      y + 0.5 * dt * k2y,
      z + 0.5 * dt * k2z
    );
    const [k4x, k4y, k4z] = f(
      x + dt * k3x,
      y + dt * k3y,
      z + dt * k3z
    );

    return [
      x + (dt / 6.0) * (k1x + 2 * k2x + 2 * k3x + k4x),
      y + (dt / 6.0) * (k1y + 2 * k2y + 2 * k3y + k4y),
      z + (dt / 6.0) * (k1z + 2 * k2z + 2 * k3z + k4z),
    ];
  }

  const cx = 0.135;
  const cy = 0.752;
  const cz = 9.188;

  function normalizePoint(s) {
    return {
      vx: (s[1] - cx) / 0.22,
      vy: (s[0] - cy) / 0.42,
      vz: (s[2] - cz) / 1.4,
    };
  }

  const SKELETON_POINTS = 30000;
  const DT = 0.045;
  const skeletonNorm = [];

  let genState = [0.8, 0.2, 10.0];
  for (let i = 0; i < 3000; i++) {
    genState = rk4Step(genState, DT);
  }

  for (let i = 0; i < SKELETON_POINTS; i++) {
    genState = rk4Step(genState, DT);
    if (i % 2 === 0) {
      skeletonNorm.push(normalizePoint(genState));
    }
  }

  class Particle {
    constructor(initState, trailLen, speedFactor) {
      this.state = initState;
      this.trailLen = trailLen;
      this.speedFactor = speedFactor;
      this.trail = [];

      for (let i = 0; i < 3000; i++) {
        this.state = rk4Step(this.state, DT);
      }
      for (let i = 0; i < this.trailLen; i++) {
        this.state = rk4Step(this.state, DT);
        this.trail.push(normalizePoint(this.state));
      }
    }

    update(steps) {
      for (let i = 0; i < steps * this.speedFactor; i++) {
        this.state = rk4Step(this.state, DT);
        this.trail.push(normalizePoint(this.state));
        if (this.trail.length > this.trailLen) {
          this.trail.shift();
        }
      }
    }
  }

  const particle = new Particle([0.75, 0.15, 9.5], 5200, 1);

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.resetTransform();
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  const baseAzim = 30 * (Math.PI / 180);
  const baseElev = 12 * (Math.PI / 180);
  let time = 0;

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / width - 0.5) * 2;
    const mouseY = (e.clientY / height - 0.5) * 2;
    targetRotX = mouseX * 0.15;
    targetRotY = mouseY * 0.1;
  });

  function getThemeColors() {
    const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
    if (isDark) {
      return {
        skeletonLine: 'rgba(251, 191, 36, 0.14)',
        trailGlow: 'rgba(253, 230, 138, 0.45)',
        trailMid: 'rgba(251, 191, 36, 0.26)',
        headDot: '#ffffff',
        shadowColor: '#fbbf24',
        glowSize: 10,
      };
    } else {
      return {
        skeletonLine: 'rgba(180, 83, 9, 0.12)',
        trailGlow: 'rgba(180, 83, 9, 0.35)',
        trailMid: 'rgba(180, 83, 9, 0.22)',
        headDot: '#ffffff',
        shadowColor: '#b45309',
        glowSize: 8,
      };
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    if (width < 1100) {
      requestAnimationFrame(render);
      return;
    }

    time += 0.008;

    particle.update(9);

    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;

    const cycle = time * 0.32;
    const thetaX = baseElev + 0.38 * Math.sin(cycle) + currentRotY;
    const thetaY = 0.38 * Math.sin(cycle - (2 * Math.PI / 3)) + currentRotX;
    const thetaZ = baseAzim + 0.55 * Math.sin(cycle - (4 * Math.PI / 3)) + time * 0.15;

    const cosX = Math.cos(thetaX);
    const sinX = Math.sin(thetaX);
    const cosY = Math.cos(thetaY);
    const sinY = Math.sin(thetaY);
    const cosZ = Math.cos(thetaZ);
    const sinZ = Math.sin(thetaZ);

    const scale = Math.min(width * 0.35, height * 0.52, 450);
    const originX = Math.max(width * 0.11, 110);
    const originY = height * 0.48;

    const colors = getThemeColors();

    function project(p) {
      const x1 = p.vx;
      const y1 = p.vy * cosX - p.vz * sinX;
      const z1 = p.vy * sinX + p.vz * cosX;

      const x2 = x1 * cosY + z1 * sinY;
      const y2 = y1;
      const z2 = -x1 * sinY + z1 * cosY;

      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      const persp = 3.5 / (3.5 + y3 * 0.3);
      return {
        x: originX + x3 * scale * persp,
        y: originY - z3 * scale * persp,
      };
    }

    ctx.beginPath();
    ctx.lineWidth = 0.65;
    ctx.strokeStyle = colors.skeletonLine;

    const skelLen = skeletonNorm.length;
    let started = false;
    for (let i = 0; i < skelLen; i++) {
      const proj = project(skeletonNorm[i]);
      if (!started) {
        ctx.moveTo(proj.x, proj.y);
        started = true;
      } else {
        ctx.lineTo(proj.x, proj.y);
      }
    }
    ctx.stroke();

    const trail = particle.trail;
    const tLen = trail.length;
    if (tLen >= 2) {
      const segments = 40;
      const chunk = Math.floor(tLen / segments);

      for (let s = 0; s < segments; s++) {
        const startIdx = s * chunk;
        const endIdx = Math.min(tLen - 1, (s + 1) * chunk);
        const progress = (s + 1) / segments;

        ctx.beginPath();
        ctx.lineWidth = 0.65 + progress * 0.6;
        ctx.strokeStyle = progress > 0.75 ? colors.trailGlow : colors.trailMid;
        ctx.globalAlpha = Math.max(0.06, progress * 0.95);

        let chkStarted = false;
        for (let k = startIdx; k <= endIdx; k++) {
          const proj = project(trail[k]);
          if (!chkStarted) {
            ctx.moveTo(proj.x, proj.y);
            chkStarted = true;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;

      const headProj = project(trail[tLen - 1]);
      ctx.save();
      ctx.shadowColor = colors.shadowColor;
      ctx.shadowBlur = colors.glowSize;
      ctx.fillStyle = colors.headDot;
      ctx.beginPath();
      ctx.arc(headProj.x, headProj.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
