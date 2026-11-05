"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ExtrudeGeometry, Group, Shape } from "three";
import { createScreenTexture, createPhoneTexture, createTabletTexture } from "./ScreenTexture";
import type { SceneState } from "./layers";
import { smoothRange } from "./delivery-pose";

function frame(width: number,height: number,radius: number,depth: number) {
  const x=-width/2,y=-height/2,w=width,h=height,r=radius,s=new Shape();
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
  return new ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.012,bevelThickness:.012,curveSegments:12});
}
/** One responsive implementation shown on three distinct devices. */
export default function FragmentScreen({ state, reduced }: { state: SceneState; reduced: boolean }) {
  const group=useRef<Group>(null);
  const assets=useMemo(()=>({desktop:createScreenTexture("ready"),tablet:createTabletTexture(),phone:createPhoneTexture()}),[]);
  const devices=useMemo(()=>[
    {id:"desktop" as const,w:4.9,h:3.28,r:.1,x:-.45,y:.28,z:-.16,ry:-.035},
    {id:"tablet" as const,w:1.65,h:2.21,r:.1,x:1.35,y:-.57,z:.35,ry:-.11},
    {id:"phone" as const,w:.91,h:1.83,r:.12,x:2.36,y:-.76,z:.7,ry:-.08},
  ].map(d=>({...d,geometry:frame(d.w,d.h,d.r,.08)})),[]);
  useEffect(()=>()=>{Object.values(assets).forEach(t=>t.dispose());devices.forEach(d=>d.geometry.dispose());},[assets,devices]);
  useFrame(()=>{if(group.current){const reveal=reduced?1:smoothRange(state.progress,.5,.64);group.current.rotation.y=-.035+reveal*.035;group.current.scale.setScalar(.97+reveal*.03);}});
  return <group ref={group}>{devices.map(device=><group key={device.id} position={[device.x,device.y,device.z]} rotation={[0,device.ry,0]}>
    <mesh geometry={device.geometry} position={[0,0,-.08]}><meshPhysicalMaterial color={device.id==="desktop"?"#617e8e":"#8ba6b4"} metalness={.82} roughness={.25} clearcoat={.8}/></mesh>
    <mesh position={[0,0,.015]}><planeGeometry args={[device.w-.09,device.h-.09]}/><meshBasicMaterial map={assets[device.id]} transparent alphaTest={.01}/></mesh>
  </group>)}</group>;
}
