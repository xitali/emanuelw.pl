"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Group } from "three";
import FragmentScreen from "./FragmentScreen";
import { type SceneState } from "./layers";
import { SceneCamera, SceneLighting } from "./SceneCamera";
import StaticProduct from "./StaticProduct";

function Product({ state, compact, reduced }: { state: SceneState; compact: boolean; reduced: boolean }) {
  const root = useRef<Group>(null);
  const invalidate = useThree(s => s.invalidate);
  useEffect(() => state.connect(invalidate), [state, invalidate]);
  useFrame(({ clock }) => {
    if (!root.current) return;
    const float = reduced || compact ? 0 : Math.sin(clock.elapsedTime * 0.65) * 0.045;
    root.current.rotation.set(-0.16 + state.explosion * 0.06, (-0.42 + state.turn * 0.23) * (1 - state.explosion * 0.7), (-0.075 + state.turn * 0.035) * (1 - state.explosion));
    root.current.position.y = float;
  });
  return <>
    <SceneCamera state={state} compact={compact} />
    <SceneLighting />
    <group ref={root}><FragmentScreen state={state} reduced={reduced} /></group>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function ContextLifecycle({ onLost }: { onLost: () => void }) {
  const gl = useThree(s => s.gl);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onLost(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onLost]);
  return null;
}

export default function ExplodedScene({ state, active, compact, reduced }: { state: SceneState; active: boolean; compact: boolean; reduced: boolean }) {
  const [lost, setLost] = useState(false);
  const onLost = useCallback(() => setLost(true), []);
  if (lost) return <StaticProduct />;
  return <SceneBoundary fallback={<StaticProduct />}>
    <Canvas camera={{ position: [0, 0, 11], fov: 36 }} dpr={compact ? 1 : [1, 1.5]} frameloop={!active ? "never" : compact || reduced ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} fallback={<StaticProduct />}>
      <Product state={state} compact={compact} reduced={reduced} />
      <ContextLifecycle onLost={onLost} />
    </Canvas>
  </SceneBoundary>;
}
