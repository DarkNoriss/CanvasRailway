export const drawWithDataURL = (
  canvasState: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) => {
  const img = new Image();
  img.src = canvasState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx?.drawImage(img, 0, 0);
  };
};
