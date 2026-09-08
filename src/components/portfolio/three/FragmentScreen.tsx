"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, ExtrudeGeometry, Group, Shape, Mesh } from "three";
import { createScreenTexture } from "./ScreenTexture";
import type { SceneState } from "./layers";

// Every face samples its own part of one screen, so the mosaic reassembles exactly.
function createFragments() {
  const width = 4.5, height = 2.85, columns = 4, rows = 3;
  return Array.from({ length: columns * rows * 2 }, (_, index) => {
    const cell = Math.floor(index / 2), col = cell % columns, row = Math.floor(cell / columns);
    const left = col * width / columns - width / 2, bottom = row * height / rows - height / 2;
    const a = [left, bottom], b = [left + width / columns, bottom];
    const c = [left + width / columns, bottom + height / rows], d = [left, bottom + height / rows];
    const points = index % 2 ? [a, c, d] : [a, b, c];
    const x = points.reduce((sum, p) => sum + p[0], 0) / 3;
    const y = points.reduce((sum, p) => sum + p[1], 0) / 3;
    const shape = new Shape();
    points.forEach((p, i) => { const px = (p[0] - x) * 0.965, py = (p[1] - y) * 0.965; if (i) shape.lineTo(px, py); else shape.moveTo(px, py); });
    shape.closePath();
    const body = new ExtrudeGeometry(shape, { depth: 0.055, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.012, bevelThickness: 0.012 });
    const face = new BufferGeometry();
    face.setAttribute("position", new Float32BufferAttribute(points.flatMap(p => [(p[0] - x) * 0.965, (p[1] - y) * 0.965, 0.069]), 3));
    face.setAttribute("uv", new Float32BufferAttribute(points.flatMap(p => [p[0] / width + 0.5, p[1] / height + 0.5]), 2));
    face.computeVertexNormals();
    return { x, y, body, face };
  });
}

export default function FragmentScreen({ state, reduced }: { state: SceneState; reduced: boolean }) {
  const groups = useRef<(Group | null)[]>([]);
  const intact = useRef<Mesh>(null);
  const fragments = useMemo(() => createFragments(), []);
  const texture = useMemo(() => createScreenTexture(), []);
  useEffect(() => () => { fragments.forEach(({ body, face }) => { body.dispose(); face.dispose(); }); texture.dispose(); }, [fragments, texture]);
  useFrame(() => {
    const separated = !reduced && state.explosion > 0.002;
    if (intact.current) intact.current.visible = !separated;
    fragments.forEach(({ x, y }, index) => {
      const group = groups.current[index];
      if (!group) return;
      group.visible = separated;
      const spread = reduced ? 0 : state.explosion;
      const wave = Math.sin(x * 1.2 + state.turn * 1.5);
      group.position.set(x * (1 + spread * 0.55), y * (1 + spread * 0.38) + wave * spread * 0.42, wave * spread * 0.85);
      group.rotation.set(spread * (y * 0.28 + wave * 0.35), spread * (x * 0.48 + Math.sin(state.turn * 2 + index * 0.35) * 0.4), spread * Math.sin(index * 2.4) * 0.12);
    });
  });
  return <group><mesh ref={intact} position={[0, 0, 0.069]}><planeGeometry args={[4.5, 2.85]} /><meshBasicMaterial map={texture} /></mesh>{fragments.map(({ x, y, body, face }, index) => <group key={index} ref={group => { groups.current[index] = group; }} position={[x, y, 0]}>
    <mesh geometry={body}><meshPhysicalMaterial color="#54798b" metalness={0.92} roughness={0.19} clearcoat={1} iridescence={0.65} iridescenceIOR={1.35} /></mesh>
    <mesh geometry={face}><meshBasicMaterial map={texture} /></mesh>
  </group>)}</group>;
}
