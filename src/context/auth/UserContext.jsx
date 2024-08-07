import { createContext,useState,useEffect } from "react";
import { useSesionStorage } from "../../hooks/useSessionStorage";

const UserContext = createContext({});


const UserProvider = ({children}) => {

  const {setItem,decodeItem,removeItem,getItem}=useSesionStorage();

  const getInitialState = () => {
    const token = getItem();
    if (token) {
      try {
        const obj={token:token,...decodeItem()}
        return obj;
      } catch (e) {
        removeItem();
        return null;
      }
    }
    return null;
  };

  const [currentUser, setCurrentUser] = useState(getInitialState);

 useEffect(() => {
 
    if (currentUser) {
      setItem(currentUser.token);
    } else {
      removeItem();
    }
  }, [currentUser,setItem,removeItem]);

  const login = (accessToken) => {
    try {
      setItem(accessToken);
      const decodedUser = decodeItem();
      setCurrentUser({ ...decodedUser, token: accessToken });
    } catch (e) {
      setCurrentUser(null);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    removeItem();
  };

  return (
      <UserContext.Provider 
        value={{currentUser, login, logout}}>
          { children }
      </UserContext.Provider>
    )
};



export { UserContext, UserProvider }
