import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import { Images } from "./mc-images";

const groundTexture = new TextureLoader().load(Images.grass);
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
groundTexture.magFilter = NearestFilter;

// Blocks
const grassTexture = new TextureLoader().load(Images.grass);
const dirtTexture = new TextureLoader().load(Images.dirt);
const logTexture = new TextureLoader().load(Images.log);
const glassTexture = new TextureLoader().load(Images.glass);
const woodTexture = new TextureLoader().load(Images.wood);

grassTexture.magFilter = NearestFilter;
dirtTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

export class Textures {
  static ground = groundTexture;
  static grass = grassTexture;
  static dirt = dirtTexture;
  static log = logTexture;
  static glass = glassTexture;
  static wood = woodTexture;
}
