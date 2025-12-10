
const containerColors = document.getElementById("container-colors")
const generateBtn = document.getElementById("btn-generate")
const colorBoxes = containerColors.querySelectorAll(".color-box")


generateBtn.addEventListener("click", generateColors)

//generate colors first when page is loaded
generateColors()


//GENERATING COLORS ---------------------------------------

function generateColors(){
	//getting color boxes and generating random colors based on color boxes lenght
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
