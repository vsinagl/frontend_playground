// program variables
const server_url = "http://localhost:8000/questions"

//DOM elements

const introScreen = document.getElementById("screen-intro")
const quizScreen = document.getElementById("screen-quiz")
const resultScreen = document.getElementById("screen-result")
const totalQuestionsSpan = document.getElementById('total-questions')
const currentQuestionSpan = document.getElementById('current-question')
const totalScoreSpan = document.getElementById('total-score')
const currentScoreSpan = document.getElementById('current-score')
const progressBar = document.getElementById('progress')
const containerQuestions = document.getElementById('container-questions')
const questionText = document.getElementById('question-text')
const finalScoreSpan = document.getElementById('final-score')
const maxScoreSpan = document.getElementById('max-score')
const restartQuizButton = document.getElementById('restart')


	//buttons
const startButton = document.getElementById('btn-start')


async function fetchData(url){
	try {
		const response = await fetch(url);
		if (!response.ok){
			throw new Error(`Reponse status: ${response.status}`)
		}
		const result = await response.json()
		console.log("fetchData result: ", result)
		return result
	}
	catch (error){
		console.log(error.message)
	}
}

function getQuestions(url){
	let questions
	return fetchData(url).then(result => {
		questions = result;
		console.log('fetched questions: ', questions)
		return questions
	})
}



//QUIZ STATE VARS:
let currentScore = 0;
let currentQuestionIndex = 0;
let answersDisabled = false;

startButton.addEventListener("click",startQuiz)

async function startQuiz(){
	//reseting variables
	currentScore = 0
	currentQuestionIndex = 0
	currentScoreSpan.textContent = 0
	currentQuestionSpan.textContent = 1
	
	introScreen.classList.remove('active')
	quizScreen.classList.add('active')
	questions = await getQuestions(server_url)
	console.log('questions fetched from backend: ', questions)

	totalQuestionsSpan.textContent = questions.length
	maxScoreSpan.textContent = questions.length
	totalScoreSpan.textContent = questions.length

	showQuestions(questions)

}

async function showCorrectAnswer(answer){
	console.log('Running: ', answer)
	console.log(containerQuestions)
	for (const option of containerQuestions.childNodes){
		console.log('child element: ', option)
		if (option.innerText === answer){
			option.classList.add('correct')
		}
		else {
			option.classList.add("deactivated")
		}
	}
}

async function handeAnswerClick(optionButton, answers){
		console.log('optionButton: ', optionButton, ' answer: ', answers)
		if (Array.isArray(answers)){
			if (optionButton.innerText in answers){
				optionButton.classList.add('correct')
			}
			else{
				optionButton.classList.add('incorrect')
				for (const answer in answers){
					showCorrectAnswer(answer)
				}
			}
		}
		else{
			if (optionButton.innerText === answers) {
				optionButton.classList.add('correct')
				currentScore++;
			}
			else{
				optionButton.classList.add('incorrect')
				showCorrectAnswer(answers)
			}
		}
		console.log("score: ", currentScore)
		setTimeout(() => {
			currentQuestionIndex++;
			
			if (currentQuestionIndex < questions.length) {
				showQuestions(questions)
			}
			else {
				quizScreen.classList.remove("active");
				resultScreen.classList.add("active");
				showResult();
			}
		}, 1500)

}

async function createAnswers(question){
	//cleaning question
	containerQuestions.innerHTML = "";
	// changing header -> question text
	questionText.innerText = question.question;
	for (const option of question.options){
		const optionButton = document.createElement("button"); //creating button element container answer
		optionButton.classList.add('btn-question')
		optionButton.textContent = option

		optionButton.addEventListener("click", () => {
			handeAnswerClick(optionButton, question.answer);
		})

		containerQuestions.appendChild(optionButton)
	}
}

async function showQuestions(questions){
	// setting elements values
	containerQuestions.innerHTML = "";
	currentQuestionSpan.innerText = currentQuestionIndex;
	currentScoreSpan.innerHTML = currentScore;

	const currentQuestion = questions[currentQuestionIndex]

	let progressValue = 0
	if (questions.length != 0) {
		progressValue = ((currentQuestionIndex + 1) / questions.length)*100
	}
	else{
		progressValue = 0
	}
	createAnswers(currentQuestion)

	console.log('pvalue = ', progressValue)
	progressBar.style.width = progressValue + '%'
	console.log('pbar width: ', progressBar.style.width)
}


async function showResult(){
	finalScoreSpan.innerHTML = currentScore	;
	restartQuizButton.addEventListener("click", () =>{
		resultScreen.classList.remove('active')
		startQuiz();
	})
}