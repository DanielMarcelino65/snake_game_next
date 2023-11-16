import { useEffect, useState } from "react";
import * as S from "./styles";
import Image from "next/image";
import SnakeLogo from "@/./../assets/snake-logo.svg";
import { useRouter } from "next/router";
import { useThemeContext } from "@/context";
import { auth } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";
import { throttle } from "lodash";

const HomeScreen = () => {
  const { currentUser } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();
  const { toggleTheme, themeState } = useThemeContext();

  function handleTheme() {
    toggleTheme();
  }

  useEffect(() => {
    if (currentUser) {
      setPlayerName(currentUser.displayName || 'Usuário sem nome');
    } else {
      const guestName = localStorage.getItem("playerName");
      if (guestName) {
        setPlayerName(guestName);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser === null && !localStorage.getItem("playerName")) {
      router.push("/");
    }
  }, [currentUser, router]);

  useEffect(() => {
  const handleScroll = throttle(() => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight;
    const scrolledPercentage = currentScrollY / (docHeight - windowHeight);
    setOpacity(scrolledPercentage);
  }, 100); // Chama a função a cada 100ms

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  useEffect(() => {
    // Definição da função de easing
    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animateScroll = (timestamp: number, start: number, currentY: number, targetY: number) => {
      const duration = 4000;
      const runtime = timestamp - start;
      const progress = runtime / duration;
      const easing = easeInOutQuad(progress);

      window.scrollTo(0, Math.ceil(currentY + (easing * (targetY - currentY))));

      if (runtime < duration) { // Se ainda não passou o tempo de duração, continue a animação
        window.requestAnimationFrame((newTimestamp) => animateScroll(newTimestamp, start, currentY, targetY));
      }
    };

    const targetY = document.body.scrollHeight - window.innerHeight;
    const currentY = window.scrollY;
    const start = window.performance.now(); // Obtém o tempo de início atual

    // Inicia a animação
    window.requestAnimationFrame((timestamp) => animateScroll(timestamp, start, currentY, targetY));
  }, []);

  const handleLogout = () => {
    if(currentUser) {
      auth.signOut();
    } else {
      localStorage.removeItem("playerName");
      router.push("/");
    }
  }

  return (
    <S.HomeContainer>
      <S.HomeContent opacity={opacity}>
        <S.SnakeLogo alt="Snake-Game-Logo" src={SnakeLogo} width={400} />
        <S.Button onClick={() => router.push("/PlayGame")}>Jogar</S.Button>
        {/* <S.Button onClick={() => router.push("/Tutorial")}>Tutorial</S.Button> */}
        <S.Button onClick={() => router.push("/HighScores")}>Pontuação</S.Button>
        <S.ThemeSwitchContainer onClick={() => handleTheme()}>
          <S.SwitchContainer>
            <S.Switch isDark={themeState} />
          </S.SwitchContainer>
          <S.Button style={{marginTop: 0}}>Tema</S.Button>
        </S.ThemeSwitchContainer>
        <S.Text>User: {playerName}</S.Text>
      </S.HomeContent>
      <S.LogOutButton onClick={handleLogout}>
        <AiOutlineLogout size={30} />
        Sair
      </S.LogOutButton>
    </S.HomeContainer>
  );
};

export default HomeScreen;
