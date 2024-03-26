import { useState } from "react";
import TextContain from "./TextContain";
import { Reorder } from "framer-motion";
import AddBox from "./AddBox";
import ImageContain from "./ImageContain";
import { useRecoilState } from "recoil";
import { elementAtom } from "../store/atoms/elementAtom";

const Editor = () => {
  // for getting all the elements in the editor from the recoil state
  const [elements, setElements] = useRecoilState(elementAtom);

  const [isAddTop, setAddTop] = useState(false);

  return (
    <div className="w-3/4 min-h-80 max-h-fit bg-white mx-auto my-4 border border-gray-300 p-6 shadow-lg shadow-slate-300 rounded-md">
      {/* Component for adding new elements at the top of the editor */}
      <AddBox id={"top"} />

      {/* Mapping through all the elements */}
      <Reorder.Group axis="y" values={elements} onReorder={setElements}>
        {elements?.map((element) =>
          element.type === "text" ? (
            <TextContain key={element.id} element={element} />
          ) : (
            <ImageContain key={element.id} element={element} />
          )
        )}
      </Reorder.Group>
    </div>
  );
};

export default Editor;
