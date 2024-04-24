export default class Game {
    constructor(field, goblin, cell) {
        this.field = field;
        this.fieldSize = 4;
        this.goblin = goblin;
        this.activeGoblin = null;
        this.position = null;
        this.cell = document.querySelectorAll('.cell');
        this.hit = 0;
        this.miss = 0;
    }

    newField() {
        const field = this.field.getField(this.fieldSize);
        const body = document.querySelector('body');
        let container = document.querySelector('.container'); 
        if (container) {
            body.removeChild(container); 
        }

        container = document.createElement('div');
        container.classList.add('container');
        container.appendChild(field);
        body.insertBefore(container, body.firstChild);
        this.cells = [...field.children];
    }

    randomPosition() {
        const position = Math.floor(Math.random()  *  this.fieldSize  *  4);
        if (position === this.position) {
            this.randomPosition();
            return;
        }
        this.deletedGoblin();
        this.position = position;
        this.adventGoblin();
    }

    deletedGoblin() {
        if (this.activeGoblin === null) {
            return;
        }
        this.cells[this.position].firstChild.remove();
        this.activeGoblin = null; 
    }

    adventGoblin() {
        this.activeGoblin = this.goblin.getGoblin();
        this.cells[this.position].appendChild(this.activeGoblin);
    }

    play() {
        let intervalId;

        function gameLoop() {
            this.randomPosition();
        }

        intervalId = setInterval(gameLoop.bind(this), 1000);

        this.start = () => {
            this.newField();
            clearInterval(intervalId); 
            intervalId = setInterval(gameLoop.bind(this), 1000);
        };
    }

    selectCell() {
        let goblinDiv = document.querySelector('.goblin')
        let hitScore = document.querySelector('.hit')
        let missScore = document.querySelector('.miss')
        this.cells.forEach((item) => {
            item.addEventListener("click", () => {
              if (item.hasChildNodes(goblinDiv)) {
                this.hit += 1;
                hitScore.innerText = 'Попаданий: ' + this.hit.toString();
                this.randomPosition();
                if (this.hit == 5) {
                    this.hit = 0
                    this.miss = 0
                    hitScore.innerText = 'Попаданий: ' + this.hit.toString();
                    missScore.innerText = 'Промахов: ' + this.miss.toString();
                    alert('Ты выйграл')
                }
              } else {
                this.miss += 1;
                missScore.innerText = 'Промахов: ' + this.miss.toString();
                if (this.miss == 5) {
                    this.hit = 0
                    this.miss = 0
                    hitScore.innerText = 'Попаданий: ' + this.hit.toString();
                    missScore.innerText = 'Промахов: ' + this.miss.toString();
                    alert('Ты проиграл')
                }
              }
            });
          });
          console.log('method rabotaet')
    }

    start() {
        this.newField();
        this.play();
        this.selectCell()
    }

}
