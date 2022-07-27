const socket = io.connect();

socket.on("messages", data => {
  const html = data.map(element => {
    return (`
      <p>
        <strong>${element.author}</strong> <span>[${element.date}]</span> : <br/> <i>${element.text}</i>
      </p>
    `);
  }).join(" ")
  document.getElementById("chat").innerHTML = html;
});

function addMessage() {
  const today = new Date();
  const now = today.toLocaleString();
  const message = {
    author: document.getElementById("usermail").value,
    date: now,
    text: document.getElementById("text").value
  };
  socket.emit("new-message", message);
  return false;
}

function renderProducts({response: response}) {
  const tBody = document.getElementById("tBody");
  
  tBody.innerHTML = ejs.render(
    `
    <% for(let i = 0; i < response.length; i++) { %>
      <tr>
        <td><%= response[i].nombre %></td>
        <td>$ <%= response[i].precio %></td>
        <td><%= response[i].cantidad %></td>
        <td>
          <img src=<%= response[i].imagen %> alt=<%= response[i].nombre %> width="100px">
        </td>
      </tr>
    <% } %>
    `, {response: response}
  );
}

socket.on("products", response => {
  renderProducts({response});
});