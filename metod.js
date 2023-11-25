let textContent = "Något gick fel, från din sida förmodligen, jag vet vad jag pysslar med...";
let allWords = [];
let keywords = [];
let textObjects = [];
let abstractShapes = []; // Array för abstrakta former
let colors = [
    "#e2007c", // Ljusare Rosa
    "#008c45", // Liseberg Grönt
    "#fcebeb", // Ljus Rosa
    "#b8e986", // Ljus Grönt
    "#f48fb1", // Dämpad Rosa
    "#6abf69", // Mättat Grönt
    "#ff77a9", // Stark Rosa
    "#33a652", // Mörkare Grönt
    "#ffd1dc", // Blek Rosa
    "#004d1a", // Djupt Grönt
    "#ff4081", // Levande Rosa
    "#a5d6a7", // Pastell Grönt
    "#ff80ab", // Soft Rosa
    "#00e676", // Neon Grönt
    "#f06292"  // Korall Rosa
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
    for (let i = 0; i < 50; i++) { // Skapar 50 abstrakta former
        abstractShapes.push(createAbstractShape());
    }
    fetch('metod.txt')
        .then(response => response.text())
        .then(text => {
            processText(text);
        })
        .catch(err => {
            console.error('Fel vid inläsning av metod.txt, använder fallback-text.', err);
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
    allWords = text.match(/\b(\w+)\b/g); // Extraherar alla ord
    let doc = nlp(text);
    keywords = doc.topics().out('array');

    for (let i = 0; i < 2000; i++) { // Skapar 2000 textobjekt
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
    let timer = delay; // Initial fördröjning för varje textobjekt

    return { word, x, y, size, color, font, alpha, growing, timer };
}

function draw() {
    background(0); // Svart bakgrund
    drawAbstractShapes(); // Rita abstrakta former

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
    fill(50); // Mörkgrå färg för abstrakta former
    noStroke();
    abstractShapes.forEach(shape => {
        ellipse(shape.x, shape.y, shape.size);
        shape.x += random(-shape.speed, shape.speed);
        shape.y += random(-shape.speed, shape.speed);
    });
}

function drawKeyword(obj) {
    fill(color(obj.color + obj.alpha.toString(16)));
    textFont(obj.font);
    textSize(obj.size);
    text(obj.word, obj.x, obj.y);
}

function updateKeyword(obj) {
    // Samma som tidigare
}

function resetTextObject(obj) {
    // Samma som tidigare
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
