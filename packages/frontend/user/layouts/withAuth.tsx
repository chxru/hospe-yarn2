import { AppShell } from "@mantine/core";
import React from "react";
import { Sidebar } from "../components/sidebar";

const AuthenticatedLayout: React.FC = ({ children }) => {
  return <AppShell navbar={<Sidebar />}>{children}</AppShell>;
};

export default AuthenticatedLayout;
