import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as S from "./styles";
import { auth } from "@/services/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Popup auth error:', error);
    });
    
  };

  const playAsGuest = () => {
    localStorage.setItem("playerName", "guest");
    router.push("/Home");
  };

  useEffect(() => {
    getRedirectResult(auth)
      .catch((error) => {
        console.error('Redirect result error:', error);
      });
  }, [auth, router]);


  useEffect(() => {
    if (currentUser) {
      router.push("/Home");
    } else {
      const guestName = localStorage.getItem("playerName");
      if (guestName === "guest") {
        router.push("/Home");
      }
    }
  }, [currentUser, router]);

  return (
    <S.background>
      <S.LoginContainer>
        <S.Button onClick={playAsGuest}>Jogar como convidado</S.Button>
        <S.Button onClick={signInWithGoogle}>
          Entrar com Google 
          <S.IconContainer><FcGoogle /></S.IconContainer>
        </S.Button>
      </S.LoginContainer>
    </S.background>
  );
};

export default Login;
