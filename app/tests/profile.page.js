import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async formCheck(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#name', 'John');
    await testController.typeText('#social', 'john@foo.com');
    await testController.typeText('#preference', 'Really Cool!');
    await testController.typeText('#dealbreaker', 'Cat ladies!');
    await testController.typeText('#habit', 'Skateboarding');
    await testController.click('#alcohol');
    await testController.click('#noButton1');
    await testController.click('#alcohol_preference');
    await testController.click('#noButton2');
    await testController.click('#gender');
    await testController.click('#maleButton1');
    await testController.click('#gender_preference');
    await testController.click('#maleButton2');
    await testController.click('#profile-submit-button');
    // await testController.click('#sleep', '12');
    // await testController.click('#sleep_preference', '6');
  }
}
export const profilePage = new ProfilePage();
