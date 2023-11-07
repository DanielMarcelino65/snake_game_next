import { useEffect, useState } from "react";
import * as S from "./styles";
import Image from "next/image";
import SnakeLogo from "@/./../assets/snake-logo.svg";
import { useRouter } from "next/router";
import { useThemeContext } from "@/context";

const HomeScreen = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();
  const { toggleTheme, themeState } = useThemeContext();

  function handleTheme() {
    toggleTheme();
  }

  useEffect(() => {
    console.log(themeState);
  }, [themeState]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      const scrolledPercentage = currentScrollY / (docHeight - windowHeight);
      setOpacity(scrolledPercentage);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const targetY = document.body.scrollHeight - window.innerHeight;
    setScrollY(targetY);
    setScrollHeight(window.innerHeight);
    let currentY = window.scrollY;
    let start: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const duration = 4000;

      if (progress < duration) {
        const delta = (targetY - currentY) * (progress / duration);
        window.scrollTo(0, currentY + delta);
        window.requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetY);
      }
    };

    setTimeout(() => {
      window.requestAnimationFrame(animateScroll);
    }, 500);
  }, []);

  return (
    <S.HomeContainer>
      <S.HomeContent opacity={opacity}>
        <Image alt="Snake-Game-Logo" src={SnakeLogo} width={400} />
        <S.Button onClick={() => router.push("/PlayGame")}>Jogar</S.Button>
        <S.Button>Tutorial</S.Button>
        <S.Button>Pontuação</S.Button>
        <S.ThemeSwitchContainer onClick={() => handleTheme()}>
          <S.SwitchContainer>
            <S.Switch isDark={themeState} />
          </S.SwitchContainer>
          <S.Button style={{marginTop: 0}}>Tema</S.Button>
        </S.ThemeSwitchContainer>
      </S.HomeContent>
    </S.HomeContainer>
  );
};

export default HomeScreen;
