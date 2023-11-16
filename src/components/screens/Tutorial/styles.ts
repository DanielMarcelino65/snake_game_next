import styled, {css} from "styled-components";
import Image from "next/image";

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

export const TutorialContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
`


export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ExampleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Text = styled.h1`
    font-size: 30px;
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

export const StyledImage = styled(Image)`
    width: 100%;
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 40px;
`