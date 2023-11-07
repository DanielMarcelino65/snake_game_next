import styled, {css} from "styled-components";

interface IHomeContainerProps {
    opacity: number;
}

interface IThemeSwitchProps {
    isDark: boolean;
}


export const HomeContainer = styled.div`
    width: 100%;
    height: 200vh;
    background-image: url(${({ theme }) => theme.backgrounds.image});
    transition: background-image 0.5s ease-in-out;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    overflow-y: scroll;
    justify-content: center;
    scroll-behavior: smooth;
`;

export const HomeContent = styled.div<IHomeContainerProps>`
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    opacity: ${({ opacity }) => opacity};
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
	font-size: 50px;
	color: #FFAF00;
	font-family: ${({ theme }) => theme.fontFamily.Upheaval};
	font-weight: 700;
	z-index: 10;
    margin-top: 20px;
	text-transform: uppercase;
    transition: all 5s ease;
	background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px black;
	cursor: pointer;
`;

export const ThemeSwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
    gap: 20px;
    cursor: pointer;
`;

export const SwitchContainer = styled.div`
    width: 60px;
    position: relative;
    height: 30px;
    border-radius: 20px;
    border: 2px solid #000;
    background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
`;

export const Switch = styled.div<IThemeSwitchProps>`
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.circle};
    left: ${({isDark}) => isDark ? '2px' : 'calc(100% - 26px)'};
    transition: left 0.5s ease-in-out;
`;