import Head from "next/head";
import style from "@/styles/Home.module.css";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/WindowBox/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { useState } from "react";
import { listaGeneri } from "@/constants/common";
import Button from "@/components/Atom/Button/Button";

export default function Home() {
  const [titolo, setTitolo] = useState("");
  const [autore, setAutore] = useState("");
  const [genere, setGenere] = useState("");

  const handleGenerate = () => {
    console.log({ titolo, autore, genere });
  };

  return (
    <>
      <Head>
        <title>AI Book Generator</title>
        <meta name="description" content="AI based app to generate book concepts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title="AI Book Generator" />
        <div className={style.content}>
          <WindowBox title="Book Parameters">
            <div className={style.container}>
              <InputBox
                label="Titolo del Libro:"
                value={titolo}
                setValue={setTitolo}
              />
              <InputBox
                label="Nome Autore:"
                value={autore}
                setValue={setAutore}
              />
            </div>
            <div className={style.container}>
              <SelectBox
                label="Genere:"
                list={listaGeneri}
                setAction={setGenere}
              />
            </div>
            <Button
              label="Genera"
              onClick={handleGenerate}
              disabled={
                titolo.trim().length <= 0 ||
                autore.trim().length <= 0 ||
                genere.trim().length <= 0
              }
            />
          </WindowBox>
        </div>
      </main>
    </>
  );
}
