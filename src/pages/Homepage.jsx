import Editor from "../components/Editor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/userAtom";

// Main home page for editing
const Homepage = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
    auth.onAuthStateChanged(async (user) => {
      if (user == null) navigate("/login");
      else navigate("/");

      setUser(user ? user.displayName : null);
    });
  }, []);

  return (
    <div>
      <Editor />
    </div>
  );
};

export default Homepage;
