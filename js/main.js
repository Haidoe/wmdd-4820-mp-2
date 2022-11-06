// create a to-do list with checkboxes that the user can check off when a task is finished
//Use an array of objects
//Don't forget to include comments, and delete testing "console.log"s before submitting a zip file.

//Cleaner way to add css
document.querySelector("head").innerHTML = `
  ${document.querySelector("head").innerHTML}

  <style>
    table {
      width: 100%;
    }

    td {
      font-size: 1rem;
    }

    .checked td {
      background-color: #90ee8f;
      color: #808080;
    }
    
    #hidden {
      display: none;
    }

    .action-btn-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .update-btn {
      padding: 1rem;
      background-color: #f99c3a;
      border:#f99c3a;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-size: 1.15rem;
      margin-top: 2rem;
    }

    .update-btn:hover {
      background-color: #eed9b1;
	    color: #f99c3a;
    }
  </style>
`;

// Adding an Update Task List Button -- For Bonus!

//Create Update List Btn
const updateBtnElement = document.createElement("button");
updateBtnElement.setAttribute("class", "update-btn");
updateBtnElement.textContent = "Update Task List";
//Need to hide initially
updateBtnElement.setAttribute("id", "hidden");
userFeedback.appendChild(updateBtnElement);

//This will make the update list button visible if it has completed task
const updateBtnVisibilityChecker = () => {
  const totalCompleted = todos.filter((todo) => todo.completed);
  updateBtnElement.setAttribute("id", totalCompleted.length ? "" : "hidden");
};

let todos = [];

//Bringing the Checked Checkbox down
const updateTodosSequence = () => {
  //Get all the completed
  const completed = todos.filter((todo) => todo.completed);

  //Get all the not completed
  const notCompleted = todos.filter((todo) => !todo.completed);

  //Update the Todos List
  todos = [...notCompleted, ...completed];
};

const drawTable = () => {
  userFeedbackTable.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    //Creating Checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.checked = todo.completed;
    //Sequence of the todo in the array
    checkbox.setAttribute("sequence", i);

    //Drawing happens here
    const row = userFeedbackTable.insertRow(i);

    row.className = todo.completed ? "checked" : "";

    row.insertCell(0).innerHTML = todo.todo;

    const created = row.insertCell(1);
    created.innerHTML = todo.created;
    created.width = "25%";

    row.insertCell(2).appendChild(checkbox);

    const updated = row.insertCell(3);
    updated.innerHTML = todo.updated;
    updated.width = "25%";
  }
};

const addTodo = (e) => {
  e.preventDefault();

  const todo = userInput.value.trim();

  if (!todo) {
    return;
  }

  const now = new Date();
  const created = now.toDateString();

  todos.push({
    todo,
    created,
    completed: false,
    updated: "",
  });

  userInput.value = "";
  userInput.focus();

  updateTodosSequence();

  //Display To Table
  drawTable();
};

addItem.addEventListener("click", addTodo);

//For Better UX - Trigger AddTodo for Enter Key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo(e);
  }
});

//Event Delegation -- Checkbox Event Listeners
userFeedbackTable.addEventListener("click", (e) => {
  // This will check if the the checkbox has been clicked
  if (e.target.matches(".checkbox")) {
    //Custom attribute, need to retrience the data using getAttribute
    const id = e.target.getAttribute("sequence");
    const todo = todos[id];
    todo.completed = !todo.completed;

    if (todo.completed) {
      const now = new Date();
      const date = now.toDateString();

      todo.updated = date;
    } else {
      todo.updated = "";
    }

    //Bringing the Checked Checkbox down
    updateTodosSequence();

    //Redraw the table
    drawTable();

    updateBtnVisibilityChecker();
  }
});

//Bonus
//Add Event Listener
updateBtnElement.addEventListener("click", () => {
  //Removing completed task
  todos = todos.filter((todo) => !todo.completed);

  //Redrawing the table data
  drawTable();

  updateBtnVisibilityChecker();
});
