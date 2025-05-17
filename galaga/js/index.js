const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const volumeSlider = document.getElementById('volume');
const musicToggle = document.getElementById('musicToggle');
const shootSound = new Audio('../galaga/sounds/shoot.mp3');
const explosionSound = document.getElementById('explosionSound') || new Audio('../galaga/sounds/death.mp3');
const gameOverSound = document.getElementById('gameOverSound') || new Audio('../galaga/sounds/playerDeath.mp3');
const backgroundMusic1 = new Audio('../galaga/sounds/phonk1.mp3');
const backgroundMusic2 = new Audio('../galaga/sounds/phonk2.mp3');
const backgroundMusic3 = new Audio('../galaga/sounds/phonk3.mp3');

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 40;

let player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speed: 5,
  bullets: []
};

let enemies = [];
let enemyBullets = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let keys = {};
let particles = [];
let enemyBulletSpeed = 1.5;
let wave = 1;
let currentMusic;

const backgroundMusics = [backgroundMusic1, backgroundMusic2, backgroundMusic3];

function setVolume() {
  const volume = parseFloat(volumeSlider.value);
  shootSound.volume = volume;
  explosionSound.volume = volume;
  gameOverSound.volume = volume;
  backgroundMusics.forEach(music => music.volume = volume);
}

function playBackgroundMusic() {
  if (musicToggle.checked && gameStarted) {
    if (currentMusic) currentMusic.pause();
    currentMusic = backgroundMusics[Math.floor(Math.random() * backgroundMusics.length)];
    currentMusic.loop = true;
    currentMusic.play().catch(() => {});
  }
}

