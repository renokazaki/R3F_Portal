import {
  Sparkles,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
  shaderMaterial,
  Clone,
} from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

// シェーダーマテリアルの作成
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

export default function Experience() {
  const { nodes } = useGLTF("/portal.glb");
  const bakedTexture = useTexture("/baked.jpg");
  bakedTexture.flipY = false;

  //シェーダーでポータルの渦生成
  const PortalMaterial = shaderMaterial(
    {
      uTime: 0,
      uColorStart: new THREE.Color("#A5A0CF"),
      uColorEnd: new THREE.Color("#5F4894"),
    },
    portalVertexShader,
    portalFragmentShader
  );
  //jsxで使用するため
  extend({ PortalMaterial });

  //渦のアニメーション
  const portalMaterial = useRef();
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta * 4;
  });

  const rock = useGLTF("/rock.glb");
  const mashroom = useGLTF("/mashroom.glb");
  const crystals2 = useGLTF("/crystals2.glb");
  return (
    <>
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      {/* 蛍 */}
      <Sparkles
        size={6}
        scale={[6, 5, 6]}
        speed={0.9}
        count={80}
        color={"#5F4894"}
      />

      {/* 背景色 */}
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />

      {/* モデルの中心配置 */}
      <Center>
        {/* 焼き込みテクスチャのメッシュ */}
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        {/* ポールライトA */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        {/* ポールライトB */}
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        {/* ポータルライト */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} side={THREE.DoubleSide} />
        </mesh>
      </Center>
      {/* 岩 */}
      <primitive
        object={rock.scene}
        scale={0.01}
        position={[-3, -1, -1]}
        rotation-y={1.5}
      />
      <Clone
        object={rock.scene}
        scale={0.01}
        position={[3, -1, 0]}
        rotation-y={1.5}
      />
      <Clone
        object={rock.scene}
        scale={0.01}
        scale-x={0.02}
        position={[0, -1, -4]}
        rotation-y={3}
      />
      {/* キノコ */}

      <primitive
        object={mashroom.scene}
        scale={0.07}
        position={[-2.8, -1, 1.8]}
        rotation-y={1.5}
      />
      <Clone
        object={mashroom.scene}
        scale={0.1}
        position={[-2.3, -1, 1.8]}
        rotation-y={1.5}
      />
      <Clone
        object={mashroom.scene}
        scale={0.08}
        position={[-3.3, -1, 1.8]}
        rotation-y={1.5}
      />
      <primitive
        object={crystals2.scene}
        scale={0.5}
        position={[2.5, -1, 1.8]}
      />
      <Clone object={crystals2.scene} scale={0.7} position={[3.5, -1, 1.8]} />
      <Clone object={crystals2.scene} scale={1} position={[2.5, -1, -2]} />
      <Clone object={crystals2.scene} scale={1.3} position={[-2.5, -1, -2.7]} />
    </>
  );
}
