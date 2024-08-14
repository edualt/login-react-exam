import { useContext } from "react";
import AuthContext from "../context/authContext";

const useAuth = () => {
  const { authState, setAccessToken, logout } = useContext(AuthContext);

  return { authState, setAccessToken, logout };
}

export default useAuth;