import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import AppleLogo from "../../../assets/applePixels.png";
import useInterval from "@/services/useInterval";
import SnakeGameLogo from "../../../assets/snake-logo.svg";
import * as S from "./styles";
import { drawCanvas } from "./types";
import { useRouter } from "next/router";

//Variaveis de inicialização do jogo
const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [
  [4, 6],
  [3, 6],
];
const initialApple = [4, 5];
const scale = 40;
const timeDelay = 60;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameover, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [directionQueue, setDirectionQueue] = useState<number[][]>([]);
  const [display, setDisplay] = useState("");
  const router = useRouter();

  const lightGreen = "#a3d001";
  const darkGreen = "#85b000";

  //Interval Hook para atualizar o jogo de acordo com o delay
  useInterval(() => gameLoop(), delay);

  useEffect(() => {
    window.scrollTo(0, window.innerHeight);
  }, []);

  function drawCheckerboard({ ctx, scale, canvasX, canvasY }: drawCanvas) {
    for (let x = 0; x < canvasX / scale; x++) {
      for (let y = 0; y < canvasY / scale; y++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? lightGreen : darkGreen;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const score = localStorage.getItem("snakeScore");
      if (score) {
        setHighScore(Number(score));
      }
    }
    let fruit = document.getElementById("fruit") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        drawCheckerboard({ ctx, scale, canvasX, canvasY });
        ctx.fillStyle = "#20A152";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
        setDisplay("none");
      }
    }
  }, [snake, apple, gameover]);

  useEffect(() => {
    startGame();
  }, []);

  function handleSetScore() {
    if (score > Number(localStorage.getItem("snakeScore"))) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
    }
  }

  function startGame() {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
    setDirectionQueue([]);
    const containerElement = document.querySelector(
      "[data-game-container]"
    ) as HTMLElement;
    containerElement?.focus();
    console.log(document.activeElement === containerElement);
    window.scrollTo(0, window.innerHeight);
  }

  function play() {
    startGame();
    const containerElement = document.querySelector(
      "[data-game-container]"
    ) as HTMLElement;
    containerElement?.focus();
    console.log(document.activeElement === containerElement);
  }

  function checkCollision(head: number[]) {
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) {
        return true;
      }
    }
    return false;
  }

  function appleAte(newSnake: number[][]) {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple: number[];
      do {
        newApple = [
          Math.floor((Math.random() * canvasX) / scale),
          Math.floor((Math.random() * canvasY) / scale),
        ];
      } while (
        newSnake.some(
          (segment) => segment[0] === newApple[0] && segment[1] === newApple[1]
        )
      );

      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function gameLoop() {
    const newSnake = [...snake];
    if (directionQueue.length) {
      const nextDirection = directionQueue[0];
      if (
        !(
          (direction[0] === 0 &&
            direction[1] === 1 &&
            nextDirection[1] === -1) ||
          (direction[0] === 0 &&
            direction[1] === -1 &&
            nextDirection[1] === 1) ||
          (direction[0] === 1 &&
            direction[1] === 0 &&
            nextDirection[0] === -1) ||
          (direction[0] === -1 && direction[1] === 0 && nextDirection[0] === 1)
        )
      ) {
        setDirection(nextDirection);
      }
      setDirectionQueue((prev) => prev.slice(1));
    }
    let newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];

    // Se a cobra chegar ao limite do canvas, faça-a aparecer do lado oposto
    if (newSnakeHead[0] >= canvasX / scale) newSnakeHead[0] = 0;
    if (newSnakeHead[0] < 0) newSnakeHead[0] = canvasX / scale - 1;
    if (newSnakeHead[1] >= canvasY / scale) newSnakeHead[1] = 0;
    if (newSnakeHead[1] < 0) newSnakeHead[1] = canvasY / scale - 1;

    newSnake.unshift(newSnakeHead);
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
      return;
    }

    setSnake(newSnake);
  }

  function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    let newDirection: number[] = [];

    switch (e.key) {
      case "ArrowUp":
      case "w":
        newDirection = [0, -1];
        break;
      case "ArrowDown":
      case "s":
        newDirection = [0, 1];
        break;
      case "ArrowLeft":
      case "a":
        newDirection = [-1, 0];
        break;
      case "ArrowRight":
      case "d":
        newDirection = [1, 0];
        break;
    }

    if (newDirection.length) {
      setDirectionQueue((prev) => [...prev, newDirection]);
    }
  }

  return (
    <S.Background>
      <S.Container
        id="game-container"
        onKeyDown={(e) => changeDirection(e)}
        data-game-container
        tabIndex={0}
      >
        {/* <S.Monitor width={5000} src={oldMonitor} alt="appleLogo"></S.Monitor> */}
        <S.GameContainer>
          <S.CanvasHeadContainer>
            <NextImage width={125} src={SnakeGameLogo} alt="snake-game-logo" />
            <S.scoreBox>
              <S.score>
                Pontuação
                <span style={{ marginLeft: 2 }}>
                  <NextImage
                    id="fruit"
                    width={30}
                    src={AppleLogo}
                    alt="appleLogo"
                  />
                </span>{" "}
                {score}
              </S.score>
            </S.scoreBox>
          </S.CanvasHeadContainer>
          <S.CanvasBorder>
            <S.Canvas
              className="playArea"
              ref={canvasRef}
              width={canvasX}
              height={canvasY}
            />
          </S.CanvasBorder>
        </S.GameContainer>
        {gameover && (
          <S.GameOverContainer>
            <S.gameOver>VOCÊ PERDEU!</S.gameOver>
            <S.playButton onClick={play}>JOGAR NOVAMENTE</S.playButton>
            <S.playButton
              onClick={() => router.push("/")}
              style={{ marginTop: 100 }}
            >
              MENU PRINCIPAL
            </S.playButton>
          </S.GameOverContainer>
        )}
      </S.Container>
    </S.Background>
  );
};

export default Canvas;
