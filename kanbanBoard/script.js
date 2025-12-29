const items = document.querySelectorAll(".item")
const boards = document.querySelectorAll(".board-box")

console.log(items)
console.log("boards: ", boards)

for (const item of items){
	item.addEventListener("dragstart", dragStart)
	item.addEventListener("dragend", dragEnd)
}

for (const board of boards){
	board.addEventListener("dragover", dragOver)
	board.addEventListener("dragenter", dragEnter)
	board.addEventListener("dragleave", dragLeave)
	board.addEventListener("drop", dragDrop)
}


function dragStart(e){
	//element in drop locotion knows which element is being moved
	e.dataTransfer.setData("text/plain", this.id)
}

function dragEnd(){
	console.log("Drag End")	
}

function dragOver(e){
	//by default, browser do not allow drop elements onto another element
	//this allows it
	e.preventDefault();

}

function dragEnter(e){
	e.preventDefault();
	this.classList.add("over"); //adding over class with different styling
}

function dragLeave(e){
	e.preventDefault();

	this.classList.remove("over"); //adding over class with different styling
}

function dragDrop(e){
	const id = e.dataTransfer.getData("text/plain")
	const item = document.getElementById(id);

	this.appendChild(item)
	this.classList.remove("over")

}