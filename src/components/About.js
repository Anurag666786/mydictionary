import React from "react";

function About() {

  return (
    <>
      <style>{`

       body{
          margin:0;
          padding:0;
          background-image:url("https://images.unsplash.com/photo-1580192270066-bed2e3055024?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
          background-size:cover;
          background-position:center;
          background-attachment:fixed;
        }

      .about-container{
        max-width:900px;
        margin:auto;
        padding:40px 20px;
        font-family:Arial, Helvetica, sans-serif;

        animation: fadeSlide 1s ease forwards;
      }

      .about-title{
        font-size:36px;
        font-weight:bold;
        margin-bottom:20px;
        color: #ffffff;

        opacity:0;
        transform: translateY(20px);
        animation: titleReveal 1s ease forwards;
        animation-delay:0.3s;
      }

      .about-text{
        font-size:18px;
        line-height:1.7;
        color: #ffffffd7;
        margin-bottom:20px;

        opacity:0;
        transform: translateY(20px);
        animation: textReveal 1s ease forwards;
      }

      .about-text:nth-of-type(1){
        animation-delay:0.6s;
      }

      .about-text:nth-of-type(2){
        animation-delay:0.9s;
      }

      .about-box{
        background: rgba(255, 255, 255, 0);
        backdrop-filter: blur(8px);
        padding:25px;
        border-radius:10px;
        margin-top:25px;

        opacity:0;
        transform: translateY(20px);
        animation: textReveal 1s ease forwards;
        animation-delay:1.2s;
      }

      .feature-list{
        margin-top:10px;
        padding-left:20px;
      }

      .features{
        font-size:36px;
        font-weight:bold;
        margin-bottom:20px;
        color: #ffffff;

        opacity:0;
        transform: translateY(20px);
        animation: textReveal 1s ease forwards;
        animation-delay:1.3s;
      }
      
      .feature-list li{
        margin-bottom:10px;
        color: #ffffffd7;

        opacity:0;
        transform: translateX(-10px);
        animation: listReveal 0.6s ease forwards;
      }

      .feature-list li:nth-child(1){animation-delay:1.4s;}
      .feature-list li:nth-child(2){animation-delay:1.5s;}
      .feature-list li:nth-child(3){animation-delay:1.6s;}
      .feature-list li:nth-child(4){animation-delay:1.7s;}
      .feature-list li:nth-child(5){animation-delay:1.8s;}
      .feature-list li:nth-child(6){animation-delay:1.9s;}
      .feature-list li:nth-child(7){animation-delay:2s;}
      .feature-list li:nth-child(8){animation-delay:2.1s;}
      .feature-list li:nth-child(9){animation-delay:2.2s;}

      .feature-list li:hover{
        transform:translateX(8px);
        transition:0.3s;
        color:white;
      }

      .about-footer{
        margin-top:40px;
        font-size:16px;
        color:#aaa;

        opacity:0;
        animation: footerFade 1s ease forwards;
        animation-delay:2.3s;
      }

      .about-footer:nth-of-type(2){
        animation-delay:2.5s;
      }

      @keyframes fadeSlide{
        from{
          opacity:0;
          transform:translateY(30px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      @keyframes titleReveal{
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      @keyframes textReveal{
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      @keyframes listReveal{
        to{
          opacity:1;
          transform:translateX(0);
        }
      }

      @keyframes footerFade{
        to{
          opacity:1;
        }
      }

      @media (max-width:768px){

        .about-title{
          font-size:28px;
        }

        .about-text{
          font-size:16px;
        }

      }

      `}</style>

      <div className="about-container">

        <div className="about-title">
          MyDictionary
        </div>

        <p className="about-text">
          MyDictionary is a web project built and owned by Anurag Developers © to make looking up words
          quick and convenient. Instead of opening multiple sites or searching
          through long pages, you can simply type a word and get useful
          information instantly.
        </p>

        <p className="about-text">
          The website was built with React and focuses on keeping things simple,
          clean, and easy to use. Whether you're studying, writing, or just
          curious about a word, the goal is to help you find what you're looking
          for without distractions.
        </p>

        <div className="about-box">

          <div className="features">
          Features
          </div>

          <ul className="feature-list">
            <li> Quick and easy word search</li>
            <li> Smart suggestions while typing</li>
            <li> Gives related words to the word searched</li>
            <li> Gives examples with the word used in sentences</li>
            <li> Gives audio pronunciation for the words</li>
            <li> Synonmyms and antonyms for the words</li>
            <li> Nouns, verbs, adjectives and adverbs of the words</li>
            <li> Top trending words and searches</li>
            <li> Word of the day</li>
            <li> Built for both phones and desktops</li>
            <li> Simple and distraction-free design</li>
          </ul>

        </div>

        <div className="about-footer">
          Built and Owned by Anurag Developers ©
        </div>

        <div className="about-footer">
          © 2026 Anurag Developers | All Rights Reserved
        </div>

      </div>
    </>
  );
}

export default About;