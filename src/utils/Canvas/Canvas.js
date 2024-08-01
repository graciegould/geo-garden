import { v4 as uuidv4 } from 'uuid';
import Shapes from './Shapes';


// class CanvasInstance {
//   constructor(props) {
//     console.log('Canvas constructor', this);

//     this.canvas = props.canvasElement;
//     this.container = this.canvas.parentElement; 
//     this.ctx = this.canvas.getContext('2d');   
//     this.width = this.container.getBoundingClientRect().width;
//     this.height = this.container.getBoundingClientRect().height;    
//     this.canvas.width = this.width;
//     this.canvas.height = this.height;
//     // document.addEventListener('click', ((e) => {
//     //   this.width += 10;
//     //   console.log("canvas instance width", this.width)
//     // }));
//     // this.init();
//   }


//   clear() {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   animate() {
//     requestAnimationFrame(this.animate.bind(this));
//   }

//   startAnimation() {
//     this.animate();
//   }

//   stopAnimation() {
//     cancelAnimationFrame(this.animate.bind(this));
//   }

//   redrawShapes() {
//     Object.keys(this.shapes).forEach((name, index) => {
//       this.shapes[name].drawHandler(this.shapes[name]);
//     });
//   }


//   onClick(callback) {
//     this.canvas.addEventListener('click', callback);
//   }

//   mouseMove(callback) {
//     this.canvas.addEventListener('mousemove', callback);
//   }

//   init() {
//     window.addEventListener('resize', () => {
//       this.width = this.container.getBoundingClientRect().width;
//       this.height = this.container.getBoundingClientRect().height;
//       this.canvas.width = this.width;
//       this.canvas.height = this.height;
//       this.redrawShapes();
//     });
//   }

//   generateSetters(props) {
//     const setters = Object.keys(props).reduce((acc, key) => {
//       acc[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (input) => {
//         this.shapes[props.name][key] = input;
//         this.clear();
//         this.redrawShapes();
//       };
//       return acc;
//     }, {});
//   }

//   shapeHandlers(props) {
//     const customSetterKeys = () => {
//       return Object.keys(props).filter(key => key !== 'name' || key !== 'type' || key !== 'persist');
//     }
//     const setters = customSetterKeys().reduce((acc, key) => {
//       acc[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (input) => {
//         this.shapes[props.name][key] = input;
//         this.clear();
//         this.redrawShapes();
//       };
//       return acc;
//     }, {});
//     const setPersist = (input) => {
//       this.shapes[props.name].persist = input;
//       if (!input) {
//         delete this.shapes[props.name];
//       }
//     }
//     const setName = (input) => {
//       this.shapes[props.name].name = input;
//       this.shapes[input] = this.shapes[props.name];
//       delete this.shapes[props.name];
//     }
//     const set = (input) => {
//       let newProps = { ...props, ...input };
//       this.shapes[props.name] = newProps;
//       this.shapes[props.name].drawHandler(this.shapes[props.name]);
//     }
//     const remove = () => {
//       delete this.shapes[props.name];
//       this.clear();
//       this.redrawShapes();
//     }

//     const hide = () => {
//       this.shapes[props.name].hide = true;
//       this.clear();
//       this.redrawShapes();
//     }

//     return {
//       set,
//       setName,
//       setPersist,
//       remove,
//       ...setters
//     }
//   }

//   shape(type, name, props) {
//     return this.shapes.addShape(type, name, props);
//   }

//   circle(props) {
//     // let shape = new Circle(props);
//     // shape.draw();
//     // let circle = new Circle(props, this);
//     // circle.draw();

//     // if (!props.persist) {
//     //   props.persist = true;
//     //   props.type = 'circle';
//     // }
//     // const drawHandler = (props) => {
//     //   let { x, y, w, h } = props;
//     //   this.fillStyle = props.fillStyle || this.ctx.fillStyle;
//     //   this.fillStyle = 'black';
//     //   this.ctx.beginPath();
//     //   this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
//     //   this.ctx.closePath();
//     //   this.ctx.stroke();
//     // }

//     // let obj = {
//     //   ...props,
//     //   ...this.shapeHandlers(props),
//     //   drawHandler: drawHandler
//     // };
//     // drawHandler(props);
//     // if (!props.persist) return obj
//     // this.shapes[props.name] = obj;
//     // return this.shapes[props.name];
//   }

