// Dados compartilhados
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

// Função para salvar dados
function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}

// Função para adicionar tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ id: Date.now(), text: taskText });
        taskInput.value = '';
        saveData();
        renderTasks();
    }
}

// Função para renderizar tarefas
function renderTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    taskList.innerHTML = tasks.map(task => `
        <li>
            <input type="checkbox" value="${task.id}"> ${task.text}
        </li>
    `).join('');
}

// Função para excluir tarefas selecionadas
function deleteSelectedTasks() {
    const selectedTasks = document.querySelectorAll('#taskList input:checked');
    selectedTasks.forEach(task => {
        const taskId = Number(task.value);
        const index = tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            deletedTasks.push(tasks.splice(index, 1)[0]);
        }
    });
    saveData();
    renderTasks();
}

// Função para excluir todas as tarefas
function deleteAllTasks() {
    deletedTasks.push(...tasks);
    tasks = [];
    saveData();
    renderTasks();
}

// Função para renderizar tarefas excluídas
function renderDeletedTasks() {
    const deletedTaskList = document.getElementById('deletedTaskList');
    if (!deletedTaskList) return;
    deletedTaskList.innerHTML = deletedTasks.map(task => `
        <li>
            <input type="checkbox" value="${task.id}"> ${task.text}
        </li>
    `).join('');
}

// Funções de manipulação da lixeira
function restoreSelectedTasks() {
    const selectedTasks = document.querySelectorAll('#deletedTaskList input:checked');
    selectedTasks.forEach(task => {
        const taskId = Number(task.value);
        const index = deletedTasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            tasks.push(deletedTasks.splice(index, 1)[0]);
        }
    });
    saveData();
    renderDeletedTasks();
}

function deleteSelectedDeletedTasks() {
    const selectedTasks = document.querySelectorAll('#deletedTaskList input:checked');
    selectedTasks.forEach(task => {
        const taskId = Number(task.value);
        deletedTasks = deletedTasks.filter(t => t.id !== taskId);
    });
    saveData();
    renderDeletedTasks();
}

function deleteAllDeletedTasks() {
    deletedTasks = [];
    saveData();
    renderDeletedTasks();
}

function restoreAllTasks() {
    // Adiciona todas as tarefas da lixeira de volta à lista principal
    tasks.push(...deletedTasks);

    // Limpa o array de tarefas excluídas
    deletedTasks = [];

    // Salva os dados atualizados no localStorage
    saveData();

    // Atualiza a interface
    renderTasks();
    renderDeletedTasks();
}

// Adicionar tarefa ao pressionar Enter no campo de entrada
const taskInput = document.getElementById('taskInput');
taskInput?.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask(); // Chama a função para adicionar a tarefa
    }
});


window.onload = () => {
    renderTasks();
    renderDeletedTasks();

    // Botões e eventos
    document.getElementById('addTaskButton')?.addEventListener('click', addTask);
    document.getElementById('deleteSelectedTasksButton')?.addEventListener('click', deleteSelectedTasks);
    document.getElementById('deleteAllTasksButton')?.addEventListener('click', deleteAllTasks);

    document.getElementById('restoreSelectedButton')?.addEventListener('click', restoreSelectedTasks);
    document.getElementById('restoreAllButton')?.addEventListener('click', restoreAllTasks);
    document.getElementById('deletePermanentlyButton')?.addEventListener('click', deleteSelectedDeletedTasks);
    document.getElementById('deleteAllDeletedTasksButton')?.addEventListener('click', deleteAllDeletedTasks);

    // Adicionar tarefa ao pressionar Enter no campo de entrada
    const taskInput = document.getElementById('taskInput');
    taskInput?.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
};
