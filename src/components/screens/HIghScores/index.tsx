// HighScores.tsx ou componente similar
import React, { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import * as S from "./styles";
import router from "next/router";

interface Score {
  id: string;
  playerName: string;
  score: number;
}

const HighScores = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scoresData = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Score),
        id: doc.id,
      }));
      console.log(scoresData);
      setScores(scoresData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <S.background>
      <S.Text style={{ fontSize: 50, marginBottom: 30 }}>High Scores</S.Text>
      <S.HighScoreContainer>
        {isLoading ? (
          <S.Text>Carregando...</S.Text>
        ) : (
          scores.map((score) => (
            <S.Text key={score.id}>
              {score.playerName}: {score.score}
            </S.Text>
          ))
        )}
      </S.HighScoreContainer>
      <S.Button onClick={() => router.push("/Home")}>Voltar</S.Button>
    </S.background>
  );
};

export default HighScores;
