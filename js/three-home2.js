/**
 * THE TABLETOP CLUB — Home 2 Three.js Miniature Turntable & Material Inspector
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('threeHome2Container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.2, 4.5);
  camera.lookAt(0, 0.2, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Group for the miniature centerpiece
  const modelGroup = new THREE.Group();
  scene.add(modelGroup);

  // Materials for Material Inspector
  const materials = {
    resin: new THREE.MeshStandardMaterial({
      color: 0x8a8d94, // Grey Primer
      roughness: 0.85,
      metalness: 0.05,
      flatShading: false
    }),
    zenithal: new THREE.MeshStandardMaterial({
      color: 0x22252a,
      emissive: 0x111215,
      roughness: 0.5,
      metalness: 0.2,
      flatShading: true
    }),
    copperGold: new THREE.MeshPhysicalMaterial({
      color: 0x1a1c22,
      emissive: 0x3d2012,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95
    })
  };

  let activeMaterial = materials.copperGold;

  // Sculpted Pedestal Base
  const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.35, 32);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x15161a,
    roughness: 0.9,
    metalness: 0.1
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = -0.7;
  baseMesh.receiveShadow = true;
  modelGroup.add(baseMesh);

  // Copper Inlaid Ring around Base
  const ringGeo = new THREE.TorusGeometry(1.62, 0.04, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xb86b3e,
    metalness: 0.9,
    roughness: 0.2
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.y = -0.52;
  modelGroup.add(ringMesh);

  // Centerpiece: Complex Tabletop Guardian Sculpt (Composite Geometries)
  const sculptGroup = new THREE.Group();
  modelGroup.add(sculptGroup);

  // Torso / Core Armor
  const torsoGeo = new THREE.DodecahedronGeometry(0.85, 1);
  const torsoMesh = new THREE.Mesh(torsoGeo, activeMaterial);
  torsoMesh.position.y = 0.4;
  torsoMesh.castShadow = true;
  sculptGroup.add(torsoMesh);

  // Floating Runestone Orbs
  const orbCount = 6;
  const orbs = [];
  for (let i = 0; i < orbCount; i++) {
    const angle = (i / orbCount) * Math.PI * 2;
    const orbGeo = new THREE.OctahedronGeometry(0.2, 0);
    const orbMesh = new THREE.Mesh(orbGeo, new THREE.MeshPhysicalMaterial({
      color: 0xd88250,
      emissive: 0xb86b3e,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1
    }));
    orbMesh.position.set(Math.cos(angle) * 1.5, 0.4 + Math.sin(angle * 2) * 0.3, Math.sin(angle) * 1.5);
    sculptGroup.add(orbMesh);
    orbs.push({ mesh: orbMesh, baseAngle: angle });
  }

  // Glowing Runes Wireframe
  const wireGeo = new THREE.WireframeGeometry(torsoGeo);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xd88250,
    transparent: true,
    opacity: 0.65
  });
  const wireLines = new THREE.LineSegments(wireGeo, wireMat);
  wireLines.position.copy(torsoMesh.position);
  sculptGroup.add(wireLines);

  // Ambient Particles
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 8;
    positions[i + 1] = Math.random() * 4 - 1;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xb86b3e,
    size: 0.035,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfff0e5, 1.0);
  scene.add(ambientLight);

  const mainSpot = new THREE.SpotLight(0xffeedd, 3.5);
  mainSpot.position.set(4, 6, 4);
  mainSpot.castShadow = true;
  mainSpot.shadow.bias = -0.0001;
  scene.add(mainSpot);

  const copperRim = new THREE.PointLight(0xb86b3e, 4, 12);
  copperRim.position.set(-3, 2, -2);
  scene.add(copperRim);

  const crimsonBacklight = new THREE.PointLight(0x762f38, 3.5, 10);
  crimsonBacklight.position.set(2, -1, -3);
  scene.add(crimsonBacklight);

  // Material Switcher Event Listeners
  const matButtons = document.querySelectorAll('.mat-switch-btn');
  matButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      matButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const matKey = btn.dataset.material;
      if (materials[matKey]) {
        activeMaterial = materials[matKey];
        torsoMesh.material = activeMaterial;
      }
    });
  });

  // Mouse & Touch Drag Controls
  let isDragging = false;
  let previousMousePos = { x: 0, y: 0 };
  let autoRotate = true;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoRotate = false;
    previousMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    setTimeout(() => { autoRotate = true; }, 3000);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePos.x;
    modelGroup.rotation.y += deltaX * 0.008;
    previousMousePos = { x: e.clientX, y: e.clientY };
  });

  // Touch
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      autoRotate = false;
      previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
    setTimeout(() => { autoRotate = true; }, 3000);
  });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - previousMousePos.x;
    modelGroup.rotation.y += deltaX * 0.008;
    previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (autoRotate) {
      modelGroup.rotation.y += 0.004;
    }

    // Floating orbs oscillation
    orbs.forEach((item, idx) => {
      const angle = item.baseAngle + time * 0.8;
      item.mesh.position.x = Math.cos(angle) * 1.5;
      item.mesh.position.z = Math.sin(angle) * 1.5;
      item.mesh.position.y = 0.4 + Math.sin(time * 2 + idx) * 0.2;
      item.mesh.rotation.y += 0.03;
      item.mesh.rotation.x += 0.02;
    });

    // Particle subtle drift
    particles.rotation.y = time * 0.02;

    renderer.render(scene, camera);
  }

  animate();
});
