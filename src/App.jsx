import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Typewriter } from "react-simple-typewriter";
import { useEffect } from "react";

import {
  FaGift,
  FaPlay,
  FaTrophy,
} from "react-icons/fa";

import "./App.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const [name, setName] = useState("");

  const cardRef = useRef(null);

  const handleOpen = () => {
    if (!name.trim()) return;

    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 },
    });

    setOpen(true);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rotateX =
      (window.innerHeight / 2 - e.clientY) / 30;

    const rotateY =
      (window.innerWidth / 2 - e.clientX) / 30;

    cardRef.current.style.transform =
      `rotateX(${rotateX}deg)
       rotateY(${-rotateY}deg)`;
  };

  const resetTilt = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  };
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");

    audioRef.current.loop = true;

    audioRef.current.volume = 0.18;

    audioRef.current.play().catch(() => {
      document.addEventListener(
        "click",
        () => {
          audioRef.current.play();
        },
        { once: true }
      );
    });

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div
      className="page"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      {/* Meteor Background */}
      <div className="meteors">
        {[...Array(20)].map((_, index) => (
          <span
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Landing Screen */}
      {!open ? (
        <div className="hero">

          <FaTrophy className="logo" />

          <h1>Birthday Mode</h1>

          <p>
            Built for someone worth celebrating
          </p>

          <input
            type="text"
            placeholder="Enter celebrant name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <button onClick={handleOpen}>
            <FaPlay />
            <span>
              Start Experience
            </span>
          </button>

        </div>
      ) : (

        /* Birthday Card */
        <div
          className="card"
          ref={cardRef}
        >

          
        <div className="title">

          <h1>
            Happy Birthday
          </h1>

          <h2>
            {name}
          </h2>

        </div>



          <div className="typing">

            <Typewriter
              words={[
                "Another year.",
                "Another level unlocked.",
                "More wins ahead.",
                "Keep moving upward.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={55}
            />

          </div>

          <button
            className="unlock"
            onClick={() =>
              setUnlock(true)
            }
          >
            <FaGift />
            <span>
              Unlock Message
            </span>
          </button>

          {unlock && (
            <div
              className={`message ${
                unlock ? "show" : ""
              }`}
            >

              <h3>
                🏆 Achievement Unlocked
              </h3>

              <p>
                Wishing you growth,
                good health,
                bigger opportunities
                and wins that match
                your effort.

                Keep building.

                Keep winning.
              </p>

            </div>
          )}

        </div>

      )}
    </div>
  );
}
