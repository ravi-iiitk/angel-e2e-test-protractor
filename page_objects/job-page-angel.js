var protractor = require('protractor');
var browser = protractor.browser;
var element = protractor.browser.element;
var assert = require('assert');
var commonlib =  require("../common_library/protractor_common.js");
var keyWordsArray = ['Automation testing', 'QA','Test Architect','Test','QA Architect','Senior QA Architect','SDET','Test Manager','Test Lead','Automation Developer','Automation Architect','Quality Assurance','Test Analyst','Automation Lead','Automation Lead Developer','Software Test Engineer','QA Automation Lead','QA Engineer','Software Development Engineer in Test','Quality Assurance Analyst','Sr Test Automation Engineer'];
var locArray = ['Chennai','Hyderabad','Noida','Puducherry','Gurgaon','Mumbai','Telang','Pune','MH','Ghaziabad','Vadodara','Visakhapatnam','Mohali','Chandigarh','Udaipur' ,'Ahmedabad','Gurugram','Coimbatore','Delhi',];
var search_keyword_arr = ['SDET','QA','Software Engineer in Test','Quality Assurance','Test Automation','Automation Testing','Big Data Testing','Testing','Test'];
var loc_area_arr  = ['Worldwide','Bengaluru'];
var search_keyword= search_keyword_arr[7];
var loc_area = loc_area_arr[1];
var apply_text = " Hello, I am very much interested in your organization and would like to apply for job in QA or Testing area";

exports.jobpageangel ={
    job_tab : element(by.xpath("//a[contains(@class,'c-navbar-item')][contains(text(),'Jobs')]")),
    searchBox : element(by.xpath("//div[@class='search-box']")),
    search_keyword_field : element(by.xpath("//input[@placeholder='Enter a keyword']")),
    location_filter : element(by.xpath("//div[contains(text(),'Location ▾')]")),
    remote_ok_filter : element(by.xpath("//div[@class='filter-row'][contains(text(),'Remote OK')]")),


    goToJobPage : function () {
            commonlib.protractor_common.check_click(this.job_tab,20);
            commonlib.protractor_common.pause(3000);
    },

    deleteExistingFilters : function () {
        var allCrossIcons = element.all(by.xpath("//div[contains(@class,'new_taggings tag_edit')]/img"));
        allCrossIcons.count().then(function (noOfCross) {
            for(var i=0;i<noOfCross;I++)
            {
                var thisCross = allCrossIcons.get(i);
                var isCrossPresent = thisCross.isPresent().then(function (isPrsent) {
                    return isPrsent;
                });
                if(isCrossPresent)
                {
                    commonlib.protractor_common.check_click(thisCross,20);
                    commonlib.protractor_common.pause(5000);
                }
            }
        })
    },

    enterSearchKeyword : function () {
        commonlib.protractor_common.check_enter_text(this.search_keyword_field,search_keyword,20);
        browser.actiions().sendKeys(protractor.Key.ENTER).perform();
        commonlib.protractor_common.pause(5000);
    },

    applyLocationFilter : function () {
      browser.actions().mouseMove(this.location_filter).mouseMove(this.remote_ok_filter).click().perform();
      commonlib.protractor_common.pause(5000);
    },

    applyForReleventJobs : function () {
        var allJobHeaders = element.all(by.xpath("//div[@class='header-info']"));
        var firstJobHeader = allJobHeaders.get(0);
        commonlib.protractor_common.check_click(firstJobHeader,20);
        var allJobTitle = element.all(by.xpath("//div[@class='title']/a"));
        allJobTitle.count().then(function (noOfJobs) {
            for(var i=0;i<noOfJobs;i++)
            {
                var thisJobTile = allJobTitle.get(i);
                var jobTitleVisible = thisJobTile.isDisplayed().then(function (jobDisplayed) {
                   return (jobDisplayed);
                });
                if(jobTitleVisible)
                {
                    checkJobTitleIfMatching(thisJobTile);
                }
            }
        })
        
    },


};
function checkJobTitleIfMatching(thisJobTile)
{
    thisJobTile.getText().then(function (jobTileActual) {
        if(checkValue(jobTileActual,keyWordsArray))
        {
            applyForJob(thisJobTile);
        }
    });
}

function applyForJob() {
    var allApplyButton = element.all(by.xpath("//a[contains(@class,'g-button blue apply-now-button')][contains(text(),'Apply Now')]"));
    var thisAppluBtn = allApplyButton.get(i);
    var thisAppluBtnVisible = thisAppluBtn.isDisplayed().then(function (jobDisplayed) {
        return (jobDisplayed);
    });
    if(thisAppluBtnVisible)
    {
        commonlib.protractor_common.check_click(thisAppluBtn,20);
        commonlib.protractor_common.pause(5000);
        var commentArea = element(by.xpath("//textarea[@name='note']"));
        commonlib.protractor_common.check_enter_text(commentArea,apply_text,20);
        var send_application_btn = element(by.xpath("//button[text()='Send Application']"));
        commonlib.protractor_common.check_click(send_application_btn,20);
        commonlib.protractor_common.pause(500);
        var allJobHeaders = element.all(by.xpath("//div[@class='header-info']"));
        var firstJobHeader = allJobHeaders.get(0);
        commonlib.protractor_common.check_click(firstJobHeader,20)
        commonlib.protractor_common.pause(5000);
        var allSkips = element.all(by.xpath("//span[@oldtitle='Skip']"));
        var thisSkip = allSkips.get(0);
        commonlib.protractor_common.check_click(thisSkip,20)
        commonlib.protractor_common.pause(5000);

    }
}


function checkValue(value,arr){
    var status = false;
    for(var i=0; i<arr.length; i++){
        var name = arr[i];
        if(value.indexOf(name)>-1){
            console.log("Value is :"+value);
            console.log("Name is :"+name);
            status = true;
            break;
        }
    }
    return status;
}

