//Sprite related things
var playerSpriteSheet;
var treeSpriteSheet;
var plantSpriteSheet;

var spriteHeight = 48;
var spriteWidth = 48;

var treeSpriteWidth = 271;
var treeSpriteHeight = 256;

var plantSpriteWidth = 32;
var plantSpriteHeight = 32;

function preload() {

  //JSON data and personality stuff
  data = loadJSON("stats.json");

  //Misc loaded images
  grass = loadImage("assets/tiles/grass3.png");
  dirt = loadImage("assets/tiles/dirt1.png");
  water = loadImage("assets/tiles/water3.png");
  treeSpriteSheet = loadImage("assets/plants/3.png");
  playerSpriteSheet = loadImage("assets/player/576x384/1.png");
  plantSpriteSheet = loadImage("assets/plants/2.png");
  print(treeSpriteSheet);
}