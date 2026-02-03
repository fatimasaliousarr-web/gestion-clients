const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const clientList = document.getElementById("clientList");

let clients = [];

/* Ajouter client */
addBtn.addEventListener("click", function () {

  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  if(name === "" || email === "" || phone === ""){
    alert("Veuillez remplir tous les champs");
    return;
  }

  const client = {
    name,
    email,
    phone
  };

  clients.push(client);
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
        <button class="action-btn" onclick="deleteClient(${index})">Supprimer</button>
      </td>
    `;

    clientList.appendChild(row);
  });
}

/* Supprimer */
function deleteClient(index){
  clients.splice(index,1);
  displayClients();
}

/* Reset form */
function clearInputs(){
  nameInput.value="";
  emailInput.value="";
  phoneInput.value="";
}

