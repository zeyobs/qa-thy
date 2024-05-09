const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.turkishairlines.com/tr-int/';
    this.cookieAccept = By.id('cookieWarningAcceptId');
    this.flightTab = By.id('flight-tab');
    this.bookerMenu = By.id('booker-menu-mobile');
    this.oneWayButton = By.id('item-oneway');
    this.departureInput = By.id('general-booker-from');
    this.arrivalInput = By.id('general-booker-to');
    this.dateElement = By.xpath("//*[@aria-label='10 May 2024 Cuma']");
    this.flightList = By.css('.flight-line');
    this.continueButton = By.xpath("//button[contains(text(), 'Devam')]");
    this.searchButton = By.xpath("//span[contains(text(), 'Uçuş ara')]");
    this.passengerMenu = By.id('general-booker-paxpicker');
    this.increaseButtons = By.css("a.increase.rtl-float-end");
    this.flightStatusTab = By.id('flight-status-tab');
    this.flightNoInput = By.className('membership-number');
    this.datePicker = By.id('selectFlightDate01');
    this.dateContinueButton = By.className('.schedule-done-btn');
    this.flightNumberElement = By.xpath("//span[@data-bind=\"text: carrierAirlineShortName() + flightNumber() + '&nbsp;'\"]");
    this.flightRoutePortElement = By.xpath("//span[@data-bind='text: flightRoutePortText']");
    this.mobileDepartureActualHeaderInfo = By.xpath("//h5[@data-bind='text: mobileDepartureActualHeaderInfo']");
    this.mobileArrivalActualHeaderInfo = By.xpath("//h5[@data-bind='text: mobileArrivalActualHeaderInfo']");
    this.errorModal = By.id('errorModal');
    this.priceTag = By.className('.price-miles-partial');
    this.categorySelection = By.className('.category-item economy');
    this.completeButton = By.className('.complete-button');
    this.genderInputRadioMale = By.id('MR')
    this.firstNameInput = By.id('firstname_0');
    this.surnameInput = By.id('surname_0');
    this.birthdateInput = By.id('birthdate_0');
    this.emailInput = By.id('email');
    this.regionCodeField = By.css('button[data-id="regionCodes"]');
    this.regionSelect = By.xpath("//span[@class='hidden-select-text' and text()='Amerika Birleşik Devletleri']");
    this.phoneNumberInput = By.id('phonenumber');
    this.selectSeatButton = By.className('.select-seat-button');
    this.currentSeatText = By.className('.passenger-title');
    this.seatSelectionContinueBtn = By.css('.seat-modal-btn.continue-btn');

  }

  async open() {
    await this.driver.get(this.url);
  }

  async selectArrival(city) {
    await this.driver.findElement(this.arrivalInput).click;
    await this.driver.findElement(this.arrivalInput).sendKeys(city);
    let cityElement = By.xpath(`//span[@class='port-fullName'][contains(.,'${city}')]`);
    await this.driver.wait(until.elementLocated(cityElement), 5000);
    await this.driver.findElement(cityElement).click();
  }

  async clickElement(elementBy) {
    let element = await this.driver.wait(until.elementLocated(elementBy), 5000);
    await this.driver.wait(until.elementIsVisible(element), 5000);
    await this.driver.wait(until.elementIsEnabled(element), 5000);
    await element.click();
  }

  async selectDate(date) {
    let dateElement = By.xpath(`//div[@class='vc-day-content vc-focusable vc-focus vc-attr' and @aria-label='${date}']`);
    await this.driver.wait(until.elementLocated(dateElement), 10000);
    await this.driver.findElement(dateElement).click();
  }

  async enterFlightNumber(flightNumber) {
    let flightNoInputElement = await this.driver.findElement(this.flightNoInput);
    await flightNoInputElement.sendKeys(flightNumber);
  }
}

module.exports = HomePage;