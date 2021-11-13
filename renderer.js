class Bookmarks {
  constructor() {
    this.error = document.querySelector('#error');
    this.form = document.querySelector('#form');
    this.inputUrl = document.querySelector('#url');
    this.buttonAdd = document.querySelector('#buttonAdd');
    this.list = document.querySelector('#list');
    this.delete = document.querySelector('#delete');
    this.parser = new DOMParser();
    this.addEventListeners();
  }

  addEventListeners() {
    this.inputUrl.addEventListener('keyup', () => {
      this.buttonAdd.disabled = !this.inputUrl.validity.valid;
    });
    this.form.addEventListener('submit', this.createBookmark.bind(this));
    this.delete.addEventListener('click', this.deleteBookmarks.bind(this));
  }

  createBookmark(event) {
    event.preventDefault();
    const url = this.inputUrl.value;
    fetch(url)
      .then((resp) => resp.text())
      .then(this.extract.bind(this))
      .then(this.getTitle)
      .then((title) => this.saveBookmark(url, title))
      .then(this.cleanForm.bind(this))
      .then(this.showBookmarks.bind(this))
      .catch((error) => this.showError(error, url));
  }

  extract(content) {
    return this.parser.parseFromString(content, 'text/html');
  }

  getTitle(html) {
    return html.querySelector('title').innerText;
  }

  saveBookmark(url, title) {
    localStorage.setItem(
      url,
      JSON.stringify({
        title: title,
        url: url,
      })
    );
  }

  cleanForm() {
    this.inputUrl.value = null;
  }

  getBookmarks() {
    return Object.keys(localStorage).map((k) => JSON.parse(localStorage.getItem(k)));
  }

  getHtmlMarker(marker) {
    return `<div class="enlace"><h3>${marker.title}</h3><p><a href="${marker.url}">${marker.url}</a></p></div>`;
  }

  showBookmarks() {
    let bookmarks = this.getBookmarks();
    let html = bookmarks.map(this.getHtmlMarker).join('');
    this.list.innerHTML = html;
  }

  showError(error, url) {
    this.error.innerHTML = `Error <b>${url}</b> : ${error}`;

    setTimeout(() => {
      this.error.innerHTML = null;
    }, 5000);
  }

  deleteBookmarks() {
    localStorage.clear();
    this.list.innerHTML = '';
  }
}

let bookmarks = new Bookmarks();
bookmarks.showBookmarks();
