window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var drawBtn;
var clearBtn;

var gameWidth=800;
var gameHeight=500;

var background = new Image();
background.src = "game-background.jpg"

var tiles = new Image();
tiles.src = "player.png"

//var player;

function init()
{
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl=document.getElementById("player");
	ctxPl = pl.getContext("2d");


	map.width=gameWidth;
	map.height =gameHeight;

	pl.width=gameWidth;
	pl.height =gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click",drawRect,false);
	clearBtn.addEventListener("click",clearRect,false);

	player=new Player();

	drawBg();
	//drawPl();
	draw();
}

function draw()
{
	player.draw();
}

function Player()
{
	this.srcX=-30;
	this.srcY=0;
	this.drawX=0;
	this.drawY=280;
	this.width=352;
	this.height=455;
	this.speed=5;
}

Player.prototype.draw = function()
{
	ctxMap.drawImage(tiles, 
		//-30, 0, 352, 455, 0, 280, 100, 120)
		this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 100,120);
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

function drawBg()
{
	ctxMap.drawImage(background, 0, 0, 800, 500, 0, 0, gameWidth, gameHeight);
}

function drawPl()
{
	ctxMap.drawImage(tiles, -30, 0, 352, 455, 0, 280, 100, 120);
}