export default class UserInfo {
  constructor({selectorName, selectorCareer}) {
    this.userName = document.querySelector('.profile__name');
    this.userCareer = document.querySelector('.profile__career');
    this.profileNameInput = document.querySelector(selectorName);
    this.profileCareerInput = document.querySelector(selectorCareer);
  }

  getUserInfo() {
    this.profileNameInput = this.userName.textContent;
    this.profileCareerInput = this.userCareer.textContent;

    this.arrayNewCardData = {name: this.profileNameInput, career: this.profileCareerInput};

    return this.arrayNewCardData;
  }

  setUserInfo() {
    this.userName.textContent = this.profileNameInput.value;
    this.userCareer.textContent = this.profileCareerInput.value;
  }

}
