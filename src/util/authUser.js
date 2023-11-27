const UID = 'uid'
const EMAIL = 'email'

export default class authStorage {
  saveUid(uid) {
    localStorage.setItem(UID, uid);
  }

  getUid() {
    localStorage.getItem(UID);
  }

  clearUid() {
    localStorage.removeItem(UID);
  }

  saveEmail(email) {
    localStorage.setItem(EMAIL, email);
  }

  getEmail() {
    localStorage.getItem(EMAIL);
  }

  clearEmail() {
    localStorage.removeItem(EMAIL);
  }
}