import { getLeaderBoard } from "./Requests.js";

class LeaderBoard {
  constructor(parent) {
    this.leaderList = [];
    this.parent = parent;
    this.render(this.parent);
  }

  async render(parent) {
    this.leaderBoardContainer = document.createElement("div");
    this.leaderBoardContainer.classList = "leader-board-container";
    const playersWrapper = document.createElement("div");
    playersWrapper.classList = "players-wrapper";
    let respose = await getLeaderBoard();
    this.leaderList = [...respose];
    if (this.leaderList.length > 0) {
      let lastTenPlayers = this.leaderList.slice(-10);

      for (const element of lastTenPlayers) {
        const player = `<div class="leaderboard-player">
                                <span>${element.winner}</span>
                                <span>${element.date}</span>
                            </div>`;
        playersWrapper.insertAdjacentHTML("afterbegin", player);
      }
    }else {
        playersWrapper.insertAdjacentHTML('afterbegin', "<h2>No recent players. You'll be the first here!</h2>")
    }

    this.leaderBoardContainer.append(playersWrapper);
    parent.append(this.leaderBoardContainer);
  }
}

export default LeaderBoard;
