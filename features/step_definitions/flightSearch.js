const { Given, When, Then } = require('@cucumber/cucumber');
const { BeforeAll, After} = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require('../../pages/mainPage');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

let options = new chrome.Options();
options.setMobileEmulation({ 
    deviceMetrics: { width: 390, height: 844, pixelRatio: 3 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
});
options.headless = false;

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

let homePage = new HomePage(driver);

BeforeAll(async function () {
    await homePage.open();
    let cookieWarning = await driver.wait(until.elementLocated(homePage.cookieAccept), 10000);
    await driver.wait(until.elementIsVisible(cookieWarning), 10000); 
    await driver.wait(until.elementIsEnabled(cookieWarning), 10000); 
    await cookieWarning.click();
    });

Given('Kullanıcı Turkish Airlines anasayfasındadır', async function () {
  await homePage.open();
});

When('Kullanıcı iki şehir arası uçuş arar', async function () {
  await homePage.clickElement(homePage.flightTab);
  await homePage.clickElement(homePage.bookerMenu);
  await homePage.clickElement(homePage.oneWayButton);
  await homePage.selectArrival('Ankara');
  await homePage.selectDate('16 May 2024 Çarşamba');
  await homePage.clickElement(homePage.continueButton);
  await homePage.clickElement(homePage.continueButton);
  await homePage.clickElement(homePage.searchButton);
});

When('Kullanıcı yetişkin sayısından fazla bebek yolcu ekler', async function () {
  await homePage.clickElement(homePage.bookerMenu);
  await homePage.clickElement(homePage.passengerMenu);
  let elements = await driver.findElements(homePage.increaseButtons);
  await elements[2].click();
  await elements[2].click();  
});

When('Kullanıcı kalkış ve varış olarak aynı parkuru seçer', async function () {
  await homePage.clickElement(homePage.flightTab);
  await homePage.clickElement(homePage.bookerMenu);
  await homePage.clickElement(homePage.oneWayButton);
  await homePage.selectArrival('Istanbul');
  await homePage.selectDate('16 May 2024 Çarşamba');
  await homePage.clickElement(homePage.continueButton);
  await homePage.clickElement(homePage.continueButton);
  await homePage.clickElement(homePage.searchButton);
});

When('Kullanıcı uçuş seçer ve koltuk seçimi yapar', async function () {
  let priceElements = await driver.findElements(homePage.priceTag);
  await priceElements[0].click();
  let categoryElements = await driver.findElements(homePage.categorySelection);
  await categoryElements[2].click();
  await homePage.clickElement(homePage.completeButton);
  await homePage.clickElement(homePage.genderInputRadioMale);
  await driver.findElement(homePage.firstNameInput).sendKeys('John');
  await driver.findElement(homePage.surnameInput).sendKeys('Doe');
  await driver.findElement(homePage.birthdateInput).sendKeys('0712001');
  await driver.findElement(homePage.emailInput).sendKeys('whatever@outlook.com');
  await homePage.clickElement(homePage.regionCodeField);
  await homePage.clickElement(homePage.regionSelect);
  await homePage.clickElement(homePage.phoneNumberInput).sendKeys('7026938577');
  await homePage.clickElement(homePage.completeButton);
  await homePage.clickElement(homePage.selectSeatButton);
  await driver.findElement(By.id('09A')).click();
  await homePage.clickElement(homePage.seatSelectionContinueBtn);
 
});

When('Kullanıcı uçuş durumu menüsünde uçuş bilgileri ile arama yapar', async function () {
  await homePage.clickElement(homePage.flightStatusTab);
  await homePage.enterFlightNumber('0050');
  await homePage.clickElement(homePage.datePicker);
  let date = await driver.findElement(By.xpath("//div[@aria-label='22 May 2024 Çarşamba']"));
  await date.click();
  await homePage.clickElement(homePage.dateContinueButton);
  let flightSearchBtn = await driver.findElement(By.xpath("//*[contains(text(), 'Uçuş durumunu gör')]"));
  await flightSearchBtn.click();

});

Then('Uçuş sonuçlarını görüntülenir', async function () {
  await driver.wait(until.elementLocated(homePage.flightList), 10000);
  expect(homePage.flightResults).to.not.be.empty; 
});

Then('Bebek yolcuların yetişkin sayısından fazla olamayacağına dair uyarı görüntülenir', async function () {
  let text = "her bebek yolcuya en az 1 yetişkin yolcu refakat etmelidir.";
  let element = await driver.findElement(By.xpath("//*[contains(text(), '" + text + "')]"));
  let isVisible = await element.isDisplayed();
  
  expect(isVisible).to.be.true;
});


Then('Kalkış ve varış parkurunun aynı olamayacağına dair uyarı görüntülenir', async function () {
  await driver.wait(until.elementLocated(homePage.errorModal), 2000);
  let isErrorVisible = await errorModal.isDisplayed();
  
  expect(isErrorVisible).to.be.true;
});


Then('Koltuk seçimi başarılı bir şekilde gerçekleşir', async function () {
  await driver.wait(until.elementLocated(homePage.currentSeatText), 2000);
  let isSeatTextVisible = await currentSeatText.isDisplayed();
  
  expect(isSeatTextVisible).to.be.true;
});


Then('Uçuş durumu ekranında güzergah, kalkış ve varış saati bilgileri görüntülenir', async function () {
  await driver.wait(until.elementLocated(homePage.flightNumberElement), 2000);
  await driver.wait(until.elementLocated(homePage.flightRoutePortElement), 2000);
  await driver.wait(until.elementLocated(homePage.flightRouteDestPortElement), 2000);
  await driver.wait(until.elementLocated(homePage.mobileDepartureActualHeaderInfo), 2000);
  await driver.wait(until.elementLocated(homePage.mobileArrivalActualHeaderInfo), 2000);

  let isFlightNumberVisible = await flightNumberElement.isDisplayed();
  let isFlightRoutePortVisible = await flightRoutePortElement.isDisplayed();
  let isFlightRouteDestPortVisible = await flightRouteDestPortElement.isDisplayed();
  let isDepartureStatusVisible = await departureStatusElement.isDisplayed();
  let isArrivalStatusVisible = await arrivalStatusElement.isDisplayed();

  expect(isFlightNumberVisible).to.be.true;
  expect(isFlightRoutePortVisible).to.be.true;
  expect(isFlightRouteDestPortVisible).to.be.true;
  expect(isDepartureStatusVisible).to.be.true;
  expect(isArrivalStatusVisible).to.be.true;
});