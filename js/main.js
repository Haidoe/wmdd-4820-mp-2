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
  </style>
`;

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let todos = [];

const formatDate = (d) => {
  const year = d.getFullYear();
  const dayOfWeek = daysOfTheWeek[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];

  return `${dayOfWeek} ${month} ${day} ${year}`;
};

//Bringing the Checked Checkbox down
const updateTodosSequence = () => {
  //Get all the completed
  const completed = todos.filter((todo) => todo.completed);

  //Get all the not completed
  const notCompleted = todos.filter((todo) => !todo.completed);

  //Update the Todos List
  todos = [...notCompleted, ...completed];
};

const addTodo = (e) => {
  e.preventDefault();

  const todo = userInput.value.trim();

  if (!todo) {
    return;
  }

  const now = new Date(Date.now());

  const created = formatDate(now);

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

  //Add Reset
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
    row.insertCell(1).innerHTML = todo.created;
    row.insertCell(2).appendChild(checkbox);

    const updated = row.insertCell(3);
    updated.innerHTML = todo.updated;
    updated.width = "30%";
  }
};

addItem.addEventListener("click", addTodo);

//For Better UX - Trigger AddTodo for Enter Key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo(e);
  }
});

//Event Delegation
userFeedbackTable.addEventListener("click", (e) => {
  // This will check if the the checkbox has been clicked
  if (e.target.matches(".checkbox")) {
    //Custom attribute, need to retrience the data using getAttribute
    const id = e.target.getAttribute("sequence");
    const todo = todos[id];
    todo.completed = !todo.completed;

    if (todo.completed) {
      const now = new Date();
      const date = formatDate(now);

      todo.updated = date;
    } else {
      todo.updated = "";
    }

    //Bringing the Checked Checkbox down
    updateTodosSequence();

    //Redraw the table
    drawTable();
  }
});
