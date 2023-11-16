import styled, {css} from "styled-components"

export const background = styled.div`
    ${({theme}) => css`
        background-image: url(${theme.backgrounds.image});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        height: 100vh;
        display: flex;
        z-index: -10;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `}
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    font-family: ${({ theme }) => theme.fontFamily.Upheaval};
    position: relative;
    -webkit-text-stroke: 1px black;
    border-radius: 30px;
    color: ${({theme}) => theme.colors.primary};
    background: transparent;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-top: 10px;
    z-index: 0;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    font-size: 24px;
    font-weight: 500;
    gap: 5px;

    &::before {
        content: '';
        position: absolute;        
        top: 0;
        z-index: -1;
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

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 50%;
    background-color: white;

    > svg {
        width: 20px;
        height: 20px;
    }
`;