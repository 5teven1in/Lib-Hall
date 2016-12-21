import { LibPracFrontPage } from './app.po';

describe('lib-prac-front App', function() {
  let page: LibPracFrontPage;

  beforeEach(() => {
    page = new LibPracFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('lib works!');
  });
});
