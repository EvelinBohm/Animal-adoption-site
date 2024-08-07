import { useContext } from "react";
import { UserContext } from "../context/auth/UserContext";

const useIsLoggedIn=()=>{
    const { currentUser } = useContext(UserContext);
    const isLoggedIn=currentUser!=null;
    return isLoggedIn;
  }

export default useIsLoggedIn;