import { Selector } from 'testcafe';

class NotAuthorizedPage {
  constructor() {
    this.pageId = '#notauthorized-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
}

export const notauthorizedPage = new NotAuthorizedPage();
