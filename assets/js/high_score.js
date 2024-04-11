/* jshint esversion: 6 */
/**
 * The function below, redirects the User to the index.html page from the high_scores.html page.
*/

function goToIndex() {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("backButton").addEventListener("click", goToIndex);
});

/**
 * The below function displays the high scores stored in the local storage.
 * It retrieves the high scores from the local storage and displays them in a table format on the high_scores.html page.
 */

document.addEventListener("DOMContentLoaded", function () {
    displayHighScores();
});


function displayHighScores() {
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

   // Clear the existing high scores list
    highScoresList.innerHTML ="";
    
    // Create a heading for the high scores
    const heading = document.createElement("h1");
    heading.textContent = "High Scores";
    heading.classList.add("text-center", "mb-4");

    highScoresList.appendChild(heading);
    
    // Create a table
    const table = document.createElement("table");
    table.classList.add("table");

    // Create header row
    const headerRow = document.createElement("tr");
    const usernameHeader = document.createElement("th");
    usernameHeader.textContent = "Username";
    headerRow.appendChild(usernameHeader);
    const scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Score";
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);

     // Populate the table with the high scores
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

    // Append the table to the list container
    highScoresList.appendChild(table);
}