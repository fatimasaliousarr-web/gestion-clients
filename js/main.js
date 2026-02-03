const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const clientList = document.getElementById("clientList");

addBtn.addEventListener("click", async () => {

  const client = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  const response = await fetch("http://localhost:3000/clients", {
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
});
