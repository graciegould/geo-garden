import MainComponent from '../../components/MainComponent.html';
import Geolocation from '../../utils/Geolocation.js';
import WeatherDataApi from '../../utils/api/weather-data-api.js';
import Canvas from '../../utils/Canvas/Canvas.js';

const Main = new MainComponent();
const WeatherData = new WeatherDataApi();
let c;
const {ui} = Main;

function sketch() {

}

async function init() { 
    Main.render();
    c = new Canvas({
        canvasElement: ui.canvasOverlay
    });
    const shapes = [];
    const shape = c.shape('circle', `circle`, {x: 100, y: 100, w: 100, h: 100})

    // for(let i = 0; i < 3; i++) {
    //     shapes.push(c.shape('circle', `circle-percent${i}`, {x: 100*i, y: 100, w: 100, h: 100}));
    //     // shapes.push(c.shape('circle', `circle${i}`, {x: 100 * i, y: 100, w: 100, h: 100}));
    //     // shapes.push(c.shape('rect', `rect${i}`, {x: 100, y: 100 * i, w: 100, h: 100}));
    // }
    let count = 0;
    document.addEventListener('click', () => {
        shape.setX((x) => {
            return x + 100;
        });
        count+=1;
    });
   // const rect1 = c.rect({x: 200, y: 200, w: 100, h: 100, name: 'rect1'});
    // const line = c.line({x1: 200, y1: 200, x2: 400, y2: 400, name: 'line'});
    // setInterval(() => {
    //     circle1.setX(circle1.x + 10);
    // }, 1000);
    // c.onClick(() => {

    // });
}
await init();