import Editor from "../components/Editor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// Main home page for editing
const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user == null) navigate("/login");
      else navigate("/");
    });
  }, []);

  return (
    <div>
      <Editor />
    </div>
  );
};

export default Homepage;
