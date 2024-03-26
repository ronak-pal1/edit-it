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
  const contentEditRef = useRef();

  // state for showing the close button on hover only
  const [showCloseButton, setShowCloseButton] = useState(false);
  const setElements = useSetRecoilState(elementAtom);

  const test = () => {
    console.log(window.getSelection());
    // console.log(contentEditRef.current.getSelection());
  };

  // close button function
  const closeContentEditArea = () => {
    setElements((prev) => prev.filter((p) => p.id != element.id));
  };

  return (
    <Reorder.Item
      key={element.id}
      value={element}
      dragListener={false}
      dragControls={controls}
    >
      <div
        onMouseOver={() => setShowCloseButton(true)}
        onMouseOut={() => setShowCloseButton(false)}
      >
        <div className="flex items-center my-4">
          {/* drag button */}
          <div>
            <HolderOutlined
              className="mr-4 cursor-pointer text-black"
              onPointerDown={(e) => controls.start(e)}
            />
          </div>

          {/* text input section */}
          <div
            contentEditable
            ref={contentEditRef}
            // onMouseUp={test}
            className="w-full h-fit px-4 py-2  rounded-xl "
          ></div>

          {/* close button */}
          {showCloseButton && (
            <div>
              <CloseCircleOutlined
                className="ml-4 cursor-pointer text-black"
                onClick={closeContentEditArea}
              />
            </div>
          )}
        </div>
        <AddBox id={element.id} />
      </div>
    </Reorder.Item>
  );
};

export default TextContain;
