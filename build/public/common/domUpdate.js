export const textarea = document.getElementById("editor-texto");
export const title = document.getElementById("titulo-documento");
const params = new URLSearchParams(window.location.search);
export const documentName = params.get("nome");
title.textContent = documentName || "Untitled document";
export function updateText(text) {
    textarea.value = text;
}
