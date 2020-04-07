import { requestGameSettings } from "./Requests.js";

class GameSettings {
  constructor(parent, renderfunc, startGame) {
    this.interval = 1000;
    this.size = 10;
    this.startGame = startGame;
    this.renderFunct = renderfunc;
    this.render(parent);
  }

  render = async (target) => {
    let settings = await requestGameSettings();
    const gameForm = document.createElement('form');
    gameForm.classList = 'game-form';
    const dropDown = document.createElement("select");
    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        // const element = object[key];
    let element = `<option value="${settings[key].field};${settings[key].delay}">
                        ${key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>`;
        if(settings[key].delay===1000){
          element = `<option value="${settings[key].field};${settings[key].delay}" selected>
                        ${key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>`;
        }
        dropDown.insertAdjacentHTML('beforeend', element);
      }
    }
    gameForm.append(dropDown);
    const inputNameAndBtn = `<input type="text" placeholder="Name" class="input-name" id='playerName'></input>
                            <input id="playBtn" type="submit" value="Play"></input>
                            `;
    gameForm.insertAdjacentHTML('beforeend', inputNameAndBtn);
    target.insertAdjacentElement('afterbegin', gameForm);
    target.insertAdjacentHTML('beforeend', '<h1 id="resultMsg"></h1>')
    gameForm.addEventListener("submit", (e)=> {
      e.preventDefault();
      document.querySelector('#resultMsg').innerText = "";
      let name = document.querySelector("#playerName").value.trim()||"Guest";
      let gameSettings = dropDown.value.split(";");
      let sideSize = +gameSettings[0];
      let interval = +gameSettings[1];
      this.renderFunct(sideSize);
      this.startGame(sideSize, interval, name);
    })
  }
}

export default GameSettings;