//   rect(props) {
//     if (!props.persist) {
//       props.persist = true;
//       props.type = 'rect';
//     }
//     const drawHandler = (props) => {
//       let { x, y, w, h } = props;
//       this.fillStyle = props.fillStyle || this.ctx.fillStyle;
//       this.fillStyle = 'black';
//       this.ctx.beginPath();
//       this.ctx.rect(x, y, w, h);
//       this.ctx.closePath();
//       this.ctx.stroke();
//     }
//     let obj = {
//       ...props,
//       ...this.shapeHandlers(props),
//       drawHandler: drawHandler
//     };
//     drawHandler(props);
//     if (!props.persist) return obj
//     this.shapes[props.name] = obj;
//     return this.shapes[props.name];
//   }

//   line(props) {
//     if (!props.persist) {
//       props.persist = true;
//       props.type = 'line';
//     }
//     const drawHandler = (props) => {
//       let { x1, y1, x2, y2 } = props;
//       this.fillStyle = props.fillStyle || this.ctx.fillStyle;
//       this.ctx.beginPath();
//       this.ctx.moveTo(x1, y1);
//       this.ctx.lineTo(x2, y2);
//       this.ctx.closePath();
//       this.ctx.stroke();
//     }
//     let obj = {
//       ...props,
//       ...this.shapeHandlers(props),
//       drawHandler: drawHandler
//     };
//     drawHandler(props);
//     if (!props.persist) return obj
//     this.shapes[props.name] = obj;
//     return this.shapes[props.name];
//   }

//   text(props) {
//     if (!props.persist) {
//       props.persist = true;
//       props.type = 'text';
//     }
//     const drawHandler = (props) => {
//       let { x, y, text } = props;
//       this.ctx.beginPath();
//       this.ctx.fillText(text, x, y);
//       this.ctx.closePath();
//       this.ctx.stroke();
//     }
//     let obj = {
//       ...props,
//       ...this.shapeHandlers(props),
//       drawHandler: drawHandler
//     };
//     drawHandler(props);
//     if (!props.persist) return obj
//     this.shapes[props.name] = obj;
//     return this.shapes[props.name];
//   }

// }


class CanvasProps {
  constructor(props) {
    this.width = props.width;
    this.canvas = props.canvasElement;
    this.container = this.canvas.parentElement;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.container.getBoundingClientRect().width;
    this.height = this.container.getBoundingClientRect().height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Canvas {
  constructor(props) {
    this.uuid = uuidv4();
    this.canvasProps = new CanvasProps(props);
    this.canvasProps.mutate = this.mutate.bind(this);
    this.shapes = new Shapes(this.canvasProps);
    this.init();
  }
  set width(input) {
    this.canvasProps.width = input;
    this.canvasProps.canvas.width = input;
  }
  set height(input) {
    this.canvasProps.height = input;
    this.canvasProps.canvas.height = input;
  }
  get width() {
    return this.canvasProps.width;
  }
  get height() {
    return this.canvasProps.height;
  }
  get canvas() {
    return this.canvasProps.canvas;
  }
  get ctx() {
    return this.canvasProps.ctx;
  }
  get container() {
    return this.canvasProps.container;
  }

  mutate(input) {
    console.log("mutating")
    let path = ''
    function mutatedInstance(obj, key, value, parentProp = 'this') {
      if (!obj || typeof obj !== 'object') return;
      let canidates = {};
      if(key in obj && obj[key] === value) {
        console.log("value searcheing for", value)
        return obj;
      }
        // if(prop === key && obj[prop] === value) {
        //   console.log("value searcheing for", value)
        //   console.log("matched", obj, prop)
        //   console.log("parent", parentProp);
        //   return obj;
        // }
        // if (typeof obj[prop] === 'object') {
        //   console.log(obj[prop])
        //   parentProp = prop;
        //   mutatedInstance(obj[prop], key, value, parentProp);
        // }
      Object.keys(obj).forEach((prop) => {
        if(typeof obj[prop] == 'object' && key in obj) {
          path = path + `${parentProp}.${prop}`;
          canidates[path] = obj[prop];
        }
      })
      // canidates.forEach((canidate) => {
      //   parentProp = canidate;
      //   mutatedInstance(canidate, key, value, parentProp);
      // })
    }
    mutatedInstance(this, 'uuid', input.uuid);
    console.log("mutate", input)
  }
  init() {
    window.addEventListener('resize', () => {
      this.width = this.container.getBoundingClientRect().width;
      this.height = this.container.getBoundingClientRect().height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.shapes.redrawShapes();
    });
  }

  shape(type, name, props) {
    return this.shapes.addShape(type, name, props);
  }

}

export default Canvas;