## Задание

Создать адаптированный аналог игры [Whack a mole](./moles.png).

#### Технические требования:

- Создать поле 10\*10 с помощью элемента `<table>`.
- Суть игры: любая неподсвеченная ячейка в таблице на короткое время окрашивается в синий цвет. Пользователь должен в течение отведенного времени успеть кликнуть на закрашенную ячейку. Если пользователь успел это сделать, она окрашивается в зеленый цвет, пользователь получает 1 очко. Если не успел - она окрашивается в красный цвет, компьютер получает 1 очко.
- Игра длится до тех пор, пока половина ячеек на поле не будут окрашены в зеленый или красный цвет. Как только это случится, тот игрок (человек или компьютер), чьих ячеек на поле больше, побеждает.
- Игра должна иметь три уровня сложности, выбираемых перед стартом игры:
  - Легкий - новая ячейка подсвечивается каждые 1.5 секунды;
  - Средний - новая ячейка подсвечивается раз в секунду;
  - Тяжелый - новая ячейка подсвечивается каждые полсекунды.
- По окончании игры вывести на экран сообщение о том, кто победил.
- После окончания игры должна быть возможность изменить уровень сложности и начать новую игру.
- Обязательно использовать функционал ООП при написании приложения.
- При желании, вместо окрашивания ячеек цветом, можно вставлять туда картинки.

Game In Dots
To successful passing of our test you should handle with following criterions:
-the game MUST work without errors
-presets for game difficulty you can fetch using this endpoint /game-settings. This is should be request to the server NOT just copy paste of data.
This data is array of objects with two fields:
-field - contain size of game field. Should be square form
-delay - time in milliseconds
-data for leader board you can get from /winners. Also it should be a request.
-when someone wins you should send request to server with JSON which contain two fields winner and date

We have next gameplay:
-user set game difficulty and name
-press PLAY
-at a specified time interval (in the delay field) a random square on the field is highlighted in blue
-if the user managed to click on the square during this time - he turns green, the player gets a point and the field changes color to green
-if not, the field turns red and the point goes to the computer
-when a player or computer paints >50% of all possible squares in his color - he becomes the winner
-an inscription appears between the control buttons and the playing field that the player (the name he entered) / computer won
-button PLAY changes the caption to PLAY AGAIN
-result of the game need to be send to server on this endpoint /winners in JSON with two fields winner and date both strings.
-results in table should be auto update