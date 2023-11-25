function toggleInfo() {
    var moreInfo = document.getElementById("more-info");
    var infoText = document.getElementById("info-text");
    
    if (moreInfo.classList.contains("hidden")) {
        moreInfo.classList.remove("hidden");
        moreInfo.classList.add("expanded");
        infoText.textContent = "Vad fan är det där?"; // Uppdatera texten om du vill ändra den efter klick
    } else {
        moreInfo.classList.remove("expanded");
        moreInfo.classList.add("hidden");
    }
}
