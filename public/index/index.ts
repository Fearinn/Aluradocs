import { deleteCookie } from "../utils/cookie.js";
import { $form, $input, $logoutButton } from "./domManipulation.js";
import { emitAddDocument } from "./socket-front-index.js";

if ($form) {
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    if ($input) {
      emitAddDocument($input.value);
      $input.value = "";
    }
  });
}

if ($logoutButton) {
  $logoutButton.addEventListener("click", () => {
    deleteCookie("tokenJwt");
    alert("User successfully logged out!");
    window.location.href = "/login.html";
  });
}
