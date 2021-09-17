import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }
  _genarateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsRecipePerPage
    );
    const _markupArray = [
      `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `,
      `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `,
    ];
    console.log(numPages);
    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return _markupArray[1];
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return _markupArray[0];
    }
    //Other page
    if (curPage < numPages) {
      return _markupArray.join('');
    }

    //Page 1, there are NO pages
    return '';
  }
}
export default new PaginationView();
