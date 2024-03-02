import { useState } from "react";
import { useBox } from "@react-three/cannon";
import { useMCStore } from "../stores/mc-store";
import { Textures } from "../assets/textures";
import type { MCTextures, MeshRefType } from "../interfaces";
import type { ThreeEvent } from "@react-three/fiber";

interface Props {
  id: string;
  position: [number, number, number];
  texture: MCTextures;
}
export function Block({ id, position, texture }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const addBlock = useMCStore((state) => state.addBlock);
  const removeBlock = useMCStore((state) => state.removeBlock);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const activeTexture = Textures[texture];
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
  };
  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(false);
  };
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    // console.log(event.face);
    if (event.altKey) {
      removeBlock(id);
    } else {
      const newPosition = [...position];
      if (event.face?.c === 1) {
        // Right
        newPosition[0] += 1;
      }
      if (event.face?.c === 5) {
        // Left
        newPosition[0] -= 1;
      }
      if (event.face?.c === 17) {
        // Front
        newPosition[2] += 1;
      }
      if (event.face?.c === 21) {
        // Behind
        newPosition[2] -= 1;
      }
      if (event.face?.c === 9) {
        // Top
        newPosition[1] += 1;
      }
      if (event.face?.c === 13) {
        // Bottom
        newPosition[1] -= 1;
      }

      const [x, y, z] = newPosition;
      if (x === position[0] && y === position[1] && z === position[2]) return;
      addBlock(x, y, z);
    }
  };
  return (
    <mesh
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      ref={ref as MeshRefType}
      onClick={handleClick}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "#ccc" : "#fff"}
        transparent
        map={activeTexture}
        attach="material"
      />
    </mesh>
  );
}
