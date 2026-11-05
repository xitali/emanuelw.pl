"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ExtrudeGeometry, Group, MeshBasicMaterial, Shape } from "three";
import { createScreenTexture, createPhoneTexture, createModuleTexture } from "./ScreenTexture";
import type { SceneState } from "./layers";
import { deliveryPose } from "./delivery-pose";

function frame(width: number,height: number,radius: number,depth: number) {
  const x=-width/2,y=-height/2,w=width,h=height,r=radius,s=new Shape();
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
  return new ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.012,bevelThickness:.012,curveSegments:12});
}
/** A complete browser stays visible through every stage; no fragmented placeholder tiles. */
export default function FragmentScreen({ state, reduced }: { state: SceneState; reduced: boolean }) {
  const browser=useRef<Group>(null), phone=useRef<Group>(null), modules=useRef<Group>(null);
  const design=useRef<MeshBasicMaterial>(null), ready=useRef<MeshBasicMaterial>(null);
  const assets=useMemo(()=>({plan:createScreenTexture("plan"),design:createScreenTexture("design"),ready:createScreenTexture("ready"),phone:createPhoneTexture(),contact:createModuleTexture("Kontakt", "Formularz i wiadomości"), management:createModuleTexture("Twoje treści", "Wygodna edycja oferty")}),[]);
  const frames=useMemo(()=>({browser:frame(5.58,3.76,.12,.1),phone:frame(1.12,2.23,.13,.11)}),[]);
  useEffect(()=>()=>{Object.values(assets).forEach(t=>t.dispose());Object.values(frames).forEach(g=>g.dispose());},[assets,frames]);
  useFrame(()=>{
    const pose=deliveryPose(reduced?1:state.progress);
    if(browser.current){browser.current.position.set(-pose.phone*.33,pose.spread*.07,0);browser.current.rotation.set(pose.spread*.025,pose.spread*-.035,0);}
    if(design.current)design.current.opacity=pose.reveal;
    if(ready.current)ready.current.opacity=Math.max(0,Math.min(1,(state.progress-.56)/.16));
    if(modules.current){modules.current.visible=pose.spread>.02;modules.current.position.z=.24+pose.spread*.12;modules.current.scale.setScalar(.94+pose.spread*.06);}
    if(phone.current){phone.current.visible=pose.phone>.001;phone.current.position.set(2.18+(1-pose.phone)*.26,-.64,.56);phone.current.scale.setScalar(Math.max(.001,pose.phone));phone.current.rotation.y=-.08;}
  });
  return <group>
    <group ref={browser}>
      <mesh geometry={frames.browser} position={[0,0,-.1]}><meshPhysicalMaterial color="#617e8e" metalness={.8} roughness={.28} clearcoat={.7}/></mesh>
      <mesh position={[0,0,.016]}><planeGeometry args={[5.46,3.64]}/><meshBasicMaterial map={assets.plan} transparent alphaTest={.01}/></mesh>
      <mesh position={[0,0,.022]}><planeGeometry args={[5.46,3.64]}/><meshBasicMaterial ref={design} map={assets.design} transparent opacity={0} depthWrite={false}/></mesh>
      <mesh position={[0,0,.028]}><planeGeometry args={[5.46,3.64]}/><meshBasicMaterial ref={ready} map={assets.ready} transparent opacity={0} depthWrite={false}/></mesh>
      <group ref={modules} visible={false}>
        <mesh position={[-1.65,-1.56,0]}><planeGeometry args={[2.15,.71]}/><meshBasicMaterial map={assets.contact} transparent alphaTest={.01}/></mesh>
        <mesh position={[1.55,1.56,.025]}><planeGeometry args={[2.15,.71]}/><meshBasicMaterial map={assets.management} transparent alphaTest={.01}/></mesh>
      </group>
    </group>
    <group ref={phone} visible={false}>
      <mesh geometry={frames.phone} position={[0,0,-.08]}><meshPhysicalMaterial color="#839eac" metalness={.85} roughness={.23} clearcoat={.8}/></mesh>
      <mesh position={[0,0,.045]}><planeGeometry args={[1.03,2.06]}/><meshBasicMaterial map={assets.phone} transparent alphaTest={.01}/></mesh>
    </group>
  </group>;
}
