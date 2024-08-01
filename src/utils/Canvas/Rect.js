import Shape from './Shape';
class Rect extends Shape {
    constructor(props, canvasProps) {
      super(canvasProps);
      this.x = props.x;
      this.y = props.y;
      this.w = props.w;
      this.h = props.h;
      this.draw();
    }

    draw() {
        this.canvasProps.ctx.beginPath();
        this.canvasProps.ctx.rect(this.x, this.y, this.w, this.h);
        this.canvasProps.ctx.closePath();
        this.canvasProps.ctx.stroke();
    }
}
  
  
export default Rect;