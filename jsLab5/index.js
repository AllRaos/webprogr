const forbiddenColors = ['blue', 'yellow', 'white', 'gray'];

    function generateColors() {
      const colors = ['red', 'green', 'purple', 'orange', 'pink', 'brown'];
      const availableColors = colors.filter(color => !forbiddenColors.includes(color));
      const selectedColors = [];
      while (selectedColors.length < 3) {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const color = availableColors[randomIndex];
        if (!selectedColors.includes(color)) {
          selectedColors.push(color);
        }
      }
      return selectedColors;
    }

    const colorSelect = document.getElementById('color');
    const colors = generateColors();
    colors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });

    const difficultyTimes = {
      easy: 2000,
      medium: 1500,
      hard: 1000,
      impossible: 500
    };

    let score = 0;
    let lives = 3;
    let timer;
    let blockStartTime = 0;
    let blockDuration = 0;
    let timeInterval;

    document.getElementById('start-button').addEventListener('click', () => {
      const difficulty = document.getElementById('difficulty').value;
      const color = document.getElementById('color').value;
      startGame(difficulty, color);
    });

    function startGame(difficulty, color) {
      score = 0;
      lives = 3;
      updateScore();
      updateLives();
      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('game-screen').style.display = 'block';
      timeInterval = setInterval(updateTime, 100);
      generateBlock(difficulty, color);
    }

    function updateTime() {
      if (blockDuration > 0) {
        const timeElapsed = Date.now() - blockStartTime;
        const timeLeft = Math.max(0, blockDuration - timeElapsed);
        const secondsLeft = (timeLeft / 1000).toFixed(1);
        document.getElementById('time-left').textContent = `Час: ${secondsLeft} с`;
      } else {
        document.getElementById('time-left').textContent = `Час: 0.0 с`;
      }
    }

    function generateBlock(difficulty, color) {
      if (lives <= 0) {
        endGame();
        return;
      }
      const gameArea = document.getElementById('game-area');
      const block = document.createElement('div');
      block.classList.add('block');
      block.style.backgroundColor = color;
      block.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
      block.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
      gameArea.appendChild(block);
      
      blockStartTime = Date.now();
      blockDuration = difficultyTimes[difficulty];

      let clicked = false;
      block.addEventListener('click', () => {
        if (!clicked) {
          clicked = true;
          score++;
          updateScore();
          gameArea.removeChild(block);
          clearTimeout(timer);
          generateBlock(difficulty, color);
        }
      });
      
      timer = setTimeout(() => {
        if (!clicked) {
          lives--;
          updateLives();
          gameArea.removeChild(block);
          generateBlock(difficulty, color);
        }
      }, difficultyTimes[difficulty]);
    }

    function updateScore() {
      document.getElementById('score').textContent = `Рахунок: ${score}`;
    }

    function updateLives() {
      document.getElementById('lives').textContent = `Життя: ${lives}`;
    }

    function endGame() {
      clearInterval(timeInterval);
      blockDuration = 0;
      document.getElementById('game-screen').style.display = 'none';
      document.getElementById('end-screen').style.display = 'block';
      document.getElementById('final-score').textContent = `Вітаю! Ви заробили ${score} очок.`;
    }

    document.getElementById('ok-button').addEventListener('click', () => {
      document.getElementById('end-screen').style.display = 'none';
      document.getElementById('start-screen').style.display = 'block';
      const gameArea = document.getElementById('game-area');
      while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
      }
    });

    document.getElementById('game-area').addEventListener('click', (e) => {
      if (e.target === document.getElementById('game-area')) {
        lives--;
        updateLives();
        if (lives <= 0) {
          endGame();
        }
      }
    });