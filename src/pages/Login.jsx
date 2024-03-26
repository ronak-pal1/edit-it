import { GoogleOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/userAtom";

// login page for authentication
const Login = () => {
  const setUser = useSetRecoilState(userAtom);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setUser(auth.currentUser.displayName);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-black w-1/4 h-fit py-10 mx-auto rounded-md mt-32">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
        <h1 className="text-white text-2xl">Login now</h1>

        {/* google login button */}
        <div
          className="bg-white px-4 py-2 rounded-md flex items-center space-x-3 transition-transform hover:scale-105 cursor-pointer"
          onClick={loginWithGoogle}
        >
          <GoogleOutlined />
          <p>Login with Google</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
