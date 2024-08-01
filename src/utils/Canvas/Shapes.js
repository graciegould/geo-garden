import { v4 as uuidv4 } from 'uuid';
import Circle from './Circle'; 
import Rect from './Rect'; 


class Shapes {
    constructor(canvasProps) {
        this.canvasProps = canvasProps;
        this.shapes = {};
        this.uuid = uuidv4();
    }

    redrawShapes() {
        requestAnimationFrame(() => {
            Object.keys(this.shapes).forEach(shape => {
                this.shapes[shape].draw();
            });
        });
    }

    removeShape(name) {
        delete this.shapes[name];
        this.canvasProps.clear();
        this.redrawShapes();
    }

    addShape(type, name, props) {
        if(this.shapes[name]) {
            console.error('Shape with that name already exists, or you are using an illegal name.');
            return;
        }
        switch(type) {
            case 'circle':
                this.shapes[name] = new Circle(props, this.canvasProps);
                return this.shapes[name];
            case 'rect':
                this.shapes[name] = new Rect(props, this.canvasProps);
                return this.shapes[name];
            default:
                console.log('Invalid shape type');
        }
    }
}

export default Shapes;