import { useEffect } from "react";
import { useCanvas } from "../contexts/CanvasContext";

export function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw, isDesktop } = useCanvas();

  useEffect(() => {
    if (isDesktop) {
      prepareCanvas();
    }
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      className="canva"
    />
  );
}