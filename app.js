const cities = {
    "იმერეთი": ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg"],
    "სვანეთი": ["10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", "17.jpeg", "18.jpeg"],
    "კახეთი": ["60.jpeg", "61.jpeg", "62.jpeg", "63.jpeg", "64.jpeg", "65.jpeg", "66.jpeg", "67.jpeg", "68.jpeg"],
    "გურია": ["111.jpeg", "112.jpeg", "113.jpeg", "114.jpeg", "115.jpeg", "116.jpeg", "117.jpeg", "118.jpeg", "119.jpeg"],
    "სამეგრელო": ["101.jpeg", "102.jpeg", "103.jpeg", "104.jpeg", "105.jpeg", "106.jpeg", "107.jpeg", "108.jpeg", "109.jpeg"],
    "რაჭა-ლეჩხუმი": ["91.jpeg", "92.jpeg", "93.jpeg", "94.jpeg", "95.jpeg", "96.jpeg", "97.jpeg", "98.jpeg", "99.jpeg"],
    "ფშავ-ხევსურეთი": ["71.jpeg", "72.jpeg", "73.jpeg", "74.jpeg", "75.jpeg", "76.jpeg", "77.jpeg", "78.jpeg", "79.jpeg"],
    "სამცხე-ჯავახეთი": ["30.jpeg", "31.jpeg", "32.jpeg", "33.jpeg", "34.jpeg", "35.jpeg", "36.jpeg", "37.jpeg", "38.jpeg"],
    "შიდა ქართლი": ["40.jpeg", "41.jpeg", "42.jpeg", "43.jpeg", "44.jpeg", "45.jpeg", "46.jpeg", "47.jpeg", "48.jpeg"],
    "ქვემო ქართლი": ["50.jpeg", "51.jpeg", "52.jpeg", "53.jpeg", "54.jpeg", "55.jpeg", "56.jpeg", "57.jpeg", "58.jpeg"],
    "აჭარა": ["20.jpeg", "21.jpeg", "22.jpeg", "23.jpeg", "24.jpeg", "25.jpeg", "26.jpeg", "27.jpeg", "28.jpeg"],
    "აფხაზეთი": ["81.jpeg", "82.jpeg", "83.jpeg", "84.jpeg", "85.jpeg", "86.jpeg", "87.jpeg", "88.jpeg", "89.jpeg"]
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

   
    return selected;

    
    
}


function playSoundsSequentially(sounds) {
    let currentSoundIndex = 0;

    function playNextSound() {
        if (currentSoundIndex < sounds.length) {
            let sound = new Audio(sounds[currentSoundIndex]);
            sound.play();
            sound.onended = () => {
                currentSoundIndex++;
                playNextSound();
            };
        }
    }

    playNextSound();
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

        // Play correct sound sequentially
        playSoundsSequentially(["voices/2.m4a", "voices/correct-answer-next.m4a"]);

        if (correctCount === 2) {
            gameOver = true;
            document.getElementById("next-btn").style.display = "block";
        }
    } else {
        img.style.border = "3px solid red";
        wrongCount++;

        // Play wrong sound sequentially
        playSoundsSequentially(["voices/1.m4a", "voices/wrong-answer-next.m4a"]);

        if (wrongCount === 2) {
            hearts--;
            updateHearts();

            // Disable clicking & hovering on all images
            let allImages = document.querySelectorAll("#image-grid img");
            allImages.forEach(img => {
                img.style.pointerEvents = "none"; // Disable clicking
                img.style.opacity = "0.5"; // Visually fade out inactive cards
            });

            setTimeout(() => {
                // Play round lost sound sequentially
                playSoundsSequentially(["voices/3.m4a", "voices/lost-round-next.m4a"]);
            }, 1300);

            if (hearts === 0) {
                gameOver = true;
                document.getElementById("result").innerText = "ყველა სიცოცხლე ამოგეწურა!";

                setTimeout(() => {
                    // Play game over sound sequentially
                    playSoundsSequentially(["voices/4.m4a", "voices/game-over-next.m4a"]);
                }, 3000);

                setTimeout(() => {
                    document.getElementById("start-btn").style.display = "block";
                    document.getElementById("game-area").style.display = "none";
                }, 4000);
            } else {
                gameOver = true;
                document.getElementById("restart-btn").style.display = "block";
            }
        }
    }
}


window.onbeforeunload = function (event) {
    event.preventDefault();
    event.returnValue = "ნამდვილად გსურთ თამაშის დატოვება?";
};

function enableCards() {
    document.querySelectorAll(".image-container img").forEach(img => {
        img.classList.remove("disabled");
    });
}




const answerImages = [
    "answer1.png", "answer2.png", "answer3.png", "answer4.png",
    "answer5.png", "answer6.png", "answer7.png", "answer8.png",
    "answer9.png", "answer10.png", "answer11.png"
];

let sliderIndex = 0;

// Open Answer Page
function openSlider() {
    sliderIndex = 0;
    updateSlider();
    document.getElementById("slider-container").style.display = "block";
}

// Close Answer Page
function closeSlider() {
    document.getElementById("slider-container").style.display = "none";
}

// Update Answer Image
function updateSlider() {
    const sliderImg = document.getElementById("slider-img");
    if (sliderImg) {
        sliderImg.src = `images/${answerImages[sliderIndex]}`;
        sliderImg.onerror = function () {
            console.error("Error loading:", sliderImg.src);
            sliderImg.src = "images/error.png"; // Default image if one is missing
        };
    }
}

// Next Answer
function nextSlide() {
    sliderIndex = (sliderIndex + 1) % answerImages.length;
    updateSlider();
}

// Previous Answer
function prevSlide() {
    sliderIndex = (sliderIndex - 1 + answerImages.length) % answerImages.length;
    updateSlider();
}

// Show the Game Info Modal when the button is clicked
document.getElementById("game-info-btn").addEventListener("click", function () {
    document.getElementById("game-info-modal").style.display = "block";
});

// Close the Game Info Modal when the close button is clicked
document.getElementById("close-info-btn").addEventListener("click", function () {
    document.getElementById("game-info-modal").style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("game-info-modal")) {
        document.getElementById("game-info-modal").style.display = "none";
    }
});


// Event Listeners
document.getElementById("answers-btn").addEventListener("click", openSlider);
document.getElementById("close-slider").addEventListener("click", closeSlider);
document.getElementById("next-slide").addEventListener("click", nextSlide);
document.getElementById("prev-slide").addEventListener("click", prevSlide);


document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", loadCity);
document.getElementById("next-btn").addEventListener("click", () => {
    level++;
    loadCity();
});

