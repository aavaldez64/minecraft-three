import { usePlane } from "@react-three/cannon";
import { Textures } from "../assets/textures";
import { useMCStore } from "../stores/mc-store";
import type { ThreeEvent } from "@react-three/fiber";
import type { MeshRefType } from "../interfaces";

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const addBlock = useMCStore((state) => state.addBlock);

  Textures.ground.repeat.set(100, 100);

  const handleClickGround = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const [x, y, z] = Object.values(event.point).map((n) => Math.ceil(n));
    // console.log({ x, y, z });
    addBlock(x, y, z);
  };

  return (
    <mesh onClick={handleClickGround} ref={ref as MeshRefType}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={Textures.ground} />
    </mesh>
  );
}
