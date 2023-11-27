const TOKEN = 'token'

export default class tokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.removeItem(TOKEN);
  }
}
