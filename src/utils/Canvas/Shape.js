import { v4 as uuidv4 } from 'uuid';
class Shape  {
  constructor(canvasProps) {
    this.canvasProps = canvasProps;
    this.hide = false;
    this.units = {};
    this.uuid = uuidv4();
  }


  toPixels(prop) {
    if(this.units[prop] === '%') {
        let percent = parseFloat(this[prop].replace('%', ''));
        return this.canvasProps.width * (percent / 100);
    }
    return this[prop];
  }

}

export default Shape;