let totalAttempts = 0;
let correctAnswers = 0;
let username;
let currentCharacter;

function displayCharacter() {
    const characters = [
        { name: "Fred", image: "apple-touch-icon.png" },
        { name: "Wilma", image: "apple-touch-icon.png"  },
        { name: "Barney", image:"apple-touch-icon.png"  },
        { name: "Betty", image: "apple-touch-icon.png" },
        { name: "Pebbles", image: "apple-touch-icon.png"  },
        { name: "Bamm-Bamm", image: "apple-touch-icon.png"  },
        { name: "Dino", image:"apple-touch-icon.png"  }
    ];
    currentCharacter = characters[Math.floor(Math.random() * characters.length)];
    document.getElementById("characterImg").src = currentCharacter.image;
    return currentCharacter.name;
}

function startGame(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    username = document.getElementById("usernameInput").value.trim();
    if (username) {
        document.getElementById("loggedInUser").textContent = `Logged in as: ${username}`;
        document.getElementById("usernameForm").classList.add("hidden");
        document.getElementById("gameContainer").classList.remove("hidden"); // Show game container
        document.getElementById("gameArea").classList.remove("hidden"); // Show game area
        document.getElementById("quitGame").classList.remove("hidden"); // Show quit button area
        totalAttempts = 0;
        correctAnswers = 0; // Reset correct answers counter
        displayCharacter(); // Display character image
    } else {
        alert("Please enter a username.");
    }
}
function gameOver() {
    const playAgain = confirm("Bam Bam! You're out. Do you want to play again?");
    if (playAgain) {
        totalAttempts = 0;
        correctAnswers = 0;
        document.getElementById("guessInput").value = "";
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "Number of attempts: 0"; // Reset attempts display
        document.getElementById("correctAnswers").textContent = "";
        displayCharacter(); // Display new character image
    } else {
        totalAttempts = 0; // Reset total attempts counter
        correctAnswers = 0; // Reset correct answers counter
        document.getElementById("guessInput").value = ""; // Clear the guess input box
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = ""; // Clear attempts display
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.getElementById("usernameInput").value = "";
        document.getElementById("loginContainer").classList.remove("hidden");
        document.getElementById("gameContainer").classList.add("hidden");
        document.getElementById("gameArea").classList.add("hidden"); // Hide game area
        document.getElementById("quitGame").classList.add("hidden"); // Hide game area
        document.getElementById("usernameForm").classList.remove("hidden"); // Show login form
    }
}

function quitGame(){
   
    
    let endGame = confirm("Are you sure you want to quit?");
    if (endGame){
        totalAttempts = 0; // Reset total attempts counter
        correctAnswers = 0; // Reset correct answers counter
        document.getElementById("guessInput").value = ""; // Clear the guess input box
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = ""; // Clear attempts display
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.getElementById("usernameInput").value = "";
        document.getElementById("loginContainer").classList.remove("hidden");
        document.getElementById("gameContainer").classList.add("hidden");
        document.getElementById("gameArea").classList.add("hidden"); // Hide game area
        document.getElementById("quitGame").classList.add("hidden"); // Hide game area
        document.getElementById("usernameForm").classList.remove("hidden"); // Show login form
    } else {
     
        document.getElementById("guessInput").value = "";
        document.getElementById("message").textContent = "";
       // document.getElementById("attempts").textContent = "Number of attempts: 0"; // Reset attempts display
       // document.getElementById("correctAnswers").textContent = "";
        displayCharacter(); // Display new character image
    }
}

function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");

    const guess = guessInput.value.trim();
    const correctCharacter = currentCharacter.name.toLowerCase();
    
    if (guess.toLowerCase() === correctCharacter) {
        message.textContent = `Congratulations, ${username}! You guessed it right!`;
        guessInput.value = "";
        correctAnswers++; // Increment correct answers counter
        displayCharacter(); // Change picture only after correct guess
    } else {
        totalAttempts++;
        message.textContent = `Wrong guess, ${username}! Try again.`;
        attemptsDisplay.textContent = `Number of attempts: ${totalAttempts}`;
        if (totalAttempts >= 3) {
            gameOver();
            return; // Stop further execution
        }
    }
    
    // Display correct answers count
    document.getElementById("correctAnswers").textContent = `Correct answers: ${correctAnswers}`;
}

document.getElementById("usernameForm").addEventListener("submit", function(event) {
    event.preventDefault();
    startGame();
});

document.getElementById("guessForm").addEventListener("submit", function(event) {
    event.preventDefault();
    checkGuess();
});

document.getElementById("quitGame").addEventListener("click", function(){
   
    quitGame();

})

// Hide game area on page load
window.onload = function() {
    document.getElementById("gameArea").classList.add("hidden");
};

document.getElementById("usernameForm").addEventListener("submit", startGame);
