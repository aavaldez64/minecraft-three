import { useMCStore } from "../stores/mc-store";

export function MCButtons() {
  const saveWorld = useMCStore((state) => state.saveWorld);
  const resetWorld = useMCStore((state) => state.resetWorld);
  return (
    <div className="mc-buttons">
      <button type="button" onClick={() => saveWorld()}>
        <span>Save World</span>
        <span>Save World</span>
      </button>
      <button type="button" onClick={() => resetWorld()}>
        <span>Reset World</span>
        <span>Reset World</span>
      </button>
    </div>
  );
}
