// player collision functionality
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

// win functionality
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  const displayTextElement = document.querySelector("#displayText");
  const refreshLinkElement = document.querySelector("#refreshLink");

  displayTextElement.style.display = "flex";
  refreshLinkElement.innerHTML = "Rematch";

  if (player.health === enemy.health) {
    displayTextElement.innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    displayTextElement.innerHTML = "Player 1 Wins";
  } else if (enemy.health > player.health) {
    displayTextElement.innerHTML = "Player 2 Wins";
  }

  refreshLinkElement.addEventListener("click", function () {
    location.reload();
  });
}

// timer functionality
let timer = 60;
let timerId;

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}
