import Image from "next/image";
import styled from "styled-components";

export const AppleImage = styled(Image)`
	width: 30px;
	height: 30px;

	@media (max-width: 400px) {
		width: 20px;
		height: 20px;
	}
`;

export const Background = styled.div`
	height: 200vh;
	background-image: url(${({ theme }) => theme.backgrounds.image});
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	flex-direction: column;
	outline: none;
`;

export const CanvasBorder = styled.div`
	background: linear-gradient(#37BDC6, #54D250);
	display: flex;
	padding: 10px;
	justify-content: center;
	align-items: center;
`;

export const Canvas = styled.canvas`
	border: 5px solid transparent;
	width: 300px;
	z-index: 10;

	@media (min-width: 1100px) {
		width: 600px;
	}
	@media (min-width: 1600px) {
		width: 700px;
	}
`;


export const gameOver = styled.h1`
	font-size: 60px;
	font-family: ${({ theme }) => theme.fontFamily.Upheaval};
	background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px black;

	@media (max-width: 400px) {
		font-size: 40px;
	}
	`;

export const playButton = styled.button`
	font-size: 42px;
	color: #FFAF00;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-family: ${({ theme }) => theme.fontFamily.Upheaval};
	font-weight: 700;
	z-index: 10;
	text-transform: uppercase;
	background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px black;
	cursor: pointer;

	@media (max-width: 400px) {
		font-size: 32px;
	}

	@media (max-width: 300px) {
		font-size: 24px;
	}
`;

export const scoreBox = styled.div`
	background-color: #37BDC6;
	transform: translateY(10px);
`;

export const score = styled.h2`
	font-size: 18px;
	font-family: ${({ theme }) => theme.fontFamily.Upheaval};
	background: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 50%, ${({theme}) => theme.colors.secondary} 100%);
	-webkit-text-stroke: 1px black;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	padding: 10px;

	@media (min-width: 1100px) {
		font-size: 48px;
	}
`;

export const GameOverContainer = styled.div`
	display: flex;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	flex-direction: column;
	background-color: #00000080;
	width: 100%;
	height: 100%;
	z-index: 10;
	justify-content: center;
	align-items: center;

	@media (min-width: 1600px) {
		width: 100%;
		height: 100%;
	}
`;

export const GameContainer = styled.div`
	display: flex;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const CanvasHeadContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
`;
