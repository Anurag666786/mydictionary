import React, { useEffect, useState } from "react";

function WordOfDay() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [audio, setAudio] = useState(null);
  const [example, setExample] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWordOfDay = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const stored = JSON.parse(localStorage.getItem("wordOfDay"));

        let selectedWord;

        if (stored && stored.date === today) {
          selectedWord = stored.word;
        } else {
          const randomRes = await fetch(
            "https://api.datamuse.com/words?sp=?????&max=20"
          );
          const randomData = await randomRes.json();

          selectedWord =
            randomData[Math.floor(Math.random() * randomData.length)].word;

          localStorage.setItem(
            "wordOfDay",
            JSON.stringify({ word: selectedWord, date: today })
          );
        }

        setWord(selectedWord);

        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
        );
        const dictData = await dictRes.json();

        if (dictData && dictData[0]) {
          const entry = dictData[0];

          setMeaning(
            entry.meanings[0].definitions[0].definition
          );

          const phoneticAudio = entry.phonetics?.find((p) => p.audio);
          if (phoneticAudio) {
            setAudio(phoneticAudio.audio);
          }

          const exampleText =
            entry.meanings[0].definitions[0].example;
          if (exampleText) {
            setExample(exampleText);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWordOfDay();
  }, []);

  const playAudio = () => {
    if (audio) {
      const sound = new Audio(audio);
      sound.play();
    }
  };

  return (
    <>
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Montserrat:wght@400;600&display=swap');

        .wod-container{
          display:flex;
          justify-content:center;
          align-items:flex-start;
          min-height:100vh;
          font-family: 'Poppins', sans-serif;
          margin:0;
          padding:50px 0 0 0;
          background-image:url("https://images.unsplash.com/photo-1646204635377-174ff28e0a58?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
          background-size:cover;
          background-position:center;
          background-attachment:fixed;

          animation: fadeIn 0.8s ease;
        }

        .wod-card{
          background:rgba(255, 255, 255, 0.53);
          padding:80px;
          border-radius:12px;
          backdrop-filter:blur(6px);
          text-align:center;
          max-width:600px;
          width:100%;
          box-shadow:0 10px 25px rgba(0, 0, 0, 0.51);

          animation: cardEnter 0.8s cubic-bezier(.22,.61,.36,1);
        }

        .wod-title{
          font-family:Arial;
          font-weight:600;
          font-size:37px;
          font-weight:bold;
          margin-bottom:20px;
          color:rgba(0, 0, 0, 0.84);
          animation: fadeUp 0.6s ease;
        }

        .wod-word{
          font-size:34px;
          font-weight:bold;
          color:rgba(0, 0, 0, 0.84);
          margin-bottom:15px;

          animation: popIn 0.6s ease;
        }

        .wod-meaning{
          font-family: 'Poppins', sans-serif;
          font-size:18px;
          color:#333;
          animation: fadeUp 0.8s ease;
        }

        .audio-btn{
          cursor:pointer;
          font-size:22px;
          border:none;
          background:none;
          margin-left:10px;
          transition: transform 0.2s ease;
        }

        .audio-btn:active{
          transform: scale(0.85);
        }

        .example{
          margin-top:15px;
          font-style:italic;
          color:#555;
          animation: fadeUp 1s ease;
        }

        /* 🔥 ANIMATIONS */

        @keyframes fadeIn{
          from{opacity:0;}
          to{opacity:1;}
        }

        @keyframes cardEnter{
          from{
            opacity:0;
            transform:translateY(40px) scale(0.95);
          }
          to{
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        @keyframes popIn{
          0%{
            transform:scale(0.8);
            opacity:0;
          }
          60%{
            transform:scale(1.1);
          }
          100%{
            transform:scale(1);
            opacity:1;
          }
        }

        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(20px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }
      `}</style>

      <div className="wod-container">
        <div className="wod-card">
          <div className="wod-title">Word of the Day</div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="wod-word">
                {word}
                {audio && (
                  <button className="audio-btn" onClick={playAudio}>
                    🔊
                  </button>
                )}
              </div>

              <div className="wod-meaning">{meaning}</div>

              {example && (
                <div className="example">
                  Example: {example}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WordOfDay;