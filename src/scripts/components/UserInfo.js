// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов: и элемента информации о себе
  constructor(profileInfoSet) {
    // элемента имени пользователя
    this._profileName = document.querySelector(profileInfoSet.profileName);
    // и элемента информации о себе
    this._profileAbout = document.querySelector(profileInfoSet.profileAbout);
  }

  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    return { title: this._profileName.textContent, about: this._profileAbout.textContent }
  }

  // публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(infoSet) {
    this._profileName.textContent = infoSet.title;
    this._profileAbout.textContent = infoSet.about;
  }
}

export default UserInfo;
