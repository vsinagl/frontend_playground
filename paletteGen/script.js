
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
		colors = getGoldenRatioColors(hexToHSL(colorPicker.value), colorBoxes.length)
        console.log("------COLORS--------")
        console.log(colors)

	    let i = 0;
	    for (const box of colorBoxes) {
		    const hexValue = box.querySelector(".color-value")
            console.log(hslToHex(colors[i]))
		    hexValue.textContent = hslToHex(colors[i]);
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

    console.log('hsl generating: ',hex)
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

function hslToHex(hslObj) {
    const h = hslObj.h;
    const s = hslObj.s / 100;
    const l = hslObj.l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }
    
    // Convert to 0-255 range
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    // Convert to hex
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


function getGoldenRatioColors(baseColor, depth=0, colors=[]){
    colors.push(baseColor)
    if (depth == 0){
        return colors;
    }

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

    console.log('GRC: newcolor= ', newColor)
    // colors.push(newColor);
    getGoldenRatioColors(newColor, depth - 1, colors);
	
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