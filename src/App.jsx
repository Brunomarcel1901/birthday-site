import { useEffect, useRef, useState } from "react";

import confetti from "canvas-confetti";

import { Typewriter } from "react-simple-typewriter";

import {
  FaGift,
  FaPlay,
  FaTrophy,
} from "react-icons/fa";

import "./App.css";

export default function App() {

  const [open, setOpen] =
    useState(false);

  const [unlock, setUnlock] =
    useState(false);

  const [name, setName] =
    useState("");

  const [shake, setShake] =
    useState(false);

  const audioRef =
    useRef(null);

  /* ====================
     MUSIC
  ==================== */

  useEffect(() => {

    audioRef.current =
      new Audio("/music.mp3");

    audioRef.current.loop =
      true;

    audioRef.current.volume =
      0.18;

    audioRef.current
      .play()

      .catch(() => {

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

  /* ====================
     START EXPERIENCE
  ==================== */

  const handleOpen = () => {

    if (!name.trim())
      return;

    confetti({

      particleCount: 180,

      spread: 90,

      origin: {
        y: 0.6
      }

    });

    setOpen(true);

  };

  /* ====================
     UNLOCK MESSAGE
  ==================== */

  const unlockMessage = () => {

    setShake(true);

    setTimeout(() => {

      setShake(false);

      setUnlock(true);

    }, 250);

  };

  return (

    <div
      className="page"
    >

      {/* METEORS */}

      <div className="meteors">

        {

          [...Array(20)]

          .map((_, i) => (

            <span

              key={i}

              style={{

                left:

                  `${Math.random()*100}%`,

                animationDelay:

                  `${i*.45}s`

              }}

            />

          ))

        }

      </div>

      {/* CONTENT */}

      <div className="content">

        {

          !open ? (

            <div
              className="hero"
            >

              <FaTrophy
                className="logo"
              />

              <h1>
                Birthday Package
              </h1>

              <p>

                Built for
                someone worth
                celebrating

              </p>

              <input

                placeholder=

                "Celebrant name"

                value={name}

                onChange={(e)=>

                  setName(
                    e.target.value
                  )

                }

              />

              <button

                onClick={
                  handleOpen
                }

              >

                <FaPlay />

                Start Experience

              </button>

            </div>

          ) : (

            <div

              className={`

                card

                ${

                  shake

                  ?

                  "shake"

                  :

                  ""

                }

              `}

            >

              <div
                className="title"
              >

                <h1>

                  Happy Birthday

                </h1>

                <h2>

                  {name}

                </h2>

              </div>

              <div
                className="typing"
              >

                <Typewriter

                  words={[

                    "Another year.",

                    "Another level unlocked.",

                    "More wins ahead.",

                    "Keep moving upward."

                  ]}

                  loop={0}

                  cursor

                  typeSpeed={55}

                />

              </div>

              <button

                className=

                "unlock"

                onClick={

                  unlockMessage

                }

              >

                <FaGift />

                Unlock Message

              </button>

              <div

                className={`

                  message

                  ${

                    unlock

                    ?

                    "show"

                    :

                    ""

                  }

                `}

              >

                <h3>

                  🏆 Achievement Unlocked

                </h3>

                <p>

                  Wishing you
                  growth,
                  good health,
                  solid memories
                  and opportunities
                  that match
                  your effort.

                </p>

                <p>

                  Keep building.

                  Keep winning.

                </p>

                <p>

                  Happy Birthday.

                </p>

              </div>

            </div>

          )

        }

        {/* SIGNATURE */}

        <footer
          className="signature"
        >

          <div
            className=

            "signature-line"

          />

          <p>

            Genuine wishes from.....

          </p>

          <span>

            Sylvie🧡

          </span>

        </footer>

      </div>

    </div>

  );

}
