const tarefa = document.querySelector('.tarefa');
const data = document.querySelector('.data');
const hora = document.querySelector('.hora');
const textarea = document.querySelector('.text_area');
const botao = document.querySelector('.botao');
const container = document.querySelector('.tarefas_container');
const searchInput = document.querySelector('.titulo_busca');
const searchButton = document.querySelector('.botao_busca');

const arrayVazio = JSON.parse(localStorage.getItem('tarefas')) || [];

function pegarValor(e) {
    e.preventDefault();

    if (tarefa.value && textarea.value && data.value && hora.value !== '') {
        addTarefa(tarefa.value, data.value, textarea.value, hora.value);
        tarefa.value = '';
        hora.value = '';
        data.value = '';
        textarea.value = '';
    } else {
        console.log("nao deuu");
    }
}

function addTarefa(tarefaValue, dataValue, textareaValue, horaValue) {

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<div class="card_tarefa">
                       <div class="sobre_nota">
                       <div class="btn_cor">
                        <div class="btn_white"></div>
                        <div class="btn_black"></div>
                    
                       </div>
                       <h3 class="titulo">Atividade: ${tarefaValue}</h3>
                       <i id="icone" class="fa-solid fa-delete-left"></i>
                        </div>
                        <span class="hora_card">Tempo: ${horaValue}</span>
                       <span class="data_card">Data: ${dataValue}</span>
                      
                       <span class="texto"> ${textareaValue}</span>
                       </div>`;


    container.appendChild(card);

    const white = card.querySelector('.btn_white');
    white.addEventListener('click', () => mudandoCor(card, 'white'));
    
    const black = card.querySelector('.btn_black');
    black.addEventListener('click', () => mudandoCor(card, 'black'));


    const excluirCard = card.querySelector("#icone");
    excluirCard.addEventListener('click', () => excluirItem(card, tarefaValue, dataValue, textareaValue));

    arrayVazio.push({ tarefaValue, dataValue, textareaValue });
    localStorage.setItem('tarefas', JSON.stringify(arrayVazio));
}

function mudandoCor(card, cor) {
    card.classList.remove('color_black', 'color_white');
    card.classList.add(`color_${cor}`);
 
}

function excluirItem(card, tarefaValue, dataValue, textareaValue, horaValue) {
    container.removeChild(card);
    const index = arrayVazio.findIndex(task => task.tarefaValue === tarefaValue && task.dataValue === dataValue && task.textareaValue === textareaValue);
    if (index !== -1) {
        arrayVazio.splice(index, 1);
        localStorage.setItem('tarefas', JSON.stringify(arrayVazio));
    }
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
        addTarefa(tarefa.tarefaValue, tarefa.dataValue, tarefa.textareaValue);
    });
}

function buscarTarefa() {
    const searchValue = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const titulo = card.querySelector('.titulo').textContent.toLowerCase();
        if (titulo.includes(searchValue)) {
            card.style.display = 'block';
            container.prepend(card);
        } else {
            card.style.display = 'block';
        }
    });
}

searchButton.addEventListener('click', buscarTarefa);
botao.addEventListener('click', pegarValor);
//document.addEventListener('DOMContentLoaded', carregarTarefas);

