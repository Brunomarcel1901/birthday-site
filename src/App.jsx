import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Typewriter } from "react-simple-typewriter";
import { FaGift, FaMusic, FaEnvelopeOpen } from "react-icons/fa";
import "./App.css";

export default function App() {

const audioRef = useRef(null);
const cardRef = useRef(null);

const [open, setOpen] = useState(false);
const [showGift, setShowGift] = useState(false);
const [openEnvelope, setOpenEnvelope] = useState(false);

useEffect(() => {
audioRef.current = new Audio("/music.mp3");
audioRef.current.loop = true;
audioRef.current.volume = 0.25;

audioRef.current.play().catch(() => {
document.addEventListener("click", () => {
audioRef.current.play();
}, { once: true });
});
}, []);

/* 🎊 CONFETTI ON OPEN */
const handleOpen = () => {
confetti({
particleCount: 160,
spread: 90,
origin: { y: 0.6 }
});
setOpen(true);
};

/* 🎮 3D TILT EFFECT */
const handleMouseMove = (e) => {
const el = cardRef.current;
if (!el) return;

const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

el.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
};

const resetTilt = () => {
const el = cardRef.current;
if (!el) return;
el.style.transform = "rotateY(0deg) rotateX(0deg)";
};

return (
<div className="page" onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>

  {/* 🌌 GALAXY LAYERS */}
<div className="galaxy">

<div className="layer stars"></div>
<div className="layer stars2"></div>
<div className="layer glow"></div>

</div>


{/* METEORS */}
<div className="meteors">
{[...Array(18)].map((_, i) => (
<span key={i}
style={{ left: `${Math.random()*100}%`, animationDelay: `${i*0.4}s` }}
/>
))}
</div>

{/* TWINKLES */}
<div className="twinkles">
{[...Array(40)].map((_, i) => (
<i key={i}
style={{
top: `${Math.random()*100}%`,
left: `${Math.random()*100}%`,
animationDelay: `${Math.random()*3}s`
}}
/>
))}
</div>

{!open ? (
<div className="hero">
<h1>For Someone Elegant</h1>
<p>A birthday surprise crafted with care</p>
<button onClick={handleOpen}>Open</button>
</div>
) : (

<div className="card" ref={cardRef}>

<div className="music">
<FaMusic /> Soft ambience
</div>

<h1>Happy Birthday ✨</h1>

{/* 💌 ENVELOPE 3D FLIP */}
<div
className={`envelope ${openEnvelope ? "open" : ""}`}
onClick={() => setOpenEnvelope(true)}
>

<div className="envelope-inner">

{/* front */}
<div className="envelope-front">
<FaEnvelopeOpen />
<p>Tap to open letter</p>
</div>

{/* back / letter */}
<div className="envelope-back">
<div className="letter-content">
<Typewriter
words={[
"May your days be soft...",
"your heart be light...",
"and your year be beautiful 🤍"
]}
loop={5}
cursor
cursorStyle="|"
typeSpeed={50}
deleteSpeed={30}
delaySpeed={1200}
/>
</div>
</div>

</div>

</div>

<div className="gift" onClick={() => setShowGift(true)}>
<FaGift />
</div>

{showGift && (
<div className="message">
You deserve beautiful things. Stay graceful. Keep shining 🤍
</div>
)}

</div>

)}

</div>
);
}
