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
let hearts = 3; 


const voices = {


    "1.jpeg": "voices/1.mp3",
    "2.jpeg": "voices/2.mp3",
    "3.jpeg": "voices/3.mp3",
    "4.jpeg": "voices/4.mp3",
    "5.jpeg": "voices/5.mp3",
    "6.jpeg": "voices/6.mp3",
    "7.jpeg": "voices/7.mp3",

    "8.jpeg": "voices/8.mp3",








    "10.jpeg": "voices/10.mp3",
    "11.jpeg": "voices/11.mp3",
    "12.jpeg": "voices/12.mp3",
    "13.jpeg": "voices/13.mp3",
    "14.jpeg": "voices/14.mp3",
    "15.jpeg": "voices/15.mp3",
    "18.jpeg": "voices/18.mp3",
    "16.jpeg": "voices/16.mp3",


    "20.jpeg": "voices/20.mp3",
    "21.jpeg": "voices/21.mp3",
    "26.jpeg": "voices/26.mp3",
    "24.jpeg": "voices/24.mp3",
    "25.jpeg": "voices/25.mp3",
    "22.jpeg": "voices/22.mp3",
    "28.jpeg": "voices/28.mp3",
    "23.jpeg": "voices/23.mp3",
    "27.jpeg": "voices/27.mp3",

    "34.jpeg": "voices/34.mp3",
    "30.jpeg": "voices/30.mp3",
    "32.jpeg": "voices/32.mp3",
    "38.jpeg": "voices/38.mp3",
    "36.jpeg": "voices/36.mp3",
    "31.jpeg": "voices/31.mp3",
    "33.jpeg": "voices/33.mp3",
    "35.jpeg": "voices/35.mp3",
    "37.jpeg": "voices/37.mp3",


    "40.jpeg": "voices/40.mp3",
    "41.jpeg": "voices/41.mp3",
    "44.jpeg": "voices/44.mp3",
    "45.jpeg": "voices/45.mp3",
    "47.jpeg": "voices/47.mp3",
    "42.jpeg": "voices/42.mp3",
    "48.jpeg": "voices/48.mp3",
    "43.jpeg": "voices/43.mp3",
    "46.jpeg": "voices/46.mp3",


    "50.jpeg": "voices/50.mp3",
    "58.jpeg": "voices/58.mp3",
    "56.jpeg": "voices/56.mp3",
    "57.jpeg": "voices/57.mp3",
    "53.jpeg": "voices/53.mp3",
    "51.jpeg": "voices/51.mp3",
    "54.jpeg": "voices/54.mp3",
    "52.jpeg": "voices/52.mp3",
    "55.jpeg": "voices/55.mp3",

    "65.jpeg": "voices/65.mp3",
    "66.jpeg": "voices/66.mp3",
    "62.jpeg": "voices/62.mp3",
    "67.jpeg": "voices/67.mp3",
    "60.jpeg": "voices/60.mp3",
    "64.jpeg": "voices/64.mp3",
    "63.jpeg": "voices/63.mp3",
    "68.jpeg": "voices/68.mp3",
    "61.jpeg": "voices/61.mp3",



    "71.jpeg": "voices/71.mp3",
    "77.jpeg": "voices/77.mp3",
    "72.jpeg": "voices/72.mp3",
    "73.jpeg": "voices/73.mp3",
    "74.jpeg": "voices/74.mp3",
    "75.jpeg": "voices/75.mp3",
    "76.jpeg": "voices/76.mp3",
    "78.jpeg": "voices/78.mp3",
    "79.jpeg": "voices/79.mp3",

    "87.jpeg": "voices/87.mp3",

    "94.jpeg": "voices/94.mp3",
    "96.jpeg": "voices/96.mp3",
    "92.jpeg": "voices/92.mp3",
    "95.jpeg": "voices/95.mp3",
    "97.jpeg": "voices/97.mp3",
    "98.jpeg": "voices/98.mp3",
    "93.jpeg": "voices/93.mp3",
    "99.jpeg": "voices/99.mp3",
    "91.jpeg": "voices/91.mp3",


    "102.jpeg": "voices/102.mp3",
    "103.jpeg": "voices/103.mp3",
    "104.jpeg": "voices/104.mp3",
    "105.jpeg": "voices/105.mp3",
    "106.jpeg": "voices/106.mp3",
    "107.jpeg": "voices/107.mp3",
    "108.jpeg": "voices/მიწათმოქმედება.mp3",
    "109.jpeg": "voices/109.mp3",
   

    "116.jpeg": "voices/116.mp3",
    "111.jpeg": "voices/111.mp3",
    "114.jpeg": "voices/114.mp3",
    "113.jpeg": "voices/113.mp3",
    "118.jpeg": "voices/118.mp3",
    "119.jpeg": "voices/119.mp3",
    "115.jpeg": "voices/115.mp3",
    "112.jpeg": "voices/მიწათმოქმედება.mp3",
    "117.jpeg": "voices/117.mp3",
   
    "101.jpeg": "voices/101.mp3",


    "81.jpeg": "voices/აბხარცა.mp3",
    "82.jpeg": "voices/მიწათმოქმედება.mp3",
    "84.jpeg": "voices/ბესლეთისხიდი.mp3",
    "85.jpeg": "voices/დიმიტრიგულია.mp3",
    "86.jpeg": "voices/აფხაზურიაჯიკა.mp3",
    "88.jpeg": "voices/რიწისტბა.mp3",
    "89.jpeg": "voices/სოხუმი.mp3",

    "83.jpeg": "voices/83.mp3",


};








