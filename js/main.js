alert("JS chargé OK");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const clientList = document.getElementById("clientList");

const API_URL = "http://localhost:3000/clients";

// Charger les clients
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
          <button>Supprimer</button>
        </td>
      </tr>
    `;
  });
}

// Ajouter client
addBtn.addEventListener("click", async () => {
  console.log("Bouton cliqué");


  const client = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });

  const message = await response.text();
  alert(message);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  loadClients();
});

// Charger au démarrage
loadClients();
