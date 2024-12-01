    let savedScores = localStorage.getItem("gameScores");
  

    if (!savedScores) {
      savedScores = {};  // Crear un objeto vacío
    } else {
      savedScores = JSON.parse(savedScores);
    }
  
    mostrarScoresEnDOM(savedScores);
  
  

  function mostrarScoresEnDOM(scores) {

    const score_menu = document.getElementById("score");
  
    score_menu.innerHTML = '';
  
    for (let jugador in scores) {
      let col_user = document.createElement("div");
      let col_score = document.createElement("div");
  
      col_user.className = "col-6";
      col_score.className = "col-6";
  
      col_user.innerText = jugador;
      col_score.innerText = scores[jugador];

      score_menu.appendChild(col_user);
      score_menu.appendChild(col_score);
    }
  }
  