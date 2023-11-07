import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import light, {dark} from '../styles/theme/light'
import GlobalStyles from "@/styles/globals"
import { ContextProvider, useThemeContext } from '@/context'

export default function App({ Component, pageProps }: AppProps) {

  const {themeState} = useThemeContext()

  return (
    <ContextProvider>
        <GlobalStyles />
        <Component {...pageProps} />
    </ContextProvider>
  )
}