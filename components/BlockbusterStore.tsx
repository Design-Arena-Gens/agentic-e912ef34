'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Box } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function VideoCase({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  return (
    <group position={position}>
      <Box args={[0.15, 0.2, 0.02]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, 0, 0.011]}
        fontSize={0.015}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.13}
      >
        {label}
      </Text>
    </group>
  );
}

function VideoShelf({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const movies = [
    { label: 'TITANIC', color: '#1a5f8f' },
    { label: 'JURASSIC PARK', color: '#d32f2f' },
    { label: 'THE MATRIX', color: '#00ff00' },
    { label: 'STAR WARS', color: '#000000' },
    { label: 'TERMINATOR 2', color: '#424242' },
    { label: 'PULP FICTION', color: '#ffa000' },
    { label: 'FORREST GUMP', color: '#1976d2' },
    { label: 'SHAWSHANK', color: '#5d4037' },
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Shelf structure */}
      <Box args={[2, 0.05, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>
      <Box args={[2, 0.05, 0.4]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>
      <Box args={[2, 0.05, 0.4]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>

      {/* Movies on shelves */}
      {movies.map((movie, i) => (
        <VideoCase
          key={i}
          position={[
            -0.85 + (i % 4) * 0.6,
            0.25 + Math.floor(i / 4) * 0.5,
            0.09,
          ]}
          color={movie.color}
          label={movie.label}
        />
      ))}
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#2c3e50" />
    </mesh>
  );
}

function Walls() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#34495e" side={THREE.DoubleSide} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 2, 5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#34495e" side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 2, 5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#34495e" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function BlockbusterSign() {
  return (
    <group position={[0, 3.5, -4.9]}>
      <Box args={[4, 0.8, 0.2]}>
        <meshStandardMaterial color="#003da5" />
      </Box>
      <Text
        position={[0, 0.2, 0.11]}
        fontSize={0.35}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf"
      >
        BLOCKBUSTER
      </Text>
      <Text
        position={[0, -0.2, 0.11]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        VIDEO
      </Text>
    </group>
  );
}

function CheckoutCounter() {
  return (
    <group position={[0, 0, 3]}>
      {/* Counter top */}
      <Box args={[3, 0.1, 1]} position={[0, 0.95, 0]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>
      {/* Counter base */}
      <Box args={[3, 0.9, 1]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      {/* Register */}
      <Box args={[0.4, 0.15, 0.3]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
    </group>
  );
}

function StoreScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={60} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1, 0]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" />
      <pointLight position={[-5, 2, -3]} intensity={0.3} />
      <pointLight position={[5, 2, -3]} intensity={0.3} />

      {/* Store elements */}
      <Floor />
      <Walls />
      <BlockbusterSign />
      <CheckoutCounter />

      {/* Video shelves */}
      <VideoShelf position={[-4, 0, -3]} />
      <VideoShelf position={[4, 0, -3]} />
      <VideoShelf position={[-4, 0, 0]} />
      <VideoShelf position={[4, 0, 0]} />

      {/* Side shelves */}
      <VideoShelf position={[-7, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
      <VideoShelf position={[7, 0, 1]} rotation={[0, -Math.PI / 2, 0]} />
    </>
  );
}

export default function BlockbusterStore() {
  return (
    <div className="relative w-full h-screen">
      <Canvas shadows>
        <Suspense fallback={null}>
          <StoreScene />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#ffd700' }}>
          BLOCKBUSTER VIDEO
        </h1>
        <p className="text-sm">Use mouse to explore the store</p>
        <p className="text-xs mt-1">• Left click + drag to rotate</p>
        <p className="text-xs">• Right click + drag to pan</p>
        <p className="text-xs">• Scroll to zoom</p>
      </div>

      <div className="absolute bottom-4 right-4 text-white bg-black/50 p-3 rounded-lg backdrop-blur-sm text-xs">
        <p>Be Kind, Rewind! 📼</p>
      </div>
    </div>
  );
}
