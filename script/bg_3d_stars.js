
// --- [CONFIGURATION: 설정] ---
const GALAXY_CONFIG = {
    starCount: 1500,       // 별 개수 줄임 (3000 -> 1500)
    starSize: 1.0,         // 크기 약간 조정
    galaxyRadius: 120,     // 반경 넓힘 (퍼지게)
    galaxyThickness: 30,   // 두께 증가 (입체감)
    colorInside: 0xffffff, // 중심부: 완전한 흰색
    colorOutside: 0xcccccc,// 외곽: 부드러운 회색/흰색
    rotationSpeed: 0.0003, // 회전 속도 (아주 천천히)
    mouseSensitivity: 0.0001
};

// --- [HELPER: 부드러운 원형 텍스처 (Soft White Glow)] ---
function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    // Pure White Glow
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// --- [SETUP] ---
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-js-background');
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050a14, 0.0015); // 안개 밀도 감소

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 30, 100); // 카메라 위치 조정
    camera.lookAt(0, 0, 0);

    // --- [STAR GENERATION: UNIFORM DISC] ---
    // 나선형이 아닌, 고르게 퍼진 원형 분포
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(GALAXY_CONFIG.starCount * 3);
    const colors = new Float32Array(GALAXY_CONFIG.starCount * 3);

    const colorInside = new THREE.Color(GALAXY_CONFIG.colorInside);
    const colorOutside = new THREE.Color(GALAXY_CONFIG.colorOutside);

    for (let i = 0; i < GALAXY_CONFIG.starCount; i++) {
        const i3 = i * 3;

        // SPHERICAL DISTRIBUTION (Volumetric)
        // Stars populate a 3D sphere so they appear everywhere, not just at the bottom

        const r = GALAXY_CONFIG.galaxyRadius * Math.cbrt(Math.random()); // Cube root for uniform density
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        // Color Mixing
        // Center vs Edge distance based on radius
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, r / GALAXY_CONFIG.galaxyRadius);

        const brightness = 0.8 + Math.random() * 0.2;

        colors[i3] = mixedColor.r * brightness;
        colors[i3 + 1] = mixedColor.g * brightness;
        colors[i3 + 2] = mixedColor.b * brightness;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const circleTexture = createCircleTexture();
    const material = new THREE.PointsMaterial({
        size: GALAXY_CONFIG.starSize,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
        opacity: 0.8, // 전체적으로 은은하게
        map: circleTexture,
        alphaTest: 0.001
    });

    const galaxy = new THREE.Points(geometry, material);
    scene.add(galaxy);

    // --- [ANIMATION: AUTOMATIC ONLY] ---
    // User requested NO mouse interaction, just slow circular rotation.

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        // Continuous slow rotation around Y axis
        // We accumulate rotation based on delta for smooth speed control
        // or just use elapsedTime * speed.

        const delta = clock.getDelta(); // Use delta for consistent speed
        galaxy.rotation.y += GALAXY_CONFIG.rotationSpeed * 0.5; // Fixed speed increment

        // Optional: Very subtle oscillation on other axes to make it feel 3D but not controlled by mouse
        // galaxy.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05; 

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
});
