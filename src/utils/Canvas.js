class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.fill = 'black';
    this.stroke = 'black';
    this.canvasSizeMode = 'stretch';
    this.w = document.body.getBoundingClientRect().width;
    this.h = document.body.getBoundingClientRect().height;
    this.container = document.body;
    this.actions = {}
    this.shapes = {}
  }

  setCanvasSizeMode(mode) {
    switch (mode) {
      case 'stretch':
        this.canvasSizeMode = 'stretch';
        break;
      case 'fitScreen':
        this.canvasSizeMode = 'fitScreen';
        break;
      case 'fixed':
        this.canvasSizeMode = 'fixed';
        break;
      default:
        this.canvasSizeMode = 'stretch';
        break;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
  }

  startAnimation() {
    this.animate();
  }

  stopAnimation() {
    cancelAnimationFrame(this.animate.bind(this));
  }

  persist(action, params) {
    console.log("action", action)
    console.log("params", params)
    const name = params.name;
    this.actions[name] = {};
    this.actions[name] = {
      action: action,
      ...params
    };
    const setters = Object.keys(params).reduce((acc, key) => {
      acc[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (input) => {
        this.actions[name][key] = input;
        action(this.actions[name]);
        this.clear();
        this.redrawPersistingActions();
      };
      return acc;
    }, {});

    const set = (input) => {
      console.log("resetting", input)
      let newParams = {...params, ...input};
      this.actions[name] = newParams;
      this.actions[name].action(this.actions[name]);
    }
    
    this.actions[name] = {
      ...this.actions[name],      
      set,
      ...setters,
      ...params
    }



    return {
      set,
      ...setters,
      ...params
    }
  }

  redrawShapes() {
    Object.keys(this.shapes).forEach((name, index) => {
      this.shapes[name].drawHandler(this.shapes[name]);
    });
  }


  onClick(callback) {
    this.canvas.addEventListener('click', callback);
  }
  mouseMove(callback) {
    this.canvas.addEventListener('mousemove', callback);
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    this.container = this.canvas.parentElement;
    if(this.canvasSizeMode === 'stretch') {
      this.w = this.container.getBoundingClientRect().width;
      this.h = this.container.getBoundingClientRect().height;
      this.canvas.width = this.w;
      this.canvas.height = this.h;
      window.addEventListener('resize', () => {
        this.w = this.container.getBoundingClientRect().width;
        this.h = this.container.getBoundingClientRect().height;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.redrawShapes();
      });
    } else {
      this.canvas.width = this.w;
      this.canvas.height = this.h;
    }
    this.ctx = this.canvas.getContext('2d');
  }

  generateSetters(props) {
    const setters = Object.keys(props).reduce((acc, key) => {
      acc[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (input) => {
        this.shapes[props.name][key] = input;
        this.clear();
        this.redrawShapes();
      };
      return acc;
    }, {});
  }

  createShape() {
    
  }

  circle(props) {
    if(!props.persist) {
      props.persist = true;
      props.type = 'circle';
    }
    const drawHandler = (props) => {
      let {x, y, w, h} = props;
      this.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    this.shapes[props.name] = {
      ...props,
      drawHandler: drawHandler
    }

    drawHandler(props);

    const customSetterKeys = () => {
      return Object.keys(props).filter(key => key !== 'name' || key !== 'type' || key !== 'persist');
    }
    const setters = customSetterKeys().reduce((acc, key) => {
        acc[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (input) => {
          this.shapes[props.name][key] = input;
          this.clear();
          this.redrawShapes();
        };
      return acc;
    }, {});

    const setPersist = (input) => {
      this.shapes[props.name].persist = input;
      if(!input) {
        delete this.shapes[props.name];
      }
    }

    const setName = (input) => {
      this.shapes[props.name].name = input;
      this.shapes[input] = this.shapes[props.name];
      delete this.shapes[props.name];
    }
    const set = (input) => {
      let newProps = {...props, ...input};
      this.shapes[props.name] = newProps;
      this.shapes[props.name].drawHandler(this.shapes[props.name]);
    }

    // const mouseCollision = (e, params) => {
    //   let x = e.clientX;
    //   let y = e.clientY;
    //   let circleCenterX = params.x;
    //   let circleCenterY = params.y;
    //   let circleRadius = params.w / 2;
    //   const distance = Math.sqrt(Math.pow(x - circleCenterX, 2) + Math.pow(y - circleCenterY, 2));
    //   return distance <= circleRadius;
    // }
    

    let obj = {
      ...props,
      set,
      setName, 
      setPersist,
      ...setters,
      drawHandler: drawHandler
    };
    if(!props.persist) return obj
    this.shapes[props.name] = obj;
    return this.shapes[props.name];

    // let persist = this.persist.bind(this, action, params);
    // action(params);
    // return persist(params);
  }

}

export default Canvas;