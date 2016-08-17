window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var enemyCvs;
var ctxEnemy;

var drawBtn;
var clearBtn;

var gameWidth=800;
var gameHeight=500;

var background = new Image();
background.src = "game-background.jpg";

var tiles = new Image();
tiles.src = "player.png";

var tilesEnemy=new Image();
tilesEnemy.src="enemy1.png";

var player;
var enemy;

var isPlaying;

var requestAnimFrame=window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
								window.oRequestAnimationFrame ||
									window.msRequestAnimationFrame;

function init()
{
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width=gameWidth;
	map.height =gameHeight;

	pl=document.getElementById("player");
	ctxPl=pl.getContext("2d");

	pl.width=gameWidth;
	pl.height=gameHeight;

	enemyCvs=document.getElementById("enemy");
	ctxEnemy=enemyCvs.getContext("2d");

	enemyCvs.width=gameWidth;
	enemyCvs.height =gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click",drawRect,false);
	clearBtn.addEventListener("click",clearRect,false);

	player=new Player();
	enemy=new Enemy();

	drawBg();

	startLoop();

	document.addEventListener("keydown",checkKeyDown,false);
	document.addEventListener("keyup",checkKeyUp,false);
}

function loop()
{
	if(isPlaying)
	{
		draw();
		update();
		requestAnimFrame(loop);
	}
}

function startLoop()
{
	isPlaying = true;
	loop();
}

function stopLoop()
{	
	isPlaying=false;
}

function draw()
{

	player.draw();
	enemy.draw();

}

function update()
{
	//console.log("loop");
	player.update();
}

//Cоздание прототипа игрока
function Player()
{
	this.srcX=-30;
	this.srcY=0;
	this.drawX=0;
	this.drawY=280;
	this.width=352;
	this.height=455;
	this.speed=2;

	//For keys
	this.isUp=false;
	this.isDown=false;
	this.isRight=false;
	this,isLeft=false;
}

function Enemy() 
{
	this.srcX=0;
	this.srcY=0;
	this.drawX=400;
	this.drawY=300;
	this.width=494;
	this.height=408;
	this.speed=8;
}

Enemy.prototype.draw=function()
{
	ctxEnemy.drawImage(tilesEnemy, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 100,80);
}
//отрисовка прототипа игрока
Player.prototype.draw = function()
{
	clearDraw();

	ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 100,120);
}

Player.prototype.update=function()
{
	this.chooseDir();
	//this.drawX+=3;
	//ctxMap.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 100,120);
}

Player.prototype.chooseDir=function()
{
	if (this.isUp)
		this.drawY -=this.speed;
	if (this.isDown)
		if (this.drawY<280)
			this.drawY +=this.speed;
	if (this.isRight)
		this.drawX +=this.speed;
	if (this.isLeft)
		this.drawX -=this.speed;
}

function checkKeyDown(e)
{
	var keyID=e.keyCode || e.which;
	var keyChar=String.fromCharCode(keyID);

	if (keyChar == "W")
	{
		player.isUp=true;
		e.preventDefault();	
	}
	if (keyChar =="S")
	{
		player.isDown=true;
		e.preventDefault();	
	}
	if (keyChar == "D")
	{
		player.isRight=true;
		e.preventDefault();	
	}
	if (keyChar == "A")
	{
		player.isLeft=true;
		e.preventDefault();	
	}
}

function checkKeyUp(e)
{
	var keyID=e.keyCode || e.which;
	var keyChar=String.fromCharCode(keyID);

	if (keyChar == "W")
	{
		player.isUp=false;
		e.preventDefault();	
	}
	if (keyChar =="S")
	{
		player.isDown=false;
		e.preventDefault();	
	}
	if (keyChar == "D")
	{
		player.isRight=false;
		e.preventDefault();	
	}
	if (keyChar == "A")
	{
		player.isLeft=false;
		e.preventDefault();	
	}
}

function drawRect() 
{
	ctxMap.fillStyle = "#3D3D3D";
	ctxMap.fillRect( 10, 10, 100, 100);
}

function clearRect()
{
	ctxMap.clearRect(0, 0, 800, 500);
}﻿

function clearDraw()
{
	ctxPl.clearRect(0,0,gameWidth,gameHeight);
	//drawBg();
}

function drawBg()
{
	ctxMap.drawImage(background, 0, 0, 800, 500, 0, 0, gameWidth, gameHeight);
}
