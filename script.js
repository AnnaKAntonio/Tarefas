function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR');
    document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

function addTask() {
    const taskDescription = document.getElementById('taskDescription').value;
    const taskResponsible = document.getElementById('taskResponsible').value;

    if (!taskDescription || !taskResponsible) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const task = document.createElement('div');
    task.className = 'task';

    task.innerHTML = `
        <p>${taskDescription} <span class="responsible">(${taskResponsible})</span></p>
        <div class="task-actions">
            <button onclick="moveToCompleted(this)">Concluir</button>
            <button onclick="deleteTask(this)">Remover</button>
        </div>
    `;

    document.getElementById('inProgress').appendChild(task);

    document.getElementById('taskDescription').value = '';
    document.getElementById('taskResponsible').value = '';
}

function moveToCompleted(button) {
    const task = button.parentElement.parentElement;
    document.getElementById('completed').appendChild(task);
    task.querySelector('.task-actions').remove();
}

function deleteTask(button) {
    const task = button.parentElement.parentElement;
    task.remove();
}
