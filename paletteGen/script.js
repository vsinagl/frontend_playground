
const containerColors = document.getElementById("container-colors")
const containerBaseColor = document.getElementById("container-basecolor")
const generateBtn = document.getElementById("btn-generate")
const baseColorBtn = document.getElementById("btn-golder-ratio")
const colorBoxes = containerColors.querySelectorAll(".color-box")
const colorPicker = document.getElementById('colorpicker')


generateBtn.addEventListener("click", generateColors)

//generate colors first when page is loaded
generateColors()


//GENERATING COLORS ---------------------------------------
function isHexColor(str) {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  return hexRegex.test(str);
}

function generateColors(){
	//getting color boxes and generating random colors based on color boxes lenght
	let colors = []
    const pickerValue = colorPicker.value;

	if (pickerValue != null && pickerValue != null && isHexColor(pickerValue.trim())){
		colors = getGoldenRatioColors(colorPicker.value, colorBoxes.length)

	    let i = 0;
	    for (const box of colorBoxes) {
		    const hexValue = box.querySelector(".color-value")
		    hexValue.textContent = colors[i].hsl;
		    box.style.backgroundColor = colors[i].hsl;
		    i++;
    	}
	}
	else{
		colors = getRandomColors(colorBoxes.length)

	    let i = 0;
	    for (const box of colorBoxes) {
		    const hexValue = box.querySelector(".color-value")
		    hexValue.textContent = colors[i]
		    box.style.backgroundColor = colors[i];
		    i++;
	    }
	}
}

function getRandomColors(number){
	const colorArray = []
	for (let i = 0; i < number; i++){
		colorArray.push(getRandomColor())
	}
	return colorArray
}

//generate hex value of random color:
//  #4287f5
function getRandomColor(){
	let value =	"#"
	let hexValues = "0123456789abcdef"
	for (let i = 0; i < 6; i++){
		value = value + hexValues[Math.floor(Math.random() * 16)]
	}
	return value

}

// -- COLORS FROM GOLDEN RATIO -------------------------------

//HSL generator

function hexToHSL(hex) {

    hex = hex.replace("#", "");

	//extracting rgb values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l;

	//computing lightness
    l = (max + min) / 2;
    if (max === min) {
        h = 0;
		s = 0;
    } else {
		//computing saturation
        const diff = max - min;
        s = diff / (1 - Math.abs(2 * l - 1));

		//computing hue
        switch (max) {
            case r:
                h = ((g - b) / diff) % 6;
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }

        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }

    //converting fractioons to percentages
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l, hsl: `hsl(${h}, ${s}%, ${l}%)` };
}


function getGoldenRatioColors(baseColor, depth=0, colors=[]){
const goldenRotation = 137.5; 

    const newH = (baseColor.h + goldenRotation) % 360;
    const newS = baseColor.s;
    const newL = baseColor.l;

    const newColor = {
        h: newH,
        s: newS,
        l: newL,
        hsl: `hsl(${newH}, ${newS}%, ${newL}%)`
    };

    colors.push(newColor);
    if (depth > 0) {
        getGoldenRatioColors(newColor, depth - 1, colors);
    }
	
	return colors
}

//generate color from base color

// ------- COPY COLOR CODE -----------------------------------------------------


containerColors.addEventListener("click", (event) => {
	if (event.target.classList.contains("copy-btn")){
		const hexValue = event.target.previousElementSibling.textContent
		navigator.clipboard.writeText(hexValue)
		event.target.classList.remove('fa', 'fa-copy')
		event.target.classList.add("fa-solid", "fa-check-double")
		setTimeout(() => {
			event.target.classList.remove("fa-solid", "fa-check-double")
			event.target.classList.add('fa', 'fa-copy')

		}, 800)
	}
	console.log("clipboard: ", navigator.clipboard.readText())
})

// ---- GENERATE FROM BASE COLOR OPTION ---------------------------------


const toggle = document.querySelector(".toggle");

toggle.querySelector(".toggle-header").addEventListener("click", () => {
  toggle.classList.toggle("active");
});