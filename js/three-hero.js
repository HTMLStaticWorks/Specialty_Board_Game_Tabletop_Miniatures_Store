/**
 * THE TABLETOP CLUB — Three.js 3D Tabletop Relic (D20 Polyhedral Artifact)
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('threeCanvasContainer');
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
  camera.position.z = 4.2;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Group to hold relic & edges
  const relicGroup = new THREE.Group();
  scene.add(relicGroup);

  // D20 Geometry
  const d20Geo = new THREE.IcosahedronGeometry(1.4, 0);

  // Core Faceted Material (Dark obsidian / burnished copper alloy)
  const d20Mat = new THREE.MeshPhysicalMaterial({
    color: 0x1d1f24,
    emissive: 0x221108,
    metalness: 0.85,
    roughness: 0.28,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
    reflectivity: 0.9,
    flatShading: true
  });

  const d20Mesh = new THREE.Mesh(d20Geo, d20Mat);
  relicGroup.add(d20Mesh);

  // Copper Edge Wireframe Glow
  const edgeGeo = new THREE.EdgesGeometry(d20Geo);
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0xd88250,
    linewidth: 2,
    transparent: true,
    opacity: 0.85
  });
  const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
  relicGroup.add(edgeLines);

  // Floating Ember / Spark Particles
  const particleCount = 70;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 6;
    particlePositions[i + 1] = (Math.random() - 0.5) * 6;
    particlePositions[i + 2] = (Math.random() - 0.5) * 6;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xb86b3e,
    size: 0.04,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
  scene.add(ambientLight);

  const copperPointLight = new THREE.PointLight(0xb86b3e, 3.5, 10);
  copperPointLight.position.set(3, 3, 2);
  scene.add(copperPointLight);

  const crimsonRimLight = new THREE.PointLight(0x762f38, 2.8, 10);
  crimsonRimLight.position.set(-3, -2, -2);
  scene.add(crimsonRimLight);

  // Interaction State
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    }

    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      relicGroup.rotation.y += deltaX * 0.008;
      relicGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      relicGroup.rotation.y += deltaX * 0.008;
      relicGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  // Responsive Resize
  function onResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', onResize);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (!isDragging) {
      relicGroup.rotation.y += 0.005;
      relicGroup.rotation.x += 0.003;
      
      // Gentle floating bob
      relicGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
    }

    // Particle rotation
    particleSystem.rotation.y = elapsedTime * 0.03;
    particleSystem.rotation.x = elapsedTime * 0.015;

    renderer.render(scene, camera);
  }

  animate();
});
