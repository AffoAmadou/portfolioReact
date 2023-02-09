import { useState, useEffect, useRef } from 'react'

import * as THREE from 'three'
import GSAP from 'gsap'

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
    //boolean usestate for change method
   console.log(this.props.number)
    this.enter = false;
    this.material = null;
    this.t = 0;
  }

  change = () => {
    //set enter to the opposite of what it is
    this.enter = !this.enter;
    if(this.enter){
    console.log("im here")
    GSAP.to(this.containerRef.current, {
      scale: 0.5,
      ease: 'expo.inOut',
      duration: 1,
    })
    }else{
      console.log("im here")
      GSAP.to(this.containerRef.current, {
        scale: 1,
        ease: 'expo.inOut',
        duration: 1,
      })
    }
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

    if(this.props.number == 2)
    {
      console.log("hey")
     this.change()
    }


    const addObjects = () => {
      this.geometry = new THREE.PlaneGeometry(1900, 1900, 350, 350);

      this.material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color:{value: this.props.number}
          // oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
        },
        side: THREE.DoubleSide,
        fragmentShader: fragment,
        vertexShader: vertex,
        // wireframe: true,
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.rotation.x = Math.PI / 2;
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
      <div className='header'>
        <div className='header__container' id='header__container' ref={this.containerRef}>
          <div className='header__content'>
            <h1>BAGOT</h1>
            <button onClick={() => this.change()} > Click et scroll aprés</button>
            
          </div>
         
        </div>
      </div>
    );
  }
}

export default App;


