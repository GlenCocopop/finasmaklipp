let textContent = "Något gick fel, från din sida förmodligen, jag vet vad jag pysslar med...";
let allWords = [];
let keywords = [];
let textObjects = [];
let abstractShapes = [];
let colors = [
    "#e2007c", "#008c45", "#fcebeb", "#b8e986", "#f48fb1",
    "#6abf69", "#ff77a9", "#33a652", "#ffd1dc", "#004d1a",
    "#ff4081", "#a5d6a7", "#ff80ab", "#00e676", "#f06292"
];
let fonts = []; // Array för att lagra typsnitt

function preload() {
    // Ladda typsnitt, exempelvis Google Fonts eller lokala filer
    fonts.push(loadFont('Lobster.ttf'));
    fonts.push(loadFont('Courgette.ttf'));
    fonts.push(loadFont('OpenSans.ttf'));
    fonts.push(loadFont('Merriweather.ttf'));
    fonts.push(loadFont('DancingScript.ttf'));
    fonts.push(loadFont('Pacifico.ttf'));
    fonts.push(loadFont('Oswald.ttf'));
    fonts.push(loadFont('Lato.ttf'));
    fonts.push(loadFont('AmaticSC.ttf'));
    fonts.push(loadFont('PlayfairDisplay.ttf'));
    fonts.push(loadFont('IndieFlower.ttf'));
    fonts.push(loadFont('BebasNeue.ttf'));
    fonts.push(loadFont('Montserrat.ttf'));
    fonts.push(loadFont('Roboto.ttf'));
    fonts.push(loadFont('Raleway.ttf'));
    // Lägg till fler typsnitt efter behov
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 50; i++) {
        abstractShapes.push(createAbstractShape());
    }
    fetch('metod.txt')
        .then(response => response.text())
        .then(text => {
            processText(text);
        })
        .catch(err => {
            console.error('Fel vid inläsning av metod.txt', err);
            processText(textContent);
        });
}

function createAbstractShape() {
    return {
        x: random(width),
        y: random(height),
        size: random(20, 100),
        speed: random(0.5, 2)
    };
}

function processText(text) {
    allWords = text.match(/\b(\w+)\b/g);
    let doc = nlp(text);
    keywords = doc.topics().out('array');

    for (let i = 0; i < 2000; i++) {
        textObjects.push(createTextObject(i * 10));
    }
}

function createTextObject(delay) {
    let word = random(random(1) > 0.5 ? keywords : allWords);
    let x = random(width);
    let y = random(height);
    let size = random(10, 24);
    let color = random(colors);
    let font = random(fonts);
    let alpha = 0;
    let growing = true;
    let timer = delay;

    return { word, x, y, size, color, font, alpha, growing, timer };
}

function draw() {
    background(0);
    drawAbstractShapes();

    textObjects.forEach(obj => {
        if (obj.timer <= 0) {
            drawKeyword(obj);
            updateKeyword(obj);
        } else {
            obj.timer -= 1;
        }
    });
}

function drawAbstractShapes() {
    abstractShapes.forEach(shape => {
        fill(50, 50, 50, 120);
        noStroke();
        ellipse(shape.x, shape.y, shape.size);
        shape.x += random(-shape.speed, shape.speed);
        shape.y += random(-shape.speed, shape.speed);
    });
}

function drawKeyword(obj) {
    let alphaValue = floor(obj.alpha);
    fill(color(obj.color + alphaValue.toString(16)));
    textFont(obj.font);
    textSize(obj.size);
    text(obj.word, obj.x, obj.y);
}

function updateKeyword(obj) {
    if (obj.growing) {
        obj.alpha += 5;
        obj.size += 0.5;
        if (obj.alpha > 255) {
            obj.growing = false;
        }
    } else {
        obj.alpha -= 5;
        if (obj.alpha < 0) {
            resetTextObject(obj);
        }
    }
}

function resetTextObject(obj) {
    obj.alpha = 0;
    obj.growing = true;
    obj.word = random(random(1) > 0.5 ? keywords : allWords);
    obj.x = random(width);
    obj.y = random(height);
    obj.timer = random(500, 1000);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
