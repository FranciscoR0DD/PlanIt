document.addEventListener('DOMContentLoaded', function() {
    var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
        initialView: 'dayGridMonth',
        dateClick: function(info) {
            document.getElementById('task-form').style.display = 'block';
            document.getElementById('task-date').value = info.dateStr;
            document.getElementById('task-description').value = '';
            document.querySelectorAll('.selected-date').forEach(el => el.classList.remove('selected-date'));

            // Adiciona a classe de destaque à data clicada
            info.dayEl.classList.add('selected-date');

             // Exibe o formulário para adicionar a tarefa
             document.getElementById('task-form').style.display = 'block';
             document.getElementById('task-date').value = info.dateStr;
             document.getElementById('task-description').value = '';
        }
    });

    calendar.render();

    let editingTask = null; // Variável para armazenar a tarefa sendo editada

    document.getElementById('add-task').addEventListener('click', function() {
        var taskDate = document.getElementById('task-date').value;
        var taskTime = document.getElementById('task-time').value;
        var taskDescription = document.getElementById('task-description').value.trim();
        var taskUrgency = document.getElementById('task-urgency').value;

        if (taskDate && taskTime && taskDescription && taskUrgency) {
            if (editingTask) {
                // Atualiza a tarefa em edição
                updateTaskElement(editingTask, taskDate, taskTime, taskDescription, taskUrgency);
                editingTask = null; // Limpa a referência de edição
            } else {
                // Cria uma nova tarefa
                createTaskElement(taskDate, taskTime, taskDescription, taskUrgency);
            }

            // Limpa o formulário e esconde-o
            document.getElementById('task-form').style.display = 'none';
            document.getElementById('task-date').value = '';
            document.getElementById('task-time').value = '';
            document.getElementById('task-description').value = '';
            document.getElementById('task-urgency').value = 'baixa';
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Função para criar um elemento de tarefa
    function createTaskElement(date, time, description, urgency) {
        var taskElement = document.createElement("div");
        taskElement.classList.add('task-item');

        // Adiciona a classe de urgência
        if (urgency === "baixa") taskElement.classList.add('urgency-baixa');
        else if (urgency === "media") taskElement.classList.add('urgency-media');
        else if (urgency === "alta") taskElement.classList.add('urgency-alta');

        taskElement.innerHTML = `
            <strong>Data:</strong> ${date} <br>
            <strong>Hora:</strong> ${time} <br>
            <strong>Descrição:</strong> ${description} <br>
            <span class="urgency">${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</span>
            <button class="edit-task">Editar</button>
            <br>
            <button class="delete-task">Excluir</button>
        `;

        // Botão de exclusão
        taskElement.querySelector('.delete-task').addEventListener('click', function() {
            taskElement.remove();
        });

        // Botão de edição
        taskElement.querySelector('.edit-task').addEventListener('click', function() {
            // Preenche o formulário com os dados da tarefa para edição
            document.getElementById('task-form').style.display = 'block';
            document.getElementById('task-date').value = date;
            document.getElementById('task-time').value = time;
            document.getElementById('task-description').value = description;
            document.getElementById('task-urgency').value = urgency;

            // Armazena o elemento da tarefa que está sendo editado
            editingTask = taskElement;
        });

        document.getElementById('task-list').appendChild(taskElement);
    }

    // Função para atualizar um elemento de tarefa existente
    function updateTaskElement(taskElement, date, time, description, urgency) {
        // Atualiza o conteúdo da tarefa
        taskElement.innerHTML = `
            <strong>Data:</strong> ${date} <br>
            <strong>Hora:</strong> ${time} <br>
            <strong>Descrição:</strong> ${description} <br>
            <span class="urgency">${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</span>
            <button class="edit-task">Editar</button>
            <button class="delete-task">Excluir</button>
        `;

        // Atualiza a classe de urgência
        taskElement.className = 'task-item'; // Remove todas as classes
        taskElement.classList.add(`urgency-${urgency}`);

        // Atualiza os eventos para os botões
        taskElement.querySelector('.delete-task').addEventListener('click', function() {
            taskElement.remove();
        });

        taskElement.querySelector('.edit-task').addEventListener('click', function() {
            document.getElementById('task-form').style.display = 'block';
            document.getElementById('task-date').value = date;
            document.getElementById('task-time').value = time;
            document.getElementById('task-description').value = description;
            document.getElementById('task-urgency').value = urgency;

            editingTask = taskElement;
        });
    }
});