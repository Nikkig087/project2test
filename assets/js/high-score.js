document.addEventListener("DOMContentLoaded", function () {
    displayHighScores();
});
function displayHighScores() {
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Clear the existing content of the list
    highScoresList.innerHTML = "";

    // Create table element
    const table = document.createElement("table");
    table.classList.add("table");

    // Create table header row
    const headerRow = document.createElement("tr");
    const usernameHeader = document.createElement("th");
    usernameHeader.textContent = "Username";
    headerRow.appendChild(usernameHeader);
    const scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Score";
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);

    // Create table body rows
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

    // Append the table to the highScoresList
    highScoresList.appendChild(table);
}

