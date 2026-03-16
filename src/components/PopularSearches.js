import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PopularSearches({ setWord }) {

  const [trendingWords, setTrendingWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchTrending = async () => {

      try {

        const res = await fetch(
          "https://api.datamuse.com/words?sp=*&max=50"
        );

        const data = await res.json();

        const words = data
          .map((item) => item.word)
          .slice(0, 30);

        setTrendingWords(words);

      } catch {
        setTrendingWords([]);
      }

      setLoading(false);
    };

    fetchTrending();

  }, []);

  return (
    <>
      <style>{`

      body{
        margin:0;
        background-image:url("https://images.unsplash.com/photo-1649077547255-b6828d593d56?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        background-size:cover;
        background-attachment:fixed;
        font-family:Arial;
      }

      .popular-container{
        max-width:1100px;
        margin:auto;
        padding:40px;
      }

      .popular-box{
        background:rgba(255, 255, 255, 0.71);
        backdrop-filter:blur(10px);
        border-radius:15px;
        padding:40px;
        box-shadow:0 10px 30px rgba(0,0,0,0.25);
        animation:containerFade 0.8s ease;
      }

      .title{
        font-size:30px;
        font-weight:bold;
        margin-bottom:30px;
        color: #000000;
        text-align:center;
        animation:titleSlide 0.8s ease;
      }

      .words-grid{
        display:flex;
        flex-wrap:wrap;
        gap:12px;
        justify-content:center;
      }

      .word-chip{
        background:rgba(255,255,255,0.85);
        padding:10px 16px;
        border-radius:20px;
        cursor:pointer;
        transition:all 0.25s ease;
        backdrop-filter:blur(4px);
        position:relative;
        overflow:hidden;
        animation:chipFade 0.5s ease forwards;
        opacity:0;
      }

      .word-chip::after{
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

      .word-chip:hover::after{
        width:200%;
        height:200%;
      }

      .word-chip:hover{
        transform:translateY(-4px) scale(1.05);
        background:white;
        box-shadow:0 6px 14px rgba(0,0,0,0.25);
      }

      .loading{
        text-align:center;
        color:white;
        font-size:16px;
      }

      @keyframes containerFade{
        from{
          opacity:0;
          transform:translateY(20px) scale(0.98);
        }
        to{
          opacity:1;
          transform:translateY(0) scale(1);
        }
      }

      @keyframes titleSlide{
        from{
          opacity:0;
          transform:translateY(-20px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      @keyframes chipFade{
        from{
          opacity:0;
          transform:translateY(15px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      `}</style>

      <div className="popular-container">

        <div className="popular-box">

          <div className="title">Trending Searches</div>

          {loading && <div className="loading">Loading trending words...</div>}

          <div className="words-grid">

            {trendingWords.map((word, index) => (
              <div
                key={index}
                className="word-chip"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => {
                  setWord(word);
                  navigate("/");
                }}
              >
                {word}
              </div>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default PopularSearches;

