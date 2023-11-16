import Image from "next/image";
import styled, {css} from "styled-components";

interface IHomeContainerProps {
    opacity: number;
}

interface IThemeSwitchProps {
    isDark: boolean;
}

export const SnakeLogo = styled(Image)`
    width: 400px;
`;


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
    
    @media (max-width: 700px) {
        transform: translate(-50%, -50%) scale(0.9);
    }
    
    @media (max-width: 600px) {
        transform: translate(-50%, -50%) scale(0.8);
    }
    @media (max-width: 500px) {
        transform: translate(-50%, -50%) scale(0.7);
    }
    
    @media (max-width: 400px) {
        transform: translate(-50%, -50%) scale(0.6);
    }


`;

export const Button = styled.button`
	font-size: 50px;
	color: #FFAF00;
	font-family: ${({ theme }) => theme.fontFamily.Upheaval};
	font-weight: 700;
	z-index: 10;
    margin-top: 20px;
	text-transform: uppercase;
    transition: all .5s ease;
	background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px black;
	cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`;

export const ThemeSwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
    gap: 20px;
    cursor: pointer;
    margin-bottom: 50px;
    transition: all .5s ease;

    &:hover {
        transform: scale(1.1);
        > button {
            transform: scale(1.0);
        }
    }
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

export const Text = styled.h1`
    font-size: 50px;
    font-family: ${({ theme }) => theme.fontFamily.Upheaval};
    background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
    background-clip: text;
    text-align: center;
    position: absolute;
    bottom: -70px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px black;
`;

export const LogOutButton = styled.button`
    position: fixed;
    top: 10px;
    font-family: ${({ theme }) => theme.fontFamily.Upheaval};
    left: 10px;
    -webkit-text-stroke: 1px black;
    border-radius: 30px;
    color: ${({theme}) => theme.colors.primary};
    background: transparent;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    font-size: 24px;
    font-weight: 500;
    gap: 5px;

    &::before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        border-radius: 30px;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
        opacity: 0;
        transition: opacity .5s ease-in-out;
    }

    > svg {
        width: 30px;
        height: 30px;
        fill: ${({theme}) => theme.colors.primary};
        transition: all 0.5s ease-in-out;
    }

    &:hover::before {
        opacity: 1;
    }

    &:hover {
        color: white;
        > svg {
            transition: all 0.5s ease-in-out;
            fill: white;
            stroke: white;
        }
    }

`;