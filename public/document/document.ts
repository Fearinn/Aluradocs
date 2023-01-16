import { $buttonDelete, documentName, textarea } from "./domManipulation.js";
import { deleteDocument, emitTextArea } from "./socket-front-document.js";

if (textarea) {
  textarea.addEventListener("keyup", () => {
    if (documentName) {
      emitTextArea({
        text: textarea.value,
        name: documentName,
      });
    }
  });
}

if ($buttonDelete) {
  $buttonDelete.addEventListener("click", () => {
    if (documentName) deleteDocument(documentName);
  });
}
