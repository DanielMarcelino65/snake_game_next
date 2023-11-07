export interface ContextData {
    themeState: boolean;
    toggleTheme: () => void;
    themeLoaded: boolean;
}

export interface ContextProvider {
    children: ReactElement;
  }