import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
// import { adminlandingPage } from './adminlanding.page';
import { meettheteamPage } from './meettheteam.page';
import { privacypolicyPage } from './privacypolicy.page';
import { profilePage } from './profile.page';
import { settingsPage } from './settings.page';
import { suggestionsPage } from './suggestions.page';
import { termsandconditionsPage } from './termsandconditions.page';
import { foryouPage } from './foryou.page';
import { footer } from './footer.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
// const AdminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
});

test('Test that the settings page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSettingsPage(testController);
  await settingsPage.isDisplayed(testController);
});
test('Test that the for you page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoForYouPage(testController);
  await foryouPage.isDisplayed(testController);
});

test('Test that meet the team page works', async (testController) => {
  await footer.gotoMeetTheTeamPage(testController);
  await meettheteamPage.isDisplayed(testController);
});

test('Test that suggestions page works', async (testController) => {
  await footer.gotoSuggestionsPage(testController);
  await suggestionsPage.isDisplayed(testController);
});

test('Test that privacy policy page works', async (testController) => {
  await footer.gotoPrivacyPolicyPage(testController);
  await privacypolicyPage.isDisplayed(testController);
});

test('Test that the terms and conditions page works', async (testController) => {
  await footer.gotoTermsAndConditionsPage(testController);
  await termsandconditionsPage.isDisplayed(testController);
});

/**
test('Test that admin landing works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, AdminCredentials.username, AdminCredentials.password);
  await adminlandingPage.isDisplayed(testController);
});
* */
