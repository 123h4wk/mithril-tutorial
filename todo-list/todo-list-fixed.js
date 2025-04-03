function TodoItem () {
  return {
    view: (vnode) => {
      const { todo, onItemDoubleClick } = vnode.attrs
      return m('p', {
        ondblclick: () => onItemDoubleClick(todo)
      }, todo.name)
    }
  }
}

function App () {
  const todoItems = [
    {
      id: window.crypto.randomUUID(),
      name: 'Task1'
    },
    {
      id: window.crypto.randomUUID(),
      name: 'Task2'
    }
  ]

  let newTodoName = ''

  function addTodo () {
    if (newTodoName === '') return
    todoItems.push({
      id: window.crypto.randomUUID(),
      name: newTodoName
    })
    newTodoName = ''
  }

  function removeTodo (clickedTodo) {
    const targetIndex = todoItems.findIndex(it => it.id === clickedTodo.id)
    todoItems.splice(targetIndex, 1)
  }

  return {
    view: () => {
      return m('div', {}, [
        m('h1', { class: 'title' }, 'Todo List'),
        m('input', {
          type: 'text',
          value: newTodoName,
          onchange: (e) => { newTodoName = e.target.value }
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
