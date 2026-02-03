const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const clientList = document.getElementById("clientList");

let clients = [];
let editIndex = null;

/* Ajouter ou modifier */
addBtn.addEventListener("click", function () {

  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  if(name === "" || email === "" || phone === ""){
    alert("Veuillez remplir tous les champs");
    return;
  }

  if(editIndex === null){
    clients.push({ name, email, phone });
  } else {
    clients[editIndex] = { name, email, phone };
    editIndex = null;
    addBtn.textContent = "Ajouter";
  }

  displayClients();
  clearInputs();
});

/* Affichage */
function displayClients(){
  clientList.innerHTML = "";

  clients.forEach((client, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>
        <button class="action-btn" onclick="editClient(${index})">Modifier</button>
        <button class="action-btn" onclick="deleteClient(${index})">Supprimer</button>
      </td>
    `;

    clientList.appendChild(row);
  });
}

/* Modifier */
function editClient(index){
  const client = clients[index];

  nameInput.value = client.name;
  emailInput.value = client.email;
  phoneInput.value = client.phone;

  editIndex = index;
  addBtn.textContent = "Modifier";
}

/* Supprimer */
function deleteClient(index){
  clients.splice(index,1);
  displayClients();
}

/* Reset */
function clearInputs(){
  nameInput.value="";
  emailInput.value="";
  phoneInput.value="";
}
