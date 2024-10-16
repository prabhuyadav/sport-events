import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

import { User } from "../../constants/types";

const AuthContext = createContext<{
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>> | null;
  userId: string | null;
}>({ token: null, setToken: null, userId: null });

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const user: { id: string } = jwtDecode(token);
      setUserId(user.id);
    } else {
      localStorage.removeItem("token");
      setUserId(null);
    }
  }, [token, userId]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userId,
    }),
    [token, userId]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
