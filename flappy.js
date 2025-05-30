let bird;
let topColumns;
let bottomColumns;
let hadLanded = false;
let cursors;
let hasBumped = false;
let gameStarted = false;
let messageToPlayer;

const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 900,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "img/background.png");
  this.load.image("column", "img/column.png");
  this.load.image("road", "img/road.png");
  this.load.image("bird", "img/bird.png");
}

function create() {
  const background = this.add.image(0, 0, "background").setOrigin(0, 0);
  const roads = this.physics.add.staticGroup();
  const road = roads.create(400, 568, "road").setScale(2).refreshBody();
  const topColumn = this.physics.add.staticGroup({
    key: "column",
    repeat: 1,
    setXY: {x: 200, y: 0, stepX: 300}
  });
  const buttomColumn = this.physics.add.staticGroup({
    key: "column",
    repeat: 1,
    setXY: {x: 350, y: 400, stepX: 300}
  });
  bird = this.physics.add.sprite(0, 50, "bird").setScale(2);
  bird.setBounce(0.2);
  bird.setCollideWorldBounds(true);
  this.physics.add.overlap(bird, road, () => hasLanded = true, null, this);
  this.physics.add.collider(bird, road);
  cursors = this.input.keyboard.createCursorKey();
  this.physics.add.collider(bird, topColumn);
  this.physics.add.collider(bird, bottomColumn);
  this.physics.add.overlap(bird, topColumn, () => hasBumped = true, null, this);
  this.physics.add.overlap(bird, buttomColumn, () => hasBumped = true, null, this);
  messageToPlayer = this.add.text(0, 0, "Instructions: Press space bar to start", { fontFamily: '"Comic Sans MS", Times, serif', fontSize: "20px", color: "white", backgroundColor: "black" });
  Phaser.Display.Align.In.BottomCenter(messageToPlayer, background, 0, 50);
}

function update(){
  bird.body.velocity.x = 50;
  if(cursors.up.isDown){
    bird.setVelocityY(-160);
  }
  if(cursors.up.isDown && !hasLanded) {
    bird.setVelocityY(-160);
  }
  if(!hasLanded){
    bird.body.velocity.x = 50;
  }
  if(hasLanded){
    bird.body.velocity.x = 0;
  }
  if(cursors.up.isDown && !hasLanded && !hasBumped) {
    bird.setVelocityY(-160);
  }
  if(!hasLanded || !hasBumped){
    bird.body.velocity.x = 50;
  }
  if(hasLanded || hasBumped || !gameStarted){
    bird.body.velocity.x = 0;
  }
  if(cursors.space.isDown && !gameStarted){
    gameStarted = true;
  }
  if(!gameStarted){
    bird.setVelocityY(-160);
  }
  if(cursors.space.isDown && !isGameStarted){
    isGameStarted = true;
    messageToPlayer.text = 'Instructions: Press the "^" button to stay upright\nAnd don\'t hit the columns or ground';
  }
  if(hasLanded || hasBumped){
    messageToPlayer.text = "You crashed";
  }
  if(bird.x > 750){
    messageToPlayer.text = "You win";
  }
  if (bird.x > 750) {
    bird.setVelocityY(40);
    messageToPlayer.text = `Congrats! You won!`;
  } 
}