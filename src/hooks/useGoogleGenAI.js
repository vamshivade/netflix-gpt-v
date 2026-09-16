import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGoogleAIClient } from "../api/googleGenai";
import { setIsGptLoading } from "../redux/searchGptSlice";

const useGoogleGenAI = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState("");

  const fetchGoogleAI = async (query) => {
    const trimmedQuery = query?.trim();

    if (!trimmedQuery) {
      setErrorMessage("Please enter a movie name to search.");
      return;
    }

    const client = getGoogleAIClient();

    if (!client) {
      setErrorMessage(
        "Gemini API key is missing. Add REACT_APP_GEMINI_API_KEY in your .env file.",
      );
      return;
    }

    dispatch(setIsGptLoading(true));
    setErrorMessage("");

    try {
      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: trimmedQuery,
      });

      const textResponse = response?.text || "No response received.";
      setResult(textResponse);
    } catch (error) {
      console.error("Gemini request failed:", error);
      setErrorMessage(
        "Something went wrong while fetching the Gemini response.",
      );
      setResult("");
    } finally {
      dispatch(setIsGptLoading(false));
    }
  };

  return { fetchGoogleAI, errorMessage, result };
};

export default useGoogleGenAI;
