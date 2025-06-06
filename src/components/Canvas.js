import React, { useRef } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const Canvas = ({ stickers, setStickers }) => {
  const stageRef = useRef(null);

  // Handle sticker drag end
  const handleDragEnd = (e, id) => {
    const x = e.target.x();
    const y = e.target.y();
    setStickers(
      stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, x, y } : sticker
      )
    );
  };

  // Handle double-click to delete
  const handleDblClick = (id) => {
    setStickers(stickers.filter((sticker) => sticker.id !== id));
  };

  // Handle download
  const handleDownload = () => {
    const dataURL = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="canvas-container">
      <Stage width={600} height={400} ref={stageRef}>
        <Layer>
          {stickers.map((sticker) => (
            <Sticker
              key={sticker.id}
              sticker={sticker}
              onDragEnd={handleDragEnd}
              onDblClick={handleDblClick}
            />
          ))}
        </Layer>
      </Stage>
      <button className="download-button" onClick={handleDownload}>
        Download Canvas
      </button>
    </div>
  );
};

// Sticker component to render individual stickers
const Sticker = ({ sticker, onDragEnd, onDblClick }) => {
  const [image] = useImage(sticker.src);
  return (
    <Image
      image={image}
      x={sticker.x}
      y={sticker.y}
      width={50}
      height={50}
      draggable
      onDragEnd={(e) => onDragEnd(e, sticker.id)}
      onDblClick={() => onDblClick(sticker.id)}
    />
  );
};

export default Canvas;
