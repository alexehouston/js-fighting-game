const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

c.fillRect(0, 0, canvas.width, canvas.height);

// disable image smoothing upon scaling
c.webkitImageSmoothingEnabled = false;
c.mozImageSmoothingEnabled = false;
c.imageSmoothingEnabled = false;

const gravity = 0.7;

const backgroundLayers = [];

const layer1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/bg/1.png",
  scale: 1.0,
});

const layer2 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/bg/2.png",
  scale: 1.0,
});

const layer3 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/bg/3.png",
  scale: 1.0,
});

const layer4 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/bg/4.png",
  scale: 1.0,
});

const layer5 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/bg/5.png",
  scale: 1.0,
});

const layer6 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/bg/6.png",
  scale: 1.0,
});

backgroundLayers.push(layer1);
backgroundLayers.push(layer2);
backgroundLayers.push(layer3);
backgroundLayers.push(layer4);
backgroundLayers.push(layer5);
backgroundLayers.push(layer6);

// const background = new Sprite({
//   position: {
//     x: 0,
//     y: 0,
//   },
//   imageSrc: "./img/background.jpg",
//   scale: 1.68,
// });

// const shop = new Sprite({
//   position: {
//     x: 640,
//     y: 160,
//   },
//   imageSrc: "./img/shop.png",
//   scale: 2.5,
//   framesMax: 6,
// });

// player 1
const player = new Fighter({
  position: {
    x: 210,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/redWitch/Idle.png",
  scale: 3.5,
  framesMax: 14,
  sprites: {
    idle: {
      imageSrc: "./img/redWitch/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/redWitch/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/redWitch/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/redWitch/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/redWitch/Attack.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/redWitch/TakeHit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/redWitch/Death.png",
      framesMax: 14,
    },
  },
  attackBox: {
    offset: {
      x: 115,
      y: 110,
    },
    width: 150,
    height: 25,
  },
});

// player 2
const enemy = new Fighter({
  position: {
    x: 1200,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: -34,
  },
  imageSrc: "./img/blueWitch/Idle.png",
  scale: 3.5,
  framesMax: 12,
  sprites: {
    idle: {
      imageSrc: "./img/blueWitch/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/blueWitch/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/blueWitch/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/blueWitch/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/blueWitch/Attack.png",
      framesMax: 9,
    },
    takeHit: {
      imageSrc: "./img/blueWitch/TakeHit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/blueWitch/Death.png",
      framesMax: 12,
    },
  },
  attackBox: {
    offset: {
      x: -160,
      y: 110,
    },
    width: 250,
    height: 25,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function renderBackground() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background layers
  backgroundLayers.forEach((layer) => {
    const scale = layer.scale;
    let posX = layer.position.x;
    const posY = layer.position.y;

    // Adjust the position to create the illusion of endless looping
    while (posX < canvas.width) {
      c.drawImage(layer.image, posX, posY, canvas.width * scale, canvas.height * scale);
      posX += canvas.width * scale;
    }
  });
}


decreaseTimer();

// player/enemy movement
function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // background.update();

  backgroundLayers.forEach((layer, index) => {
    if (index === 1 || index === 5) {
      // Don't move layer 2 and layer 6
      layer.position.x = 0;
    } else {
      // layer movement speed
      layer.position.x -= (index + 1) * 0.15;
  
      // Check if the layer has scrolled off the screen completely
      if (layer.position.x <= -canvas.width * layer.scale) {
        // Move the layer next to the previous iteration
        const previousLayer = backgroundLayers[index - 1];
        layer.position.x = previousLayer.position.x + canvas.width * previousLayer.scale;
      }
    }
  });

  // Render the background
  renderBackground();

  // white background overlay
  c.fillStyle = "rgba(255, 255, 255, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player 1 movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  // player 1 jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // player 2 movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  // player 2 jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // detect for collision / player 2 gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;

    // health bar decrease
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
      borderRadius: 0,
    });
  }

  // detect for collision / player 1 gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    // health bar decrease
    gsap.to("#playerHealth", {
      width: player.health + "%",
      borderRadius: 0,
    });
  }

  // if player 1 misses
  if (player.isAttacking & (player.framesCurrent === 4)) {
    player.isAttacking = false;
  }

  // if player 2 misses
  if (enemy.isAttacking & (enemy.framesCurrent === 2)) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

// handle pressing keys
window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        player.switchSprite("jump"); // Switch to the "jump" sprite
        break;
      case " ":
        player.attack();
        break;
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        enemy.switchSprite("jump"); // Switch to the "jump" sprite
        break;
      case "ArrowDown":
        enemy.attack();
        break;
    }
  }
});

// handle un-pressing keys
window.addEventListener("keyup", (event) => {
  // player 1 keys
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  // player 2 keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
