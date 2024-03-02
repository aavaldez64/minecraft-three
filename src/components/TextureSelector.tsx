import { useCallback } from "react";
// import { useEffect } from "react";
import { useKeyboard } from "../hooks/useKeyboard.js";
import { useMCStore } from "../stores/mc-store.js";
import { Images } from "../assets/mc-images.js";

export const TextureSelector = () => {
  const texture = useMCStore((state) => state.texture);
  const setTexture = useMCStore((state) => state.setTexture);
  const texturesHUD = useMCStore((state) => state.texturesHUD);

  const handleDigit = useCallback((digit: string) => {
    const numDig = parseInt(digit.replace("Digit", ""));
    const newSelection = texturesHUD[numDig - 1];
    if (newSelection) {
      setTexture(newSelection);
    }
  }, []);
  useKeyboard({
    digitFunction: handleDigit,
  });
  // useEffect(() => {
  //   const handleScroll = (event: WheelEvent) => {
  //     console.log(event);
  //     if (event.wheelDelta > 0) {
  //       console.log("scroll up");
  //     } else {
  //       console.log("scroll down");
  //     }
  //   };
  //   window.addEventListener("wheel", handleScroll);
  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //   };
  // }, []);

  return (
    <div className="texture-selector">
      {Array(9)
        .fill(0)
        .map((_, index) => {
          const block = texturesHUD[index];
          if (block) {
            return (
              <div key={block} className={texture === block ? "selected" : ""}>
                <img src={Images[block]} alt={block} />
              </div>
            );
          } else {
            return <div key={index}></div>;
          }
        })}
    </div>
  );
};
