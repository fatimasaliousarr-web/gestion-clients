alert("JS chargé OK");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const clientList = document.getElementById("clientList");

const API_URL = "https://gestion-clients-backend.onrender.com/clients";

let selectedClientId = null;

/* =======================
   CHARGER CLIENTS
======================= */
async function loadClients() {
  const res = await fetch(API_URL);
  const data = await res.json();

  clientList.innerHTML = "";

  data.forEach(client => {
    clientList.innerHTML += `
      <tr>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>
          <button onclick="editClient(${client.id}, '${client.name}', '${client.email}', '${client.phone}')">Modifier</button>
          <button onclick="deleteClient(${client.id})">Supprimer</button>
        </td>
      </tr>
    `;
  });
}

/* =======================
   AJOUTER CLIENT
======================= */
addBtn.addEventListener("click", async () => {

  if (selectedClientId === null) {
    const client = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(client)
    });

    alert(await res.text());
  } 
  else {
    // MODE MODIFICATION
    const client = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value
    };

    const res = await fetch(`${API_URL}/${selectedClientId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(client)
    });

    alert(await res.text());
    selectedClientId = null;
    addBtn.textContent = "Ajouter";
  }

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  loadClients();
});

/* =======================
   REMPLIR FORMULAIRE
======================= */
function editClient(id, name, email, phone) {
  selectedClientId = id;
  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;
  addBtn.textContent = "Mettre à jour";
}

/* =======================
   SUPPRIMER
======================= */
async function deleteClient(id) {
  if (!confirm("Supprimer ce client ?")) return;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  alert(await res.text());
  loadClients();
}

loadClients();
