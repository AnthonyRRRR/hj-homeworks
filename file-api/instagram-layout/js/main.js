const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);



class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };

    this.layoutContainers = container.querySelectorAll('.layout__item');

    this.registerEvents();
  }

  registerEvents() {
    this.actionButton.addEventListener('click', this.drawImage.bind(this))
    this.positionsContainer.addEventListener('drop', this.imgDrop.bind(this));

    this.layoutContainers.forEach((container) => {
      container.addEventListener('dragover', (event) => {
        event.preventDefault();
        this.addActiveClass(container);
      })
    });

    this.layoutContainers.forEach((container) => {
      container.addEventListener('dragleave', (event) => {
        this.removeActiveClass(container);
      })
    });

    this.layoutContainers.forEach((container) => {
      container.addEventListener('drop', (event) => {
        this.removeActiveClass(container);
      })
    })
  }

  imgDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const file = files[0];
    const imageTypeRegExp = /^image\//;

    if (!imageTypeRegExp.test(file.type)) {
      return false
    }

    const img = document.createElement('img');
    img.src = window.URL.createObjectURL(file);
    img.classList.add('layout__image');

    if (event.target.classList.contains('layout__item')) {
     const layoutType = event.target.className.match(/layout__item_(\w*)/)[1];
     this.layout[layoutType] = img;

      img.addEventListener('load', () => {
        window.URL.revokeObjectURL(event.target.src);
        event.target.appendChild(img);
      });
    }
  }

  drawImage() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
   canvas.width = this.positionsContainer.clientWidth;
   canvas.height = this.positionsContainer.clientHeight;
    for(let key in this.layout) {
      const layoutCoords = this.getCoords(this.positionsContainer);
      const imgCoords = this.getCoords(this.layout[key]);
      const x = imgCoords.left - layoutCoords.left;
      const y = imgCoords.top - layoutCoords.top;
      context.drawImage(this.layout[key], x, y);
      const img = new Image();
      img.src = canvas.toDataURL();
      this.result.value = img.outerHTML
    }
  }

    getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top,
      left: box.left
    };
  }

  addActiveClass(layoutContainer) {
    layoutContainer.classList.add('layout__item_active')
  }

  removeActiveClass(layoutContainer) {
    layoutContainer.classList.remove('layout__item_active')
  }
}

new iLayout(document.getElementById('layout'));




