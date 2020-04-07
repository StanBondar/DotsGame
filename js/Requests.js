const requestGameSettings = () => {
  return fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings")
    .then(response => response.json());
};

const sendGameScores = async data => {
  await fetch("https://starnavi-frontend-test-task.herokuapp.com/winners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
};

const getLeaderBoard = async () => {
  return await fetch("https://starnavi-frontend-test-task.herokuapp.com/winners")
    .then(response => response.json());
}

export {requestGameSettings, sendGameScores, getLeaderBoard};