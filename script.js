// window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')); //convert string to object
	console.log("todolist",todos);
	
	const newTodoForm = document.querySelector('#newTodoForm');//take value from form

	console.log(newTodoForm);

	newTodoForm.addEventListener('submit', e => { //it works only when we submit add task
		e.preventDefault();
		console.log(e);
		const todo = {
			content: e.target.content.value,
			done:false
	
		}

		console.log(todo);

		todos.unshift(todo);//push object to todos
		console.log(todos);

		localStorage.setItem('todos', JSON.stringify(todos));//after refresh the data should not be lost //todos is an array of objects 
			// Reset the form
		e.target.reset();

		DisplayTodos();
	})

	DisplayTodos();
// })

function DisplayTodos() {
	const todoList = document.querySelector('#todoList');
	const completed = document.querySelector('#completedTask');
	console.log(todoList);
	console.log(completed);

	todoList.innerHTML = "";
	completed.innerHTML = "";

	todos.forEach(todo => {
		console.log(todo);
		console.log(todos);
		const todoItem = document.createElement('div');
		todoItem.classList.add('todoItem');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done; //done is boolean value to check 
		content.classList.add('todoContent');
		actions.classList.add('actions');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
			completed.appendChild(todoItem);
		}

		input.addEventListener('change', (e) => { 
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			DisplayTodos()

		})

		deleteButton.addEventListener('click', (e) => {
			var userConfirm=confirm("Are you sure you want to delete this?????");
			console.log(userConfirm);
			if(userConfirm==true)
			{
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
			}
		})
	})
}


