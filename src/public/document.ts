import { documentName, textarea } from "./common/domUpdate.js";
import { emitTextArea } from "./socket-front.js";

if (textarea) {
  textarea.addEventListener("keyup", () => {
    emitTextArea({
      text: textarea.value,
      documentName: documentName,
    });
  });
}