function startGame() {
    level = 1;
    hearts = 3; 
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


function playSoundsSequentially(voices) {
    let currentSoundIndex = 0;

    function playNextSound() {
        if (currentSoundIndex < voices.length) {
            let sound = new Audio(voices[currentSoundIndex]);
            sound.play();
            sound.onended = () => {
                currentSoundIndex++;
                playNextSound();
            };
        }
    }

    playNextSound();
}


let isSoundPlaying = false;  

function checkAnswer(event) {
    if (gameOver || isSoundPlaying) return; 

    let img = event.target;

    if (img.dataset.clicked === "true") return;

    img.dataset.clicked = "true";
    let selectedImage = img.src.split("/").pop();
    selectedImages.push(selectedImage);


    if (voices[selectedImage]) {
        isSoundPlaying = true;  
        let imageSound = new Audio(voices[selectedImage]);
        imageSound.play();

        imageSound.onended = () => {
            handleAnswerCheck(img, selectedImage);  
        };
    } else {
        handleAnswerCheck(img, selectedImage);  
    }
}

function handleAnswerCheck(img, selectedImage) {
    if (correctImages.includes(selectedImage)) {
        img.style.border = "3px solid green";
        correctCount++;

        playSoundsSequentially(["voices/voice2.mp3", "voices/correct-answer-next.mp3"]);

        if (correctCount === 2) {
            gameOver = true;
            disableAllCards();
            document.getElementById("next-btn").style.display = "block";
        }
    } else {
        img.style.border = "3px solid red";
        wrongCount++;

        playSoundsSequentially(["voices/voice1.mp3", "voices/wrong-answer-next.mp3"]);

        if (wrongCount === 2) {
            hearts--;
            updateHearts();

            let allImages = document.querySelectorAll("#image-grid img");
            allImages.forEach(img => {
                img.style.pointerEvents = "none"; 
                img.style.opacity = "0.5";
            });

            setTimeout(() => {
                playSoundsSequentially(["voices/voice3.m4a", "voices/lost-round-next.m4a"]);
            }, 1300);

            if (hearts === 0) {
                gameOver = true;
                document.getElementById("result").innerText = "ყველა სიცოცხლე ამოგეწურა!";

                setTimeout(() => {
                    playSoundsSequentially(["voices/voice4.m4a", "voices/game-over-next.m4a"]);
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

    if (!gameOver) {
        let allImages = document.querySelectorAll("#image-grid img");
        allImages.forEach(img => {
            img.style.pointerEvents = "auto"; 
            img.style.opacity = "1";
        });
    }

    isSoundPlaying = false; 
}

function disableAllCards() {
    let allImages = document.querySelectorAll("#image-grid img");
    allImages.forEach(img => {
        img.style.pointerEvents = "none"; 
        img.style.opacity = "0.5"; 
    });
}

function disableAllCards() {
    let allImages = document.querySelectorAll("#image-grid img");
    allImages.forEach(img => {
        img.style.pointerEvents = "none"; 
        img.style.opacity = "0.5"; 
    });
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





function playSoundForImage(imageSrc) {
    const imageName = imageSrc.split("/").pop();
    if (voices[imageName]) {
        const audio = new Audio(voices[imageName]);
        audio.play();
    }
}













const answerImages = [
    "answer1.png", "answer2.png", "answer3.png", "answer4.png",
    "answer5.jpg", "answer6.png", "answer7.jpg", "answer8.png",
    "answer9.png", "answer10.png", "answer11.png"
];

let sliderIndex = 0;


function openSlider() {
    sliderIndex = 0;
    updateSlider();
    document.getElementById("slider-container").style.display = "block";
}


function closeSlider() {
    document.getElementById("slider-container").style.display = "none";
}

function updateSlider() {
    const sliderImg = document.getElementById("slider-img");
    if (sliderImg) {
        sliderImg.src = `images/${answerImages[sliderIndex]}`;
        sliderImg.onerror = function () {
            console.error("Error loading:", sliderImg.src);
            sliderImg.src = "images/error.png";
        };
    }
}


function nextSlide() {
    sliderIndex = (sliderIndex + 1) % answerImages.length;
    updateSlider();
}


function prevSlide() {
    sliderIndex = (sliderIndex - 1 + answerImages.length) % answerImages.length;
    updateSlider();
}


document.getElementById("game-info-btn").addEventListener("click", function () {
    document.getElementById("game-info-modal").style.display = "block";
});


document.getElementById("close-info-btn").addEventListener("click", function () {
    document.getElementById("game-info-modal").style.display = "none";
});


window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("game-info-modal")) {
        document.getElementById("game-info-modal").style.display = "none";
    }
});



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

