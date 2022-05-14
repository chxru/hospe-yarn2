import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppShell } from "@mantine/core";

import { useAuth } from "../contexts/authContext";

import { Sidebar } from "../components/sidebar";

const AuthenticatedLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { user, initializing, setRedirect } = useAuth();

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        setRedirect(router.route);
        router.push("/auth/login").catch(err => {
          console.error(err);
        });
      }
    }
  

  }, [initializing, router, setRedirect, user]);
  
  if (initializing) return <h1>Loading, please wait</h1>;

  if (!initializing && user)  return <AppShell navbar={<Sidebar />}>{children}</AppShell>;

  return <h1>You should be redirected to login page</h1>;
};

export default AuthenticatedLayout;
