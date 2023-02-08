import * as THREE from 'three';

export default class Sketch {
        constructor(options) {

            console.log(options)
            this.time = 0;
            this.container = options.dom;
            this.scene = new THREE.Scene();
    
            this.width = this.container.offsetWidth;
            this.height = this.container.offsetHeight;
    
            this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 100, 2000);
            this.camera.position.z = 600;
    
            this.camera.fov = 2 * Math.atan((this.height / 2) / 600) * (180 / Math.PI);
    
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
    
            this.container.appendChild(this.renderer.domElement);
            this.currentScroll = 0;
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
    
            this.addObjects()
    
          
            this.resize()
            this.setupResize();
            this.render();


    
    
        }
    
    
        setupResize() {
            window.addEventListener('resize', this.resize.bind(this));
        }
    
        resize() {
            this.width = this.container.offsetWidth;
            this.height = this.container.offsetHeight;
            this.renderer.setSize(this.width, this.height);
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
        }
    
      
    
  
    
        addObjects() {
            this.geometry = new THREE.PlaneGeometry(400, 400, 10, 10);
            this.material = new THREE.MeshNormalMaterial();
    
            this.material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
                    hover: { value: new THREE.Vector2(0.51, 0.5) },
    
                },
                side: THREE.DoubleSide,
                fragmentShader: fragment,
                vertexShader: vertex,
                // wireframe: true
            })
    
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.mesh);
        }
    
        render() {
            this.time += 0.05;

            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(this.render.bind(this));
        }
    }
    
  