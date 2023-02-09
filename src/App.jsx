import { useState, useEffect, useRef } from 'react'

import * as THREE from 'three'


import reactLogo from './assets/react.svg'
import './App.css'
// import './script/header'

import vertex from './script/vertex.glsl'
import fragment from './script/fragment.glsl'

// import { PrismicRichText, useFirstPrismicDocument, useAllPrismicDocumentsByType } from '@prismicio/react'

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.material = null;
    this.t = 0;
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    const width = this.containerRef.current.offsetWidth;
    const height = this.containerRef.current.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(70, width / height, 100, 2000);
    this.camera.position.z = 600;
    this.camera.fov = 2 * Math.atan((height / 2) / 600) * (180 / Math.PI);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.containerRef.current.appendChild(this.renderer.domElement);

   
    

    const addObjects = () => {
      this.geometry = new THREE.PlaneGeometry(600, 400, 60, 60);

      this.material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          // oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
        },
        side: THREE.DoubleSide,
        fragmentShader: fragment,
        vertexShader: vertex,
        // wireframe: true,
      });

       this.mesh = new THREE.Mesh(this.geometry, this.material);
      //  this.mesh.rotation.x = -Math.PI / 2;
      this.scene.add(this.mesh);

    };

    addObjects();

    const resize = () => {
      const width = this.containerRef.current.offsetWidth;
      const height = this.containerRef.current.offsetHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    };

    resize();

    const setupResize = () => {
      window.addEventListener('resize', resize);
    };
    setupResize();

    const render = () => {
      this.t += 0.05;
      // this.mesh.rotation.y = this.t;
      this.material.uniforms.time.value = this.t;

      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(render);
    };
    render();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resize);
  }

  render() {
    return (
      <div className='header' id='header' ref={this.containerRef}>

      </div>
    );
  }
}

export default App;
