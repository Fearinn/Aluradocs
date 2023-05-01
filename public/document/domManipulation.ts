export const textarea = document.getElementById(
  "editor-texto"
) as HTMLTextAreaElement;

export const title = document.getElementById(
  "titulo-documento"
) as HTMLHeadingElement;

export const connectedUsersList = document.getElementById(
  "usuarios-conectados"
);

export const $buttonDelete = document.getElementById("excluir-documento");

const params = new URLSearchParams(window.location.search);
export const documentName = params.get("nome");

title.textContent = documentName || "Untitled document";

export function updateText(text: string) {
  textarea.value = text;
}

export function alertAndRedirect(name: string) {
  if (name === documentName) {
    alert(`Documento ${name} excluído!`);
    window.location.href = "/";
  }
}

export function updateConnectedUsers(connectedUsers: string[]) {
  if (connectedUsersList) {
    connectedUsersList.innerHTML = "";
    
    connectedUsers.forEach((username) => {
      connectedUsersList.innerHTML += `<li class="list-group-item">${username}</li>`;
    });
  }
}
