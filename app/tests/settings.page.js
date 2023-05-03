import { Selector } from 'testcafe';

class SettingsPage {
  constructor() {
    this.pageId = '#settings-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async settingsCheck(testController) {
    await this.isDisplayed(testController);
    await testController.click('#data-visibility-button');
    await testController.click('#c1');
    await testController.click('#c2');
    await testController.click('#c3');
    await testController.click('#c4');
    await testController.click('#c5');
    await testController.click('#c6');
    await testController.click('#c7');
  }
}

export const settingsPage = new SettingsPage();
