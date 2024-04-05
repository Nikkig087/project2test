/* jshint esversion: 6 */


let lifes = 3;
let correctAnswers = 0;
let username;
let currentCharacter;
let previousCharacter;

// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the button
    document.getElementById("backButton").addEventListener("click", goToIndex);
});

// Function to navigate to the index page
function goToIndex() {
    window.location.href = "index.html"; // Replace "index.html" with your actual index page URL
}


function displayCharacter() {
    const characters = [
        { name: "Bart", image: "bart.png" },
        { name: "Sonic", image: "sonic.png" },
        { name: "Spongebob", image: "spongebob.png" }
    ];

    let newCharacter;

    do {
        newCharacter = characters[Math.floor(Math.random() * characters.length)];
    } while (newCharacter.name === previousCharacter);

    previousCharacter = newCharacter.name;

    document.getElementById("characterImg").src = "assets/images/" + newCharacter.image;
    currentCharacter = newCharacter.name;
}

function startGame(event) {
    event.preventDefault(); // Prevent the default form submission behavior
     username = document.getElementById("usernameInput").value.trim();
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    if (username) {
        swal.fire({
            title: 'Game Rules',
            html: `${capitalizedUsername} for each Character Image to guess you have three lifes. <br>Loose all your life's for that guess and its Game Over!!!`,
            icon: 'info',
            confirmButtonText: 'Lets Go!!!',
           
          });
        document.getElementById("loggedInUser").textContent = `Logged in as: ${username}`;
        document.getElementById("usernameForm").classList.add("hidden");
        document.getElementById("gameContainer").classList.remove("hidden"); // Show game container
        document.getElementById("gameArea").classList.remove("hidden"); // Show game area
        document.getElementById("quitGame").classList.remove("hidden"); // Show quit button area
        document.getElementById("gameHead ").classList.remove("hidden"); // 
        document.getElementById("header").classList.add("hidden");
        lifes = 3;
        correctAnswers = 0; // Reset correct answers counter
        document.getElementById("loggedInUser").classList.remove("hidden");
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
        displayCharacter(); // Display character image
    
        
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
            displayCharacter(); // Display new character image
            message.textContent = "";
            attemptsDisplay.textContent = ""; // Clear attempts display
        }, 2000);
        correctAnswers++;
        lifes = 3;
    } else {
        lifes--;
        message.textContent = `Wrong guess, ${capitalizedUsername}! Try again.`;
        attemptsDisplay.textContent = `Number of lifes left: ${lifes}`;
        if (lifes === 0) {
            gameOver();
            return; // Stop further execution
        }
    }


    // Display correct answers count
    document.getElementById("correctAnswers").textContent = `Correct answers: ${correctAnswers}`;
}
document.addEventListener("DOMContentLoaded", function () {
    displayHighScores();
});
function displayHighScores() {
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  
    highScoresList.innerHTML = "";
    
    const heading = document.createElement("h1");
    heading.textContent = "High Scores";
    heading.classList.add("text-center", "mb-4");

    highScoresList.appendChild(heading);
    
    const table = document.createElement("table");
    table.classList.add("table");

  
    const headerRow = document.createElement("tr");
    const usernameHeader = document.createElement("th");
    usernameHeader.textContent = "Username";
    headerRow.appendChild(usernameHeader);
    const scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Score";
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);


    highScores.forEach(score => {
        const row = document.createElement("tr");
        const usernameCell = document.createElement("td");
        usernameCell.textContent = score.username;
        row.appendChild(usernameCell);
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score.score;
        row.appendChild(scoreCell);
        table.appendChild(row);
    });

    
    highScoresList.appendChild(table);
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
        html: `${capitalizedUsername}, you're out. Your score was ${correctAnswers}. Do you want to play again?`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Reset game
            lifes = 3;
            correctAnswers = 0;
            document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
            document.getElementById("message").textContent = "";
            document.getElementById("attempts").textContent = "";
            document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
            displayCharacter(); // Display new character image
        } else {
            // End game
            lifes = 3; // Reset total attempts counter
            correctAnswers = 0; // Reset correct answers counter
            document.getElementById("message").textContent = "";
            document.getElementById("attempts").textContent = "";
            document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
            document.getElementById("usernameInput").value = "";
            document.getElementById("loginContainer").classList.remove("hidden");
            document.getElementById("gameContainer").classList.add("hidden");
            document.getElementById("gameArea").classList.add("hidden"); // Hide game area
            document.getElementById("quitGame").classList.add("hidden"); // Hide game area
            document.getElementById("usernameForm").classList.remove("hidden"); // Show login form
            document.getElementById("gameHead ").classList.add("hidden"); // 
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
            
            lifes = 3; // 
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
            document.getElementById("gameHead ").classList.add("hidden"); 
            document.getElementById("header").classList.remove("hidden");
            document.getElementById("loggedInUser").classList.add("hidden");
            /*
        lifes = 3;
        correctAnswers = 0;
    
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
        displayCharacter(); // Display new character image*/
    } else {
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
        displayCharacter();

        /*
        lifes = 3; // Reset total attempts counter
        correctAnswers = 0; // Reset correct answers counter
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.getElementById("usernameInput").value = "";
        document.getElementById("loginContainer").classList.remove("hidden");
        document.getElementById("gameContainer").classList.add("hidden");
        document.getElementById("gameArea").classList.add("hidden"); // Hide game area
        document.getElementById("quitGame").classList.add("hidden"); // Hide game area
        document.getElementById("usernameForm").classList.remove("hidden"); // Show login form
        document.getElementById("gameHead ").classList.add("hidden"); // 
        document.getElementById("header").classList.remove("hidden");
        document.getElementById("loggedInUser").classList.add("hidden");*/
        
    }
});
}
    
    /*const endGame = confirm("Are you sure you want to quit?");
    
    if (endGame) {
        lifes = 3; // Reset total attempts counter
        correctAnswers = 0; // Reset correct answers counter
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        
        document.getElementById("usernameInput").value = "";
        document.getElementById("loginContainer").classList.remove("hidden");
        document.getElementById("gameContainer").classList.add("hidden");
        document.getElementById("gameArea").classList.add("hidden"); // Hide game area
        document.getElementById("quitGame").classList.add("hidden"); // Hide game area
        document.getElementById("usernameForm").classList.remove("hidden"); // Show login form
        document.getElementById("gameHead ").classList.add("hidden"); // 
        document.getElementById("header").classList.remove("hidden");
        document.getElementById("loggedInUser").classList.add("hidden");
    }else {

        lifes = 3;
        correctAnswers = 0;
    
        document.getElementById("correctAnswers").textContent = ""; // Clear correct answers display
        document.getElementById("message").textContent = "";
        document.getElementById("attempts").textContent = "";
        document.querySelectorAll('input[name="character"]').forEach(input => input.checked = false);
      
       
    // document.getElementById("attempts").textContent = "Number of attempts: 0"; // Reset attempts display
    // document.getElementById("correctAnswers").textContent = "";
     

    }
}
*/
        // JavaScript code to handle button click and form visibility
// Event listeners
document.getElementById("usernameForm").addEventListener("submit", function(event) {
    event.preventDefault();
    startGame();
});
/*
document.getElementById("usernameForm").addEventListener("submit", startGame);*/
document.getElementById("guessForm").addEventListener("submit", function(event) {
    event.preventDefault();
    checkGuess();
});
document.getElementById("quitGame").addEventListener("click", quitGame);

// Hide game area on page load
window.onload = function() {
    document.getElementById("gameContainer").classList.add("hidden");
};
document.getElementById("usernameForm").addEventListener("submit", startGame);

