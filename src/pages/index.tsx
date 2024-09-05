import Head from "next/head";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/WindowBox/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { useState } from "react";
import { listaGeneri, listaAmbientazioni } from "@/constants/common";
import Button from "@/components/Atom/Button/Button";
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";
import SwitchBox from "@/components/Molecules/SwitchBox/SwitchBox";
import Toast from "@/components/Atom/Toast/Toast";

export default function Home() {
  const [protagonista, setProtagonista] = useState("");
  const [antagonista, setAntagonista] = useState("");
  const [genere, setGenere] = useState("");
  const [ambientazione, setAmbientazione] = useState("");
  const [pegi18, setPegi18] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);

    const prompt = `genera un racconto ${genere} ${ambientazione} per ${pegi18 ? "adulti" : "bambini"}, con il protagonista chiamato ${protagonista} e l'antagonista chiamato ${antagonista}.`;

    if (!process.env.NEXT_PUBLIC_GEMINI_KEY) {
      console.error("API key not found.");
      setResponse("La chiave API non è configurata.");
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log("Generating content with prompt:", prompt);
      const result = await model.generateContent(prompt);
      console.log("API result:", result);

      const output = (
        result.response.candidates as GenerateContentCandidate[]
      )[0]?.content?.parts[0]?.text;

      if (output) {
        setResponse(output);
      } else {
        setResponse("Nessun contenuto generato.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse("Si è verificato un errore durante la generazione del contenuto.");
      setError(true);
    }
    setLoading(false);
  };

  const handleVoice = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "it-IT";
    setIsPlaying(true);
    speechSynthesis.speak(utterance);
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsPlaying(false);
    };
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <>
      <Head>
        <title>AI Story Generator</title>
        <meta name="description" content="AI based app to generate stories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title="AI Story Generator" />
        <div className={style.content}>
          {error && (
            <Toast
              setAction={setError}
              title="Errore"
              message="Errore nella creazione del racconto"
            />
          )}
          <div className={style["window-box-container"]}>
            <WindowBox title="GENERATE YOUR STORY">
              <div className={style.container}>
                <InputBox label="Protagonista:" value={protagonista} setValue={setProtagonista} />
                <InputBox label="Antagonista:" value={antagonista} setValue={setAntagonista} />
                <SelectBox label="Genere:" list={listaGeneri} setAction={setGenere} />
                <SelectBox label="Ambientazione:" list={listaAmbientazioni} setAction={setAmbientazione} />
                <SwitchBox label="Per Adulti:" value={pegi18} setValue={setPegi18} />
                <Button
                  label="Genera"
                  onClick={handleGenerate}
                  disabled={
                    protagonista.trim().length <= 0 ||
                    antagonista.trim().length <= 0 ||
                    genere.trim().length <= 0 ||
                    loading
                  }
                />
              </div>
            </WindowBox>
          </div>

          <div className={style.result}>
            {loading ? (
              <div className={style.loading}>
                <div className={style.blob}></div>
              </div>
            ) : (
              response && (
                <div className={style.result}>
                  <div className={style.btn}>
                    {isPlaying ? (
                      <Button label="Stop" onClick={handleStopVoice} />
                    ) : (
                      <Button label="Racconta" onClick={handleVoice} />
                    )}
                  </div>
                  <p>{response}</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}
