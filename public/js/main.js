"use strict"

fetch('/questions', 
{
    method: "GET",
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
})
.then(res => res.json())
.then(questions => {
    nextQuestion(questions);
})
.catch(err => console.log(err))

let index = 0;
let tries = 0;
let score = 0;
let correct;
const app = document.querySelector('#app');

function nextQuestion(questions){
    app.innerHTML="";

    const q = document.createElement('h2');
    q.innerHTML = `${questions[index].question} (${tries+1}/${questions.length})`;
    app.append(q);

    for (let answer of questions[index].answers){
        let answer_div = document.createElement('div');
        answer_div.innerHTML = answer.text;
        answer_div.addEventListener('click', function(){
            correct = answer.correct;
            document.querySelectorAll('#app div').forEach(answer => answer.style.background = "#fcf8ec");
            this.style.background = "lightgray";
        })
        app.append(answer_div);
    }

    const btn = document.createElement('button');
    btn.innerHTML = "Next";
    btn.addEventListener('click', ()=>{
        tries++;
        if(correct) score++;
        index++;
        if (index >= questions.length){
            showScore();
        } else {
            nextQuestion(questions);
        }
    }) 
    app.append(btn);
}

function showScore(){
    app.innerHTML = `<h1>Your score: ${score}/${tries}</h1>`;
}