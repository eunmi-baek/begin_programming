const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    //parentNode는 console.dir에서 찾음. li 각자의 아빠를 찾아야 해서 console을 함.
    const btn = event.target;
    const li = btn.parentNode;
    //구글에서 delete child element mdn 검색
    toDoList.removeChild(li);
    //filter는 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행이 된다.
    //filter는 array의 모든 아이템을 통해 함수를 실행하고, 그리고 true인 아이템들만 가지고 새로운 array를 만듬 
    //cleanToDos와 filter가 하는 것은 filterFn이 체크가 된 아이템들의 array를 주는 것
    //그래서 이 filter가 하는 것은 array를 하나 만들 것
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

//JSON.stringify는 자바스크립트 object를 string으로 바꿔주는 것.
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
   const li = document.createElement("li"); 
   const delBtn = document.createElement("button");
   const span = document.createElement("span");
   const newId = toDos.length + 1;
   delBtn.innerText = "X";
   delBtn.addEventListener("click", deleteToDo);
   span.innerText = text;
   li.appendChild(delBtn);
   li.appendChild(span);
   li.id = newId;
   toDoList.appendChild(li); 
   const toDoobj = {
       text: text,
       id: newId
   };
   toDos.push(toDoobj);
   saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentUser = toDoInput.value;
    paintToDo(currentUser);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // JSON은 오브젝트를 스트링으로, 스트링을 오브젝트로. perse를 해주면 object로 변환.
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach는 기본적으로 함수를 실행하는데, array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 준다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        //정리하자면, toDos를 가져온 뒤, 이 라인에서는 parse, 즉, 가져온 것을 자바스크립트 object로 변환해 줄 것이고. 각각에 대해서 paintToDo라는 function 이 실행된다.paintToDo는 이 위에 정의 해 둠. 구체적으로는 toDo.text에 대해 실행될 것.
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

// -local storage에는 JS data 저장 불가능, string만 저장 가능
// 고로 object > string 바꿔주려면 JSON.stringfy 사용

// + JSON stands for JavaScript Object Notation

// a.parse() converts JSON string into an object

// a.foreach() array에 담긴 것들 각각에 함수를 실행