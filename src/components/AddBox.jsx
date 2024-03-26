import { Button } from "antd";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { elementAtom } from "../store/atoms/elementAtom";

const AddBox = ({ id }) => {
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

  return (
    <div
      className="min-w-28 w-fit mx-auto min-h-4 my-4"
      onMouseOver={(e) => setIsShow(true)}
      onMouseOut={(e) => setIsShow(false)}
    >
      <div
        className={`w-fit mx-auto [&>Button]:mx-2  ${
          isShow ? "block" : "hidden"
        } `}
      >
        <Button type="dashed" onClick={addTextBlock}>
          Add Text
        </Button>
        <Button type="dashed" onClick={addImageBlock}>
          Add Image
        </Button>
      </div>
    </div>
  );
};

export default AddBox;
