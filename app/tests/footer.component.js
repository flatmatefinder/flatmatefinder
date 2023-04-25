class Footer {
  async gotoMeetTheTeamPage(testController) {
    await testController.click('#meettheteam-footer');
  }

  async gotoSuggestionsPage(testController) {
    await testController.click('#suggestions-footer');
  }

  async gotoTermsAndConditionsPage(testController) {
    await testController.click('#termsandconditions-footer');
  }

  async gotoPrivacyPolicyPage(testController) {
    await testController.click('#privacypolicy-footer');
  }
}

export const footer = new Footer();
