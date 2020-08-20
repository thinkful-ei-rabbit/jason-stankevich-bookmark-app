'use_strict';

import $ from 'jquery';
import api from './api';
import store from './store';

const generateBookmarkAddForm = () => {
  return `
    <form id="js-add-new-bookmark-form" class="js-add-new-bookmark-form">
      <div class="even-flex">
        <fieldset>
          <legend>title</legend>
          <input type="text" name="title" class="js-bookmark-title-entry" placeholder="e.g., Google" required />
        </fieldset>
        <fieldset>
          <legend>url</legend>
          <input type="text" name="url" class="js-bookmark-url-entry" placeholder="e.g., https://google.com" required />
        </fieldset>
      </div>
      <div class="even-flex">
        <fieldset>
          <legend>description</legend>
          <textarea name="desc" class="js-bookmark-desc-entry" cols="100" rows="5" required>
          </textarea>
        </fieldset>
      </div>
      <div class="rating even-flex">
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" required/>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" />
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>   
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
      </div>
      <button type="submit">add</button>
    </form>
  `;
};

const generateBookmarkElement = (bookmark) => {
  if (bookmark.rating >= store.rating) {
    if (!bookmark.expand) {
      return `
        <li class="js-bookmark-item" data-item-id="${bookmark.id}">
          <div class="top-half" tabindex=0>
            <h2>${bookmark.title}</h2>
          </div>
          <div class="bottom-half">
            <div class="rating even-flex">
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="1" ${bookmark.rating === 1 ? 'checked' : '' } required/>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="2" ${bookmark.rating === 2 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="3" ${bookmark.rating === 3 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>   
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="4" ${bookmark.rating === 4 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="5" ${bookmark.rating === 5 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
            </div>
          </div>
        </li>
      `;
    } else {
      return `
        <li class="js-bookmark-item" data-item-id="${bookmark.id}">
          <div class="top-half" tabindex=0>
            <h2>${bookmark.title}</h1>
          </div>
          <div>
            <form class="js-edit-desc">
              <textarea name="desc" class="js-bookmark-desc-entry" cols="100" rows="5" required>${bookmark.desc}</textarea>
              <input type=button" value="&#10003;" />
            </form>
          </div>
          <div class="bottom-half appart-flex">
            <div class="rating left-side">
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" ${bookmark.rating === 1 ? 'checked' : '' } required/>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" ${bookmark.rating === 2 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" ${bookmark.rating === 3 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>   
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" ${bookmark.rating === 4 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" ${bookmark.rating === 5 ? 'checked' : '' } />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
            </div>
            <div class="even-flex right-side">
              <i class="fas fa-dumpster-fire js-bookmark-delete"></i>
              <i class="far fa-check-square js-bookmark-accept-change"></i>
            </div>
          </div>
        </li>
      `;
    }
  } else {
    return '';
  }
};

const generateAddBookmarkButton = () => {
  if(!store.addNewBookmark) {
    return 'add bookmark';
  } else {
    return 'cancel';
  }
};

const generateBookmarkListString = (bookmarkList) => {
  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
};

const render = () => {
  renderError();
  if (store.addNewBookmark) {
    $('.js-add-new-bookmark').html(generateBookmarkAddForm());
  } else {
    $('.js-add-new-bookmark').empty();
  }
  let bookmarks = [...store.bookmarks];
  // render the shopping list in the DOM
  const bookmarkListString = generateBookmarkListString(bookmarks);
  // insert that HTML into the DOM
  $('.js-add-bookmark').html(generateAddBookmarkButton());
  $('#js-bookmark-list').html(bookmarkListString);
};

const generateError = (message) => {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = () => {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = () => {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const handleAddNewBookmarkClick = () => {
  $('.js-add-bookmark').click(() => {
    store.toggleAddNewBookmark();
    render();
  });
};

const handleSubmitNewBookmark = () => {
  $('.js-add-new-bookmark').on('submit', '.js-add-new-bookmark-form', e => {
    e.preventDefault();
    let newBookmarkData = $(e.target).serializeJson();
    api.createBookmark(newBookmarkData)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.toggleAddNewBookmark();
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark-item')
    .data('item-id');
};

const handleClickToExpandBookmark = () => {
  $('#js-bookmark-list').on('click', '.top-half', e => {
    const id = getItemIdFromElement(e.currentTarget);
    const bookmark = store.findById(id);
    store.findAndUpdate(id, {expand: !bookmark.expand});
    render();
  });
};

const handleDeleteBookmark = () => {
  $('#js-bookmark-list').on('click', '.js-bookmark-delete', e => {
    const id = getItemIdFromElement(e.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleRatingFilterChange = () => {
  $('.js-filter-rating').change((e) => {
    let val = $(e.target).val();
    store.rating = val;
    render();
  });
};

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

const bindEventListeners = () => {
  handleCloseError();
  handleAddNewBookmarkClick();
  handleSubmitNewBookmark();
  handleClickToExpandBookmark();
  handleDeleteBookmark();
  handleRatingFilterChange();
};

export default {
  bindEventListeners,
  render
};