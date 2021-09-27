'use strict'

var players = []

function newPlayer(name) {
  let player = {
    name: name,
    victories: 0,
    ties: 0,
    defeats: 0
  };

  return player;
}

function printPlayers() {
  let htmlTable = document.getElementById("tabela-jogadores");
  let playersChecked = document.querySelectorAll(".playing:checked");
  htmlTable.innerHTML = "";

  playersSort();

  for (let player of players) {
    let tagTrPlayer = document.createElement("tr");

    let tagTdInput = document.createElement("td")
    let tagTdPlayerName = document.createElement("td");
    let tagTdPlayerVictories = document.createElement("td");
    let tagTdPlayerTies = document.createElement("td");
    let tagTdPlayerDefeats = document.createElement("td");
    let tagTdPlayerPoints = document.createElement("td");
    let tagTdActions = document.createElement("td");

    let tagInput = document.createElement("input")

    let tagButtonVictory = document.createElement("button");
    let tagButtonTie = document.createElement("button");

    tagTdActions.appendChild(tagButtonVictory);
    tagTdActions.appendChild(tagButtonTie);
    tagTdInput.appendChild(tagInput);
    tagTrPlayer.appendChild(tagTdInput);
    tagTrPlayer.appendChild(tagTdPlayerName);
    tagTrPlayer.appendChild(tagTdPlayerVictories);
    tagTrPlayer.appendChild(tagTdPlayerTies);
    tagTrPlayer.appendChild(tagTdPlayerDefeats);
    tagTrPlayer.appendChild(tagTdPlayerPoints);
    tagTrPlayer.appendChild(tagTdActions);

    tagButtonVictory.dataset.result = "victory";

    tagButtonTie.dataset.result = "tie";

    tagTrPlayer.setAttribute("class", "player");
    tagTrPlayer.dataset.playerName = player.name;

    tagInput.setAttribute("class", "playing");
    tagInput.setAttribute("type", "checkbox");
    tagInput.dataset.playerName = player.name;

    tagInput.addEventListener("click", verifyCheckBox)

    // for (let checked of playersChecked) {
    //   if (checked.dataset.playerName == player.name) {
    //     tagInput.checked = true;
    //   }
    // }

    tagButtonVictory.addEventListener("click", updateLeadboard);

    tagButtonTie.addEventListener("click", updateLeadboard);

    tagButtonVictory.innerHTML = "Vitória";
    tagButtonTie.innerHTML = "Empate";
    tagTdPlayerName.innerHTML = player.name;
    tagTdPlayerVictories.innerHTML = player.victories;
    tagTdPlayerDefeats.innerHTML = player.defeats;
    tagTdPlayerTies.innerHTML = player.ties;
    tagTdPlayerPoints.innerHTML = player.victories * 3 + player.ties;

    htmlTable.appendChild(tagTrPlayer);
  }

  verifyCheckBox()
}

function savePlayer() {
  let elementPlayerName = document.getElementById("player-name");
  let name = elementPlayerName.value;
  let player = newPlayer(name);
  players.push(player);

  elementPlayerName.value = "";
  printPlayers();
}

function verifyCheckBox() {
  let allCheckBoxes = document.querySelectorAll(".playing");
  let allCheckBoxesChecked = document.querySelectorAll(".playing:checked").length

  for (let checkBox of allCheckBoxes) {
    if (allCheckBoxesChecked == 2) {
      if (!checkBox.checked) {
        checkBox.disabled = true;
      }
    } else {
      checkBox.disabled = false;
    }
  }
}

function updateLeadboard(e) {
  // Retorna os inputs com checkbox ativado
  let playersChecked = document.querySelectorAll(".playing:checked");
  // Retorna o nome do jogador que teve o botão acionado
  let playerNameSelected = e.target.closest("tr").dataset.playerName;
  // Retorna o resultado do jogo (Victory ou tie)
  let result = e.target.closest("button").dataset.result;
  let playerNameNotSelected = "";
  let okButton = false;

  if (playersChecked.length == 2) {
    switch (playerNameSelected) {
      case playersChecked[0].dataset.playerName: 
        playerNameNotSelected = playersChecked[1].dataset.playerName;
        okButton = true;
        break;
      case playersChecked[1].dataset.playerName: 
        playerNameNotSelected = playersChecked[0].dataset.playerName;
        okButton = true;
        break;
    }

    // if (playersChecked.length == 2 && okButton) {
    if (okButton) {
      for (let player of players) {
        if (result == "victory") {
          if (player.name == playerNameSelected) {
            player.victories++
          }
          if (player.name == playerNameNotSelected) {
            player.defeats++
          }
        } else {
          if (player.name == playerNameSelected || player.name == playerNameNotSelected) {
            player.ties++
          }
        }
      }
    }
    printPlayers()
  }
}

function arraySort(vet, x) {
  vet.sort(function compare(a, b) {
    return a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0
  })

  return vet
}

function playersSort() {
  arraySort(players, "name");
  arraySort(players, "defeats");
  players.reverse();
  arraySort(players, "ties");
  arraySort(players, "victories");
  players.reverse();
} 

players.push(newPlayer("Antonio"));
players.push(newPlayer("Miguel"));
players.push(newPlayer("João"));
players.push(newPlayer("Rodrigo"));
players.push(newPlayer("Gustavo"));
printPlayers();