function stopBackgroundMusic() {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.opacity = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
    this.size *= 0.95;
  }
  draw() {
    ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function spawnEnemies() {
  const spawnZones = [
    { xMin: 50, xMax: 250 }, // Left
    { xMin: canvas.width / 2 - 150, xMax: canvas.width / 2 + 150 }, // Center
    { xMin: canvas.width - 550, xMax: canvas.width - 250 } // Right
  ];
  const zone = spawnZones[Math.floor(Math.random() * spawnZones.length)];

  if (wave === 4) {
    // Butterfly formation (arc)
    const positions = [
      { x: 0, y: 0 }, // Center top
      { x: -60, y: 50 }, { x: 60, y: 50 }, // Second row
      { x: -120, y: 100 }, { x: 120, y: 100 }, // Third row
      { x: -180, y: 150 }, { x: 180, y: 150 } // Fourth row
    ];
    positions.forEach(pos => {
      enemies.push({
        x: zone.xMin + 200 + pos.x,
        y: 50 + pos.y,
        width: 40,
        height: 40,
        speed: 2.8 + wave * 0.2,
        angle: 0,
        spawnZone: zone,
        type: 'butterfly',
        isSpiraling: false,
        spiralAngle: 0
      });
    });
  } else if (wave % 3 === 0) {
    // Bee formation (triangle)
    const positions = [
      { x: 0, y: 0 }, // Leader
      { x: -40, y: 60 }, { x: 40, y: 60 }, // Second row
      { x: -80, y: 120 }, { x: 80, y: 120 } // Third row
    ];
    positions.forEach(pos => {
      enemies.push({
        x: zone.xMin + 100 + pos.x,
        y: 50 + pos.y,
        width: 40,
        height: 40,
        speed: 2.5 + wave * 0.2,
        angle: 0,
        spawnZone: zone,
        type: 'bee',
        isDiving: false,
        diveTargetX: 0,
        diveTargetY: 0
      });
    });
  } else {
    // Regular grid formation
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        enemies.push({
          x: zone.xMin + i * 80,
          y: 50 + j * 80,
          width: 40,
          height: 40,
          speed: 2 + wave * 0.2,
          angle: 0,
          spawnZone: zone,
          type: 'regular'
        });
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = '#00FFFF';
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#00FFFF';
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y);
  ctx.lineTo(player.x, player.y + player.height);
  ctx.lineTo(player.x + player.width, player.y + player.height);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawEnemy(enemy) {
  if (enemy.type === 'butterfly') {
    ctx.fillStyle = '#FF0000';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FF0000';
    ctx.beginPath();
    const cx = enemy.x + enemy.width / 2;
    const cy = enemy.y + enemy.height / 2;
    const r = enemy.width / 2;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  } else if (enemy.type === 'bee') {
    ctx.fillStyle = '#00FF00';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00FF00';
    ctx.beginPath();
    ctx.moveTo(enemy.x + enemy.width / 2, enemy.y);
    ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height / 2);
    ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
    ctx.lineTo(enemy.x, enemy.y + enemy.height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    ctx.fillStyle = '#FF00FF';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FF00FF';
    ctx.beginPath();
    ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function drawBullet(bullet) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
}

function movePlayer() {
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;
}

function shoot() {
  if (!gameStarted || gameOver) return;
  player.bullets.push({
    x: player.x + player.width / 2 - 2.5,
    y: player.y,
    width: 5,
    height: 10,
    speed: -10
  });
  shootSound.play().catch(() => {});
}

function updateBullets() {
  player.bullets = player.bullets.filter(bullet => bullet.y > 0);
  player.bullets.forEach(bullet => {
    bullet.y += bullet.speed;
    drawBullet(bullet);
  });

  enemyBullets = enemyBullets.filter(bullet => bullet.y < canvas.height);
  enemyBullets.forEach(bullet => {
    bullet.y += bullet.speed;
    drawBullet(bullet);
  });
}

function updateEnemies() {
  enemies.forEach(enemy => {
    if (enemy.type === 'butterfly') {
      if (enemy.isSpiraling) {
        enemy.spiralAngle += 0.2;
        enemy.x += Math.cos(enemy.spiralAngle) * 4;
        enemy.y += Math.sin(enemy.spiralAngle) * 4 + 2;
        if (enemy.spiralAngle > Math.PI * 4) {
          enemy.isSpiraling = false;
          enemy.y = 50;
          if (enemy.x > canvas.width - 520) {
            enemy.x = canvas.width - enemy.x + 50;
          } else if (enemy.x < 520) {
            enemy.x = canvas.width - enemy.x - 70;
          }
          enemy.angle = 0.05;
        }
      } else {
        enemy.angle += 0.05;
        enemy.x += Math.sin(enemy.angle) * enemy.speed * 0.8;
        enemy.y += 1.5;
        if (Math.random() < 0.02 && !enemy.isSpiraling) {
          enemy.isSpiraling = true;
          enemy.spiralAngle = 0;
        }
      }
    } else if (enemy.type === 'bee') {
      if (enemy.isDiving) {
        const dx = enemy.diveTargetX - enemy.x;
        const dy = enemy.diveTargetY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 10) {
          enemy.x += (dx / distance) * 5;
          enemy.y += (dy / distance) * 5;
        } else {
          enemy.isDiving = false;
          enemy.y = 50;
          if (enemy.x > canvas.width - 520) {
            enemy.x = canvas.width - enemy.x + 50;
          } else if (enemy.x < 520) {
            enemy.x = canvas.width - enemy.x - 70;
          }
          enemy.angle = 0.05;
        }
      } else {
        enemy.angle += 0.05;
        enemy.x += Math.sin(enemy.angle) * enemy.speed * 1.5;
        enemy.y += 1;
        if (Math.random() < 0.01 && !enemy.isDiving) {
          enemy.isDiving = true;
          enemy.diveTargetX = player.x + player.width / 2;
          enemy.diveTargetY = player.y;
        }
      }
    } else {
      enemy.angle += 0.05;
      enemy.x += Math.sin(enemy.angle) * enemy.speed;
      enemy.y += 0.5;
    }

    if (enemy.y >= canvas.height) {
      enemy.y = 50;
      if (enemy.x > canvas.width - 520) {
        enemy.x = canvas.width - enemy.x + 50;
      } else if (enemy.x < 520) {
        enemy.x = canvas.width - enemy.x - 70;
      }
      enemy.angle = 0.05;
    }

    drawEnemy(enemy);

    const shootChance = enemy.type === 'butterfly' ? 0.01 : enemy.type === 'bee' ? 0.005 : 0.001;
    if (Math.random() < shootChance) {
      enemyBullets.push({
        x: enemy.x + enemy.width / 2 - 2.5,
        y: enemy.y + enemy.height,
        width: 5,
        height: 10,
        speed: enemyBulletSpeed
      });
    }
  });
}

function checkCollisions() {
  player.bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        for (let i = 0; i < 10; i++) {
          particles.push(new Particle(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
        }
        enemies.splice(enemyIndex, 1);
        player.bullets.splice(bulletIndex, 1);
        score += enemy.type === 'butterfly' ? 30 : enemy.type === 'bee' ? 20 : 10;
        scoreElement.textContent = score;
        explosionSound.play().catch(() => {});
      }
    });
  });

  enemyBullets.forEach(bullet => {
    if (
      bullet.x < player.x + player.width &&
      bullet.x + bullet.width > player.x &&
      bullet.y < player.y + player.height &&
      bullet.y + bullet.height > player.y
    ) {
      gameOver = true;
      gameStarted = false;
      gameOverElement.style.display = 'flex';
      finalScoreElement.textContent = score;
      gameOverSound.play().catch(() => {});
      stopBackgroundMusic();
    }
  });

  enemies.forEach(enemy => {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      gameOver = true;
      gameStarted = false;
      gameOverElement.style.display = 'flex';
      finalScoreElement.textContent = score;
      gameOverSound.play().catch(() => {});
      stopBackgroundMusic();
    }
  });

  if (enemies.length === 0 && !gameOver) {
    wave++;
    spawnEnemies();
  }
}

