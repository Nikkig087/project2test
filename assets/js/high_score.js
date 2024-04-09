function goToIndex() {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("backButton").addEventListener("click", goToIndex);
});



document.addEventListener("DOMContentLoaded", function () {
    displayHighScores();
});


function displayHighScores() {
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  
    highScoresList.innerHTML ="";
    
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
};