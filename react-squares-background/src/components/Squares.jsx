import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Squares = ({ direction, speed, borderColor, squareSize, hoverFillColor, className }) => {
  const canvasRef = useRef(null);

  const drawGrid = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    for (let x = 0; x < width; x += squareSize) {
      for (let y = 0; y < height; y += squareSize) {
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(x, y, squareSize, squareSize);
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / squareSize) * squareSize;
    const y = Math.floor((e.clientY - rect.top) / squareSize) * squareSize;

    drawGrid(ctx, canvas.width, canvas.height);
    ctx.fillStyle = hoverFillColor;
    ctx.fillRect(x, y, squareSize, squareSize);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid(ctx, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};

Squares.propTypes = {
  direction: PropTypes.string,
  speed: PropTypes.number,
  borderColor: PropTypes.string.isRequired,
  squareSize: PropTypes.number.isRequired,
  hoverFillColor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Squares.defaultProps = {
  direction: 'horizontal',
  speed: 1,
  className: '',
};

export default Squares;