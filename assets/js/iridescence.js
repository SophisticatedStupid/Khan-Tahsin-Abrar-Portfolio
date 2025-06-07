import * as THREE from 'three';

class Iridescence {
    constructor(container, options = {}) {
        this.options = {
            color: options.color || [0, 1, 1],
            mouseReact: options.mouseReact !== undefined ? options.mouseReact : false,
            amplitude: options.amplitude || 0.1,
            speed: options.speed || 1.0
        };

        this.container = container;
        this.scene = new THREE.Scene();
        
        // Adjust camera FOV for better visibility
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        this.setupMesh();
        this.setupEvents();
        this.animate();
    }

    setupMesh() {
        const geometry = new THREE.PlaneGeometry(5, 3, 128, 64); // Larger plane, more segments
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Vector3(...this.options.color) },
                uAmplitude: { value: this.options.amplitude },
                uMouse: { value: new THREE.Vector2(0, 0) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform float uTime;
                uniform float uAmplitude;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    float elevation = sin(pos.x * 2.0 + uTime) * sin(pos.y * 2.0 + uTime) * uAmplitude * 2.0;
                    elevation += sin(pos.x * 3.0 - uTime * 0.5) * sin(pos.y * 4.0) * uAmplitude;
                    pos.z += elevation;
                    vElevation = elevation;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform vec3 uColor;
                uniform float uTime;

                void main() {
                    float iridescence = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 8.0 + uTime) * 0.5 + 0.5;
                    vec3 color = uColor * (iridescence + 0.5);  // Increased base brightness
                    color += vec3(0.1, 0.1, 0.2) * vElevation; // Add depth-based color variation
                    gl_FragColor = vec4(color, 0.8);  // Increased opacity
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide  // Render both sides
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        this.camera.position.z = 2;
    }

    setupEvents() {
        const onResize = () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', onResize);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = performance.now() * 0.001 * this.options.speed;
        this.mesh.material.uniforms.uTime.value = time;
        
        // Add subtle movement
        this.mesh.rotation.x = Math.sin(time * 0.1) * 0.1 - 0.2; // Tilt slightly upward
        this.mesh.rotation.y = Math.sin(time * 0.05) * 0.1;
        
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

export default Iridescence;
