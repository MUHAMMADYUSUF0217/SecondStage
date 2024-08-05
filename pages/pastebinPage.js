// pages/pastebinPage.js

import { By, until } from 'selenium-webdriver';

class PastebinPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://pastebin.com/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async createNewPaste(code, syntax, expiration, title) {
    await this.driver.findElement(By.id('postform-text')).sendKeys(code);
    await this.driver.findElement(By.id('select2-postform-format-container')).click();
    await this.driver.findElement(By.xpath(`//li[text()='${syntax}']`)).click();
    await this.driver.findElement(By.id('select2-postform-expiration-container')).click();
    await this.driver.findElement(By.xpath(`//li[text()='${expiration}']`)).click();
    await this.driver.findElement(By.id('postform-name')).sendKeys(title);
    await this.driver.findElement(By.xpath("//button[text()='Create New Paste']")).click();
  }

  async getPageTitle() {
    return await this.driver.getTitle();
  }

  async getCodeContent() {
    return await this.driver.findElement(By.xpath('//textarea[@class="textarea"]')).getAttribute('value');
  }

  async getSyntaxHighlighting() {
    return await this.driver.findElement(By.xpath('//a[@class="btn -small h_800"]')).getText();
  }
}

export default PastebinPage;

