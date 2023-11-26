
function toggleInfo() {
    var moreInfo = document.getElementById("more-info");
    var infoText = document.getElementById("info-text");
    var infoBox = document.getElementById("info-box");

    if (moreInfo.style.display === "none" || !moreInfo.style.display) {
        moreInfo.style.display = "block"; // Visar mer information
        infoBox.style.width = "80%"; // Expandera rutan
        infoText.textContent = "Stäng"; // Ändra texten till "Stäng"
    } else {
        moreInfo.style.display = "none"; // Döljer informationen
        infoBox.style.width = "auto"; // Återgå till mindre bredd
        infoText.textContent = "Vad fan är det där?"; // Återställer texten
    }
}
