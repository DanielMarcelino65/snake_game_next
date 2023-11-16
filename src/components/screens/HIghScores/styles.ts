import styled, {css} from "styled-components"

export const background = styled.div`
    ${({theme}) => css`
        background-image: url(${theme.backgrounds.image});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `}
`;

export const HighScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    width: auto;
    max-height: 400px;
`

export const Text = styled.h1`
    font-size: 40px;
	font-family: ${({ theme }) => theme.fontFamily.Upheaval};
	background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px black;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const Button = styled.button`
    background-color: ${({theme}) => theme.colors.primary};
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 24px;
    font-family: ${({ theme }) => theme.fontFamily.Upheaval};
    background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px black;
    cursor: pointer;
`;