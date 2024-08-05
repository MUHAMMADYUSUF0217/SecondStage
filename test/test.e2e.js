import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';

class PastebinPage {
    constructor(driver) {
        this.driver = driver;
        this.textArea = By.id('postform-text');
        this.expirationDropdown = By.id('select2-postform-expiration-container');
        this.expirationOption = By.xpath("//li[text()='10 Minutes']");
        this.titleField = By.id('postform-name');
        this.createButton = By.xpath("//button[text()='Create New Paste']");
    }

    async enterText(text) {
        const textField = await this.driver.wait(until.elementLocated(this.textArea), 10000);
        await textField.sendKeys(text);
    }

    async setExpiration() {
        const dropdown = await this.driver.wait(until.elementLocated(this.expirationDropdown), 10000);
        await dropdown.click();
        const option = await this.driver.wait(until.elementLocated(this.expirationOption), 10000);
        await option.click();
    }

    async enterTitle(title) {
        const titleFieldElement = await this.driver.wait(until.elementLocated(this.titleField), 10000);
        await titleFieldElement.sendKeys(title);
    }

    async createPaste() {
        const createBtn = await this.driver.wait(until.elementLocated(this.createButton), 10000);
        await createBtn.click();
    }
}

(async function execute() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();
        await driver.get('https://pastebin.com/');

        const pastebinPage = new PastebinPage(driver);
        await pastebinPage.enterText('Hello from WebDriver');
        await pastebinPage.setExpiration();
        await new Promise(resolve => setTimeout(resolve, 10000));
        await pastebinPage.enterTitle('helloweb');
        await pastebinPage.createPaste();
    } catch (e) {
        console.log('Error encountered: ' + e.message);
    } finally {
        await driver.quit();
    }
})();