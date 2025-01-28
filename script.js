// Atualizar o relógio
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR');
    document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Função para adicionar uma tarefa
function addTask() {
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const taskResponsible = document.getElementById('taskResponsible').value.trim();

    if (!taskDescription || !taskResponsible) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const task = {
        id: Date.now().toString(), // Gerar um ID único
        description: taskDescription,
        responsible: taskResponsible,
        status: 'inProgress',
        observation: ''
    };

    saveTask(task);
    renderTask(task);

    document.getElementById('taskDescription').value = '';
    document.getElementById('taskResponsible').value = '';
}

// Função para mover uma tarefa para concluída
function moveToCompleted(button) {
    const taskElement = button.parentElement.parentElement;
    const taskId = taskElement.dataset.id;

    updateTaskStatus(taskId, 'completed');
    taskElement.querySelector('.task-actions').innerHTML = '<button onclick="deleteTask(this)">Remover</button>';
    document.getElementById('completed').appendChild(taskElement);
}

// Função para deletar uma tarefa
function deleteTask(button) {
    const taskElement = button.parentElement.parentElement;
    const taskId = taskElement.dataset.id;

    deleteTaskFromStorage(taskId);
    taskElement.remove();
}

// Função para salvar a observação
function saveObservation(textarea, taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        tasks[taskIndex].observation = textarea.value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Renderizar uma tarefa
function renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.dataset.id = task.id;

    taskElement.innerHTML = `
        <p>${task.description} <span class="responsible">(${task.responsible})</span></p>
        <textarea class="observation" placeholder="Adicionar observação..." onblur="saveObservation(this, '${task.id}')">${task.observation || ''}</textarea>
        <div class="task-actions">
            ${task.status === 'inProgress' ? '<button onclick="moveToCompleted(this)">Concluir</button>' : '<button onclick="deleteTask(this)">Remover</button>'}
        </div>
    `;

    if (task.status === 'inProgress') {
        document.getElementById('inProgress').appendChild(taskElement);
    } else {
        document.getElementById('completed').appendChild(taskElement);
    }
}

// Salvar tarefa no localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Atualizar status de uma tarefa no localStorage
function updateTaskStatus(id, status) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex > -1) {
        tasks[taskIndex].status = status;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Deletar tarefa do localStorage
function deleteTaskFromStorage(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

// Inicializar as tarefas ao carregar a página
window.onload = loadTasks;
