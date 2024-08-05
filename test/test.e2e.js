// test/pastebinTest.js

import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import PastebinPage from '../pages/pastebinPage.js';

describe('Pastebin Automation Test', function () {
  this.timeout(30000); // Set the timeout to 30 seconds
  let driver;
  let pastebinPage;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    pastebinPage = new PastebinPage(driver);
  });

  it('should create a new paste and verify the details', async () => {
    await pastebinPage.open();

    const code = `git config --global user.name  "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force`;
    const syntax = 'Bash';
    const expiration = '10 Minutes';
    const title = 'how to gain dominance among developers';

    await pastebinPage.createNewPaste(code, syntax, expiration, title);

    // Validate page title
    const pageTitle = await pastebinPage.getPageTitle();
    expect(pageTitle).to.include(title);

    // Validate syntax highlighting
    const syntaxHighlighting = await pastebinPage.getSyntaxHighlighting();
    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(syntaxHighlighting).to.equal(syntax);

    // Validate code content
    const codeContent = await pastebinPage.getCodeContent();
    expect(codeContent.trim()).to.equal(code.trim());
  });

  after(async () => {
    await driver.quit();
  });
});
