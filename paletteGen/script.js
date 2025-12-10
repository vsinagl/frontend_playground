
const containerColors = document.getElementById("container-colors")
const generateBtn = document.getElementById("btn-generate")


generateBtn.addEventListener("click", generateColors)

//generate colors first when page is loaded
generateColors()


//GENERATING COLORS ---------------------------------------

function generateColors(){
	//getting color boxes and generating random colors based on color boxes lenght
	const colorBoxes = containerColors.querySelectorAll(".color-box")
	const colors = getRandomColors(colorBoxes.length)

	let i = 0;
	for (const box of colorBoxes) {
		const hexValue = box.querySelector(".color-value")
		hexValue.textContent = colors[i]
		box.style.backgroundColor = colors[i];
		i++;
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

// --------------------------------------------------------------------
