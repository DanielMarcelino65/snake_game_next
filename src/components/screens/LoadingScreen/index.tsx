import { useEffect, useState } from 'react'
import * as S from './styles'

const LoadingScreen = () => {
    const [themeState, setThemeState] = useState("");

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        setThemeState(localTheme as string);
    }, []);


    return themeState === 'true' ? (    
        <S.LoadingScreenContainerLight>
            Carregando
        </S.LoadingScreenContainerLight>
    ) : (
        <S.LoadingScreenContainerDark>
            Carregando
        </S.LoadingScreenContainerDark>
    )
}

export default LoadingScreen
  