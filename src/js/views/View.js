import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

// import icons from 'url:../../img/icons.svg';

// export default class View {
//   _data;
//   _errorMessage = 'We could not find that recipe.Please try another one!!!!!!';
//   _message = '';
//   render(data, render = true) {
//     if (!data || (Array.isArray(data) && data.length === 0))
//       return this.renderError();
//     this._data = data;
//     // console.log(this._data.ingredients);

//     const markup = this._generateMarkup();
//     if (!render) return markup;
//     this._clear();

//     this._parentElement.insertAdjacentHTML('afterbegin', markup);
//   }
//   update(data) {
//     if (!data || (Array.isArray(data) && data.length === 0))
//       return this.renderError();
//     this._data = data;
//     //console.log(this._data.ingredients);

//     const newMarkup = this._generateMarkup();
//     const newDOM = document.createRange().createContextualFragment(newMarkup);
//     const newElements = Array.from(newDOM.querySelectorAll('*'));
//     const curElements = Array.from(this._parentElement.querySelectorAll('*'));
//     console.log(curElements, newElements);

//     newElements.forEach((newEl, i) => {
//       const curEl = curElements[i];
//       // console.log(cur, newEl.isEqualNode(curEl));
//       if (
//         newEl.isEqualNode(curEl) &&
//         newEl.firstChild?.nodeValue.trim() !== ''
//       ) {
//         curEl.textContent = newEl.textContent;
//       }
//       if (!newEl.isEqualNode(curEl))
//         Array.from(newEl.attributes).forEach(attr =>
//           curEl.setAttribute(attr.name, attr.value)
//         );
//     });
//   }

//   _clear() {
//     this._parentElement.innerHTML = '';
//   }

//   renderSpinner() {
//     const markup = `<div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div> `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML('afterbegin', markup);
//   }
//   renderError(message = this._errorMessage) {
//     const markup = `<div class="error">
//       <div>
//         <svg>
//           <use href="${icons}#icon-alert-triangle"></use>
//         </svg>
//       </div>
//       <p>${message}</p>
//     </div> `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML('afterbegin', markup);
//   }

//   renderMessage(message = this._message) {
//     const markup = `<div class="message">
//       <div>
//         <svg>
//         <use href="src/img/icons.svg#icon-smile"></use>
//         </svg>
//       </div>
//       <p>${message}</p>
//     </div> `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML('afterbegin', markup);
//   }
// }
