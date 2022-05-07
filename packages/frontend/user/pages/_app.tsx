import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import AuthenticatedLayout from "../layouts/withAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <AuthenticatedLayout>
        <Component {...pageProps} />
      </AuthenticatedLayout>
    </MantineProvider>
  );
}

export default MyApp;
