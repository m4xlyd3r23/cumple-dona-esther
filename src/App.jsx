import { useEffect, useRef, useState } from "react";
import "./App.css";
import birthdayBackground from "./assets/images/birthday-candles.png";
import cakeImage from "./assets/images/torta.png";
import birthdayMusic from "./assets/audio/cumpleanos.mp3";

const PASSWORD = "0710";

const stickers = [
  { icon: "🎈", left: "4%", top: "8%", delay: "0s", duration: "8s" },
  { icon: "🎁", left: "13%", top: "20%", delay: "1.5s", duration: "9s" },
  { icon: "🎉", left: "23%", top: "7%", delay: "2s", duration: "7s" },
  { icon: "🎂", left: "33%", top: "17%", delay: "0.8s", duration: "9s" },
  { icon: "✨", left: "43%", top: "6%", delay: "2.5s", duration: "8s" },
  { icon: "🎈", left: "54%", top: "13%", delay: "1s", duration: "9s" },
  { icon: "🎁", left: "65%", top: "6%", delay: "2.8s", duration: "8s" },
  { icon: "🎉", left: "76%", top: "18%", delay: "0.4s", duration: "9s" },
  { icon: "🎂", left: "87%", top: "8%", delay: "2.2s", duration: "8s" },
  { icon: "🎈", left: "95%", top: "21%", delay: "1s", duration: "10s" },
  { icon: "✨", left: "8%", top: "48%", delay: "2s", duration: "8s" },
  { icon: "🎁", left: "21%", top: "62%", delay: "0.5s", duration: "9s" },
  { icon: "🎉", left: "36%", top: "53%", delay: "2.7s", duration: "8s" },
  { icon: "🎂", left: "64%", top: "56%", delay: "1.3s", duration: "9s" },
  { icon: "🎈", left: "79%", top: "47%", delay: "2.5s", duration: "8s" },
  { icon: "🎁", left: "92%", top: "63%", delay: "0.7s", duration: "9s" },
  { icon: "✨", left: "10%", top: "82%", delay: "1.8s", duration: "8s" },
  { icon: "🎉", left: "28%", top: "76%", delay: "3s", duration: "9s" },
  { icon: "🎈", left: "48%", top: "86%", delay: "1.1s", duration: "8s" },
  { icon: "🎂", left: "69%", top: "79%", delay: "2.4s", duration: "9s" },
  { icon: "🎁", left: "86%", top: "84%", delay: "0.6s", duration: "8s" }
];

const candlePositions = [
  { left: "28.5%", top: "17%", size: "medium" },
  { left: "35.5%", top: "23%", size: "short" },
  { left: "38.5%", top: "11.5%", size: "tall" },
  { left: "44.5%", top: "19.5%", size: "medium" },
  { left: "50.5%", top: "8.5%", size: "tall" },
  { left: "56.5%", top: "19.5%", size: "medium" },
  { left: "61.5%", top: "11.5%", size: "tall" },
  { left: "64.5%", top: "23%", size: "short" },
  { left: "71.5%", top: "17%", size: "medium" }
];

const letterParagraphs = [
  "Hoy celebramos mucho más que un cumpleaños. Celebramos la vida de una persona verdaderamente especial, alguien que día a día demuestra que no existen obstáculos capaces de hacerla rendirse.",
  "Eres una persona fuerte, de carácter firme y con una determinación admirable; alguien que sabe levantarse, continuar y seguir adelante incluso cuando las cosas no son sencillas.",
  "Pero detrás de esa fortaleza también existe un corazón sensible, lleno de cariño y capaz de preocuparse por los demás. Una persona que sabe entregar amor de muchas maneras, incluso mediante esos pequeños detalles que quizá no siempre se dicen con palabras, pero que se sienten profundamente.",
  "Admiramos esa manera tuya de enfrentar la vida, de luchar por lo que quieres y de perseguir cada una de tus metas y sueños con esa fuerza que te caracteriza.",
  "Sabemos que el camino no siempre ha sido sencillo y que has tenido que superar momentos buenos y difíciles. Sin embargo, cada experiencia te ha ayudado a convertirte en la gran mujer que eres hoy.",
  "En este día queremos recordarte lo valiosa y especial que eres para quienes te rodean. Deseamos de todo corazón que nunca te falten motivos para sonreír, personas que te quieran, momentos que llenen tu vida de alegría y fuerzas para continuar alcanzando todo aquello que te propongas.",
  "Que esta nueva etapa de tu vida llegue acompañada de tranquilidad, salud, amor, felicidad y muchísimas razones para disfrutar cada día. Que cada nuevo amanecer te recuerde lo importante que eres y todo lo bueno que todavía está por llegar.",
  "Gracias por ser esa persona fuerte, sensible, luchadora y especial que tanto admiramos. Esperamos que este pequeño regalo pueda devolverte, aunque sea por un momento, un poquito de todo el cariño que mereces."
];

