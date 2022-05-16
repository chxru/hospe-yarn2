import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";

const REDIRECT_KEY = "redirect_key";

interface User {
  id: string,
  name: {
    first: string,
    last: string
  }
  email: string
}
 
interface IAuthContext {
  initializing: boolean,
  error?: {
    title: string,
    description?: string,
  },
  accessToken?: string,
  user: User | null,
  clearRedirect: () => void
  getRedirect: () => void,
  setRedirect: (url: string) => void,
  updateAccessToken: (token: string) => void,
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

const updateAccessTokenFn = (_token: string) => {
  // Placeholder fn, check AuthProvider for definition
};

const updateUserFn = (_user: User) => {
  // Placeholder fn, check AuthProvider for definition
};

const AuthContext = createContext<IAuthContext>({ user: null, initializing: true, setRedirect, getRedirect, clearRedirect, updateAccessToken: updateAccessTokenFn, updateUser: updateUserFn });
AuthContext.displayName = "auth-context";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

interface RefreshResponse {
  _id: string,
  access: string,
  email: string,
  name: {
    first: string,
    last: string
  },
  refresh: string
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [error, setError] = useState<{ title: string, description?: string }>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | null>(null);

  const updateAccessToken = (token: string) => {
    setAccessToken(token);
  };

  const updateUser = (u: User) => {
    setUser(u);
  };

  const RefreshAccessToken = async () => {
    if (accessToken) return;
    
    const res = await fetch("/api/auth/refresh", { method: "POST", credentials: "same-origin" });
    if (res.ok) {
      const data = await res.json() as RefreshResponse;
      if (data.access) setAccessToken(data.access );
      updateUser({ email: data.email, name: data.name, id: data._id });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setInitializing(true);
        setError(undefined);

        await RefreshAccessToken();        
      } catch (err) {
        setError({ title: "Error occurred while token refreshing" });
        console.error(err);
      } finally {
        setInitializing(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: IAuthContext = {
    initializing,
    error,
    user,
    clearRedirect,
    getRedirect,
    setRedirect,
    updateAccessToken,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
};
