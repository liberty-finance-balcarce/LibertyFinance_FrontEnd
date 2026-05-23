import { useState, useEffect } from "react";
import { getRankingInstrumentos } from "../services/api";
import type { RankingData } from "../types/instrumento-financiero";

export const useRankingInstrumentos = () => {
  const [data, setData] = useState<RankingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadRanking = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const ranking = await getRankingInstrumentos({ orderby: 'rendimiento:DESC', limit: 8 });
        if (!cancelled) setData(ranking);
      } catch (err: any) {
        if (!cancelled) {
          console.error("Error al cargar el ranking de instrumentos:", err);
          setError(err.message || "Error desconocido al cargar los datos.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadRanking();
    return () => { cancelled = true; };
  }, []);

  return { data, isLoading, error };
};