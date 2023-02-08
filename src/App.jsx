import { useState, useEffect, useRef } from 'react'

import * as THREE from 'three'


import reactLogo from './assets/react.svg'
import './App.css'
// import './script/header'

import vertex from './script/vertex.glsl'
import fragment from './script/fragment.glsl'

// import { PrismicRichText, useFirstPrismicDocument, useAllPrismicDocumentsByType } from '@prismicio/react'

function App() {
  const containerRef = useRef(null);
  let material = null;
  let t = 0;
  useEffect(() => {
    const scene = new THREE.Scene();
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 100, 2000);
    camera.position.z = 600;
    camera.fov = 2 * Math.atan((height / 2) / 600) * (180 / Math.PI);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    containerRef.current.appendChild(renderer.domElement);

    const resize = () => {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      t += 0.005;
      material.uniforms.time.value = t;

      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    };

    const addObjects = () => {
      const geometry = new THREE.PlaneGeometry(400, 400, 20, 50);
      material = new THREE.MeshNormalMaterial();

      material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          // oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
          hover: { value: new THREE.Vector2(0.51, 0.5) },
        },
        side: THREE.DoubleSide,
        fragmentShader: fragment,
        vertexShader: vertex,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      resize();
      render();
    };

    addObjects();

    const setupResize = () => {
      window.addEventListener('resize', resize);
    };
    setupResize();




    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);


  return (
    <div className='header' id='header' ref={containerRef}>

    </div>
  )
}
export default App
// const [pages] = useAllPrismicDocumentsByType('project')
  // useEffect(() => {
  //   console.log(pages)
  // });{/* {pages && pages.map((page) => (
      //   <div key={page.id}>
      //     <h2>{page.data.title}</h2>
      //   </div>
      // ))} */}





