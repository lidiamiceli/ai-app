# AI Story Generator

## Descrizione

AI Story Generator è un'applicazione basata su Next.js che utilizza l'intelligenza artificiale per generare storie personalizzate. Gli utenti possono inserire dettagli come il nome del protagonista, dell'antagonista, il genere della storia, e l'ambientazione. È possibile scegliere se la storia è destinata a un pubblico adulto o per bambini. Inoltre, l'app offre la funzionalità di lettura vocale del racconto generato tramite l'API Web Speech.

## Funzionalità

- **Generazione di storie personalizzate**: L'app utilizza l'intelligenza artificiale di Google Generative AI per creare racconti in base agli input dell'utente.
- **Input personalizzati**: L'utente può scegliere il nome del protagonista, dell'antagonista, il genere della storia e l'ambientazione.
- **Selezione PEGI**: Possibilità di creare storie per adulti o bambini.
- **Lettura vocale**: Una volta generato il racconto, l'utente può far leggere la storia dall'applicazione tramite l'API Web Speech, con la possibilità di fermare la lettura.
- **Caricamento con animazione**: Mentre l'AI genera la storia, viene mostrato un'animazione di caricamento.

## Tecnologie utilizzate

- **Next.js**: Framework di React per creare l'applicazione web.
- **Google Generative AI**: Per generare i racconti in base agli input dell'utente.
- **Web Speech API**: Per la lettura vocale del testo generato.
- **SCSS**: Per la gestione dello stile, inclusa l'animazione del caricamento.



## Utilizzo

1. Inserisci il nome del protagonista e dell'antagonista.
2. Seleziona il genere della storia (es: fantasy, horror, ecc.).
3. Seleziona l'ambientazione.
4. Scegli se la storia è per adulti o per bambini.
5. Clicca su **Genera** per creare la tua storia.
6. Dopo la generazione della storia, puoi cliccare su **Racconta** per ascoltare il racconto, oppure su **Stop** per fermare la lettura.

## Funzionalità aggiuntive

- **Animazione di caricamento**: Durante la generazione della storia, viene visualizzata un'animazione con un blob rotante.
- **Accessibilità**: L'app supporta la lettura vocale del racconto generato tramite un sintetizzatore vocale.
