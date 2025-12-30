
const list = document.getElementById("list")
const bookmark = document.getElementById("bookmark")
const remove = document.getElementById("remove") //remove button in bookmark
const btnGenerate = document.getElementById("btn-add")
const inputName = document.getElementById('bname')
const inputUrl = document.getElementById('burl')

// deleting templates
console.log(inputName)
console.log(inputUrl)
console.log(btnGenerate)
list.innerHTML = ""

btnGenerate.addEventListener("click", addBookmark)



function addBookmark(){

	console.log(inputName.value)
	console.log(inputUrl.value3)
	if (!inputName.value || !inputUrl.value){
		alert("Please Enter both name and url for bookmark")
	}
	const name = inputName.value.trim()
	const url = inputUrl.value.trim()

	//checking if url is valid:
	if (!(url.startsWith("https://") || url.startsWith("http://"))){
		alert("Please enter valid url address, starting with https:// or http://")
	}

	const length = list.children.length;
	const newBookmark = bookmark.cloneNode(true)
	const removeButton = remove.cloneNode(true)
	removeButton.addEventListener("click",removeBookmark)
	//cleaning content of bookmark -> we will add all content programatically
	newBookmark.innerHTML = ""
	newBookmark.id = "newBookmark" + "-" + length;

	const newBookmarkLink = document.createElement("a")
	newBookmarkLink.textContent = name
	newBookmarkLink.href = url
	newBookmarkLink.target = "_blank"; //opening in new tab
	
	//elements to bookmark (link + remove button)
	newBookmark.appendChild(newBookmarkLink)
	newBookmark.appendChild(removeButton)
	//appending bookmark to bookmarkList
	list.appendChild(newBookmark)
}


function removeBookmark(){
	throw Exception("Not Implemented")
}