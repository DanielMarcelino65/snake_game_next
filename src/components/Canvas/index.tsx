  import React, { useEffect, useRef, useState } from "react";
  import NextImage from "next/image";
  import AppleLogo from "../../../assets/applePixels.png";
  import useInterval from "@/services/useInterval";
  import SnakeGameLogo from "../../../assets/snake-logo.svg";
  import * as S from "./styles";
  import { drawCanvas } from "./types";
  import { useRouter } from "next/router";
  import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
  import { db } from "@/services/firebase";
  import { useAuth } from "@/context/AuthContext";
  import {useThemeContext } from "@/context";
  import { FaPause } from "react-icons/fa";

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
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [highScore, setHighScore] = useState(0);
    const [directionQueue, setDirectionQueue] = useState<number[][]>([]);
    const [display, setDisplay] = useState("");
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
    const router = useRouter();
    const { themeState, toggleTheme } = useThemeContext();
    const { currentUser } = useAuth();

    const gestureThreshold = 10;
    const lightGreen = "#a3d001";
    const darkGreen = "#85b000";
    const snakeColor = "#4572e7";

    const handleTheme = () => {
      toggleTheme();
    };

      

    //Interval Hook para atualizar o jogo de acordo com o delay
    useInterval(() => gameLoop(), delay);

    useEffect(() => {
      localStorage.removeItem('snakeScore')
      const playerName = localStorage.getItem("playerName");
      if (playerName) {
        setPlayerName(playerName);
      }
    }, []);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsPaused(!isPaused);
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
    
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isPaused]);
    

    

    useEffect(() => {
      window.scrollTo(0, window.innerHeight);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;
      const deltaX = touchMoveX - touchStart.x;
      const deltaY = touchMoveY - touchStart.y;
    
      if (Math.abs(deltaX) > gestureThreshold || Math.abs(deltaY) > gestureThreshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          setDirectionQueue((prev) => [...prev, deltaX > 0 ? [1, 0] : [-1, 0]]);
        } else {
          setDirectionQueue((prev) => [...prev, deltaY > 0 ? [0, 1] : [0, -1]]);
        }
      }
      setTouchStart({ x: touchMoveX, y: touchMoveY });
    };
    

    const handleTouchEnd = () => {
      setTouchStart({ x: 0, y: 0 });
      setTouchEnd({ x: 0, y: 0 });
    };

    function drawCheckerboard({ ctx, scale, canvasX, canvasY }: drawCanvas) {
      for (let x = 0; x < canvasX / scale; x++) {
        for (let y = 0; y < canvasY / scale; y++) {
          ctx.fillStyle = (x + y) % 2 === 0 ? lightGreen : darkGreen;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    function drawSnake(ctx: CanvasRenderingContext2D, snake: number[][]) {
      const maxSize = 1; 
      const minSize = 0.6;
      const sizeDecrease = 0.01;
      
      snake.forEach((segment, index) => {
        const size = Math.max(maxSize - sizeDecrease * index, minSize);
        const padding = (1 - size) / 2;
        const [x, y] = segment;
    
        ctx.fillStyle = snakeColor;
        ctx.fillRect(x + padding, y + padding, size, size);
      });
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
          drawSnake(ctx, snake);
          ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
          setDisplay("none");
        }
      }
    }, [snake, apple, gameover]);

    useEffect(() => {
      startGame();
    }, []);

    function handleSetScore() {
      if (currentUser && score > Number(localStorage.getItem("snakeScore"))) { // Verifique se há um usuário logado
        localStorage.setItem("snakeScore", JSON.stringify(score));
        setHighScore(score);
        saveScoreToFirestore(score);
      }
    }

    const saveScoreToFirestore = async (newScore: number) => {
      if (!currentUser) return; // Não proceda se não houver usuário logado
      const scoresCollectionRef = collection(db, "scores");
      const q = query(scoresCollectionRef, where("userId", "==", currentUser.uid));
    
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (document) => {
            const existingScore = document.data().score;
            if (newScore > existingScore) {
              await updateDoc(document.ref, {
                score: newScore,
                timestamp: new Date()
              });
              console.log("Score updated to: ", newScore);
            }
          });
        } else {
          await addDoc(scoresCollectionRef, {
            playerName: currentUser.displayName || "Anônimo",
            score: newScore,
            timestamp: new Date(),
            userId: currentUser.uid
          });
          console.log("New score created for user.");
        }
      } catch (error) {
        console.error("Error accessing Firestore: ", error);
      }
    };


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
      if (isPaused) return;
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

    function handleResume () {
      setIsPaused(false);
      const containerElement = document.querySelector(
        "[data-game-container]"
      ) as HTMLElement;
      containerElement?.focus();
      console.log(document.activeElement === containerElement);
      window.scrollTo(0, window.innerHeight);
    }

    return (
      <S.Background
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      >
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
                {/* <S.IconWrapper>
                  <FaPause onClick={() => setIsPaused(!isPaused)} style={{cursor: "pointer"}}/>
                </S.IconWrapper> */}
                <S.score>
                  Pontuação
                  <span style={{ marginLeft: 2 }}>
                    <S.AppleImage
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
              <S.gameOver style={{marginBottom: 50, marginTop: 10}}>Pontuação: {score}</S.gameOver>
              <S.playButton onClick={play}>JOGAR NOVAMENTE</S.playButton>
              <S.playButton
                onClick={() => router.push("/Home")}
                style={{ marginTop: 100 }}
              >
                MENU PRINCIPAL
              </S.playButton>
            </S.GameOverContainer>
          )}
          {isPaused && (
              <S.GameOverContainer>
                <S.gameOver>PAUSADO</S.gameOver>
                <S.playButton style={{marginTop: 50, marginBottom: 20}} onClick={handleResume}>Continuar</S.playButton>
                <S.playButton onClick={() => router.push("/Home")}>Menu Principal</S.playButton>
                <S.ThemeSwitchContainer onClick={() => handleTheme()}>
                  <S.SwitchContainer>
                    <S.Switch isDark={themeState} />
                  </S.SwitchContainer>
                  <S.playButton style={{marginTop: 0}}>Tema</S.playButton>
                </S.ThemeSwitchContainer>
              </S.GameOverContainer>
            )}
        </S.Container>
      </S.Background>
    );
  };

  export default Canvas;
