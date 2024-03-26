import {
  CloseCircleOutlined,
  HolderOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import AddBox from "./AddBox";
import { storage } from "../firebase";
import { Reorder, useDragControls } from "framer-motion";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSetRecoilState } from "recoil";
import { elementAtom } from "../store/atoms/elementAtom";

// The image element for the editor
const ImageContain = ({ element }) => {
  // Reference to the fileinput tag, which is by default hidden so that we can customize it
  const fileInputRef = useRef();

  // for storing the selected image file
  const [imagefile, setImageFile] = useState(null);

  // for changing the drag controls
  const controls = useDragControls();

  // state for showing the close button on hover only
  const [showCloseButton, setShowCloseButton] = useState(false);

  // getting setElements from recoil for changing the state i.e. deleting an element while clicking on close button
  const setElements = useSetRecoilState(elementAtom);

  // for storing the image url after uploading it to firebase
  const [imageURL, setImageURL] = useState("");

  // close button function
  const closeImageUploadArea = () => {
    setElements((prev) => prev.filter((p) => p.id != element.id));
  };

  // useEffect with dependency array as imagefile
  useEffect(() => {
    if (imagefile == null) return;

    // creating the image reference
    const imageRef = ref(storage, `images/${imagefile.name}${v4()}`);

    // uploading to firebase storage
    const uploadTask = uploadBytesResumable(imageRef, imagefile);

    // for keeping track of how much upload is done
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("file uploaded");
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageURL(url);
        });

        setImageFile(null);
      }
    );
  }, [imagefile]);

  return (
    <Reorder.Item
      key={element.id}
      value={element}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="flex items-center"
        onMouseOver={() => setShowCloseButton(true)}
        onMouseOut={() => setShowCloseButton(false)}
      >
        {/* drag button */}
        <div>
          <HolderOutlined
            className="mr-4 cursor-pointer text-black"
            onPointerDown={(e) => controls.start(e)}
          />
        </div>

        {/* the main upload file area or image area */}
        <div className="w-full my-4">
          {imageURL ? (
            <div>
              <img
                src={imageURL}
                alt="sample"
                className="h-72 w-full object-contain"
              />
            </div>
          ) : (
            <div className="w-fit mx-auto">
              <div
                className="flex flex-col items-center space-y-4 border border-gray-700 p-4 rounded-xl cursor-pointer hover:opacity-50"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <UploadOutlined className="text-lg" />
                <p className="text-xs">Upload an image</p>
              </div>
            </div>
          )}
        </div>

        {/* close button */}
        {showCloseButton && (
          <div>
            <CloseCircleOutlined
              className="ml-4 cursor-pointer text-black"
              onClick={closeImageUploadArea}
            />
          </div>
        )}
      </div>
      <AddBox id={element.id} />
    </Reorder.Item>
  );
};

export default ImageContain;
