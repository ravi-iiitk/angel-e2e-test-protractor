var protractor = require('protractor');
var browser = protractor.browser;
var element = protractor.browser.element;
var assert = require('assert');
var commonlib =  require("../common_library/protractor_common.js");
const desiredURL = "https://angel.co/";
var user_id = 'ravi.iiitk@gmail.com';
var pwd = 'B@buJ0bsPwd';

exports.loginpage ={
  signin_link : element(by.linkText("Log In")),
  email_text_field : element(by.xpath("//input[@placeholder='Email']")),
  pwd_text_field : element(by.id("user_password")),
  sign_in_button : element(by.name("commit")),

  doLogin : function () {
      commonlib.protractor_common.check_click(this.signin_link,20);
      browser.sleep(5000);
      commonlib.protractor_common.check_enter_text(this.email_text_field,user_id,15);
      commonlib.protractor_common.check_enter_text(this.pwd_text_field,pwd,15);
      commonlib.protractor_common.check_click(this.sign_in_button,15);
      browser.sleep(5000);
  },

  goToURL : function () {
      browser.ignoreSynchronization = true;
      browser.get(desiredURL).then(function () {
          browser.sleep(5000);
          browser.driver.manage().window().maximize();
          browser.sleep(7000);
      });
  }
};
