// Orbital Console — vanilla Three.js scene engine.
// One fixed fullscreen canvas behind the document; scroll drives the act
// timeline (actF ∈ [0,5]). Camera policy (user decision 2026-07-28): the globe
// stays anchored on the RIGHT with micro-drift only — act changes are expressed
// through zoom/tilt/scene dressing around the globe; the single move away from
// the right in the final act is the deliberate landing (a horizon), not ping-pong.
// Shader lineage: dot-sprite point material and fresnel atmosphere ported from
// metiq-clone (CityPoints.tsx / Atmosphere.tsx), recolored to Signal tokens.
import * as THREE from 'three';
import { worldDots } from '../../data/worldDots';

export interface ConsoleHandle {
  setActF(actF: number): void;
  destroy(): void;
}

const SIG = new THREE.Color('#d7ff3f');
const OK = new THREE.Color('#43d9ad');
const ALERT = new THREE.Color('#ff6b4a');
const LAND = new THREE.Color('#8cb4a0');
const DIM = new THREE.Color(0x5c6575);

type Cam = { x: number; y: number; s: number };
// per-act globe transform: x/y in world units, s = scale (globe R = 1).
// Acts 4–5 keep the globe right of the text column (design values hold from 1440 wide; fitCams fits
// narrower windows); act 6 lands on a horizon below the contact CTA.
const CAM: Cam[] = [
  { x: 1.05, y: 0.08, s: 1.0 },
  { x: 1.1, y: 0.0, s: 0.74 },
  { x: 1.15, y: 0.04, s: 0.78 },
  { x: 1.62, y: 0.02, s: 0.6 },
  { x: 1.65, y: -0.05, s: 0.5 },
  { x: 0.0, y: -1.82, s: 1.55 },
];
// phones (portrait): only a sliver of the act-4/5 globe shows at the right edge; the horizon drops below the CTA buttons
const CAM_PORTRAIT: Record<number, Cam> = {
  3: { x: 1.25, y: 0.32, s: 0.55 },
  4: { x: 1.15, y: -0.28, s: 0.45 },
  5: { x: 0.0, y: -2.75, s: 1.55 },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const tri = (center: number, halfWidth: number, x: number) =>
  1 - Math.min(1, Math.abs(x - center) / halfWidth);
const wrapPi = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

function latLonToV3(latDeg: number, lonDeg: number, r: number): THREE.Vector3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(lat) * Math.sin(lon),
    r * Math.sin(lat),
    r * Math.cos(lat) * Math.cos(lon)
  );
}

function makeDotTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function makeRingTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(32, 32, 25, 0, Math.PI * 2);
  ctx.stroke();
  return new THREE.CanvasTexture(c);
}

