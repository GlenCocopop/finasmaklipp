let textContent = "Något gick fel, från din sida förmodligen, jag vet vad jag pysslar med...";
let allWords = [];
let keywords = [];
let textObjects = [];
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
    fonts.push(loadFont('DancingScript.tff'));
    fonts.push(loadFont('Pacifico.tff'));
    fonts.push(loadFont('Oswald.tff'));
    fonts.push(loadFont('Lato.tff'));
    fonts.push(loadFont('AmaticSC.tff'));
    fonts.push(loadFont('PlayfairDisplay.tff'));
    fonts.push(loadFont('IndieFlower.tff'));
    fonts.push(loadFont('BebasNeue.tff'));
    fonts.push(loadFont('Montserrat.tff'));
    fonts.push(loadFont('Roboto.tff'));
    fonts.push(loadFont('Raleway.tff'));
    // Lägg till fler typsnitt efter behov
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

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

function processText(text) {
    allWords = text.match(/\b(\w+)\b/g); // Extraherar alla ord
    let doc = nlp(text);
    keywords = doc.topics().out('array');

    for (let i = 0; i < 200; i++) { // Skapar 200 textobjekt
        textObjects.push(createTextObject());
    }
}

function createTextObject() {
    let word = random(random(1) > 0.5 ? keywords : allWords); // Väljer ord från antingen keywords eller allWords
    let x = random(width);
    let y = random(height);
    let size = random(10, 24);
    let color = random(colors);
    let font = random(fonts);
    let alpha = 0;
    let growing = true;

    return { word, x, y, size, color, font, alpha, growing };
}

function draw() {
    background(255, 25); // Låg opacitet för "fade"-effekten

    textObjects.forEach(obj => {
        drawKeyword(obj);
        updateKeyword(obj);
    });
}

function drawKeyword(obj) {
    fill(color(obj.color + obj.alpha.toString(16)));
    textFont(obj.font);
    textSize(obj.size);
    text(obj.word, obj.x, obj.y);
}

function updateKeyword(obj) {
    if (obj.growing) {
        obj.alpha += 5; // Ökar opaciteten
        obj.size += 0.5; // Ökar storleken
        if (obj.alpha > 255) {
            obj.growing = false;
        }
    } else {
        obj.alpha -= 5; // Minskar opaciteten
        if (obj.alpha < 0) {
            obj.alpha = 0;
            obj.growing = true;
            obj.word = random(random(1) > 0.5 ? keywords : allWords); // Väljer ett nytt ord
            obj.x = random(width); // Ny position
            obj.y = random(height);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}




