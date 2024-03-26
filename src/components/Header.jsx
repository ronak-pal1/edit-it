import { Button } from "antd";
import { auth } from "../firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/userAtom";

// The header of the page
const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);

  // logout function
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-fit flex justify-between items-center p-5 bg-slate-950 sticky top-0 left-0 z-50">
      <div>
        <p className="text-2xl text-white font-bold">EditIt.com</p>
      </div>

      <div>
        {user && (
          <Button className="text-white" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
