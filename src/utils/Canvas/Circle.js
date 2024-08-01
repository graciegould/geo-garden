import Shape from './Shape';
class Circle extends Shape {
    constructor(props, canvasProps) {
      super(canvasProps);
      this.x = props.x;
      this.y = props.y;
      this.w = props.w;
      this.h = props.h;
      this.validateProps();
      this.draw();
    }

    validateProps() {
        const input = { x: this.x, y: this.y, w: this.w, h: this.h };
        Object.keys(input).forEach(key => {
            if (input[key] === undefined) {
                console.error(`Circle must be initalized with an ${key} property and value.`);
                return false;
            }
            if (input[key] === "") {
                console.error(`Circle must cannot be initalized with an empty string for ${key}.`);
                return false;
            }
            if (typeof input[key] === 'string') {
                const numericString = input[key].replace('%', '').replace('px', '');
                if(isNaN(numericString)) {
                    console.error(`Invalid value for ${key}: ${input[key]}. Must be a valid integer, float, numeric or percentage string.`);
                    return;
                }
                if(input[key].endsWith('%')) {
                    this.units[key] = '%';
                    return;
                }
                if(input[key].endsWith('px')) {
                    this[key] = parseFloat(numericString);
                }
                this.units[key] = 'px';
                return;
            }
        });
    }
    
    setX(setter) {
        if(typeof setter === 'function') {
            this.x = setter(this.x)
            this.canvasProps.mutate(this);
            return;
        }
        this.x = setter;
    }

    draw() {
        this.canvasProps.ctx.beginPath();
        this.canvasProps.ctx.ellipse(
            this.toPixels('x'), 
            this.toPixels('y'), 
            this.toPixels('w') / 2, 
            this.toPixels('h')/ 2, 
            0, 
            0, 
            2 * Math.PI
        );
        // this.canvasProps.ctx.closePath();
        this.canvasProps.ctx.stroke();
    }
}
  
  
export default Circle;