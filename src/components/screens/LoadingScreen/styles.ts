import styled, { css } from "styled-components";



export const LoadingScreenContainerLight = styled.div`
    background-image: url('/snake-background.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const LoadingScreenContainerDark = styled.div`
    background-image: url('/snake-background-dark.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
