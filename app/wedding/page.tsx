"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface CustomWindow extends Window {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

const WeddingPage = () => {
  const [isFunMode, setIsFunMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const btnNoRef = useRef<HTMLButtonElement>(null);
  let clickAttempts = 0;

  const playClickSound = useCallback(() => {
    try {
      const customWindow = window as CustomWindow;
      const AudioContext = customWindow.AudioContext || customWindow.webkitAudioContext;
      if (!AudioContext) {
        console.log('Audio not available');
        return;
      }
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (_e) {
      console.log('Audio not available');
    }
  }, []);

  const createHearts = useCallback(() => {
    const container = document.getElementById('backgroundHearts');
    if (container) {
      container.innerHTML = '';
      const hearts = ['💕', '💗', '💖', '💝', '❤️', '💓', '🥰', '✨'];
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 8}s`;
        heart.style.animationDuration = `${6 + Math.random() * 4}s`;
        container.appendChild(heart);
      }
    }
  }, []);

  useEffect(() => {
    createHearts();
  }, [createHearts]);

  const toggleTheme = () => {
    setIsFunMode(!isFunMode);
    playClickSound();
  };
  
  const closeModal = useCallback(() => {
    setModalOpen(false);
    playClickSound();
    const btnNo = btnNoRef.current;
    if (btnNo) {
      btnNo.style.position = '';
      btnNo.style.left = '';
      btnNo.style.top = '';
      btnNo.style.transform = '';
    }
  }, [playClickSound]);
  
  let isMoving = false;
  const moveButton = useCallback(() => {
      if (isMoving) return;

      const btnNo = btnNoRef.current;
      if (!btnNo) return;
      
      const container = btnNo.parentElement as HTMLElement;
      if(!container) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();

      let newX = Math.random() * (containerRect.width - btnRect.width);
      let newY = Math.random() * (containerRect.height - btnRect.height);

      if (window.innerWidth < 640) {
          newX = Math.random() * (window.innerWidth - btnRect.width - 48);
          newY = Math.random() * 100;
          btnNo.style.position = 'fixed';
          btnNo.style.left = `${newX}px`;
          btnNo.style.top = `${newY + 200}px`;
      } else {
          btnNo.style.position = 'relative';
          btnNo.style.transform = `translate(${newX - btnRect.left + containerRect.left}px, ${newY - btnRect.top + containerRect.top}px)`;
      }

      isMoving = true;
      playClickSound();

      setTimeout(() => {
          isMoving = false;
      }, 300);
  }, [playClickSound]);


  const handleNoClick = () => {
    clickAttempts++;
    if (clickAttempts >= 3) {
      setModalOpen(true);
      clickAttempts = 0;
      playClickSound();
    }
  };

  useEffect(() => {
    if (isFunMode) {
      document.body.setAttribute('data-theme', 'fun');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isFunMode]);

  useEffect(() => {
    const btnNo = btnNoRef.current;
    if (btnNo) {
      btnNo.addEventListener('mouseenter', moveButton);
      btnNo.addEventListener('touchstart', moveButton);
    }

    return () => {
      if (btnNo) {
        btnNo.removeEventListener('mouseenter', moveButton);
        btnNo.removeEventListener('touchstart', moveButton);
      }
    };
  }, [moveButton]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, closeModal]);

  return (
    <>
      <style jsx global>{`
        /* Design Tokens */
        :root {
            /* Normal Mode Colors */
            --bg-color: #fdf2f8;
            --text-primary: #831843;
            --text-secondary: #9d174d;
            --accent-soft: #fce7f3;
            --accent-medium: #fbcfe8;
            --accent-strong: #f472b6;
            --button-primary: #db2777;
            --button-primary-hover: #be185d;
            --button-secondary: #fce7f3;
            --button-secondary-text: #831843;
            --shadow-soft: 0 4px 20px rgba(131, 24, 67, 0.08);
            --shadow-medium: 0 8px 30px rgba(131, 24, 67, 0.12);
        }

        [data-theme="fun"] {
            /* Fun Mode Colors */
            --bg-color: #fef3c7;
            --text-primary: #92400e;
            --text-secondary: #b45309;
            --accent-soft: #fef9c3;
            --accent-medium: #fde68a;
            --accent-strong: #fbbf24;
            --button-primary: #f59e0b;
            --button-primary-hover: #d97706;
            --button-secondary: #fef9c3;
            --button-secondary-text: #92400e;
            --shadow-soft: 0 4px 20px rgba(146, 64, 14, 0.08);
            --shadow-medium: 0 8px 30px rgba(146, 64, 14, 0.12);
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--bg-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            overflow-x: hidden;
            transition: background-color 0.4s ease;
        }

        /* Background Animation */
        .background-hearts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }

        .heart {
            position: absolute;
            font-size: 20px;
            opacity: 0.3;
            animation: float-up 8s ease-in-out infinite;
            user-select: none;
        }

        @keyframes float-up {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        /* Main Content */
        .container {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 480px;
            width: 100%;
        }

        /* Toggle Button */
        .toggle-container {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 10;
        }

        .toggle-button {
            background: white;
            border: 2px solid var(--accent-strong);
            color: var(--text-primary);
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-soft);
        }

        .toggle-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-medium);
        }

        .toggle-button:active {
            transform: translateY(0);
        }

        /* Main Text */
        .main-text {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.4;
            margin-bottom: 48px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: color 0.4s ease;
        }

        .emoji-face {
            font-size: clamp(3rem, 12vw, 5rem);
            margin-bottom: 24px;
            animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        /* Button Container */
        .button-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
            min-height: 200px;
            position: relative;
        }

        /* Primary Button (YA) */
        .btn-primary {
            background: var(--button-primary);
            color: white;
            border: none;
            padding: 16px 48px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-soft);
            text-decoration: none;
            display: inline-block;
            min-width: 160px;
        }

        .btn-primary:hover {
            background: var(--button-primary-hover);
            transform: translateY(-3px);
            box-shadow: var(--shadow-medium);
        }

        .btn-primary:active {
            transform: translateY(0);
        }

        .btn-primary:focus {
            outline: 3px solid var(--accent-strong);
            outline-offset: 2px;
        }

        /* Secondary Button (ENGGAK) */
        .btn-secondary {
            background: var(--button-secondary);
            color: var(--button-secondary-text);
            border: none;
            padding: 16px 48px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-soft);
            min-width: 160px;
            position: relative;
            z-index: 2;
        }

        .btn-secondary:hover {
            background: var(--accent-medium);
            transform: translateY(-3px);
            box-shadow: var(--shadow-medium);
        }

        .btn-secondary:active {
            transform: translateY(0);
        }

        .btn-secondary:focus {
            outline: 3px solid var(--accent-strong);
            outline-offset: 2px;
        }

        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: white;
            padding: 32px;
            border-radius: 20px;
            text-align: center;
            max-width: 320px;
            width: 90%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-medium);
        }

        .modal-overlay.active .modal-content {
            transform: scale(1);
        }

        .modal-emoji {
            font-size: 60px;
            margin-bottom: 16px;
        }

        .modal-text {
            font-size: 20px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 24px;
            line-height: 1.4;
        }

        .modal-close {
            background: var(--button-primary);
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: var(--button-primary-hover);
            transform: translateY(-2px);
        }

        /* Footer */
        footer {
            margin-top: auto;
            padding: 24px;
            text-align: center;
            color: var(--text-secondary);
            font-size: 14px;
            opacity: 0.7;
        }

        /* Responsive */
        @media (min-width: 640px) {
            .button-container {
                flex-direction: row;
                justify-content: center;
                gap: 24px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
      `}</style>
      <div className="background-hearts" id="backgroundHearts"></div>

      <div className="toggle-container">
        <button className="toggle-button" id="themeToggle" onClick={toggleTheme}>
          {isFunMode ? '🌸 Mode Normal' : '✨ Mode Fun'}
        </button>
      </div>

      <div className="container">
        <div className="emoji-face">{isFunMode ? '😄' : '🥺'}</div>
        <h1 className="main-text">
          Dk kangen abg gak?<br />
          <span style={{ fontSize: '0.85em', opacity: 0.85 }}>Abg kangen x woi Aowkaowkoaw</span>
        </h1>

        <div className="button-container">
          <a
            href="https://wa.me/6282276330774?text=Sama,+kangen+juga"
            className="btn-primary"
            onClick={playClickSound}
          >
            YA 💕
          </a>
          <button ref={btnNoRef} className="btn-secondary" id="btnNo" onClick={handleNoClick}>
            ENGGAK
          </button>
        </div>
      </div>

      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} id="modal" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal-content">
          <div className="modal-emoji">😤</div>
          <p className="modal-text">
            GAK BOLEH!<br />
            HARUS KANGEN POKOKNYA!
          </p>
          <button className="modal-close" onClick={closeModal}>
            Baik deh 😅
          </button>
        </div>
      </div>

      <footer>
        Made with 💕 for you
      </footer>
    </>
  );
};

export default WeddingPage;