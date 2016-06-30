var levelMax = 10;
var subLevels = 2;
var chances = 3;

var level = 1;
var sublevel = 1;
var points = 0;
var usedChances = 0;
var rows_;

function init(rows){
	rows_ = rows;
	var nbCases = rows*rows
	var rand = Math.floor(Math.random()*nbCases); 

	drawGrid(rows);
	loadColors(rows,rand);
	addEvents(rows,rand);
}

function drawGrid(rows){
	var toAddRender = "";
	for(var i=0;i<rows;i++){
		toAddRender += "<tr>";
		for(var j=0;j<rows;j++){
			toAddRender += "<td ><div class='case'></div></td>";
		}
		toAddRender += "</tr>";
	}
	var grid = document.getElementById("gameGrid");
	grid.innerHTML=toAddRender;
}

function generateVariation(){
	var variations = [0,0]; //0 : hue // : sat 
	var which = Math.floor(Math.random()*2);
	variations[which] = 20

	for(var i in variations){
		if(Math.random() > 0.5 && variations[i]!=0) variations[i] = -variations[i]
	}

	return variations;
}


function generateCloseColors(){
	var hue = Math.floor(Math.random()*180);
	var sat = Math.floor(Math.random()*20+50);
	var lum = Math.floor(Math.random()*30+50);
	var variations = generateVariation();

	var colors = []
	colors[0] = "hsl("+hue+", "+sat+"%, "+lum+"%)"
	colors[1] = "hsl("+(hue+variations[0])+", "+(sat+variations[1])+"%, "+(lum)+"%)"
	return colors;
}

function loadColors(rows,rand) {
	var cases = document.getElementsByClassName("case");
	var colors = generateCloseColors()

	for(var i=0;i<cases.length;i++){
		cases[i].classList.add(""+i);
		cases[i].style['background-color'] = colors[0];
		if(i==rand){
			cases[i].style['background-color'] = colors[1];
		}	
	}
}

function endgame(win){
	if(win) var text = "VICTORY";
	else var text = "GAME OVER"
	document.getElementById("gameGrid").innerHTML = "<tr><td>"+text+"</td></tr>"
}

function updatePoints(toadd){
	points += toadd;
	var pointsContener = document.getElementById("score");
	pointsContener.innerHTML=points;
}

function useOneChance(){
	if(usedChances<3){
		var chancesColors = document.getElementsByClassName("chance");
		for (var i=0;i<usedChances+1;i++) {
			chancesColors[i].style['background-color'] = "#DD2727";
		}
		usedChances += 1;
	}
	else{
		endgame(false)
	}
}


function addEvents(rows,rand){
	var cases = document.getElementsByClassName("case");
	for(var i=0;i<cases.length;i++){
		cases[i].addEventListener("click", function(e){
				if((e.target.classList).contains(""+rand)){
					console.log("Youpi");
					updatePoints(1);
					sublevel+=1;
					if(sublevel>subLevels){
						sublevel=1;
						subLevels+=1;
						level+=1;
						if(level>levelMax){
							endgame(true);
							return;
						}
						rows+=1;
					}
					init(rows);
				}
				else{
					console.log("Pas youpi");
					useOneChance();
					updatePoints(-1);
				}
		});
	}
}