function MusicButton({ audioRef, muted, setMuted }) {
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setMuted(false)).catch(() => {});
    } else {
      audio.pause();
      setMuted(true);
    }
  };

  return (
    <button
      type="button"
      className="music-button"
      onClick={toggleMusic}
      aria-label={muted ? "Activar música" : "Silenciar música"}
      title={muted ? "Activar música" : "Silenciar música"}
    >
      {muted ? "♫̸" : "♫"}
    </button>
  );
}

function BirthdayLetter({ letterOpen, onOpen }) {
  const handleKeyDown = (event) => {
    if (
      !letterOpen &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <main className="letter-scene">
      <div className="letter-glow" />

      <div className="letter-particles" aria-hidden="true">
        <span>✦</span>
        <span>✧</span>
        <span>·</span>
        <span>✦</span>
        <span>·</span>
        <span>✧</span>
      </div>

      {!letterOpen && (
        <header className="letter-intro">
          <p>UN ÚLTIMO DETALLE</p>
          <h1>Hay algo más para ti...</h1>
          <span>Haz clic sobre el sobre para abrirlo</span>
        </header>
      )}

      <div className={`envelope-wrapper ${letterOpen ? "is-open" : ""}`}>
        <div className="envelope-back" aria-hidden="true" />

        <article className="letter-paper" aria-label="Carta de cumpleaños">
          <div className="letter-content">
            <p className="letter-title">
              Para ti, en este día tan especial
            </p>

            <div className="letter-line" />

            <p className="letter-from">
              De parte de Yonamine y Marcelo
            </p>

            <div className="letter-body">
              {letterParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <p className="letter-closing">Con mucho cariño,</p>
            <p className="letter-signature">Yonamine y Marcelo</p>
          </div>
        </article>

        <div className="envelope-front" aria-hidden="true" />

        <div className="envelope-flap" aria-hidden="true">
          <span className="wax-seal">✦</span>
        </div>

        {!letterOpen && (
          <button
            type="button"
            className="envelope-open-trigger"
            onClick={onOpen}
            onKeyDown={handleKeyDown}
            aria-label="Abrir el sobre y leer la carta"
            aria-expanded={letterOpen}
          />
        )}
      </div>

      {letterOpen && (
        <div className="letter-open-message">
          <span>♥</span>
          Con todo nuestro cariño
        </div>
      )}
    </main>
  );
}

function App() {
  const [scene, setScene] = useState("login");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [candles, setCandles] = useState(() => Array(9).fill(true));
  const [celebration, setCelebration] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const audioRef = useRef(null);
  const errorTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = 0.35;

    return () => {
      audio?.pause();
      window.clearTimeout(errorTimerRef.current);
      window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (scene !== "cake" || celebration || candles.some(Boolean)) return;

    const timer = window.setTimeout(() => setCelebration(true), 500);
    return () => window.clearTimeout(timer);
  }, [candles, scene, celebration]);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => setMuted(false)).catch(() => {});
  };

  const handleNumber = (number) => {
    if (pin.length >= 4 || transitioning) return;
    setError(false);
    setPin((current) => `${current}${number}`);
  };

  const handleDelete = () => {
    setPin((current) => current.slice(0, -1));
    setError(false);
  };

  const openGift = () => {
    if (pin.length !== 4 || transitioning) return;

    if (pin !== PASSWORD) {
      setError(true);
      window.clearTimeout(errorTimerRef.current);
      errorTimerRef.current = window.setTimeout(() => {
        setPin("");
        setError(false);
      }, 700);
      return;
    }

    startMusic();
    setTransitioning(true);

    transitionTimerRef.current = window.setTimeout(() => {
      setScene("cake");
      setTransitioning(false);
    }, 500);
  };

  const handleCandleClick = (index) => {
    if (celebration || !candles[index]) return;

    setCandles((current) =>
      current.map((lit, candleIndex) =>
        candleIndex === index ? false : lit
      )
    );
  };

  const openLetterScene = () => {
    if (transitioning) return;

    setTransitioning(true);
    transitionTimerRef.current = window.setTimeout(() => {
      setLetterOpen(false);
      setScene("letter");
      setTransitioning(false);
    }, 450);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={birthdayMusic}
        loop
        preload="metadata"
      />

      {scene === "login" && (
        <main
          className={`login-scene ${transitioning ? "scene-exit" : ""}`}
          style={{ backgroundImage: `url(${birthdayBackground})` }}
        >
          <div className="login-overlay" />

          <div className="background-stickers" aria-hidden="true">
            {stickers.map((sticker, index) => (
              <span
                key={index}
                className="birthday-sticker"
                style={{
                  left: sticker.left,
                  top: sticker.top,
                  animationDelay: sticker.delay,
                  animationDuration: sticker.duration
                }}
              >
                {sticker.icon}
              </span>
            ))}
          </div>

          <div className="login-sparkles" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          <section className="login-card">
            <div className="card-decoration card-decoration-top">✦</div>
            <div className="card-decoration card-decoration-bottom">✧</div>
            <div className="login-icon">✦</div>
            <p className="eyebrow">UN REGALO PREPARADO CON CARIÑO</p>

            <h1>
              Un pequeño regalo
              <span>para alguien muy especial</span>
            </h1>

            <div className="gold-divider">
              <span />
              <b>♥</b>
              <span />
            </div>

            <p className="login-description">
              Ingresa la clave para abrir tu sorpresa
            </p>

            <div className={`pin-indicators ${error ? "pin-error" : ""}`}>
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={index < pin.length ? "filled" : ""}
                >
                  {index < pin.length ? "●" : "○"}
                </span>
              ))}
            </div>

            {error && (
              <p className="error-message" role="alert">
                La clave no es correcta. Inténtalo nuevamente.
              </p>
            )}

            <div className="numeric-keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button
                  key={number}
                  type="button"
                  className="key-button"
                  onClick={() => handleNumber(number)}
                  disabled={transitioning}
                >
                  {number}
                </button>
              ))}

              <span className="key-placeholder" />

              <button
                type="button"
                className="key-button"
                onClick={() => handleNumber(0)}
                disabled={transitioning}
              >
                0
              </button>

              <button
                type="button"
                className="key-button delete-button"
                onClick={handleDelete}
                aria-label="Borrar último número"
                disabled={transitioning}
              >
                ⌫
              </button>
            </div>

            <button
              type="button"
              className={`open-button ${pin.length === 4 ? "ready" : ""}`}
              disabled={pin.length !== 4 || transitioning}
              onClick={openGift}
            >
              ABRIR MI REGALO <span>✦</span>
            </button>

            <p className="login-footer">Con mucho cariño ♥</p>
          </section>
        </main>
      )}

      {scene === "cake" && (
        <main className={`cake-scene ${celebration ? "celebrating" : ""}`}>
          <MusicButton
            audioRef={audioRef}
            muted={muted}
            setMuted={setMuted}
          />

          <div className="cake-background-glow" />

          <div className="cake-stars" aria-hidden="true">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>·</span>
            <span>✧</span>
            <span>·</span>
          </div>

          {!celebration ? (
            <header className="cake-header">
              <p>UNA SORPRESA PARA TI</p>
              <h1>Pide un deseo...</h1>
              <div className="gold-divider">
                <span />
                <b>♥</b>
                <span />
              </div>
              <span>Toca las velitas para apagarlas</span>
            </header>
          ) : (
            <header className="celebration-header">
              <div className="celebration-icon">✦</div>
              <p>FELIZ CUMPLEAÑOS</p>
              <h1>
                ¡Que todos tus deseos
                <span>se hagan realidad!</span>
              </h1>
            </header>
          )}

          <div className="cake-stage">
            <div className="cake-light" />

            <img
              src={cakeImage}
              alt="Torta de cumpleaños"
              className="cake-image"
            />

            <div className="candles-layer">
              {candles.map((lit, index) => {
                const position = candlePositions[index];

                return (
                  <button
                    type="button"
                    key={index}
                    className={`candle candle-${position.size} ${lit ? "candle-lit" : "candle-off"}`}
                    style={{
                      left: position.left,
                      top: position.top
                    }}
                    onClick={() => handleCandleClick(index)}
                    aria-label={
                      lit
                        ? `Apagar vela ${index + 1}`
                        : `Vela ${index + 1} apagada`
                    }
                    aria-pressed={!lit}
                    disabled={!lit || celebration}
                  >
                    <span className="candle-flame" aria-hidden="true" />
                    <span className="candle-body" aria-hidden="true" />
                    <span className="candle-wick" aria-hidden="true" />
                    <span className="candle-base" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {celebration && (
            <>
              <div className="confetti-container" aria-hidden="true">
                {Array.from({ length: 40 }, (_, index) => (
                  <span
                    key={index}
                    className="confetti-piece"
                    style={{
                      left: `${(index * 47) % 100}%`,
                      animationDelay: `${(index % 10) * 0.12}s`,
                      animationDuration: `${3.2 + (index % 4) * 0.35}s`
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                className="letter-button"
                onClick={openLetterScene}
                disabled={transitioning}
              >
                Descubrir mi carta ✉
              </button>
            </>
          )}
        </main>
      )}

      {scene === "letter" && (
        <>
          <MusicButton
            audioRef={audioRef}
            muted={muted}
            setMuted={setMuted}
          />
          <BirthdayLetter
            letterOpen={letterOpen}
            onOpen={() => setLetterOpen(true)}
          />
        </>
      )}
    </>
  );
}

export default App;