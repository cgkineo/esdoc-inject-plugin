const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

class Plugin {

  onStart(ev) {
    console.log(ev.data.option);
    this._option = ev.data.option || {};
  }

  onHandleContent(ev) {
    if (path.extname(ev.data.fileName) !== '.html') return;
    const $ = cheerio.load(ev.data.content);
    for (const style of this._option.styles) {
      const src = `./esdoc-inject-plugin/css/${path.basename(style)}`;
      $('head').append(`<link rel="stylesheet" href="${src}"/>`);
    }
    for (const script of this._option.scripts) {
      const src = `./esdoc-inject-plugin/script/${path.basename(script)}`;
      $('head').append(`<script src="${src}"></script>`);
    }
    ev.data.content = $.html();
  }

  onPublish(ev) {
    for (const style of this._option.styles) {
      const outPath = `esdoc-inject-plugin/css/${path.basename(style)}`;
      const content = fs.readFileSync(path.join(process.cwd(), style)).toString();
      ev.data.writeFile(outPath, content);
    }
    for (const script of this._option.scripts) {
      const outPath = `esdoc-inject-plugin/script/${path.basename(script)}`;
      const content = fs.readFileSync(path.join(process.cwd(), script)).toString();
      ev.data.writeFile(outPath, content);
    }
  }

}

module.exports = new Plugin();
