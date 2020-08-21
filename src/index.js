'use_strict';

import $ from 'jquery';

import 'normalize.css';
import './css/index.css';

import api from './scripts/api';
import bookmarkList from './scripts/bookmark-list';
import store from './scripts/store';

const main = function () {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarkList.render();
    });
  bookmarkList.bindEventListeners();
};

$(main);
