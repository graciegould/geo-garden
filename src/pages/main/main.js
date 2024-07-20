import MainComponent from '../../components/MainComponent.html';
import Geolocation from '../../utils/Geolocation.js';
import WeatherDataApi from '../../utils/api/weather-data-api.js';
import Canvas from '../../utils/Canvas.js';

const Main = new MainComponent();
const WeatherData = new WeatherDataApi();
const c = new Canvas();
const {ui} = Main;



function sketch() {

}

async function init() { 
    Main.render();
    // let data = await WeatherData.fetchWeather();
    c.setCanvasSizeMode('stretch');
    c.init(ui.canvasOverlay);
    const circle1 = c.circle({x: 100, y: 100, w: 100, h: 100, name: 'circle1'});
    const circle2 = c.circle({x: 200, y: 200, w: 100, h: 100, name: 'circle2'});
    setInterval(() => {
        circle1.setX(circle1.x + 10);
    }, 1000);
    c.onClick(() => {

    });
}
await init();