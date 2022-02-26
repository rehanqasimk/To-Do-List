const input = document.getElementById("input");
const ul = document.getElementById("todo");
const button = document.getElementById("btn");
const btnUpdate = document.getElementById("upbtn");
let index = 0;
const obj = {};




const checkLength = () => {
    if (input.value.length > 0) return true;
}

const doneItem = (id) => {
    const el = document.getElementById(id);
    el.classList.toggle("done");
    localStorage.setItem("items", JSON.stringify(obj));
}


const deleteItem = (id) => {
    const el = document.getElementById(id);
    delete obj[id];
    el.remove();
    localStorage.setItem("items", JSON.stringify(obj));
}

const editItem = (id) => {
    btnUpdate.classList.toggle("upbtnvis");
    button.classList.add("btnvis");
    const el = document.getElementById(id);
    el.remove();
    delete obj[id];
    localStorage.setItem("items", JSON.stringify(obj));

}

const createToDoElement = (e) => {
    const li = document.createElement("li");
    const spId = `span${index}`;
    const id = `li${index}`;
    const span = document.createElement("span");
    span.setAttribute("id", spId);
    span.innerText = input.value;
    li.appendChild(span);
    // li.appendChild(document.createTextNode(""));
    li.setAttribute("id", id);
    span.setAttribute("onclick", `doneItem("${spId}")`)
    const btn1 = document.createElement("button");
    btn1.innerText = "Delete";
    btn1.setAttribute("onclick", `deleteItem("${id}")`)
    btn1.style.marginLeft = "20px";
    const btn2 = document.createElement("button");
    btn2.setAttribute("onclick", `editItem("${id}")`)
    btn2.innerText = "Edit";
    li.appendChild(btn1);
    li.append("  ");
    li.append(btn2);
    // console.log(btn2);
    obj[`${id}`] = li.innerHTML;
    console.log(obj);
    ul.appendChild(li);
    input.value = "";
    index++;
}


const populateUI = () => {
    console.log("hello World");
    const listitems = JSON.parse(localStorage.getItem("items"));
    console.log(listitems);
    const indx = JSON.parse(localStorage.getItem("index"));
    index = indx;
    const li_items = Object.entries(listitems);
    li_items.forEach(i => {
        var li = document.createElement("li");
        li.setAttribute("id", i[0]);
        li.innerHTML = i[1];
        ul.appendChild(li);
    })

}



const buttonClickEvent = () => {
    if (checkLength()) {
        createToDoElement();
    }
}


const keyPressEvent = (e) => {
    if (checkLength() && e.which === 13) {
        createToDoElement();
    }
}

const upbuttonClickEvent = () => {
    buttonClickEvent();
    btnUpdate.classList.toggle("upbtnvis");
    button.classList.toggle("btnvis");
}



// 1- Add EventListener to the button
button.addEventListener("click", () => {
    buttonClickEvent();
    localStorage.setItem("items", JSON.stringify(obj));
    localStorage.setItem("index", index);
});



// 2- Add EventListener to the input field

// input.addEventListener("keypress", keyPressEvent);


// 3- Add EventListener to the UpdateBtn
btnUpdate.addEventListener("click", () => {
    upbuttonClickEvent();
    localStorage.setItem("items", JSON.stringify(obj));

});



if (localStorage.length !== 0) {
    console.log("Jani inside populate")
    populateUI();
}


// const j = JSON.parse(localStorage.getItem("items"));
// console.log("value", Object.values(j));
// console.log(j);