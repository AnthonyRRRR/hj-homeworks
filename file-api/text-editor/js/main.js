const throttle = (handler, ms) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(handler, ms);
  }
};

class TextEditor {
  constructor(container, storageKey = '_text-editor__content') {
    this.container = container;
    this.contentContainer = container.querySelector('.text-editor__content'); //textarea
    this.hintContainer = container.querySelector('.text-editor__hint');
    this.filenameContainer = container.querySelector('.text-editor__filename');
    this.storageKey = storageKey;
    this.registerEvents();
    this.load(this.getStorageData());
  }


  registerEvents() {
    const save = throttle(this.save.bind(this), 1000);
    this.contentContainer.addEventListener('input', save);
    this.hintContainer.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    this.contentContainer.addEventListener('dragover', event => {
      event.preventDefault();
      this.showHint()
    });
    this.hintContainer.addEventListener('drop', this.loadFile.bind(this));
  }

  loadFile(e) {
    e.preventDefault();
    this.hideHint();
    const file = e.dataTransfer.files[0];
    this.contentContainer.value = '';
    this.readFile(file)
  }

  readFile(file) {
    if (file.type !== 'text/plain') {
      alert('Это не текстовый файл');
      return false
    }

    const reader = new FileReader();

    reader.addEventListener('load', event => {
      this.contentContainer.value = event.target.result;
    });

    reader.readAsText(file);
    this.setFilename(file.name)
  }

  setFilename(filename) {
    this.filenameContainer.textContent = filename;
  }

  showHint(e) {
    this.hintContainer.classList.add('text-editor__hint_visible')
  }

  hideHint() {
    this.hintContainer.classList.remove('text-editor__hint_visible')
  }

  load(value) {
    this.contentContainer.value = value || '';
  }

  getStorageData() {
    return localStorage[this.storageKey];
  }

  save() {
    localStorage[this.storageKey] = this.contentContainer.value;
  }
}

new TextEditor(document.getElementById('editor'));