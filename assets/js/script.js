/* jshint esversion: 6 */

/* global swal */



let lifes = 2;
let correctAnswers = 0;
let username;
let currentCharacter;
let previousCharacter;





function goToIndex() {
    window.location.href = "index.html";
}

const characters = [
    { name: "Bart", image: "bart.webp"},
    { name: "Sonic", image: "sonic.webp"},
    { name: "Simba", image: "simba.webp"},
    { name: "Yoshi", image: "yoshi.webp"},
    { name: "Papa Smurf", image: "papa_smurf.webp"},
    { name: "Clumsy Smurf", image: "clumsy_smurf.webp"},
    { name: "Cinderella", image: "cinderella.webp"},
    { name: "Princess Aurora", image: "princess_aurora.webp"},
    { name: "Spongebob", image: "spongebob.webp" },
    { name: "Mickey", image: "mickey.webp" },
    { name: "Cyclops", image: "cyclops.webp" },
    { name: "Wolverine", image: "wolverine.webp"},
    { name: "Black Widdow", image: "black_widow.webp"},
    { name: "Spider Woman", image: "spider_woman.webp"}


];
let guessedCharacters = [];

function displayCharacter() {
    if (guessedCharacters.length === characters.length) {
        gameOver(); // All characters have been guessed, end the game
        return;
    }

    let newCharacter;
    do {
        newCharacter = characters[Math.floor(Math.random() * characters.length)];
    } while (guessedCharacters.includes(newCharacter));

    guessedCharacters.push(newCharacter);

    document.getElementById("characterImg").src = "assets/images/" + newCharacter.image;
    currentCharacter = newCharacter.name;

    const options = [newCharacter.name]; // Add the correct answer

    const incorrectCharacters = characters.filter(character => character !== newCharacter);

    while (options.length < 3) {
        const randomCharacter = incorrectCharacters[Math.floor(Math.random() * incorrectCharacters.length)].name;
        if (!options.includes(randomCharacter)) {
            options.push(randomCharacter);
        }
    }

    options.sort(() => Math.random() - 0.5); // Shuffle options

    for (let i = 0; i < 3; i++) {
        const radioBtn = document.getElementById(`guess${String.fromCharCode(65 + i)}`);
        const label = document.querySelector(`label[for=guess${String.fromCharCode(65 + i)}]`);

        radioBtn.value = options[i];
        label.textContent = options[i];
    }
}


function startGame(event) {
    event.preventDefault(); 
     username = document.getElementById("usernameInput").value.trim();
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    if (username) {
        swal.fire({
            title: 'Game Rules',
            html: `${capitalizedUsername} for each Character Image to guess you have two lifes. <br>Loose all your life's for that guess and its Game Over!!!`,
            icon: 'info',
            confirmButtonText: 'Lets Go!!!',
            width: '600px', // Adjust the width as needed
            padding: '1em', // Adjust the padding as needed
          
           
            
           
          });
        document.getElementById("loggedInUser").textContent = `Logged in as: ${username}`;
        document.getElementById("usernameForm").classList.add("hidden");
        document.getElementById("gameContainer").classList.remove("hidden"); 
        document.getElementById("gameArea").classList.remove("hidden"); 
        document.getElementById("quitGame").classList.remove("hidden"); 
        document.getElementById("gameHead").classList.remove("hidden"); 
        document.getElementById("header").classList.add("hidden");
        lifes = 2;
        correctAnswers = 0; 
        document.getElementById("loggedInUser").classList.remove("hidden");
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.getElementById("correctAnswers").textContent = ""; 
        document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
        displayCharacter(); 
    
        
    } else {
        
        alert("Please enter a username.");
    }
}

