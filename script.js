const form = document.querySelector("#form");
const input = document.querySelector("#input");
const lista = document.querySelector("#lista");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Renderizar tarefas
function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.feita) li.classList.add("done");

    li.addEventListener("click", () => {
      tarefas[index].feita = !tarefas[index].feita;
      salvar();
      renderizar();
    });

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.addEventListener("click", e => {
      e.stopPropagation();
      tarefas.splice(index, 1);
      salvar();
      renderizar();
    });

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Salvar no localStorage
function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Adicionar tarefa
form.addEventListener("submit", e => {
  e.preventDefault();

  if (input.value.trim() === "") return;

  tarefas.push({
    texto: input.value,
    feita: false
  });

  input.value = "";
  salvar();
  renderizar();
});

renderizar();