import React, { useEffect, useState } from "react";

function WordOfDay() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [audio, setAudio] = useState(null);
  const [example, setExample] = useState("");
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

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
            "https://api.datamuse.com/words?sp=?????&max=20",
          );
          const randomData = await randomRes.json();

          selectedWord =
            randomData[Math.floor(Math.random() * randomData.length)].word;

          localStorage.setItem(
            "wordOfDay",
            JSON.stringify({ word: selectedWord, date: today }),
          );
        }

        setWord(selectedWord);

        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`,
        );
        const dictData = await dictRes.json();

        if (dictData && dictData[0]) {
          const entry = dictData[0];

          setData(entry);

          const phoneticAudio = entry.phonetics?.find((p) => p.audio);
          if (phoneticAudio) {
            setAudio(phoneticAudio.audio);
          }

          const exampleText = entry.meanings[0].definitions[0].example;
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

  const handleWordClick = () => {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 400); // duration of animation
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
          text-align:left;
          max-width:800px;
          width:100%;
          box-shadow:0 10px 25px rgba(0, 0, 0, 0.51);

          animation: cardEnter 0.8s cubic-bezier(.22,.61,.36,1);
          overflow:hidden;
        }

        .wod-title{
          font-family:Arial;
          font-weight:600;
          text-align:center;
          font-size:37px;
          font-weight:bold;
          margin-bottom:20px;
          color:rgba(0, 0, 0, 0.84);
          animation: fadeUp 0.6s ease;
        }

       .wod-word{
        position:relative;
        display:inline-block;
        padding:5px 18px;
        border-radius:50px;
        background:rgba(255,255,255,0.4);
        backdrop-filter:blur(8px);
        cursor:pointer;

        font-size:34px;
        font-weight:bold;
        text-align:center;
        color:rgba(0, 0, 0, 0.84);
        margin-bottom:15px;

        animation: popIn 0.6s ease;
        transition:all 0.3s ease;
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

        .tag{
          display:inline-block;
          background:#e0e0e0;
          padding:4px 8px;
          border-radius:5px;
          margin:3px;
          font-size:13px;
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

/* 🌟 BUBBLE STYLE */


/* ✨ HOVER GLOW */
.wod-word:hover{
  transform:scale(1.05);
  box-shadow:0 0 15px rgba(0,0,0,0.2);
}

/* 💥 CLICK ANIMATION */
.wod-clicked{
  animation: clickPop 0.4s ease;
}

/* 🔥 RIPPLE EFFECT */
.wod-word::after{
  content:"";
  position:absolute;
  top:50%;
  left:50%;
  width:0;
  height:0;
  background:rgba(255, 255, 255, 0.49);
  border-radius:50%;
  transform:translate(-50%,-50%);
  opacity:0;
}

.wod-clicked::after{
  animation: ripple 0.4s ease;
}

/* 🎬 KEYFRAMES */
@keyframes clickPop{
  0%{ transform:scale(1); }
  50%{ transform:scale(1.2); }
  100%{ transform:scale(1); }
}

@keyframes ripple{
  0%{
    width:0;
    height:0;
    opacity:0.6;
  }
  100%{
    width:200%;
    height:200%;
    opacity:0;
  }
}

/* 📱 MOBILE OPTIMIZATION */
@media (max-width:768px){

  .wod-container{
    padding:20px 10px 0 10px;
    align-items:flex-start;
  }

  .wod-card{
    padding:25px 18px;
    border-radius:14px;
    max-width:100%;
  }

  .wod-title{
    font-size:26px;
    margin-bottom:15px;
  }

  .wod-word{
    font-size:24px;
    padding:6px 14px;
    margin-bottom:12px;
  }

  .audio-btn{
    font-size:18px;
    margin-left:6px;
  }

  .wod-meaning{
    font-size:15px;
  }

  .wod-meaning h4{
    font-size:16px;
    margin-top:10px;
  }

  .example{
    font-size:14px;
  }

  .tag{
    font-size:12px;
    padding:3px 6px;
    margin:2px;
  }

  /* 🔥 Fix long words breaking layout */
  .wod-word, .wod-meaning p{
    word-wrap:break-word;
    overflow-wrap:break-word;
  }

  /* 🔥 Better spacing for meanings */
  .wod-meaning{
    margin-bottom:10px;
  }

  .wod-word{
  display:inline-flex;
  align-items:center;
  justify-content:center;
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
              <div
                className={`wod-word ${clicked ? "wod-clicked" : ""}`}
                onClick={handleWordClick}
              >
                {word}
                {audio && (
                  <button className="audio-btn" onClick={playAudio}>
                    🔊
                  </button>
                )}
              </div>

              {data &&
                data.meanings.map((meaning, index) => (
                  <div key={index} className="wod-meaning">
                    <h4>{meaning.partOfSpeech}</h4>

                    {meaning.definitions.slice(0, 2).map((def, i) => (
                      <div key={i}>
                        <p>• {def.definition}</p>

                        {def.example && (
                          <div className="example">Example: {def.example}</div>
                        )}

                        {def.synonyms && def.synonyms.length > 0 && (
                          <div>
                            ⭐ Synonyms:
                            {def.synonyms.slice(0, 5).map((syn, j) => (
                              <span key={j} className="tag">
                                {syn}
                              </span>
                            ))}
                          </div>
                        )}

                        {def.antonyms && def.antonyms.length > 0 && (
                          <div>
                            ⚡ Antonyms:
                            {def.antonyms.slice(0, 5).map((ant, j) => (
                              <span key={j} className="tag">
                                {ant}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

              {example && <div className="example">Example: {example}</div>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WordOfDay;