function checkGuess() {
    const guess = document.querySelector('input[name="character"]:checked');
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");

    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    if (guess && guess.value.toLowerCase() === currentCharacter.toLowerCase()) {
        message.textContent = `Congratulations, ${capitalizedUsername}! You guessed it right!`;
        setTimeout(function() {
            document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
            displayCharacter(); 
            message.textContent = "";
            attemptsDisplay.textContent = ""; 
        }, 2000);
        correctAnswers++;
        lifes = 2;
    } else {
        lifes--;
        message.textContent = `Wrong guess, ${capitalizedUsername}! Try again.`;
        attemptsDisplay.textContent = `Number of lifes left: ${lifes}`;
        if (lifes === 0) {
            gameOver();
            return; 
        }
    }


 
    document.getElementById("correctAnswers").textContent = `Correct answers: ${correctAnswers}`;
}
function gameOver() {
    username = document.getElementById("usernameInput").value.trim();
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
  
    const existingUserIndex = highScores.findIndex(score => score.username === username);
    
    if (existingUserIndex !== -1) {
        if (correctAnswers > highScores[existingUserIndex].score) {
            highScores[existingUserIndex].score = correctAnswers;
        }
    } else {
        highScores.push({ username: username, score: correctAnswers });
    }
    
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    swal.fire({
        title: 'Game Over',
        html: `${capitalizedUsername}, you've finished. Your score was ${correctAnswers}. Do you want to play again?`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Reset game state
            guessedCharacters = [];
            correctAnswers = 0;
            lifes = 2;
            document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
            document.getElementById("message").textContent = "";
            document.getElementById("attempts").textContent = "";
            document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
            displayCharacter(); 
        } else {
            // Reset game state and return to initial state
            guessedCharacters = [];
            correctAnswers = 0; 
            lifes =2;
            document.getElementById("message").textContent = "";
            document.getElementById("attempts").textContent = "";
            document.getElementById("correctAnswers").textContent = ""; 
            document.getElementById("usernameInput").value = "";
            document.getElementById("loginContainer").classList.remove("hidden");
            document.getElementById("gameContainer").classList.add("hidden");
            document.getElementById("gameArea").classList.add("hidden"); 
            document.getElementById("quitGame").classList.add("hidden"); 
            document.getElementById("usernameForm").classList.remove("hidden");
            document.getElementById("gameHead").classList.add("hidden"); 
            document.getElementById("header").classList.remove("hidden");
            document.getElementById("loggedInUser").classList.add("hidden");
        }
    });
}


function quitGame() {
    username = document.getElementById("usernameInput").value.trim();
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    swal.fire({
        title: 'Give Up??',
        html: `${capitalizedUsername} Are you sure you want to quit?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            
            lifes = 2; // 
            correctAnswers = 0;
           
            
            document.getElementById("message").textContent = "";
            document.getElementById("attempts").textContent = "";
            document.getElementById("correctAnswers").textContent = ""; 
            document.getElementById("usernameInput").value = "";
            document.getElementById("loginContainer").classList.remove("hidden");
            document.getElementById("gameContainer").classList.add("hidden");
            document.getElementById("gameArea").classList.add("hidden"); 
            document.getElementById("quitGame").classList.add("hidden"); 
            document.getElementById("usernameForm").classList.remove("hidden"); 
            document.getElementById("gameHead").classList.add("hidden"); 
            document.getElementById("header").classList.remove("hidden");
            document.getElementById("loggedInUser").classList.add("hidden");

    } else {
        document.getElementById("correctAnswers").textContent = ""; 
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
        displayCharacter();
        
    }
});
}

    
// Event listeners

document.getElementById("guessForm").addEventListener("submit", function(event) {
    event.preventDefault();
    checkGuess();
});




document.getElementById("labelA").addEventListener("click", function() {
    document.getElementById("guessA").checked = true;
});

document.getElementById("labelB").addEventListener("click", function() {
    document.getElementById("guessB").checked = true;
});

document.getElementById("labelC").addEventListener("click", function() {
    document.getElementById("guessC").checked = true;
});

document.getElementById("quitGame").addEventListener("click", quitGame);

document.getElementById("usernameForm").addEventListener("submit", startGame);

//onload function
window.onload = function() {
    document.getElementById("gameContainer").classList.add("hidden");
};


