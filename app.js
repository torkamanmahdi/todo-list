let todo = []
const filters = {
	searchItem: '',
	isDone: false
}
const todoJSON = localStorage.getItem('todo')
if(todoJSON !== null) {
	todo = JSON.parse(todoJSON)
}
const renderTodo = function(todo, filters) {
	let filteredTodo = todo.filter(function(item) {
		return item.task.toLowerCase().includes(filters.searchItem.toLowerCase())
	})
	filteredTodo = filteredTodo.filter(function(item) {
		if(filters.isDone) {
			return item.isDone
		} else {
			return true
		}
	})
	document.querySelector('#getTodo').innerHTML = ''
	filteredTodo.forEach(function(item) {
		const todoEl = document.createElement('p')
		todoEl.textContent = item.task
		document.querySelector('#getTodo').appendChild(todoEl)
	})
}
renderTodo(todo, filters)
document.querySelector('#search').addEventListener('input', function(e) {
	filters.searchItem = e.target.value
	renderTodo(todo, filters)
})
document.querySelector('#add-todo').addEventListener('submit', function(e) {
	e.preventDefault()
	todo.push({
		task: e.target.elements.writeTask.value,
		isDone: false
	})
	localStorage.setItem('todo', JSON.stringify(todo))
	renderTodo(todo, filters)
	e.target.elements.writeTask.value = ''
})
document.querySelector('#done').addEventListener('change', function(e) {
	filters.isDone = e.target.checked
	renderTodo(todo, filters)
})