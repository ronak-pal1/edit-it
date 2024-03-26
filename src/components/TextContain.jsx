import { CloseCircleOutlined, HolderOutlined } from "@ant-design/icons";
import { Reorder, useDragControls } from "framer-motion";
import AddBox from "./AddBox";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { elementAtom } from "../store/atoms/elementAtom";

// The text element for the editor
const TextContain = ({ element }) => {
  // for changing the drag controls
  const controls = useDragControls();

  // Reference to the text input area
  const contentEditRef = useRef(null);

  // state for showing the options on hover only
  const [showOptions, setShowOptions] = useState(false);

  const setElements = useSetRecoilState(elementAtom);

  const [canInput, setCanInput] = useState(true);

  // close button function
  const closeContentEditArea = () => {
    setElements((prev) => prev.filter((p) => p.id != element.id));
  };

  const wordLimit = (limit) => {
    const wordCount = contentEditRef.current.innerText.split(" ").length;
    if (wordCount >= limit) {
      setCanInput(false);
    } else {
      if (!canInput) setCanInput(true);
    }
  };

  return (
    <Reorder.Item
      key={element.id}
      value={element}
      dragListener={false}
      dragControls={controls}
    >
      <div
        onClick={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <div className="flex items-center my-4">
          {/* drag button */}
          <div>
            <HolderOutlined
              className="mr-4 cursor-pointer text-black"
              onPointerDown={(e) => controls.start(e)}
              style={{ touchAction: "none" }}
            />
          </div>

          {/* text input section */}
          <div
            contentEditable
            ref={contentEditRef}
            onKeyDown={(e) => {
              if (!canInput) e.preventDefault();

              wordLimit(250);
            }}
            className="w-full h-fit px-4 py-2  rounded-xl "
          ></div>

          {/* close button */}
          {showOptions && (
            <div>
              <CloseCircleOutlined
                className="ml-4 cursor-pointer text-black"
                onClick={closeContentEditArea}
              />
            </div>
          )}
        </div>
        {showOptions && <AddBox id={element.id} />}
      </div>
    </Reorder.Item>
  );
};

export default TextContain;
