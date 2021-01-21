import { LgnMoneyUiPage } from './app.po';

describe('lgnmoney-ui App', () => {
  let page: LgnMoneyUiPage;

  beforeEach(() => {
    page = new LgnMoneyUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
