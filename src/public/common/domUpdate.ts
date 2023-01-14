export const textarea = document.getElementById(
  "editor-texto"
) as HTMLTextAreaElement;

export const title = document.getElementById(
    "titulo-documento"
  ) as HTMLHeadingElement;
  
  const params = new URLSearchParams(window.location.search);
  export const documentName = params.get("nome");
  
  title.textContent = documentName || "Untitled document";


  

export function updateText(text: string) {
  textarea.value = text;
}
