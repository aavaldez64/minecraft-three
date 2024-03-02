import { nanoid } from "nanoid";
import { create } from "zustand";
import type { BlocksStore, MCTextures } from "../interfaces";
import { INITIAL_TEXTURES_HUD, MC_BLOCKS } from "../constants";

interface MCState {
  texture: MCTextures;
  texturesHUD: MCTextures[];
  blocks: BlocksStore[];
  addBlock: (x: number, y: number, z: number) => void;
  removeBlock: (id: string) => void;
  setTexture: (texture: MCTextures) => void;
  saveWorld: () => void;
  loadWorld: () => void;
  resetWorld: () => void;
}
function loadSavedWorld() {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem("mc-world");
    if (data) {
      const savedWorld = JSON.parse(data);
      const isValidWorld = savedWorld.blocks.every(
        (block: BlocksStore) =>
          Array.isArray(block.position) &&
          block.position.length === 3 &&
          MC_BLOCKS.includes(block.texture)
      );
      if (isValidWorld) return savedWorld.blocks;
    }
  }
  return [];
}
export const useMCStore = create<MCState>()((set, get) => ({
  texture: "dirt",
  texturesHUD: INITIAL_TEXTURES_HUD,
  blocks: [],
  addBlock: (x, y, z) => {
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id: nanoid(),
          texture: state.texture,
          position: [x, y, z],
        },
      ],
    }));
  },
  removeBlock: (id) => {
    set((state) => ({
      blocks: state.blocks.filter((cube) => cube.id !== id),
    }));
  },
  setTexture: (texture) => {
    set(() => ({ texture }));
  },
  saveWorld: () => {
    if (typeof window !== "undefined") {
      const data = JSON.stringify({ blocks: get().blocks });
      window.localStorage.setItem("mc-world", data);
    }
  },
  resetWorld: () => {
    set(() => ({ blocks: [] }));
  },
  loadWorld: () => {
    const blocks = loadSavedWorld();
    set(() => ({ blocks }));
  },
}));
