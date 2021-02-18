const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0);

class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');

    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');
    this.images = [];
    this.imagesCount = 0;

    this.registerEvents();
  }

  registerEvents() {
    this.uploadButton.addEventListener('change', (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        if (file.type !== 'image') {
          return false
        }
      });

      files.forEach((file) => {
        this.updateCounter(++this.imagesCount);
        this.images.push(file);
      });
    });

    this.submitButton.addEventListener('click', this.generationSprite.bind(this))
  }

  updateCounter(counter) {
    this.imagesCountContainer.innerText = counter;
  }

  generationSprite() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let x = 0;
    let y = 0;
    let css = `.icon {\n  display: inline-block;\n  background-image: url(img/sprite.png);\n}`;

    this.images.forEach((fileImg, index) => {
      let img = new Image();
      img.src = window.URL.createObjectURL(fileImg);
      img.addEventListener('load', (event) => {
        ctx.drawImage(img, x, y);
        this.setImgSrc(canvas);
        let fileImgName = fileImg.name.split('.')[0];
        css += `\n\n.icon_${fileImgName.replace(/\s/g, '')} {\n  background-position: ${-x}px;\n  width: ${img.width}px;\n  height: ${img.height}px;\n}`;
        x += img.width;

        if(this.images.length === index + 1) {
          this.codeContainer.value = css;
        }
      });
    });
  }

  setImgSrc(canvas) {
    this.imageElement.src = canvas.toDataURL();
  }
}

new SpriteGenerator(document.getElementById('generator'));

