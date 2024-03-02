import type {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

export type MCTextures = "dirt" | "grass" | "log" | "glass" | "wood";

export interface BlocksStore {
  id: string;
  position: [number, number, number];
  texture: MCTextures;
}

export type MeshRefType = React.Ref<
  Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >
>;
