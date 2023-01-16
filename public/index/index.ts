import { $form, $input } from "./domManipulation.js";
import { emitAddDocument } from "./socket-front-index.js";

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  emitAddDocument($input.value);
  $input.value = "";
});
