import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const FallingSquares = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 0);

    // Scene and Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 300; // Set camera back enough to view the scene

    // Create particles
    const particles = 1000;
    const geometry = new THREE.BoxGeometry(4, 4, 0.0001);
    var positions = [];
    //const color = new THREE.Color();
    const sizes = [];

    const color_palette = [
      [208, 222, 226],
      [198, 198, 198],
      [171, 181, 172],
      [181, 169, 157],
      [195, 210, 244],
      [196, 186, 188],
      [255, 228, 163],
      [249, 232, 157],
      [255, 247, 188],
      [252, 236, 153],
      [234, 211, 224],
      [252, 219, 199],
      [116, 129, 155],
      [221, 85, 6],
      [193, 75, 11],
      [14, 150, 209],
      [90, 159, 244],
      [255, 255, 255],
    ];
    var rotations = [];
    for (let i = 0; i < particles; i++) {
      positions.push(2 * (Math.random() * 2 - 1) * 500);
      positions.push((Math.random() * 2 - 1) * 500);
      positions.push(Math.random() * 1000 - 800);

      //color.setHSL(i / particles, 1.0, 0.6);  // Rainbow colors
      //colors.push(color.b, color.g, color.g);

      const scale = Math.random() * 0.5 + 0.5;
      sizes.push(1.0);
      const green = (Math.random() * 0.5 + 0.2) * scale;
      //const color = new THREE.Color((Math.random() * 0.8 + 0.2) * scale, green, (1 - green) * (Math.random()));
      const rgb_color = color_palette[i % color_palette.length];
      const color = new THREE.Color(
        rgb_color[0] / 255,
        rgb_color[1] / 255,
        rgb_color[2] / 255,
      );
      const material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xffffff, // White specular highlights
        shininess: 500, // High shininess for a more reflective surface
        reflectivity: 5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2],
      );
      mesh.rotation.y = Math.random() * 360;
      mesh.scale.setScalar(sizes[i]); // Scale each cube according to size array

      // Add new property
      mesh.rotation_delta = [
        0.12 * (Math.random() - 0.5),
        0.12 * (Math.random() - 0.5),
        0.12 * (Math.random() - 0.5),
      ];
      mesh.y_delta = -1.0 * (Math.random() + 0.5);
      mesh.x_delta = 0.2 * (Math.random() - 0.5);
      scene.add(mesh);
    }

    // const points = new THREE.Points(geometry, material);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0.0, 0.5, 2.0); // Position the light
    // scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);

    directionalLight2.position.set(1, 0.5, 2.0); // Position the light
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);

    directionalLight3.position.set(-1, 0.5, 2.0); // Position the light
    scene.add(directionalLight3);

    // scene.add(points);
    const ambientLight = new THREE.AmbientLight(0x606060); // Soft white light
    scene.add(ambientLight);

    // Animation function
    function animate() {
      requestAnimationFrame(animate);

      // Update each point's position to simulate falling
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          //child.rotation.y += 0.02
          child.rotation.x += child.rotation_delta[0];
          child.rotation.y += child.rotation_delta[1];
          child.rotation.z += child.rotation_delta[2];
          child.position.y += child.y_delta; // Move each cube down
          child.position.x += child.x_delta;

          if (child.position.y < -500) {
            child.position.y = 500; // Reset the cube to the top once it moves out of view
          }
          if (child.position.x < -1000) {
            child.position.x = 1000;
          }
          if (child.position.x > 1000) {
            child.position.x = -1000;
          }
        }
      });
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default FallingSquares;
