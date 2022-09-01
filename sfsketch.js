// Based on original code by Daniel Shiffman - YouTube: https://youtu.be/KWoJgHFYWxY
// coded by ixelsart.com - Sean Sherstone
// This is version 1.32 - The menu on the top left is being developed as a reusable interface for each project.  
// Top left menu code is now more compact, the slider values are being read from a .css data file and put into a 2 dimentional array.
// Also the checkbox value reset code is now a data loop vs 7 seperate blocks of code.
// GitHub - https://github.com/ixelsArt/SunFlower


// Start of Javascript Code
// ************************

// variables now declared using let also now using 3 arrays.
let fName; // file name
let lm = 15; // left margin
let an = 1;
let rot = 137.5
let loops = 1000;
let n = 0;
let c = 4;
let petal = 0;
let pSides = 1;
let gf = .1;
let check7, check = [];
let sliders = [];
let codeVersion, fgreeting, greeting = [];
let clr = 0;

// this block now loads the slider names and values from a .css file
function preload() {
  // table is comma separated value "CSV"
  // and has specifiying header for column labels
  table = loadTable('menudata.csv', 'csv', 'header');
}

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
	
	// This block now creates several arrays to manage the sliders and check boxes.
	menuItems = table.getArray();
  	for (let i = 0; i < menuItems.length; i++) {
    	sliders[i] = createSlider(menuItems[i][1], menuItems[i][2], menuItems[i][3], menuItems[i][4]);
	sliders[i].size(215, 10);
	sliders[i].position(20,i*40+200);
	check[i] = createCheckbox('reset', false);
	check[i].position(175,i*40+177);
	check[i].style('font-family', 'sans-serif');
	greeting[i] = createElement('h4', menuItems[i][0]);
	greeting[i].position(20, i*40+179);
	}
 	for (let i = 0; i < menuItems.length; i++) { 
       		sliders[i].value(menuItems[i][3]);
    	}  
	check7 = createCheckbox('Add Color', false);
	check7.position(75, 460);
	check7.style('font-family', 'sans-serif');

	// echo of the filename entered into the iput box
	codeVersion = createElement('h5', 'v1.32');
	codeVersion.position(lm, 480);
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
	save(fName.value() + '.svg');
}

// This function refreshes the html page re running the code.
function reRun() {
	window.location.reload();
}

// this section is for the p5js code that draws the design on the canvas

// Function to calculate a polygons vertices
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

// Function to draw the Sun Flower shapes
function makeFlower () {
	for (n = 0; n < loops; n++) {
    		let a = n * rot;
    		let r = c * sqrt(n);
    		let x = r * cos(a) + width/2;
   	    	let y = r * sin(a) + height/2;
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

// Code block to draw the Sun Flower and check if a slider reset is checked.
function draw() {
	background('white');
	n = 0;
	rot = sliders[0].value();
	loops = sliders[1].value();
	pSides = sliders[2].value();
	c = sliders[3].value();
	petal = sliders[4].value();
	gf = sliders[5].value();
	an = sliders[6].value();
	colorMode(HSB, loops);
	
	
	// if reset checked then load default value from array
	for (let ck = 0; ck < 7; ck++) {
	    if (check[ck].checked()) {
	        sliders[ck].value(menuItems[ck][3]);
	        check[ck].checked(false);
	    }
	}
    	if (check7.checked()) {
		clr = 1;
    	}
		else {
		    clr = 0;
    	} 
	
	makeFlower();  
}
// end of p5js code
