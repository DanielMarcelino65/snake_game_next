import { ReactNode } from "react";

export interface ContextData {
    themeState: boolean;
    toggleTheme: () => void;
    themeLoaded: boolean;
}

export interface ContextProvider {
    children: ReactElement;
}

export interface AuthProviderProps{
    children: ReactNode;
}