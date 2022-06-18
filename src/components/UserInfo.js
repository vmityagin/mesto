export default class UserInfo {
  constructor({selectorName, selectorCareer, selectorAvatar}) {
    this.userName = document.querySelector(selectorName);
    this.userCareer = document.querySelector(selectorCareer);
    this.userAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    this.arrayNewCardData = {name: this.userName.textContent, career: this.userCareer.textContent};
    return this.arrayNewCardData;
  }

  setUserInfo(userInfo) {
    this.userName.textContent = userInfo.name;
    this.userCareer.textContent = userInfo.about;
    this.userAvatar.src = userInfo.avatar;
  }

}
