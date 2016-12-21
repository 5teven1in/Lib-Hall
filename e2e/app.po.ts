import { browser, element, by } from 'protractor';

export class LibPracFrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lib-root h1')).getText();
  }
}
