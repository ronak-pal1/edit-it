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

  const [canStartAdding, setCanStartAdding] = useState(false);

  return (
    <div
      className={`w-11/12 lg:w-3/4 max-h-fit min-h-screen bg-white mx-auto my-4 border border-gray-300 p-6 shadow-lg shadow-slate-300 rounded-md ${
        canStartAdding ? "" : "flex flex-col items-center justify-center"
      } `}
    >
      {/* Component for adding new elements at the top of the editor */}
      {canStartAdding ? (
        <>
          <AddBox id={"top"} stylingOptions={false} />

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
        </>
      ) : (
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => setCanStartAdding(true)}
        >
          Add Block
        </button>
      )}
    </div>
  );
};

export default Editor;
