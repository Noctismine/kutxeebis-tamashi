const cities = {
    "იმერეთი": ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"],
    "სვანეთი": ["10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png"],
    "კახეთი": ["60.png", "61.png", "62.png", "63.png", "64.png", "65.png", "66.png", "67.png", "68.png"],
    "გურია": ["111.png", "112.png", "113.png", "114.png", "115.png", "116.png", "117.png", "118.png", "119.png"],
    "სამეგრელო": ["100.png", "101.png", "102.png", "103.png", "104.png", "105.png", "106.png", "107.png", "108.png", "109.png"],
    "რაჭა-ლეჩხუმი": ["91.png", "92.png", "93.png", "94.png", "95.png", "96.png", "97.png", "98.png", "99.png"],
    "ფშავ-ხევსურეთი": ["71.png", "72.png", "73.png", "74.png", "75.png", "76.png", "77.png", "78.png", "79.png"],
    "სამცხე-ჯავახეთი": ["30.png", "31.png", "32.png", "33.png", "34.png", "35.png", "36.png", "37.png", "38.png"],
    "შიდა ქართლი": ["40.png", "41.png", "42.png", "43.png", "44.png", "45.png", "46.png", "47.png", "48.png"],
    "ქვემო ქართლი": ["50.png", "51.png", "52.png", "53.png", "54.png", "55.png", "56.png", "57.png", "58.png"],
    "აჭარა": ["20.png", "21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png"],
    "აფხაზეთი": ["81.png", "82.png", "83.png", "84.png", "85.png", "86.png", "87.png", "88.png", "89.png"]
};

let level = 1;
let maxLevels = 12;
let correctCity;
let correctImages = [];
let selectedImages = [];
let wrongCount = 0;
let correctCount = 0;
let gameOver = false;
let hearts = 3; // Maximum lives

function startGame() {
    level = 1;
    hearts = 3; // Reset hearts
    updateHearts();
    document.getElementById("game-area").style.display = "block";
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("result").innerText = "";
    loadCity();
}

function updateHearts() {
    const heartsContainer = document.getElementById("hearts-container");
    heartsContainer.innerHTML = "❤️".repeat(hearts);
}

function loadCity() {
    if (level > maxLevels) {
        document.getElementById("result").innerText = "გილოცავ! ყველა ტური გაიარე!";
        document.getElementById("next-btn").style.display = "none";
        return;
    }

    correctCity = Object.keys(cities)[Math.floor(Math.random() * Object.keys(cities).length)];
    correctImages = getRandomImages(correctCity, 2);
    selectedImages = [];
    wrongCount = 0;
    correctCount = 0;
    gameOver = false;

    let wrongImages = [];
    for (let city in cities) {
        if (city !== correctCity) {
            wrongImages = wrongImages.concat(cities[city]);
        }
    }

    let shuffledImages = correctImages.concat(getRandomWrongImages(wrongImages, 7));
    shuffledImages.sort(() => Math.random() - 0.5);

    document.getElementById("city-name").innerText = `ტური ${level}: ${correctCity}`;
    let grid = document.getElementById("image-grid");
    grid.innerHTML = "";

    shuffledImages.forEach(imgSrc => {
        let img = document.createElement("img");
        img.src = `images/${imgSrc}`;
        img.dataset.clicked = "false";
        img.addEventListener("click", checkAnswer);
        grid.appendChild(img);
    });

    document.getElementById("result").innerText = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("restart-btn").style.display = "none";
}

function getRandomImages(city, count) {
    let images = [...cities[city]];
    let selected = [];
    while (selected.length < count && images.length > 0) {
        let index = Math.floor(Math.random() * images.length);
        selected.push(images.splice(index, 1)[0]);
    }
    return selected;
}

function getRandomWrongImages(images, count) {
    let selected = [];
    while (selected.length < count && images.length > 0) {
        let index = Math.floor(Math.random() * images.length);
        selected.push(images.splice(index, 1)[0]);

    }

    console.log(correctImages);
    return selected;

    
    
}

function checkAnswer(event) {
    if (gameOver) return;

    let img = event.target;
    if (img.dataset.clicked === "true") return;

    img.dataset.clicked = "true";
    let selectedImage = img.src.split("/").pop();
    selectedImages.push(selectedImage);

    if (correctImages.includes(selectedImage)) {
        img.style.border = "3px solid green";
        correctCount++;
        if (correctCount === 2) {
            gameOver = true;
            document.getElementById("next-btn").style.display = "block";
        }
    } else {
        img.style.border = "3px solid red";
        wrongCount++;
        if (wrongCount === 2) {
            hearts--; // Remove one heart
            updateHearts();

            if (hearts === 0) {
                gameOver = true;
                document.getElementById("result").innerText = "ყველა სიცოცხლე ამოგეწურა! ";
                setTimeout(() => {
                    document.getElementById("start-btn").style.display = "block";
                    document.getElementById("game-area").style.display = "none";
                }, 4000); // Show the message for 2 seconds before restarting
            } else {
                gameOver = true;
                document.getElementById("restart-btn").style.display = "block";
            }
        }
    }
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", loadCity);
document.getElementById("next-btn").addEventListener("click", () => {
    level++;
    loadCity();
});

