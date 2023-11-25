let textContent = "Något gick fel, från din sida förmodligen, jag vet vad jag pysslar med..."; // Används om inläsning av metod.txt misslyckas

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    // Försök läsa in metod.txt, använd fallback text annars
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
    // NLP-analys av inläst text
    let doc = nlp(text);
    let keywords = doc.topics().out('array');

    // Skapa en visuell representation för varje nyckelord
    keywords.forEach(word => {
        let x = random(width);
        let y = random(height);
        drawKeyword(word, x, y);
    });
}

function drawKeyword(word, x, y) {
    let col = color(random(255), random(255), random(255), 150);
    fill(col);
    textSize(16);
    text(word, x, y);
}

function draw() {
    if (mouseIsPressed) {
        let col = color(random(255), random(255), random(255), 150);
        fill(col);
        ellipse(mouseX, mouseY, 20, 20);
    }
}

function mousePressed() {
    background(255);
    processText(textContent); // Återanvänd inläst text eller fallback-text
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
