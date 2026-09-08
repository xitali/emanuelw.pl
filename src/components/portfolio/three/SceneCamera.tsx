"use client";
import { useFrame } from "@react-three/fiber";
import type { SceneState } from "./layers";

export function SceneCamera({ state, compact }: { state: SceneState; compact: boolean }) {
  useFrame(({ camera, size }) => {
    const distance = (compact ? 9 : 10.1) - state.zoom * 0.6;
    const widthFit = (4.9 + state.explosion * 2.8) / (2 * Math.tan(Math.PI / 10) * (size.width / size.height));
    const heightFit = (3.6 + state.explosion * 1.5) / (2 * Math.tan(Math.PI / 10));
    camera.position.set(0, 0, Math.max(distance, widthFit, heightFit) + state.retreat * 6);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function SceneLighting() {
  return <>
    <ambientLight intensity={1.3} />
    <directionalLight position={[2, 5, 7]} intensity={4} color="#edf6ff" />
    <directionalLight position={[-4, 1, 2]} intensity={2.5} color="#8fbfdf" />
    <directionalLight position={[3, -5, -1]} intensity={3} color="#b3c4d0" />
  </>;
}
