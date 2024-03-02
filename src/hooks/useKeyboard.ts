import { useEffect, useState } from "react";
import { ACTIONS_KEYBOARD_MAP, DIGIT_KEYS } from "../constants";

interface Props {
  digitFunction?: (digit: string) => void;
}
export const useKeyboard = ({ digitFunction = () => {} }: Props = {}) => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { code } = event;
      if (DIGIT_KEYS.includes(code)) {
        digitFunction(code);
        return;
      }
      const action =
        ACTIONS_KEYBOARD_MAP[code as keyof typeof ACTIONS_KEYBOARD_MAP];

      if (action) {
        // if (actions[action]) return

        setActions((prevActions) => ({
          ...prevActions,
          [action]: true,
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event;
      const action =
        ACTIONS_KEYBOARD_MAP[code as keyof typeof ACTIONS_KEYBOARD_MAP];

      if (action) {
        // if (!actions[action]) return

        setActions((prevActions) => ({
          ...prevActions,
          [action]: false,
        }));
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return actions;
};
