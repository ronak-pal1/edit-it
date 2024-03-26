import { Button } from "antd";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { elementAtom } from "../store/atoms/elementAtom";

const AddBox = ({ id, stylingOptions = true }) => {
  const [isShow, setIsShow] = useState(false);
  const setElements = useSetRecoilState(elementAtom);

  const insert = (prev, block) => {
    const arr = [];

    let isIndexfinded = false;

    for (let i = 0; i < prev.length; i++) {
      arr.push(prev[i]);

      if (prev[i].id === id && !isIndexfinded) {
        arr.push(block);

        isIndexfinded = true;
      }
    }

    return arr;
  };

  const addTextBlock = () => {
    const block = {
      id: v4(),
      type: "text",
      content: "",
    };

    if (id === "top") setElements((prev) => [block, ...prev]);
    else {
      setElements((prev) => insert(prev, block));
    }
  };

  const addImageBlock = () => {
    const block = {
      id: v4(),
      type: "image",
      url: "",
    };

    if (id === "top") setElements((prev) => [block, ...prev]);
    else {
      setElements((prev) => insert(prev, block));
    }
  };

  const applyStyle = (styleType) => {
    console.log("styleing");
    // document.execCommand(styleType, false, null);
    let selection = window.getSelection();

    let range = selection.getRangeAt(0);
    console.log(range);
    let selectedText = range.extractContents();
    let span = document.createElement("span");
    switch (styleType) {
      case "bold":
        span.style.fontWeight = "bold";
        break;
      case "italic":
        span.style.fontStyle = "italic";
        break;
      case "underline":
        span.style.textDecoration = "underline";
        break;
      default:
        return;
    }

    span.appendChild(selectedText);

    range.insertNode(span);
  };

  return (
    <div
      className="min-w-28 w-fit mx-auto min-h-4 my-4"
      onMouseOver={(e) => setIsShow(true)}
      onMouseOut={(e) => setIsShow(false)}
    >
      <div className={`w-fit mx-auto [&>Button]:mx-2 block  `}>
        <Button type="dashed" onClick={addTextBlock}>
          Add Text
        </Button>
        <Button type="dashed" onClick={addImageBlock}>
          Add Image
        </Button>
        {stylingOptions && (
          <>
            <button
              className="font-bold"
              onClick={(e) => {
                e.preventDefault();
                applyStyle("bold");
              }}
            >
              B
            </button>
            <button
              className="italic"
              onClick={(e) => {
                e.preventDefault();
                applyStyle("italic");
              }}
            >
              I
            </button>
            <button
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                applyStyle("underline");
              }}
            >
              U
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddBox;
