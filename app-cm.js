// todo array for keep data
let todo = []
// for search (filter) in todos
const filters = {
	searchItem: '',
	isDone: false
}
// localstorage getitem
const todoJSON = localStorage.getItem('todo')
// if not null or exist
if(todoJSON !== null) {
	// save
	todo = JSON.parse(todoJSON)
}
// render and filter todo
const renderTodo = function(todo, filters) {
	// search betiwen todo - return array
	let filteredTodo = todo.filter(function(item) {
		// search in all task with includes and return
		return item.task.toLowerCase().includes(filters.searchItem.toLowerCase())
	})
	// filter for isDone
	filteredTodo = filteredTodo.filter(function(item) {
		// if isDone = true
		if(filters.isDone) {
			return item.isDone
		} else {
			return true
		}
	})
	// reset div and stop repeat
	document.querySelector('#getTodo').innerHTML = ''
	// return tag and show elements
	filteredTodo.forEach(function(item) {
		// create element with <p>
		const todoEl = document.createElement('p')
		// give value to <p> element
		todoEl.textContent = item.task
		// display in getTodo ID on front
		document.querySelector('#getTodo').appendChild(todoEl)
	})
}
renderTodo(todo, filters)
// search with input - addEventListener with input for each charecter
document.querySelector('#search').addEventListener('input', function(e) {
	// what you have to follow for search - with target value
	filters.searchItem = e.target.value
	// use renderTodo for display
	renderTodo(todo, filters)
})
// create new todo
document.querySelector('#add-todo').addEventListener('submit', function(e) {
	// preventDefault
	e.preventDefault()
	// add everythings to array (push)
	todo.push({
		// writeTask is name of input
		task: e.target.elements.writeTask.value,
		isDone: false
	})
	// set item localstorage
	localStorage.setItem('todo', JSON.stringify(todo))
	// use for new data and renew array
	renderTodo(todo, filters)
	// for reset input
	e.target.elements.writeTask.value = ''
})
// checkbox
document.querySelector('#done').addEventListener('change', function(e) {
	// get value from user of checkbox
	filters.isDone = e.target.checked
	// renew
	renderTodo(todo, filters)
})