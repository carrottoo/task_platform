import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';


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
        camera.position.z = 300;  // Set camera back enough to view the scene

        // Create particles
        const particles = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const color = new THREE.Color();

        for (let i = 0; i < particles; i++) {
            positions.push((Math.random() * 2 - 1) * 500);
            positions.push((Math.random() * 2 - 1) * 500);
            positions.push((Math.random() * 2 - 1) * 500);

            color.setHSL(i / particles, 1.0, 0.6);  // Rainbow colors
            colors.push(color.b, color.g, color.g);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Material for the particles
        const material = new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,  // Use vertex colors
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Animation function
        function animate() {
            requestAnimationFrame(animate);

            // Update each point's position to simulate falling
            const positions = points.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 1.5;  // Move each point down

                if (positions[i] < -250) {
                    positions[i] = 250;  // Reset the point to top once it moves out of view
                }
            }
            points.geometry.attributes.position.needsUpdate = true;  // Mark the position attribute to be updated

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }} />;
};

export default FallingSquares;