function updateParticles() {
  particles = particles.filter(p => p.opacity > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}

function increaseEnemyBulletSpeed() {
  if (enemyBulletSpeed < 3) {
    enemyBulletSpeed += 0.05;
  }
}

setInterval(increaseEnemyBulletSpeed, 10000);

function gameLoop() {
  if (!gameStarted || gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  movePlayer();
  updateBullets();
  updateEnemies();
  updateParticles();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

function startGame() {
  startScreen.style.display = 'none';
  gameStarted = true;
  spawnEnemies();
  setVolume();
  playBackgroundMusic();
  gameLoop();
}

function returnToMenu() {
  gameOverElement.style.display = 'none';
  startScreen.style.display = 'flex';
  gameOver = false;
  gameStarted = false;
  player = { x: canvas.width / 2 - 25, y: canvas.height - 50, width: 50, height: 50, speed: 5, bullets: [] };
  enemies = [];
  enemyBullets = [];
  particles = [];
  score = 0;
  enemyBulletSpeed = 1.5;
  wave = 1;
  scoreElement.textContent = score;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stopBackgroundMusic();
}

function restartGame() {
  player = { x: canvas.width / 2 - 25, y: canvas.height - 50, width: 50, height: 50, speed: 5, bullets: [] };
  enemies = [];
  enemyBullets = [];
  particles = [];
  score = 0;
  enemyBulletSpeed = 1.5;
  wave = 1;
  scoreElement.textContent = score;
  gameOver = false;
  gameStarted = true;
  gameOverElement.style.display = 'none';
  spawnEnemies();
  setVolume();
  playBackgroundMusic();
  gameLoop();
}

document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Space' && !gameOver) shoot();
});
document.addEventListener('keyup', e => {
  keys[e.code] = false;
});
startButton.addEventListener('click', startGame);
volumeSlider.addEventListener('input', setVolume);