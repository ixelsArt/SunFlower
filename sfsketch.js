// Based on original code by Daniel Shiffman - YouTube: https://youtu.be/KWoJgHFYWxY
// coded by ixelsart.com - Sean Sherstone
// This is version 1.3 - in later versions I want to clean up the code to put the sliders and check boxes into an array of some kind
// The menu on the top left is being developed as a reusable interface for each project.  


// Start of Javascript Code
// ************************

// Variable initial settings
var fName; // file name
var lm = 15; // left margin
var an = 1;
var rot = 137.5
var loops = 1000;
var n = 0;
var c = 4;
var petal = 0;
var pSides = 1;
var gf = .1;
var check, check1, check2, check3, check4, check5, check6, check7;
var slider, slider1, slider2, slider3, slider4, slider5, slider6, slider7;
var fgreeting, greeting, greeting1, greeting2, greeting3, greeting4, greeting5, greeting6, greeting7;
var clr = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, SVG); // Create SVG Canvas
    	strokeCap(ROUND);
    	strokeWeight(1);
    	stroke(0);
	background(255);
	noFill();
	angleMode(DEGREES);
	rectMode(CENTER);
	colorMode(HSB, loops);

   	// Set the text size
    	textSize(100);

	// Save SVG button
	let saveButton = createButton("Save SVG");
	saveButton.position(lm, 135);
	saveButton.size(100,30);
	saveButton.style('font-size', '12px');
	saveButton.style('color', 'black');
	saveButton.mousePressed(saveArt);
	
	// run the code again button
	let rerunButton = createButton("Run Again");
	rerunButton.position(130, 135);
	rerunButton.size(100, 30);
	rerunButton.style('font-size', '12px');
	rerunButton.style('color', 'black');
	rerunButton.mousePressed(reRun);

	// file name input box
	fName = createInput('');
	fName.position(lm, 100);
	fName.changed(saveArt2);

	// submit button
	button = createButton('submit');
	button.position(fName.x + (fName.width + 5), 100);
	button.mousePressed(saveArt3);

	// echo of the filename entered into the iput box
	fgreeting = createElement('h4', 'Filename to save');
	fgreeting.position(lm, 80);
	
	greeting = createElement('h4', 'Spiral Angle');
	greeting.position(lm, 180);
	
	slider = createSlider(135.0, 140.0, 137.5, 0.05);
	slider.size(215, 10);
	slider.position(lm , 200);
	
	check = createCheckbox('reset', false);
	check.position(175, 180);
	check.style('font-family', 'sans-serif');
	
	greeting1 = createElement('h4', 'Loops');
	greeting1.position(lm, 220);
	
	check1 = createCheckbox('reset', false);
	check1.position(175, 220);
	check1.style('font-family', 'sans-serif');
		
	slider1 = createSlider(10, 1000, 500, 1);
	slider1.size(215, 10);
	slider1.position(lm , 240);

	greeting2 = createElement('h4', 'Polygon Sides');
	greeting2.position(lm, 260);
	
	check2 = createCheckbox('reset', false);
	check2.position(175, 260);
	check2.style('font-family', 'sans-serif');
	
	slider2 = createSlider(2, 30, 3, 1);
	slider2.size(215, 10);
	slider2.position(lm , 280);
	
	greeting3 = createElement('h4', 'Distance');
	greeting3.position(lm, 300);
	
	check3 = createCheckbox('reset', false);
	check3.position(175, 300);
	check3.style('font-family', 'sans-serif');
	
	slider3 = createSlider(1, 100, 4, 1);
	slider3.size(215, 10);
	slider3.position(lm , 320);

	greeting4 = createElement('h4', 'Polygon Size');
	greeting4.position(lm, 340);
	
	check4 = createCheckbox('reset', false);
	check4.position(175, 340);
	check4.style('font-family', 'sans-serif');
	
	slider4 = createSlider(0, 100, 0, .5);
	slider4.size(215, 10);
	slider4.position(lm , 360);

	greeting5 = createElement('h4', 'Growth Factor');
	greeting5.position(lm, 380);
	
	check5 = createCheckbox('reset', false);
	check5.position(175, 380);
	check5.style('font-family', 'sans-serif');
	
	slider5 = createSlider(0, 2, 0.1, 0.001);
	slider5.size(215, 10);
	slider5.position(lm , 400);

	greeting6 = createElement('h4', 'Angle Offset');
	greeting6.position(lm, 420);
	
	check6 = createCheckbox('reset', false);
	check6.position(175, 420);
	check6.style('font-family', 'sans-serif');
	
	slider6 = createSlider(0, 180, 137.5, 0.1);
	slider6.size(215, 10);
	slider6.position(lm , 440);

	check7 = createCheckbox('Add Color', false);
	check7.position(75, 460);
	check7.style('font-family', 'sans-serif');

}
  	
// This function will save the canvas as an SVG with the file name that is tyed into the input box
function saveArt() {
	save(fName.value() + '.svg');
}

// This function allows the enter or tab key to trigger the saving of the currently typed file name
function saveArt2() {
	save(fName.value() + '.svg');
}

// This function is a third way to trigger the saving of the typed file name
function saveArt3() {
	save(fName.valuetype() + '.svg');
}

// This function refreshes the html page re running the code.
function reRun() {
	window.location.reload();
}

// this section is for the p5js code that draws the design on the canvas
// *********************************************************************

// calculate the polygon shape 
function polygon(x, y, radius, npoints) {
  angleMode(RADIANS)
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  angleMode(DEGREES)
}

// function to draw spiral based on above polygon function
function makeFlower () {
	for (n = 0; n < loops; n++) {
    		var a = n * rot;
    		var r = c * sqrt(n);
    		var x = r * cos(a) + width/2;
   		var y = r * sin(a) + height/2;
    		push();
    		translate (x, y);  
    		rotate(rot+an);
    		
    		if (clr == 1) {
    		    fill(n,loops/2,loops,loops/2);
    		}
    		else { 
    		    noFill();
    		}
    		polygon(0, 0, 1+petal, pSides);
    		pop();
	    	petal = petal + gf;
    		c = c + .035;
    		an = an + rot;
}
}


function draw() {

	// variables that can change per loop
	background('white');
	rot = slider.value();
	loops = slider1.value();
	pSides = slider2.value();
	n = 0;
	c = slider3.value();
	petal = slider4.value();
	gf = slider5.value();
	an = slider6.value();
	colorMode(HSB, loops);
	
	// check box defaults and reset
	if (check.checked()) {
		slider.value(137.5);
		check.checked(false);
    	}
	if (check1.checked()) {
		slider1.value(500);
		check1.checked(false);
    	}
    	if (check2.checked()) {
		slider2.value(3);
		check2.checked(false);
    	}
    	if (check3.checked()) {
		slider3.value(4);
		check3.checked(false);
    	}
    	if (check4.checked()) {
		slider4.value(0);
		check4.checked(false);
    	}
    	if (check5.checked()) {
		slider5.value(0.1);
		check5.checked(false);
    	}
    	if (check6.checked()) {
		slider6.value(137.5);
		check6.checked(false);
    	}
    	if (check7.checked()) {
		clr = 1;
    	}
		else {
		    clr = 0;
    	}
	
	// Draw the spiral flower
	makeFlower();  
	
}
// end of p5js code
