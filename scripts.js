const createTodo = document.getElementById("create-todo")
const inputForm = document.getElementById("input-form")
const todosDiv = document.getElementById("todos-div")
let data = {
    title: "",
    notes: "",
    date: "",
    time: ""
}

createTodo.addEventListener("click", function() {
    inputForm.innerHTML = `
        <div id="input-div">
            <input type="text" id="todo-title" placeholder="Title" class="width">
            <input type="text" id="todo-notes" placeholder="Notes" class="width">
            <input type="date" id="todo-date" class="width">
            <input type="time" id="todo-time" class="width">
            <button id="add-btn" onclick="addToList()" class="width">Add</button>
        </div>`
})

function addToList() {
    data.title = document.getElementById("todo-title").value
    data.notes = document.getElementById("todo-notes").value
    data.date = document.getElementById("todo-date").value
    data.time = document.getElementById("todo-time").value

    if (data.title && data.date && data.time) {
        convertTime()
        convertDate()

        const todoItem = document.createElement("div")
        todoItem.classList.add("all-todos")
        todoItem.innerHTML = `
            <div>
                <h1 class="title-txt">${data.title}</h1>
                <h3 class="notes-txt">${data.notes}</h3>
                <p class="date-txt">${changedDate}</p>
                <p class="time-txt">${changedTime}</p>
                <button class="kill-btn"></button>

               
            </div>`

        todosDiv.appendChild(todoItem)
        inputForm.innerHTML = ""

        const killButtons = document.querySelectorAll(".kill-btn")
        killButtons.forEach(button => {
            button.addEventListener("click", function() {
                button.innerText = "✔"
                setTimeout(function(){
                    button.parentElement.parentElement.remove()
                },400);
            })
        })
    } else {
        alert("Fill in required fields")
    }
}

let changedTime = ""

function convertTime() {
    let timeArr = data.time.split(":")
    let firstPart = Number(timeArr[0])
    let secondPart = timeArr[1]
    let period = ""
    if (firstPart > 12) {
        firstPart = firstPart % 12
        period = "PM"
    } else if (firstPart === 0) {
        firstPart = 12
        period = "AM"
    } else if (firstPart === 12) {
        period = "PM"
    } else {
        period = "AM"
    }
    changedTime = `${firstPart}:${secondPart} ${period}`
}

let changedDate = ""

function convertDate() {
    let dateArr = data.date.split("-")
    changedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
}
