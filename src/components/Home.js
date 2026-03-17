import React, { useState, useEffect } from "react";

function Home({ word, setWord }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [audio, setAudio] = useState(null);
  const [relatedWords, setRelatedWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  useEffect(() => {
    if (!word) return;
    setAnimateResult(false);

    const fetchWord = async () => {
      try {
        setLoading(true);
        setData(null); // clear old data
        setRelatedWords([]);

        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        );

        if (!res.ok) {
          setError("Word not found");
          setData(null);
          return;
        }

        const result = await res.json();

        if (result.title === "No Definitions Found") {
          setError("Word not found");
          setData(null);
        } else {
          setData(result[0]);
          setError("");

          const phoneticAudio = result[0].phonetics?.find((p) => p.audio);
          if (phoneticAudio) {
            setAudio(phoneticAudio.audio);
          } else {
            setAudio(null);
          }
        }
      } catch {
        setError("Error fetching word");
      } finally {
        setLoading(false);
        setAnimateResult(true);
      }
    };

    fetchWord();
  }, [word]);

  // UPDATED: combine multiple Datamuse endpoints + frequency sorting
  useEffect(() => {
    if (!word) return;

    const fetchRelated = async () => {
      try {
        const urls = [
          `https://api.datamuse.com/words?ml=${word}&max=100`,
          `https://api.datamuse.com/words?rel_syn=${word}&max=100`,
          `https://api.datamuse.com/words?rel_trg=${word}&max=100`,
          `https://api.datamuse.com/words?rel_spc=${word}&max=100`,
        ];

        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json())),
        );

        const wordMap = new Map();

        responses.forEach((list) => {
          list.forEach((item) => {
            if (!wordMap.has(item.word)) {
              wordMap.set(item.word, item.score || 0);
            } else {
              const existingScore = wordMap.get(item.word);
              wordMap.set(item.word, Math.max(existingScore, item.score || 0));
            }
          });
        });

        const sortedWords = Array.from(wordMap.entries())
          .sort((a, b) => b[1] - a[1])
          .map((entry) => entry[0]);

        setRelatedWords(sortedWords);
      } catch {
        setRelatedWords([]);
      }
    };

    fetchRelated();
  }, [word]);

  const playAudio = () => {
    if (audio) {
      const sound = new Audio(audio);
      sound.play();
    }
  };

  return (
    <>
      <style>{`

        body{
          margin:0;
          padding:0;
          background-image:url("https://images.unsplash.com/photo-1699707144193-86dcc016f56b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
          background-size:cover;
          background-position:center;
          background-attachment:fixed;
        }

        .home-container{
          padding:40px;
          max-width:1200px;
          margin:auto;
          font-family:Arial;
        }

        .layout{
          display:flex;
          gap:20px;
        }

        .related-card{
            width:260px;
            background:rgba(255, 255, 255, 0.71);
            padding:20px;
            border-radius:8px;
            backdrop-filter:blur(4px);
            height:fit-content;
            max-height:500px;
            overflow-y:auto;
            animation: relatedFade 0.6s ease;
            transition:all 0.3s ease;
            order:2;
        }

        .related-card h3{
          order:2;
        }

        .related-word{
          display:block;
          padding:6px;
          margin:4px 0;
          background:#e0e0e0;
          border-radius:5px;
          cursor:pointer;
          text-align:center;
          position:relative;
          overflow:hidden;
        }

.related-word::after{
  content:"";
  position:absolute;
  width:0;
  height:0;
  background:rgba(255,255,255,0.6);
  border-radius:50%;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  transition:width 0.4s,height 0.4s;
}

.related-word:hover::after{
  width:200%;
  height:200%;
}

        .result-card{
            flex:1;
            background:rgba(255, 255, 255, 0.71);
            padding:20px;
            border-radius:8px;
            margin-top:0px;
            backdrop-filter:blur(4px);
            animation: resultFade 0.6s ease;
            transition:all 0.3s ease;
            order:1;
        }

        .word-title{
          font-size:28px;
          font-weight:bold;
          display:flex;
          align-items:center;
          gap:10px;
        }

        .audio-btn{
          cursor:pointer;
          font-size:22px;
          border:none;
          background:none;
        }

        .phonetic{
          color:#181717;
          margin-bottom:10px;
        }

        .meaning{
          margin-top:15px;
        }

        .meaning h4{
          margin-bottom:5px;
          color:#333;
        }

        .example{
          color:#181717;
          font-style:italic;
          margin-top:5px;
        }

        .synonyms, .antonyms{
          margin-top:10px;
        }

        .tag{
          display:inline-block;
          background:#e0e0e0;
          padding:4px 8px;
          border-radius:5px;
          margin:3px;
          font-size:14px;
        }

        .error{
          color:red;
          margin-top:10px;
        }

.empty-home-wrapper{
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:70vh;
}

.empty-home{
  text-align:center;
  color:white;
  animation:fadeIn 0.8s ease;

  /* NEW CONTAINER STYLE */
  background:rgba(255, 255, 255, 0.71);
  padding:80px;
  border-radius:16px;
  backdrop-filter:blur(10px);
  box-shadow:0 10px 30px rgba(0,0,0,0.3);
  max-width:600px;
  width:100%;
}

        .empty-home{
  text-align:center;
  margin-top:100px;
  color:rgba(0, 0, 0, 0.84);
  animation:fadeIn 0.8s ease;
}

.empty-home h1{
  font-size:42px;
  margin-bottom:10px;
}

.empty-home p{
  font-size:18px;
  opacity:0.9;
  margin-bottom:25px;
}

.empty-suggestions span{
  display:inline-block;
  background:rgba(255,255,255,0.2);
  padding:8px 14px;
  margin:6px;
  border-radius:20px;
  cursor:pointer;
  backdrop-filter:blur(6px);
  transition:all 0.3s ease;
}

.empty-suggestions span:hover{
  background:white;
  color:black;
  transform:scale(1.05);
}

@keyframes fadeIn{
  from{opacity:0; transform:translateY(20px);}
  to{opacity:1; transform:translateY(0);}
}

@keyframes resultFade {
  from{
    opacity:0;
    transform:translateY(20px);
  }
  to{
    opacity:1;
    transform:translateY(0);
  }
}

@keyframes wordFade{
  from{
    opacity:0;
    transform:translateY(10px);
  }
  to{
    opacity:1;
    transform:translateY(0);
  }
}

@keyframes relatedFade {
  from{
    opacity:0;
    transform:translateX(20px);
  }
  to{
    opacity:1;
    transform:translateX(0);
  }
}

.skeleton{
  animation:skeletonPulse 1.5s infinite;
}

.skeleton-title{
  height:30px;
  width:40%;
  background:#ddd;
  margin-bottom:350px;
  border-radius:5px;
}

.skeleton-line{
  height:14px;
  width:100%;
  background:#ddd;
  margin-bottom:10px;
  border-radius:5px;
}

@keyframes skeletonPulse{
  0%{opacity:0.6;}
  50%{opacity:1;}
  100%{opacity:0.6;}
}

.slide-in{
  animation: resultSlide 0.7s cubic-bezier(.22,.61,.36,1);
}

@keyframes resultSlide{
  from{
    opacity:0;
    transform:translateY(40px) scale(0.98);
  }
  to{
    opacity:1;
    transform:translateY(0) scale(1);
  }
}

/* MOBILE OPTIMIZATION */
@media (max-width:768px){

  .layout{
    flex-direction:column;
  }

  .result-card{
    order:1;
  }

  .related-card{
    order:2;
    width:91.5%;
    max-height:none;
    display:flex;
    flex-wrap:wrap;
    gap:6px;
    justify-content:center;
  }

  .related-card h3{
    width:100%;
    text-align:center;
  }

  .related-word{
    display:inline-block;
    padding:6px 10px;
    margin:2px;
    font-size:13px;
    animation:wordFade 0.4s ease forwards;
    opacity:0;
  }

}

      `}</style>

      <div className="home-container">
        {error && <p className="error">{error}</p>}

        {/* NEW: Empty Home UI */}
        {!word && !loading && (
          <div className="empty-home-wrapper">
            <div className="empty-home">
              <h1>MyDictionary</h1>
              <p>
                Search any word to get meanings, pronunciation, synonyms,
                antonyms, and related words instantly. If you want to search for trending words go to Trending tab in navbar.
              </p>

              <div className="empty-suggestions">
                <span onClick={() => setWord("hello")}>hello</span>
                <span onClick={() => setWord("world")}>world</span>
                <span onClick={() => setWord("success")}>success</span>
                <span onClick={() => setWord("technology")}>technology</span>
                <span onClick={() => setWord("cat")}>cat</span>
                <span onClick={() => setWord("ball")}>ball</span>
                <span onClick={() => setWord("house")}>house</span>
                <span onClick={() => setWord("disaster")}>disaster</span>
                <span onClick={() => setWord("dog")}>dog</span>
                <span onClick={() => setWord("country")}>country</span>
                <span onClick={() => setWord("outskirts")}>outskirts</span>
                <span onClick={() => setWord("temperature")}>temperature</span>
                <span onClick={() => setWord("guts")}>guts</span>
                <span onClick={() => setWord("household")}>household</span>
                <span onClick={() => setWord("marriage")}>marriage</span>
                <span onClick={() => setWord("hospital")}>hospital</span>
                <span onClick={() => setWord("horse")}>horse</span>
                <span onClick={() => setWord("cattle")}>cattle</span>


              </div>
            </div>
          </div>
        )}

        <div className="layout">
          {data && (
            <div className="related-card">
              <h3>Related Words</h3>

              {relatedWords.map((w, i) => (
                <div
                  key={i}
                  className="related-word"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setWord(w)}
                >
                  {w}
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="result-card skeleton">
              <div className="skeleton-title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          )}

          {data && (
            <div className={`result-card ${animateResult ? "slide-in" : ""}`}>
              <div className="word-title">
                {data.word}

                {audio && (
                  <button className="audio-btn" onClick={playAudio}>
                    🔊
                  </button>
                )}
              </div>

              {data.phonetic && (
                <div className="phonetic">Pronunciation: {data.phonetic}</div>
              )}

              {data.meanings.map((meaning, index) => (
                <div key={index} className="meaning">
                  <h4>{meaning.partOfSpeech}</h4>

                  {meaning.definitions.slice(0, 3).map((def, i) => (
                    <div key={i}>
                      <p>• {def.definition}</p>

                      {def.example && (
                        <p className="example">Example: {def.example}</p>
                      )}

                      {def.synonyms && def.synonyms.length > 0 && (
                        <div className="synonyms">
                          ⭐ Synonyms:
                          {def.synonyms.slice(0, 5).map((syn, j) => (
                            <span key={j} className="tag">
                              {syn}
                            </span>
                          ))}
                        </div>
                      )}

                      {def.antonyms && def.antonyms.length > 0 && (
                        <div className="antonyms">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
