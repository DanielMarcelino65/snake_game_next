import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import light, { dark } from "../styles/theme/light";
import GlobalStyles from "@/styles/globals";
import { ContextProvider, useThemeContext } from "@/context";
import { AuthProvider } from "@/context/AuthContext";
import LoadingScreen from "@/components/screens/LoadingScreen";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <ContextProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </ContextProvider>
    </AuthProvider>
  );
}
