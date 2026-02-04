alert("JS bien chargé");
// Récupération des éléments HTML
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const clientList = document.getElementById("clientList");


// ==============================
// AJOUTER UN CLIENT
// ==============================
addBtn.addEventListener("click", async () => {

  const client = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  if(!client.name || !client.email || !client.phone){
    alert("Veuillez remplir tous les champs");
    return;
  }

  await fetch("http://localhost:3000/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });

  // Recharger la liste
  loadClients();

  // Vider les champs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});


// ==============================
// CHARGER LES CLIENTS
// ==============================
async function loadClients() {
  const response = await fetch("http://localhost:3000/clients");
  const clients = await response.json();

  clientList.innerHTML = "";

  clients.forEach(client => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>
        <button onclick="deleteClient(${client.id})">Supprimer</button>
      </td>
    `;

    clientList.appendChild(row);
  });
}


// ==============================
// SUPPRIMER CLIENT
// ==============================
async function deleteClient(id) {
  await fetch(`http://localhost:3000/clients/${id}`, {
    method: "DELETE"
  });

  loadClients();
}


// ==============================
// LANCEMENT AU CHARGEMENT
// ==============================
loadClients();
