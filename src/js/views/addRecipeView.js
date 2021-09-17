import View from './View';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overly = document.querySelector('.overlay');
  _message = 'Recipe was successfully uploaded :)';

  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWin();
    this._addHandlerCloseWin();
  }

  _toggleWin() {
    this._overly.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWin() {
    this._btnOpen.addEventListener('click', this._toggleWin.bind(this));
  }
  _addHandlerCloseWin() {
    this._btnClose.addEventListener('click', this._toggleWin.bind(this));
    this._overly.addEventListener('click', this._toggleWin.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); //Oposit of Entries, Beacouse this one work for object

      handler(data);
    });
  }

  _genarateMarkup() {}
}
export default new addRecipeView();
