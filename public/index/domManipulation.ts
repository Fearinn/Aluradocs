const $docList = document.getElementById("lista-documentos");
export const $form = document.getElementById(
  "form-adiciona-documento"
) as HTMLFormElement;
export const $input = document.getElementById(
  "input-documento"
) as HTMLInputElement;

export function insertDocumentLink(name: string) {
  if ($docList) {
    $docList.innerHTML += `<a href="documento.html?nome=${name}" id="${name}" class="list-group-item list-group-item-action">
   ${name}
 </a>`;
  }
}

export function removeDocumentLink(name: string) {
  if ($docList) {
    const $doc = document.getElementById(name);
    if ($doc) $docList.removeChild($doc);
  }
}
