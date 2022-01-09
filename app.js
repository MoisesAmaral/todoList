//selecionar
const task = document.querySelector('#task');
const save = document.querySelector('#salvar');
const excluir = document.querySelector('.excluir');



document.addEventListener('DOMContentLoaded', getTodos)
dataAtual();




//adcionar um classe quando clicar em concluir
function marcarComoLido(){
  concluir = document.querySelector('.todos, #texto');
  concluir.classList.toggle('completed');
}

//função de excluir
document.querySelector('.content').addEventListener('click', function(e){
    if(e.target.classList.contains('excluir')){
        e.target.parentElement.parentElement.remove();
        removeLocaStorage(e.target.parentElement.parentElement);
    }
})


//função de salvar e criar o elemento na DOM
save.addEventListener('click', function(e){
    e.preventDefault();
    let newtodo = document.querySelector('#task').value;
    if(newtodo === ''){
        alert('Preencha o campo');
    }else{
        const todoList = document.createElement('div');
        todoList.className = 'todo';
        todoList.innerHTML = `
                        <div class="todos">
                            <p id="texto">${newtodo}</p>
                            <div class="actions">
                              <i class="concluir fas fa-check-circle" onclick="marcarComoLido()"></i>
                              <i class="excluir fas fa-trash"></i>
                            </div>
                        </div>
        `;
        document.querySelector('.content').appendChild(todoList);
        saveLocalTodos(newtodo);
        document.querySelector('#task').value = '';
        }
});

function saveLocalTodos(todo){
  let todos
  if(localStorage.getItem('todos') === null){
      todos = []
  }else{
      todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
  let todos
  if(localStorage.getItem('todos') === null){
      todos = []
  }else{
      todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(newtodo){        
    const todoList = document.createElement('div');
    todoList.className = 'todo';
    todoList.innerHTML = `
                    <div class="todos">
                        <p id="texto">${newtodo}</p>
                        <div class="actions">
                          <i class="concluir fas fa-check-circle" onclick="marcarComoLido()"></i>
                          <i class="excluir fas fa-trash"></i>
                        </div>
                    </div>
    `;
    document.querySelector('.content').appendChild(todoList);
    document.querySelector('#task').value = '';
    })
  
}

function removeLocaStorage(todo){
  let todos
  if(localStorage.getItem('todos') === null){
      todos = []
  }else{
      todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

//função para inserir na DOM a data Atual
function dataAtual(){
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minuto = data.getMinutes();
  if(dia < 10){
      dia = '0' + dia;
  }
  if(mes < 10){
      mes = '0' + mes;
  }
  if(hora < 10){
      hora = '0' + hora;
  }
  if(minuto < 10){
      minuto = '0' + minuto;
  }
  document.querySelector('#dataAtual').innerHTML = `${dia}/${mes}/${ano} - ${hora} horas e ${minuto} min`;
  
 
}
