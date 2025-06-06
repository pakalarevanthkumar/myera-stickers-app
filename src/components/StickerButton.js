
import React from 'react';

const StickerButton = ({ imageSrc, onClick }) => {
  return (
    <button className="sticker-button" onClick={onClick}>
      <img src={imageSrc} alt="Sticker" />
    </button>
  );
};

export default StickerButton;