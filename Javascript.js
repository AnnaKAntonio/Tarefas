// Função para carregar tarefas do localStorage
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
        adicionarTarefa(tarefa.texto, tarefa.status);
    });
}

// Função para adicionar uma tarefa
function adicionarTarefa(tarefaTexto, status = 'pendente') {
    const li = document.createElement('li');
    li.textContent = tarefaTexto;
    li.classList.add(status); // Adiciona a classe com o status

    // Botão para marcar como Em Andamento
    const emAndamentoBtn = document.createElement('button');
    emAndamentoBtn.textContent = 'Em Andamento';
    emAndamentoBtn.addEventListener('click', function() {
        li.classList.toggle('em-andamento');
        li.classList.toggle('pendente');
        salvarTarefas();
    });

    // Botão para marcar como Concluída
    const concluirBtn = document.createElement('button');
    concluirBtn.textContent = 'Concluir';
    concluirBtn.addEventListener('click', function() {
        li.classList.toggle('concluida');
        li.classList.toggle('em-andamento');
        salvarTarefas();
    });

    // Botão para remover a tarefa
    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'Remover';
    removerBtn.addEventListener('click', function() {
        li.remove();
        salvarTarefas();
    });

    li.appendChild(emAndamentoBtn);
    li.appendChild(concluirBtn);
    li.appendChild(removerBtn);
    document.getElementById('tarefa-lista').appendChild(li);
}

// Função para salvar tarefas no localStorage
function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('#tarefa-lista li').forEach(li => {
        tarefas.push({
            texto: li.childNodes[0].textContent,
            status: li.classList.contains('concluida')
                ? 'concluida'
                : li.classList.contains('em-andamento')
                    ? 'em-andamento'
                    : 'pendente'
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Carregar tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarTarefas);

// Adicionar nova tarefa ao clicar no botão
document.getElementById('adicionar-btn').addEventListener('click', function() {
    const input = document.getElementById('tarefa-input');
    const tarefaTexto = input.value;

    if (tarefaTexto) {
        adicionarTarefa(tarefaTexto);
        input.value = ''; // Limpa o campo de entrada
        salvarTarefas(); // Salva a tarefa
    } else {
        alert('Por favor, digite uma tarefa.');
    }
});
