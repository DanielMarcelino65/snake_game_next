import React, { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";
import * as S from "./styles";
import router from "next/router";
import { useAuth } from "@/context/AuthContext";

interface Score {
  id: string;
  userId: string;
  playerName: string;
  score: number;
}

const HighScores = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [userScore, setUserScore] = useState<Score | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const highScoresQuery = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      limit(10)
    );

    const unsubscribeHighScores = onSnapshot(highScoresQuery, (querySnapshot) => {
      const scoresData = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Score),
        id: doc.id,
      }));
      setScores(scoresData);
    });

    if (currentUser?.uid) {
      const userScoreQuery = query(
        collection(db, "scores"),
        where("userId", "==", currentUser.uid),
        limit(1)
      );

      const unsubscribeUserScore = onSnapshot(userScoreQuery, (querySnapshot) => {
        const userScores = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Score),
          id: doc.id,
        }));
        setUserScore(userScores[0] || null);
        setIsLoading(false);
      });

      return () => {
        unsubscribeHighScores();
        unsubscribeUserScore();
      };
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  return (
    <S.background>
      <S.Text style={{ fontSize: 50, marginBottom: 30 }}>High Scores</S.Text>
      <S.HighScoreContainer>
        {isLoading ? (
          <S.Text>Carregando...</S.Text>
        ) : (
          scores.map((score, index) => (
            <S.Text key={score.id}>
              {index + 1}. {score.playerName}: {score.score}
            </S.Text>
          ))
        )}
      </S.HighScoreContainer>
      <S.Text style={{marginTop: 20}}>
        {userScore
          ? `Sua pontuação: ${userScore.score}`
          : "Sua pontuação ainda não foi registrada."}
      </S.Text>
      <S.Button onClick={() => router.push("/Home")}>Voltar</S.Button>
    </S.background>
  );
};

export default HighScores;
