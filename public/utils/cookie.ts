export function setCookie(key: string, value: unknown) {
  document.cookie = `${key}=${value};path=/`;
}

export function getCookie(key: string) {
  return document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.split("=")[1];
}

export function deleteCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