export function createConsole(canvas: HTMLCanvasElement, opts: { mobile: boolean }): ConsoleHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, opts.mobile ? 1.5 : 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 0, 4.6);

  const globe = new THREE.Group();
  scene.add(globe);

  /* ── land dot cloud (worldDots: equirect [u,v], 2.4° grid) ── */
  const stride = opts.mobile ? 2 : 1;
  const dots: [number, number][] = [];
  for (let i = 0; i < worldDots.length; i += stride) dots.push(worldDots[i]);
  const N = dots.length;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const size = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const [u, v] = dots[i];
    const lon = u * 360 - 180;
    const lat = 90 - v * 180;
    const p = latLonToV3(lat, lon, 1.002);
    pos.set([p.x, p.y, p.z], i * 3);
    const c = Math.random() > 0.86 ? SIG : LAND;
    col.set([c.r, c.g, c.b], i * 3);
    size[i] = 0.038 + Math.random() * 0.034;
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dotGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  dotGeo.setAttribute('size', new THREE.BufferAttribute(size, 1));

  const dotMat = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: makeDotTexture() },
      uSpin: { value: 0 },
      uTilt: { value: -0.42 },
      uAlpha: { value: 1 },
      uSizeScale: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float size;
      uniform float uSpin, uTilt, uSizeScale;
      varying vec3 vColor;
      varying float vFade;

      vec3 spinTilt(vec3 p) {
        float cs = cos(uSpin), sn = sin(uSpin);
        p = vec3(p.x * cs + p.z * sn, p.y, -p.x * sn + p.z * cs);
        float ct = cos(uTilt), st = sin(uTilt);
        return vec3(p.x, p.y * ct - p.z * st, p.y * st + p.z * ct);
      }

      void main() {
        vec3 p = spinTilt(position);
        vColor = color;
        vFade = smoothstep(-0.55, 0.35, p.z); // back hemisphere fades

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = size * uSizeScale * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform float uAlpha;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        float a = texture2D(uTex, gl_PointCoord).a * uAlpha * mix(0.18, 1.0, vFade);
        if (a < 0.02) discard;
        gl_FragColor = vec4(vColor, a);
      }
    `,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(dotGeo, dotMat);
  globe.add(points);

  /* ── fresnel atmosphere (metiq-clone lineage, recolored) ── */
  // metiq's BackSide formula assumes an opaque globe occluding the sphere's
  // center; our globe is a point cloud, so use a rim-only fresnel instead.
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: OK.clone() }, uAlpha: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uAlpha;
      varying vec3 vNormal;
      void main() {
        float rim = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
        float intensity = pow(clamp(rim, 0.0, 1.0), 3.2) * 0.8;
        gl_FragColor = vec4(uColor, 1.0) * intensity * uAlpha;
      }
    `,
  });
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 40), atmoMat);
  atmo.scale.setScalar(1.18);
  globe.add(atmo);

  /* ── starfield ── */
  const starN = opts.mobile ? 220 : 420;
  const starPos = new Float32Array(starN * 3);
  for (let i = 0; i < starN; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(18 + Math.random() * 18);
    starPos.set([v.x, v.y, v.z], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xaeb8c9, size: 0.05, transparent: true, opacity: 0.5, depthWrite: false })
  );
  scene.add(stars);

  const headTex = makeDotTexture();
  const ringTex = makeRingTexture();

  /* ── AirLens orbit rings (act 3) ── */
  const orbitGroup = new THREE.Group();
  globe.add(orbitGroup);
  const RINGS = [
    { r: 1.5, tilt: 0.5, speed: 0.14 },
    { r: 1.82, tilt: -0.35, speed: -0.1 },
    { r: 2.12, tilt: 0.15, speed: 0.07 },
  ];
  const nodeSprites: { sprite: THREE.Sprite; ring: number; offset: number }[] = [];
  RINGS.forEach((ring, ri) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      const p = new THREE.Vector3(Math.cos(a) * ring.r, 0, Math.sin(a) * ring.r);
      p.applyAxisAngle(new THREE.Vector3(1, 0, 0), ring.tilt);
      pts.push(p);
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    orbitGroup.add(
      new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x8a93a6, transparent: true, opacity: 0.28, depthWrite: false }))
    );
    for (let s = ri; s < 10; s += 3) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: headTex, color: OK, transparent: true, depthWrite: false })
      );
      sprite.scale.setScalar(0.07);
      orbitGroup.add(sprite);
      nodeSprites.push({ sprite, ring: ri, offset: s / 10 });
    }
  });

  // acts 4–5 dressing follows the globe position/scale (world space, not spinning with the dots)
  const anchor = new THREE.Group();
  scene.add(anchor);

  /* ── checkpoint orbit (act 4): packets pass a lime gate, one red packet is held ── */
  const ORBIT_R = 1.25;
  const GATE_A = Math.PI * 0.55; // front of the orbit, below the globe — away from the text column
  const orbitRoll = new THREE.Group();
  orbitRoll.rotation.z = -0.3;
  const orbitIncl = new THREE.Group();
  orbitIncl.rotation.x = 0.4;
  orbitRoll.add(orbitIncl);
  anchor.add(orbitRoll);
  const onOrbit = (a: number, out: THREE.Vector3) => out.set(Math.cos(a) * ORBIT_R, 0, Math.sin(a) * ORBIT_R);
  const orbitLinePts: THREE.Vector3[] = [];
  for (let i = 0; i <= 160; i++) orbitLinePts.push(onOrbit((i / 160) * Math.PI * 2, new THREE.Vector3()));
  const orbitLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(orbitLinePts),
    new THREE.LineBasicMaterial({ color: 0x8a93a6, transparent: true, opacity: 0, depthWrite: false })
  );
  orbitIncl.add(orbitLine);
  const gate = new THREE.Sprite(new THREE.SpriteMaterial({ map: ringTex, color: SIG, transparent: true, opacity: 0, depthWrite: false }));
  onOrbit(GATE_A, gate.position);
  gate.scale.setScalar(0.34);
  orbitIncl.add(gate);
  const PACKETS = 9;
  const packets: THREE.Sprite[] = [];
  for (let i = 0; i < PACKETS; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: OK, transparent: true, opacity: 0, depthWrite: false }));
    s.scale.setScalar(0.1);
    orbitIncl.add(s);
    packets.push(s);
  }
  const held = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: ALERT, transparent: true, opacity: 0, depthWrite: false }));
  onOrbit(GATE_A - 0.17, held.position);
  held.scale.setScalar(0.12);
  orbitIncl.add(held);

  /* ── inbound trajectory (act 5): spirals in toward the surface ── */
  // 4 waypoints = 4 experience-ledger entries (Act 05, site.ts timeline.items) — 2026-10-25
  const TRAJ_N = 180;
  const trajPts: THREE.Vector3[] = [];
  for (let i = 0; i <= TRAJ_N; i++) {
    const u = i / TRAJ_N;
    const th = lerp(1.95, -2.15, u);
    const r = lerp(1.7, 1.05, u);
    trajPts.push(new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r * 0.82, Math.sin(u * Math.PI) * 0.35));
  }
  const trajGhost = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(trajPts),
    new THREE.LineDashedMaterial({ color: 0x8a93a6, transparent: true, opacity: 0, dashSize: 0.05, gapSize: 0.08, depthWrite: false })
  );
  trajGhost.computeLineDistances();
  anchor.add(trajGhost);
  const trajLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(trajPts),
    new THREE.LineBasicMaterial({ color: SIG, transparent: true, opacity: 0, depthWrite: false })
  );
  anchor.add(trajLine);
  const PATH_START = 3.62; // actF where the line starts drawing; it is complete PATH_SPAN later
  const PATH_SPAN = 0.9;
  const WAY_U = [0.21, 0.43, 0.66, 0.88]; // marker positions along the line; each lights up as the line reaches it
  const waypoints = WAY_U.map((u) => {
    const at = trajPts[Math.round(u * TRAJ_N)];
    const ring = new THREE.Sprite(new THREE.SpriteMaterial({ map: ringTex, color: DIM.clone(), transparent: true, opacity: 0, depthWrite: false }));
    ring.position.copy(at);
    ring.scale.setScalar(0.2);
    const dot = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: SIG, transparent: true, opacity: 0, depthWrite: false }));
    dot.position.copy(at);
    dot.scale.setScalar(0.09);
    anchor.add(ring, dot);
    return { ring, dot };
  });
  const trajHead = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: SIG, transparent: true, opacity: 0, depthWrite: false }));
  trajHead.scale.setScalar(0.1);
  anchor.add(trajHead);

  /* ── dawn (act 6): a flat glow along the horizon's top edge ── */
  const dawn = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: SIG, transparent: true, opacity: 0, depthWrite: false }));
  dawn.scale.set(7.0, 1.6, 1);
  dawn.position.z = -0.6; // y tracks the horizon each frame
  scene.add(dawn);

  /* ── frame loop ── */
  let actF = 0;
  let mouseX = 0;
  let mouseY = 0;
  let rot = 0;
  let raf = 0;
  let last = performance.now();
  let running = true;
  let portrait = false;

  const onPointer = (e: PointerEvent) => {
    mouseX = e.clientX / innerWidth - 0.5;
    mouseY = e.clientY / innerHeight - 0.5;
  };
  addEventListener('pointermove', onPointer, { passive: true });

  const onVis = () => {
    running = document.visibilityState === 'visible';
    if (running) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else cancelAnimationFrame(raf);
  };
  document.addEventListener('visibilitychange', onVis);

  // Landscape: the act-4/5 dressing shrinks and slides into the free band between the text column
  // and the act-nav dots, measured on every resize. Where even S_MIN does not fit (narrow windows,
  // landscape phones) it hugs the nav side at S_MIN and stays faint. Portrait uses CAM_PORTRAIT.
  const HALF_H = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z; // visible half-height at z = 0
  // projected x-extent of the dressing in globe units, perspective included (globe rim, orbit, act-5 marker rings)
  const FIT: Record<number, [number, number]> = { 3: [-1.25, 1.36], 4: [-1.22, 1.7] };
  const S_MIN = 0.26;
  let cams: Cam[] = CAM;
  let cramped = false;
  const fitCams = (w: number, h: number) => {
    cramped = false;
    if (portrait) {
      cams = CAM.map((c, i) => CAM_PORTRAIT[i] || c);
      return;
    }
    const ppu = h / 2 / HALF_H;
    const col = document.querySelector('#agent .oc-col')?.getBoundingClientRect();
    const dots = [...document.querySelectorAll('#oc-actnav i')].map((d) => d.getBoundingClientRect()).filter((b) => b.width > 0);
    const l = ((col ? col.right : w / 2) + 20 - w / 2) / ppu;
    const r = ((dots.length ? Math.min(...dots.map((b) => b.left)) : w) - 20 - w / 2) / ppu;
    cramped = r - l < S_MIN * (FIT[3][1] - FIT[3][0]);
    cams = CAM.map((c, i) => {
      const f = FIT[i];
      if (!f) return c;
      const s = Math.max(S_MIN, Math.min(c.s, (r - l) / (f[1] - f[0])));
      return { x: Math.min(r - f[1] * s, Math.max(l - f[0] * s, c.x)), y: c.y, s };
    });
  };

  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    portrait = w / h < 0.9;
    fitCams(w, h);
  };
  addEventListener('resize', resize);
  resize();

  function frame(now: number) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;

    const ai = Math.min(CAM.length - 2, Math.floor(actF));
    // act 5 holds the globe still while the ledger is read; the landing starts halfway to act 6
    const at = smooth(ai === 4 ? 0.5 : 0, 1, actF - ai);
    const c0 = cams[ai];
    const c1 = cams[ai + 1];
    const gx = lerp(c0.x, c1.x, at);
    const gy = lerp(c0.y, c1.y, at);
    const gs = lerp(c0.s, c1.s, at);

    const wHero = tri(0, 0.8, actF);
    const wAir = tri(2, 0.75, actF);
    const wGate = smooth(2.45, 2.95, actF) * (1 - smooth(3.5, 3.85, actF));
    const wPath = smooth(3.55, 3.95, actF) * (1 - smooth(4.55, 4.85, actF));
    const wEnd = smooth(4.5, 5.0, actF);
    const quiet = portrait || cramped ? 0.6 : 1; // phones and cramped windows: dressing stays faint behind the text

    rot += dt * (0.1 + wHero * 0.05);
    const spin = rot + mouseX * 0.18 + actF * 0.35;
    const tilt = -0.42 + mouseY * 0.1;

    globe.position.set(gx, gy, 0);
    globe.scale.setScalar(gs);
    anchor.position.set(gx, gy, 0);
    anchor.scale.setScalar(gs);

    const globeAlpha = 1 - 0.45 * wGate - 0.4 * wPath;
    dotMat.uniforms.uSpin.value = spin;
    dotMat.uniforms.uTilt.value = tilt;
    dotMat.uniforms.uAlpha.value = globeAlpha;
    dotMat.uniforms.uSizeScale.value = 1 + 0.35 * wEnd; // horizon dots grow with the landing
    atmoMat.uniforms.uAlpha.value = globeAlpha;
    (atmoMat.uniforms.uColor.value as THREE.Color).copy(OK).lerp(SIG, 0.55 * wEnd);

    // orbit rings + nodes
    orbitGroup.visible = wAir > 0.03;
    orbitGroup.rotation.set(tilt, 0, 0);
    orbitGroup.children.forEach((c) => {
      const m = (c as THREE.Line).material as THREE.Material & { opacity: number };
      if (m && 'opacity' in m && (c as THREE.Line).isLine) m.opacity = 0.28 * wAir;
    });
    for (const n of nodeSprites) {
      const ring = RINGS[n.ring];
      const a = n.offset * Math.PI * 2 + t * ring.speed;
      const p = new THREE.Vector3(Math.cos(a) * ring.r, 0, Math.sin(a) * ring.r);
      p.applyAxisAngle(new THREE.Vector3(1, 0, 0), ring.tilt);
      n.sprite.position.copy(p);
      (n.sprite.material as THREE.SpriteMaterial).opacity = 0.95 * wAir;
    }

    // checkpoint orbit — the gate pulses as each packet passes
    orbitIncl.visible = wGate > 0.01;
    (orbitLine.material as THREE.LineBasicMaterial).opacity = 0.34 * wGate * quiet;
    let pulse = 0;
    packets.forEach((s, i) => {
      const a = (i / PACKETS + t * 0.045) * Math.PI * 2;
      onOrbit(a, s.position);
      pulse = Math.max(pulse, 1 - Math.abs(wrapPi(a - GATE_A)) / 0.22);
      const depth = 0.3 + 0.7 * smooth(-0.4, 0.3, Math.sin(a)); // far side of the orbit dims
      (s.material as THREE.SpriteMaterial).opacity = 0.9 * depth * wGate * quiet;
    });
    (gate.material as THREE.SpriteMaterial).opacity = (0.55 + 0.45 * pulse) * wGate * quiet;
    gate.scale.setScalar(0.34 * (1 + 0.22 * pulse));
    (held.material as THREE.SpriteMaterial).opacity = (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 4.2))) * wGate * quiet;

    // inbound trajectory — drawn with the scroll, markers light up per ledger entry
    const showPath = wPath > 0.01;
    trajLine.visible = showPath;
    trajGhost.visible = showPath;
    trajHead.visible = showPath;
    const prog = clamp01((actF - PATH_START) / PATH_SPAN);
    const count = Math.max(2, Math.round(prog * TRAJ_N) + 1);
    trajLine.geometry.setDrawRange(0, count);
    const pathA = wPath * quiet;
    (trajLine.material as THREE.LineBasicMaterial).opacity = 0.75 * pathA;
    (trajGhost.material as THREE.LineDashedMaterial).opacity = 0.3 * pathA;
    trajHead.position.copy(trajPts[Math.min(TRAJ_N, count - 1)]);
    (trajHead.material as THREE.SpriteMaterial).opacity = (prog < 1 ? 0.95 : 0.5) * pathA;
    const lightAt = (i: number) => {
      if (i >= WAY_U.length) return 0;
      const reach = PATH_START + WAY_U[i] * PATH_SPAN; // actF when the drawn line reaches marker i
      return smooth(reach - 0.09, reach + 0.09, actF);
    };
    waypoints.forEach(({ ring, dot }, i) => {
      ring.visible = dot.visible = showPath;
      const on = lightAt(i);
      const lit = on * (1 - 0.6 * lightAt(i + 1)); // the newest marker stays brightest
      const rm = ring.material as THREE.SpriteMaterial;
      rm.opacity = pathA * (0.55 + 0.35 * lit);
      rm.color.copy(DIM).lerp(SIG, lit);
      (dot.material as THREE.SpriteMaterial).opacity = pathA * (0.35 * on + 0.65 * lit);
    });

    // dawn rides the horizon's top edge (globe top = gy + gs), so it also fits the portrait horizon
    dawn.visible = wEnd > 0.01;
    dawn.position.y = gy + gs + 0.12;
    (dawn.material as THREE.SpriteMaterial).opacity = 0.1 * wEnd;

    // stars drift
    stars.rotation.y = actF * 0.04 + mouseX * 0.02;
    stars.rotation.x = mouseY * 0.015;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    setActF(v: number) {
      actF = v;
    },
    destroy() {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onPointer);
      removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      // dispose every GPU resource in the graph, not just the big geometries
      scene.traverse((o) => {
        const obj = o as THREE.Mesh;
        (obj.geometry as THREE.BufferGeometry | undefined)?.dispose?.();
        const m = obj.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose?.();
      });
      (dotMat.uniforms.uTex.value as THREE.Texture).dispose();
      headTex.dispose();
      ringTex.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
