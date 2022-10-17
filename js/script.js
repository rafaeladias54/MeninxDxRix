//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

if (sessionStorage.getItem("no_repeat") === null) {
    
    let no_repeat = [];
    var i = 0;

    while (i < questions.length) {
        no_repeat[i] = i;
        i++;
    }

    console.log(no_repeat);
    sessionStorage.setItem("no_repeat", JSON.stringify(no_repeat));
}

let no_repeat = JSON.parse(sessionStorage.getItem('no_repeat'));
console.log(no_repeat);

let que_numb = questions.length;
let que_count = Math.floor(Math.random() * que_numb);

while (no_repeat[que_count] == null) {
    que_count = Math.floor(Math.random() * que_numb);
    console.log("repeat");
}

let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let challenge;
let userAns;
let click_answer;
let correct;

document.addEventListener('DOMContentLoaded', function() {
    info_box.classList.add("activeInfo"); //show info box
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(que_count); //calling showQestions function
    console.log("question " + que_count);
}, false);

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    showQuetions(que_count); //calling showQestions function
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    no_repeat[que_count] = null;
    sessionStorage.setItem("no_repeat", JSON.stringify(no_repeat));

    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Question button clicked
next_btn.onclick = ()=>{

    let correcAns = questions[que_count].answer; //getting correct answer from array

    if (userAns == correcAns) correct = true;
    else correct = false;

    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // random options places
    var nums = [0, 1, 2, 3],
    ranNums = [],
    i = nums.length,
    j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[ranNums[0]] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[ranNums[1]] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[ranNums[2]] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[ranNums[3]] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){

    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    userAns = answer.textContent; //getting user selected option  

    const allOptions = option_list.children.length; //getting all option items
    
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    
    answer.classList.add("option_click"); //adding red color to correct selected option

    click_answer = answer;
    
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    const iconText = result_box.querySelector(".icon");
    let iconTag;

    if (correct) {
        challenge = questions[que_count].correct;
        iconTag = '<i class="fas fa-check"></i>';
    }
    else {
        challenge = questions[que_count].incorrect;
        iconTag = '<i class="fas fa-times"></i>';
    }

    let scoreTag = '<span>'+ challenge +'</span>';
    scoreText.innerHTML = scoreTag;
    iconText.innerHTML = iconTag;
}