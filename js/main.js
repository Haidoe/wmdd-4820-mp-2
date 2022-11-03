// create a to-do list with checkboxes that the user can check off when a task is finished
//Use an array of objects
//Don't forget to include comments, and delete testing "console.log"s before submitting a zip file.

const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

const addTodo = (e) => {
  e.preventDefault();

  const todo = userInput.value.trim();

  if (!todo) {
    return;
  }

  const now = new Date();
  const created = formatDate(now);

  todos.push({
    todo,
    created,
    completed: false,
    updated: "",
  });

  userInput.value = "";
  userInput.focus();

  console.log(todo);

  //Display To Table
  //Add Event Listener to Checkbox
  //Add Reset
};

addItem.addEventListener("click", addTodo);
