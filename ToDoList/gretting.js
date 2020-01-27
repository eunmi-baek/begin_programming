const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// user 이름을 저장, 기억하는 함수
function saveName(text){
    localStorage.setItem(USER_LS, text);    
}
// user 이름을 입력해서 호출하는 함수
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
} 

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // 유저 없을 때
        askForName();
    } else {
        // 유저 있을 때
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
 
init();