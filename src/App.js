import React, { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import StickerButton from './components/StickerButton';

const App = () => {
  const [stickers, setStickers] = useState([]);

  // Sticker images
  const stickerImages = [
    '/stickers/dumbbell.png',
    '/stickers/guitar.png',
    '/stickers/listening.png',
  ];

  // Add a new sticker with grid snapping (40px grid)
  const addSticker = (imageSrc) => {
    const gridSize = 40;
    const defaultX = Math.round(50 / gridSize) * gridSize; // Snap to nearest 40px
    const defaultY = Math.round(50 / gridSize) * gridSize;
    setStickers([
      ...stickers,
      {
        id: Date.now(), // Unique ID
        src: imageSrc,
        x: defaultX,
        y: defaultY,
      },
    ]);
  };

  return (
    <div className="app">
      <h1>MyEra Sticker App</h1>
      <div className="app-container">
        <div className="buttons">
          {stickerImages.map((src, index) => (
            <StickerButton
              key={index}
              imageSrc={src}
              onClick={() => addSticker(src)}
            />
          ))}
          <button className="download-button" onClick={() => {}}>
            Download Canvas
          </button>
        </div>
        <Canvas stickers={stickers} setStickers={setStickers} />
      </div>
    </div>
  );
};

export default App;