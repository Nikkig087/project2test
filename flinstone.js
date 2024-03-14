let secretNumber;

let attempts;

let maxAttempts = 7;

let username;



function startGame() {

    username = document.getElementById("username").value;

    if (username.trim() === "") {

        alert("Please enter your name!");

        return;

    }

    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    document.getElementById("container").innerHTML = `

        <h2>Welcome ${username}!</h2>

        <p>You have ${maxAttempts} attempts to guess the secret number between 1 and 100.</p>

        <label for="guess">Enter your guess:</label>

        <input type="number" id="guess" min="1" max="100" required>

        <button onclick="checkGuess()">Submit Guess</button>

        <p>Attempts Left: <span id="attemptsLeft">${maxAttempts}</span></p>

    `;

}



function checkGuess() {

    let guess = parseInt(document.getElementById("guess").value);

    attempts++;

    let attemptsLeft = maxAttempts - attempts;

    document.getElementById("attemptsLeft").textContent = attemptsLeft;

    if (guess === secretNumber) {

        alert(`Congratulations ${username}! You guessed the number ${secretNumber} correctly in ${attempts} attempts.`);

        resetGame();

    } else if (attempts === maxAttempts) {

        alert(`Sorry ${username}, you've used all your attempts. The correct number was ${secretNumber}.`);

        resetGame();

    } else if (guess < secretNumber) {

        alert("Too low! Try again.");

    } else {

        alert("Too high! Try again.");

    }

}



function resetGame() {

    secretNumber = null;

    attempts = 0;

    maxAttempts = 7;

    document.getElementById("container").innerHTML = `

        <h1>Flintstones Number Guessing Game</h1>

        <label for="username">Enter your name:</label>

        <input type="text" id="username" required>

        <button onclick="startGame()">Start Game</button>

    `;

}