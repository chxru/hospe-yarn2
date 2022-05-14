import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";

const REDIRECT_KEY = "redirect_key";

interface User {
  userId: string,
  fname: string,
  lname: string,
  email: string
}

interface IAuthContext {
  initializing: boolean,
  error?: {
    title: string,
    description?: string,
  },
  user: User | null,
  clearRedirect: () => void
  getRedirect: () => void,
  setRedirect: (url: string) => void,
  updateUser: (user: User) => void
}

const setRedirect = (url: string) => {
  window.sessionStorage.setItem(REDIRECT_KEY, url);
};

const getRedirect = () => {
  return window.sessionStorage.getItem(REDIRECT_KEY);
};

const clearRedirect = () => {
  window.sessionStorage.removeItem(REDIRECT_KEY);
};

const updateUserFn = (_user: User) => {
  // Placeholder fn, check AuthProvider for definition
};

const AuthContext = createContext<IAuthContext>({ user: null, initializing: true, setRedirect, getRedirect, clearRedirect, updateUser: updateUserFn });
AuthContext.displayName = "auth-context";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<{ title: string, description?: string }>();
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    // TODO: check for cookie, refresh token
    setError(undefined);
    setInitializing(false);
  }, []);

  const updateUser = (u: User) => {
    setUser(u);
  };

  const value: IAuthContext = {
    initializing,
    error,
    user,
    clearRedirect,
    getRedirect,
    setRedirect,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
};
