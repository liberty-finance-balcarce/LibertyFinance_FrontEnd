import { useState } from "react";
import { sendContactForm } from "../services/form";
export const useContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendForm = async (datos: object) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await sendContactForm(datos);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return { sendForm, isLoading, error, isSuccess };
};
