import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";

import { AuthProvider } from "@hospe/common-fe/contexts/authContext";

import AuthenticatedLayout from "../layouts/withAuth";
import { NextApplicationPage } from "../types";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextApplicationPage;
  pageProps: never;
}) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <AuthProvider>
        {Component.requireAuth ? (
          <AuthenticatedLayout>
            <Component {...pageProps} />
          </AuthenticatedLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
