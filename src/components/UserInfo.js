export default class UserInfo {
  constructor({selectorName, selectorCareer}) {
    this.userName = document.querySelector(selectorName);
    this.userCareer = document.querySelector(selectorCareer);
  }

  getUserInfo() {
    this.arrayNewCardData = {name: this.userName.textContent, career: this.userCareer.textContent};
    return this.arrayNewCardData;
  }

  setUserInfo(userInfo) {
    this.userName.textContent = userInfo.firstname;
    this.userCareer.textContent = userInfo.career;
  }
}
