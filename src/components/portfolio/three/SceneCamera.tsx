"use client";
import { useFrame } from "@react-three/fiber";
import type { SceneState } from "./layers";

export function SceneCamera({ compact }: { state: SceneState; compact: boolean }) {
  useFrame(({ camera, size }) => {
    const distance = compact ? 0.1 : 0;
    const widthFit = 6.4 / (2 * Math.tan(Math.PI / 10) * (size.width / size.height));
    const heightFit = 4.2 / (2 * Math.tan(Math.PI / 10));
    camera.position.set(0, 0, Math.max(widthFit, heightFit) + distance);
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
