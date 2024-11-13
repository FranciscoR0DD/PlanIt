document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Exibe a visualização de mês
        dateClick: function(info) {
            // Remove a classe 'selected-date' de qualquer outro dia selecionado
            let previouslySelected = calendarEl.querySelector('.selected-date');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected-date');
            }

            // Adiciona a classe 'selected-date' ao dia clicado
            info.dayEl.classList.add('selected-date');

            // Exibe o formulário para adicionar a tarefa
            document.getElementById('task-form').style.display = 'block';
            document.getElementById('task-date').value = info.dateStr; // Preenche automaticamente com a data selecionada
            document.getElementById('task-description').value = ''; // Limpa o campo de descrição
        }
    });

    calendar.render();

    // Função para adicionar a tarefa
    document.getElementById('add-task').addEventListener('click', function() {
        var taskDate = document.getElementById('task-date').value;
        var taskTime = document.getElementById('task-time').value;
        var taskDescription = document.getElementById('task-description').value.trim();
        var taskUrgency = document.getElementById('task-urgency').value;

        if (taskDate && taskTime && taskDescription && taskUrgency) {
            // Criando o item de tarefa
            var taskElement = document.createElement("div");
            taskElement.classList.add('task-item');

            // Adicionando a classe de urgência correspondente
            if (taskUrgency === "baixa") {
                taskElement.classList.add('urgency-baixa');
            } else if (taskUrgency === "media") {
                taskElement.classList.add('urgency-media');
            } else if (taskUrgency === "alta") {
                taskElement.classList.add('urgency-alta');
            }

            taskElement.innerHTML = `
                <strong>Data:</strong> ${taskDate} <br>
                <strong>Hora:</strong> ${taskTime} <br>
                <strong>Descrição:</strong> ${taskDescription} <br>
                <span class="urgency">${taskUrgency.charAt(0).toUpperCase() + taskUrgency.slice(1)}</span>
            `;

            // Adicionando à lista de tarefas
            document.getElementById('task-list').appendChild(taskElement);

            // Limpa os campos e esconde o formulário de tarefa
            document.getElementById('task-form').style.display = 'none';
            document.getElementById('task-date').value = ''; // Limpa o campo de data
            document.getElementById('task-time').value = ''; // Limpa o campo de hora
            document.getElementById('task-description').value = ''; // Limpa o campo de descrição
            document.getElementById('task-urgency').value = 'baixa'; // Resetando para a opção "Baixa"
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});