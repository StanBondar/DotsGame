import Cell from "./Cell.js";
import LeaderBoard from "./LeaderBoard.js";
import GameSettings from "./GameSettings.js";
import { sendGameScores } from "./Requests.js";

class Game {
  constructor(parent) {
    this.side = 10;
    this.cells = [];
    this.playersCells = [];
    this.computerCells = [];
    this.initialCellsLength = this.cells.length;
    this.timeout = null;
    this.lastCell = null;
    this.interval = 1000;
    this.parent = parent;
    this.setGame();
    this.name = null;
  }

  setGame() {
    this.gamefieldCover = document.createElement("div");
    this.gamefieldCover.classList = "game-field-cover";
    this.parent.append(this.gamefieldCover);
    this.settings = new GameSettings(
      this.gamefieldCover,
      this.render,
      this.startGame
    );
    this.LeaderBoard = new LeaderBoard(this.parent);
  }

  render = async (side) => {
    if (this.target) {
      this.target.remove();
    }
    this.target = document.createElement("table");
    this.target.classList.add("game-field");
    let counter = 0;
    this.cells = [];
    for (let i = 0; i < side; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < side; j++) {
        this.cells.push(new Cell(row, counter));
        counter++;
      }
      this.target.append(row);
    }
    this.initialCellsLength = this.cells.length;
    this.gamefieldCover.insertAdjacentElement("beforeend", this.target);
    this.addFieldEventListeners(this.target);
  };

  chooseRandomCell(cells) {
    const randomCell = this.randomiseCellIndex(cells.length - 1);
    cells[randomCell].activateCell();
    return cells[randomCell];
  }

  randomiseCellIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  startGame = async (size, interval, name) => {
    let playBtnstatus = document.querySelector("#playBtn");
    playBtnstatus.disabled = true;
    this.side = size;
    this.interval = interval;
    this.name = name;
    this.lastCell = this.chooseRandomCell(this.cells);
    this.timeout = setTimeout(
      function tick() {
        if (this.lastCell) {
          this.lastCell.lostCell();
          this.computerCells.push(
            this.cells.splice(this.cells.indexOf(this.lastCell), 1)
          );
        }

        if (
          this.cells.length > 0 &&
          this.computerCells.length < Math.ceil(this.initialCellsLength / 2)
        ) {
          this.lastCell = this.chooseRandomCell(this.cells);
          this.timeout = setTimeout(tick.bind(this), this.interval);
        } else {
          clearTimeout(this.timeout);
          this.showResult();
          let result = {
            winner: "Computer",
            date: new Date().toDateString(),
          };
          sendGameScores(result);
          playBtnstatus.value = "Play again";
          playBtnstatus.disabled = false;
          this.computerCells = [];
          this.playersCells = [];
          if (this.LeaderBoard) {
            this.LeaderBoard.leaderBoardContainer.remove();
            this.LeaderBoard = new LeaderBoard(this.parent);
          }
        }
      }.bind(this),
      this.interval
    );
  };

  async addFieldEventListeners(parent) {
    parent.addEventListener(
      "click",
      function clickEventHandler(event) {
        if (event.target.classList.contains("active-cell")) {
          clearTimeout(this.timeout);
          this.cells[
            this.cells.indexOf(
              this.cells.find(
                (element) =>
                  element.index == event.target.getAttribute("data-number")
              )
            )
          ].wonCell();
          this.playersCells.push(
            this.cells.splice(this.cells.indexOf(this.lastCell), 1)
          );
          if (
            this.cells.length > 0 &&
            this.playersCells.length < Math.ceil(this.initialCellsLength / 2)
          ) {
            this.startGame(this.side, this.interval, this.name);
          } else {
            this.showResult();
            let result = {
              winner: this.name,
              date: new Date().toDateString(),
            };
            sendGameScores(result);
            this.computerCells = [];
            this.playersCells = [];
            let playBtnstatus = document.querySelector("#playBtn");
            playBtnstatus.value = "Play again";
            playBtnstatus.disabled = false;
            if (this.LeaderBoard) {
              this.LeaderBoard.leaderBoardContainer.remove();
              this.LeaderBoard = new LeaderBoard(this.parent);
            }
          }
        }
      }.bind(this)
    );
  }

  showResult() {
    const playerScore = this.playersCells.length;
    const computerScore = this.computerCells.length;
    if (playerScore > computerScore) {
      document.querySelector("#resultMsg").innerText = "Player won!";
    } else {
      document.querySelector("#resultMsg").innerText =
        "You loose. Era of SkyNet begans!";
    }
  }
}

const parent = document.querySelector(".table-container");
let game = new Game(parent);

export default Game;
