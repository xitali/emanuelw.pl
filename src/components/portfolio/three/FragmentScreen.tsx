"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, ExtrudeGeometry, Group, Shape, Mesh, MeshBasicMaterial, MeshPhysicalMaterial } from "three";
import { createScreenTexture, createPhoneTexture } from "./ScreenTexture";
import type { SceneState } from "./layers";
import { deliveryPose } from "./delivery-pose";

function createPanels() {
  const width = 4.5, height = 2.85, columns = 3, rows = 2;
  return Array.from({ length: columns * rows }, (_, index) => {
    const col = index % columns, row = Math.floor(index / columns);
    const left = col * width / columns - width / 2, bottom = row * height / rows - height / 2;
    const points = [[left, bottom], [left + width / columns, bottom], [left + width / columns, bottom + height / rows], [left, bottom + height / rows]];
    const x = left + width / columns / 2, y = bottom + height / rows / 2;
    const shape = new Shape();
    points.forEach((p, i) => { const px = (p[0] - x) * 0.986, py = (p[1] - y) * 0.986; if (i) shape.lineTo(px, py); else shape.moveTo(px, py); });
    shape.closePath();
    const body = new ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.009, bevelThickness: 0.009 });
    const face = new BufferGeometry();
    const vertices = [points[0], points[1], points[2], points[0], points[2], points[3]];
    face.setAttribute("position", new Float32BufferAttribute(vertices.flatMap(p => [(p[0] - x) * 0.986, (p[1] - y) * 0.986, 0.075]), 3));
    face.setAttribute("uv", new Float32BufferAttribute(vertices.flatMap(p => [p[0] / width + 0.5, p[1] / height + 0.5]), 2));
    face.computeVertexNormals();
    return { x, y, body, face };
  });
}

export default function FragmentScreen({ state, reduced }: { state: SceneState; reduced: boolean }) {
  const groups = useRef<(Group | null)[]>([]);
  const faces = useRef<(MeshBasicMaterial | null)[]>([]);
  const phone = useRef<Group>(null);
  const goal = useRef<Group>(null);
  const bodies = useRef<(MeshPhysicalMaterial | null)[]>([]);
  const seams = useRef<Mesh>(null);
  const panels = useMemo(() => createPanels(), []);
  const connections = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute([-1.5,.7,0,0,.7,0, 0,.7,0,1.5,.7,0, -1.5,.7,0,-1.5,-.7,0, 0,.7,0,0,-.7,0, 1.5,.7,0,1.5,-.7,0],3));
    return geometry;
  }, []);
  const texture = useMemo(() => createScreenTexture(), []);
  const phoneTexture = useMemo(() => createPhoneTexture(), []);
  useEffect(() => () => { panels.forEach(({ body, face }) => { body.dispose(); face.dispose(); }); texture.dispose(); phoneTexture.dispose(); connections.dispose(); }, [panels, texture, phoneTexture, connections]);
  useFrame(() => {
    const { spread, reveal, phone: phoneProgress } = deliveryPose(reduced ? 1 : state.progress);
    panels.forEach(({ x, y }, index) => {
      const group = groups.current[index];
      if (!group) return;
      const side = x / 1.5;
      group.position.set(x * (1 + spread * 0.24) - phoneProgress * 0.28, y * (1 + spread * 0.32), spread * (index % 3 === 1 ? 0.55 : -0.18));
      group.rotation.set(-spread * y * 0.1, spread * side * 0.12, 0);
      if (bodies.current[index]) bodies.current[index]!.opacity = reveal;
      const material = faces.current[index];
      if (material) material.opacity = reveal;
    });
    if (goal.current) { goal.current.visible = reveal < 1; goal.current.scale.setScalar(1 - reveal * 0.12); }
    if (seams.current) seams.current.visible = spread > 0.02;
    if (phone.current) {
      phone.current.visible = phoneProgress > 0;
      phone.current.scale.setScalar(Math.max(0.001, phoneProgress));
      phone.current.position.set(1.9 + (1 - phoneProgress) * 0.3, -0.58, 0.5);
      phone.current.rotation.y = -0.13;
    }
  });
  return <group>
    <group ref={goal}>
      <lineSegments geometry={connections}><lineBasicMaterial color="#acd1e8" transparent opacity={0.6} /></lineSegments>
      {panels.map(({x,y},i) => <group key={i} position={[x,y,0.01]}>
        <mesh><planeGeometry args={[1.15,.8]} /><meshBasicMaterial color="#14222c" /></mesh>
        <mesh><planeGeometry args={[1.15,.8]} /><meshBasicMaterial color="#acd1e8" wireframe transparent opacity={0.45} /></mesh>
        <mesh position={[-.4,.2,.03]}><circleGeometry args={[.035,12]} /><meshBasicMaterial color="#acd1e8" /></mesh>
      </group>)}
    </group>
    <mesh ref={seams} position={[0, 0, -0.35]}><planeGeometry args={[5, 3.45, 3, 2]} /><meshBasicMaterial color="#acd1e8" wireframe transparent opacity={0.14} /></mesh>
    {panels.map(({ x, y, body, face }, index) => <group key={index} ref={group => { groups.current[index] = group; }} position={[x, y, 0]}>
      <mesh geometry={body}><meshPhysicalMaterial ref={material => { bodies.current[index] = material; }} transparent color="#3d5b6c" metalness={0.8} roughness={0.22} clearcoat={1} iridescence={0.22} /></mesh>
      <mesh geometry={face}><meshBasicMaterial ref={material => { faces.current[index] = material; }} map={texture} transparent /></mesh>
    </group>)}
    <group ref={phone} visible={false}>
      <mesh><boxGeometry args={[0.91, 1.83, 0.12]} /><meshPhysicalMaterial color="#9bbdce" metalness={0.9} roughness={0.2} /></mesh>
      <mesh position={[0, 0, 0.065]}><planeGeometry args={[0.83, 1.73]} /><meshBasicMaterial map={phoneTexture} /></mesh>
    </group>
  </group>;
}
