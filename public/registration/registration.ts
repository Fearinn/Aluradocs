import { $form } from "./domManipulation.js";
import { emitRegisterUser } from "./socket-front-registration.js";

if ($form) {
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = $form["input-usuario"].value;
    const password = $form["input-senha"].value;

    emitRegisterUser(user, password);
  });
}
