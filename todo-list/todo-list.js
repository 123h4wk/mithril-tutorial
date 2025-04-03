function TodoItem () {
  return {
    view: (vnode) => {
      const { todo, onItemDoubleClick } = vnode.attrs
      return m('p', {
        ondblclick: () => onItemDoubleClick(todo)
      }, todo)
    }
  }
}

function App () {
  const todoItems = ['Task1', 'Task2']
  let newTodo = ''

  function addTodo () {
    if (newTodo === '') return
    todoItems.push(newTodo)
    newTodo = ''
  }

  function removeTodo (clickedTodo) {
    const targetIndex = todoItems.findIndex(it => it === clickedTodo)
    todoItems.splice(targetIndex, 1)
  }

  return {
    view: () => {
      return m('div', {}, [
        m('h1', { class: 'title' }, 'Todo List'),
        m('input', {
          type: 'text',
          value: newTodo,
          onchange: (e) => { newTodo = e.target.value }
        }),
        m('button', {
          onclick: () => addTodo()
        }, 'Add Todo'),
        todoItems.map((todo) => m(TodoItem, {
          todo,
          onItemDoubleClick: removeTodo
        }))
      ])
    }
  }
}

m.mount(document.getElementById('app'), App)
