import { useMCStore } from "../stores/mc-store";
import { Block } from "./Block";

export const Blocks = () => {
  const blocks = useMCStore((state) => state.blocks);

  return blocks.map((blockProps) => {
    return (
      <Block
        key={blockProps.id}
        {...blockProps}
        // id={id}
        // position={position}
        // texture={texture}
      />
    );
  });
};
