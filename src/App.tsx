import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import {
  Blocks,
  FirstPersonView,
  Ground,
  MCButtons,
  Player,
  TextureSelector,
} from "./components";
import { useEffect } from "react";
import { useMCStore } from "./stores/mc-store";

function App() {
  const loadWorld = useMCStore((state) => state.loadWorld);
  useEffect(() => {
    loadWorld();
  }, []);
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.8} />
        <FirstPersonView />
        <Physics>
          <Blocks />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <div className="pointer">+</div>
      <TextureSelector />
      <MCButtons />
    </>
  );
}

export default App;
