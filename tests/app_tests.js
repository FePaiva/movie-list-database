const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');
let should = require('chai').should();

const imageOnePiece =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyklyDoHod9SEqahgN9_dSwv0wyT_KH0oQlg&usqp=CAU';

async function movieListTest() {
  // launch browser
  let driver = await new Builder().forBrowser('chrome').build();

  // navigate to app
  await driver.get('http://127.0.0.1:5500/');

  // add a movie to the list
  const addMovieButton = await driver.findElement(
    By.xpath("//button[text()='ADD MOVIE']")
  );
  await addMovieButton.click();

  await driver.findElement(By.id('title')).sendKeys('One Piece');
  await driver.findElement(By.name('image-url')).sendKeys(imageOnePiece);
  await driver.findElement(By.name('rating')).sendKeys('5');

  const confirmAddMovieButton = await driver.findElement(
    By.xpath("//button[text()='Add']")
  );
  await confirmAddMovieButton.click();

  // assert
  // finding the added movie and saving it to the addMovie variable.
  let addedMovie = await driver
    .findElement(By.xpath('//*[@id="movie-list"]/li/div[2]/h2'))
    .getText()
    .then(function (value) {
      return value;
    });
  // assert using node assertion
  // assert.strictEqual(addedMovie, 'One Piece');

  // assert using chai assertion
  addedMovie.should.equal('One Piece');

  // close browser
  await driver.quit();
}
movieListTest();
