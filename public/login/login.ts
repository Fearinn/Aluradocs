import { $form } from "./domManipulation.js";
import { emitAuthenticateUser } from "./socket-front-login.js";

if ($form) {
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = $form["input-usuario"].value;
    const password = $form["input-senha"].value;

    emitAuthenticateUser(user, password);
  });
}
