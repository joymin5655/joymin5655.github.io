// Orbital Console — vanilla Three.js scene engine.
// One fixed fullscreen canvas behind the document; scroll drives the act
// timeline (actF ∈ [0,5]). Camera policy (user decision 2026-07-28): the globe
// stays anchored on the RIGHT with micro-drift only — act changes are expressed
// through zoom/tilt/scene dressing; the single centering move in the final act
// is the deliberate landing, not ping-pong.
// Shader lineage: dot-sprite point material and fresnel atmosphere ported from
// metiq-clone (CityPoints.tsx / Atmosphere.tsx), recolored to Signal tokens.
import * as THREE from 'three';
import { worldDots } from '../../data/worldDots';
import { observatory } from '../../data/observatory';

export interface ConsoleHandle {
  setActF(actF: number): void;
  destroy(): void;
}

const SIG = new THREE.Color('#d7ff3f');
const OK = new THREE.Color('#43d9ad');
const ALERT = new THREE.Color('#ff6b4a');
const INK = new THREE.Color('#aeb8c9');
const LAND = new THREE.Color('#8cb4a0');

// per-act globe transform: x/y in world units, s = scale (globe R = 1)
const CAM = [
  { x: 1.05, y: 0.08, s: 1.0 },
  { x: 1.1, y: 0.0, s: 0.74 },
  { x: 1.15, y: 0.04, s: 0.78 },
  { x: 0.85, y: 0.0, s: 0.85 },
  { x: 1.15, y: -0.2, s: 0.38 },
  { x: 0.0, y: 0.12, s: 0.9 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const tri = (center: number, halfWidth: number, x: number) =>
  1 - Math.min(1, Math.abs(x - center) / halfWidth);

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
  const meta = new Float32Array(N * 3); // lane, seed, risky
  const col = new Float32Array(N * 3);
  const size = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const [u, v] = dots[i];
    const lon = u * 360 - 180;
    const lat = 90 - v * 180;
    const p = latLonToV3(lat, lon, 1.002);
    pos.set([p.x, p.y, p.z], i * 3);
    const seed = Math.random();
    meta.set([i % 3, seed, i % 23 === 0 ? 1 : 0], i * 3);
    const c = seed > 0.86 ? SIG : LAND;
    col.set([c.r, c.g, c.b], i * 3);
    size[i] = 0.038 + Math.random() * 0.034;
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dotGeo.setAttribute('aMeta', new THREE.BufferAttribute(meta, 3));
  dotGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  dotGeo.setAttribute('size', new THREE.BufferAttribute(size, 1));

  const dotMat = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: makeDotTexture() },
      uTime: { value: 0 },
      uSpin: { value: 0 },
      uTilt: { value: -0.42 },
      uGateMix: { value: 0 },
      uAlpha: { value: 1 },
      uSizeScale: { value: 1 },
      uSig: { value: SIG },
      uOk: { value: OK },
      uAlert: { value: ALERT },
      uInk: { value: INK },
    },
    vertexShader: /* glsl */ `
      attribute float size;
      attribute vec3 aMeta; // lane, seed, risky
      uniform float uTime, uSpin, uTilt, uGateMix, uSizeScale;
      uniform vec3 uSig, uOk, uAlert, uInk;
      varying vec3 vColor;
      varying float vFade;

      vec3 spinTilt(vec3 p) {
        float cs = cos(uSpin), sn = sin(uSpin);
        p = vec3(p.x * cs + p.z * sn, p.y, -p.x * sn + p.z * cs);
        float ct = cos(uTilt), st = sin(uTilt);
        return vec3(p.x, p.y * ct - p.z * st, p.y * st + p.z * ct);
      }

      vec3 corridor(out float risky) {
        float lane = aMeta.x, seed = aMeta.y;
        risky = aMeta.z;
        float cyc = fract(seed + uTime * 0.1 * (1.0 + lane * 0.13));
        float z = mix(2.4, -2.6, cyc);
        float x = (lane - 1.0) * 0.62 + (seed - 0.5) * 0.18;
        float y = (fract(seed * 7.0) - 0.5) * 0.36;
        if (risky > 0.5 && z < 0.45) {
          z = 0.45;
          x += (seed - 0.5) * 0.9 * (0.5 + 0.5 * sin(uTime * 3.0 + seed * 9.0));
        }
        return vec3(x, y, z);
      }

      void main() {
        vec3 gp = spinTilt(position);
        float risky;
        vec3 cp = corridor(risky);
        vec3 p = mix(gp, cp, uGateMix);

        vec3 laneCol = aMeta.x < 0.5 ? uSig : (aMeta.x < 1.5 ? uOk : uInk);
        vec3 streamCol = risky > 0.5 ? uAlert : laneCol;
        vColor = mix(color, streamCol, uGateMix);
        // back-hemisphere fade only applies while in globe form
        vFade = mix(smoothstep(-0.55, 0.35, gp.z), 1.0, uGateMix);

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

  /* ── request arcs: destinations → Seoul (observatory snapshot, real coords) ── */
  const snap = observatory.load();
  const target = latLonToV3(snap.target.lat, snap.target.lon, 1).normalize();
  const arcSources = snap.countries.filter((c) => c.w >= 0.5).slice(0, 12);
  const ARC_SEG = 30;
  const arcGroup = new THREE.Group();
  globe.add(arcGroup);
  const arcHeads: { line: THREE.Line; head: THREE.Sprite; phase: number }[] = [];
  const headTex = makeDotTexture();
  for (let a = 0; a < arcSources.length; a++) {
    const from = latLonToV3(arcSources[a].lat, arcSources[a].lon, 1).normalize();
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= ARC_SEG; i++) {
      const t = i / ARC_SEG;
      const v = from.clone().lerp(target, t).normalize(); // chord-lerp ≈ great circle for display
      v.multiplyScalar(1 + Math.sin(Math.PI * t) * 0.2);
      pts.push(v);
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(
      g,
      new THREE.LineBasicMaterial({ color: SIG, transparent: true, opacity: 0.3, depthWrite: false })
    );
    const head = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: headTex, color: SIG, transparent: true, depthWrite: false })
    );
    head.scale.setScalar(0.05);
    arcGroup.add(line, head);
    arcHeads.push({ line, head, phase: a / arcSources.length });
  }

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

  /* ── gate rings (act 4, world space — not rotating with globe) ── */
  const gateGroup = new THREE.Group();
  scene.add(gateGroup);
  [0.9, 0.15, -0.7].forEach((z, i) => {
    const geo = new THREE.RingGeometry(0.86, i === 0 ? 0.9 : 0.875, 72);
    const mat = new THREE.MeshBasicMaterial({
      color: i === 0 ? SIG : 0x8a93a6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.position.z = z;
    gateGroup.add(ring);
  });

  /* ── journey path (act 5, world space right side) ── */
  const pathPts = [
    new THREE.Vector3(-0.9, -0.75, 0.4),
    new THREE.Vector3(-0.2, -0.3, 0.15),
    new THREE.Vector3(0.55, -0.5, -0.1),
    new THREE.Vector3(1.2, 0.0, -0.35),
    new THREE.Vector3(2.0, 0.45, -0.6),
  ];
  const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPts);
  const pathLine = new THREE.Line(
    pathGeo,
    new THREE.LineDashedMaterial({ color: SIG, transparent: true, opacity: 0, dashSize: 0.05, gapSize: 0.09, depthWrite: false })
  );
  pathLine.computeLineDistances();
  const pathGroup = new THREE.Group();
  pathGroup.position.x = 0.55;
  pathGroup.add(pathLine);
  const markers: THREE.Sprite[] = pathPts.map((p) => {
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: 0x5c6575, transparent: true, depthWrite: false }));
    m.position.copy(p);
    m.scale.setScalar(0.09);
    pathGroup.add(m);
    return m;
  });
  scene.add(pathGroup);

  /* ── dawn glow (act 6) ── */
  const dawn = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, color: SIG, transparent: true, opacity: 0, depthWrite: false }));
  dawn.scale.setScalar(5.5);
  dawn.position.set(0, -1.6, -1.5);
  scene.add(dawn);

  /* ── frame loop ── */
  let actF = 0;
  let mouseX = 0;
  let mouseY = 0;
  let rot = 0;
  let raf = 0;
  let last = performance.now();
  let running = true;

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

  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  addEventListener('resize', resize);
  resize();

  function frame(now: number) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;

    const ai = Math.min(CAM.length - 2, Math.floor(actF));
    const at = smooth(0, 1, actF - ai);
    const gx = lerp(CAM[ai].x, CAM[ai + 1].x, at);
    const gy = lerp(CAM[ai].y, CAM[ai + 1].y, at);
    const gs = lerp(CAM[ai].s, CAM[ai + 1].s, at);

    const wHero = tri(0, 0.8, actF);
    const wAir = tri(2, 0.75, actF);
    const wGate = smooth(2.45, 2.95, actF) * (1 - smooth(3.55, 4.05, actF));
    const wPath = smooth(3.6, 4.15, actF) * (1 - smooth(4.6, 5.0, actF));
    const wEnd = smooth(4.55, 5.0, actF);

    rot += dt * (0.1 + wHero * 0.05);
    const spin = rot + mouseX * 0.18 + actF * 0.35;
    const tilt = -0.42 + mouseY * 0.1;

    globe.position.set(gx, gy, 0);
    globe.scale.setScalar(gs);
    gateGroup.position.set(gx * 0.7, gy, 0);
    gateGroup.scale.setScalar(gs);

    const globeAlpha = Math.max(0.05, 1 - wGate - wPath * 0.85);
    dotMat.uniforms.uTime.value = t;
    dotMat.uniforms.uSpin.value = spin;
    dotMat.uniforms.uTilt.value = tilt;
    dotMat.uniforms.uGateMix.value = wGate;
    dotMat.uniforms.uAlpha.value = Math.max(globeAlpha, wGate);
    atmoMat.uniforms.uAlpha.value = globeAlpha * (1 - wGate);

    // arcs — spin with the shader's rotation so they track the land dots.
    // NOTE: shader applies spin(Y) then tilt(X); Euler 'XYZ' applies X after Y
    // in world terms, matching that composition.
    arcGroup.rotation.set(tilt, spin, 0, 'XYZ');
    const wArc = Math.max(wHero, wEnd * 0.8, wAir * 0.35) * globeAlpha;
    for (const a of arcHeads) {
      const headT = (t * 0.14 + a.phase) % 1;
      (a.line.material as THREE.LineBasicMaterial).opacity = 0.3 * wArc;
      a.line.geometry.setDrawRange(0, Math.max(2, Math.floor(headT * ARC_SEG)));
      const posAttr = a.line.geometry.getAttribute('position');
      const i = Math.floor(headT * ARC_SEG);
      a.head.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      (a.head.material as THREE.SpriteMaterial).opacity = 0.9 * wArc;
    }

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

    // gate rings
    gateGroup.visible = wGate > 0.02;
    gateGroup.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = (i === 0 ? 0.6 : 0.3) * wGate;
    });

    // journey path
    pathGroup.visible = wPath > 0.02;
    (pathLine.material as THREE.LineDashedMaterial).opacity = 0.45 * wPath;
    markers.forEach((m, i) => {
      const on = smooth(3.75 + i * 0.16, 3.95 + i * 0.16, actF);
      (m.material as THREE.SpriteMaterial).opacity = wPath * (0.25 + 0.75 * on);
      (m.material as THREE.SpriteMaterial).color.copy(on > 0.5 ? SIG : new THREE.Color(0x5c6575));
    });

    // dawn
    (dawn.material as THREE.SpriteMaterial).opacity = 0.22 * wEnd;

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
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
