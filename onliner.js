describe('onliner homepage', function (){

	var EC = protractor.ExpectedConditions;

	var linkMobilePhone=element(by.linkText("Мобильные телефоны"));
	var filterApple=element.all(by.cssContainingText('.schema-filter__checkbox-text','Apple')).first();
	var filtrYear2016=element.all(by.cssContainingText('.schema-filter__checkbox-text','2016')).first();
	var filtrYear2015=element.all(by.cssContainingText('.schema-filter__checkbox-text','2015')).first();
	var buttonCompare=element(by.css('a.compare-button__sub.compare-button__sub_main'));	
	var advantagesIphoneSE=by.css('td:nth-child(3).product-table__cell_accent');
	var advantagesIphone6s=by.css('td:nth-child(4).product-table__cell_accent');
	var listIphoneSE=element.all(by.css('a[href="https://catalog.onliner.by/mobile/apple/iphonese16sg"]')); 
	var listIphone6s=element.all(by.css('a[href="https://catalog.onliner.by/mobile/apple/iphone6s16gbs"]'));
	var listButtonAddPhoneToCopmare=element.all(by.css('span.catalog-masthead-controls__input'));
	var listButtonCompare=element.all(by.css('a.compare-button__sub.compare-button__sub_main'));
	var listButtonClearCompare=element.all(by.css('a.product-table__clear.button'));
	
	var url='https://catalog.onliner.by/mobile?mfr%5B0%5D=apple&birthday%5Bfrom%5D=2016&birthday%5Bto%5D=2015';
	
	
	

	function waitForVisibleElementAndClick(locator){
		browser.wait(EC.elementToBeClickable(locator), 10000).then(function(){
			return locator.click();
		})
	};

	function waitListOfElementsAndClick(list){
		list.filter(function(elements){
			return elements.isDisplayed();
		}).first().click();
	};


 	beforeAll(function () {
 		browser.ignoreSynchronization = true;
        browser.get('https://catalog.onliner.by/');
    });


 	it('should have a title', function(){
 		waitForVisibleElementAndClick(linkMobilePhone); 				
 		expect(browser.getTitle()).toEqual('Мобильный телефон купить в Минске');
 	});

	it('should choose apple', function(){		
		waitForVisibleElementAndClick(filterApple);		
		browser.wait(EC.urlContains('apple'), 5000);	
		expect(browser.getCurrentUrl()).toContain("apple");
	});
	

	it('should choose year 2016', function(){
		browser.executeScript('window.scrollTo(100, 300)');
		waitForVisibleElementAndClick(filtrYear2016);	
		browser.wait(EC.urlContains('2016'), 5000);
		expect(browser.getCurrentUrl()).toContain("2016");
	});

	it('should choose year 2015', function(){		
		waitForVisibleElementAndClick(filtrYear2015);	
		browser.wait(EC.urlContains('birthday'), 5000);	
		expect(browser.getCurrentUrl()).toContain("birthday");
	});
	
	it('should open page with iPhone SE', function(){	
		browser.wait(EC.presenceOf(listIphoneSE));
		waitListOfElementsAndClick(listIphoneSE);
		waitListOfElementsAndClick(listButtonAddPhoneToCopmare);			
		expect(browser.isElementPresent(buttonCompare));
	});

	it('should return on the previous page', function(){
		browser.navigate().back();	
		expect(browser.getCurrentUrl()).toEqual(url);
	});

	it('should open page with iPhone 6s', function(){	
		browser.wait(EC.presenceOf(listIphone6s));
		waitListOfElementsAndClick(listIphone6s);
		waitListOfElementsAndClick(listButtonAddPhoneToCopmare);		
		expect(browser.isElementPresent(buttonCompare));
	});

	it('should compare two phones', function(){	
		browser.wait(EC.presenceOf(buttonCompare));
		waitListOfElementsAndClick(listButtonCompare);		
		browser.wait(EC.urlContains('compare'), 5000);	
		expect(browser.getCurrentUrl()).toContain("compare");
	});

	it('should count advantages of Iphone SE', function(){	
		var number=element.all(advantagesIphoneSE).count();
		expect(number).toBe(2);
	});

	it('should count advantages of Iphone 6s', function(){	
		var number=element.all(advantagesIphone6s).count();
		expect(number).toBe(6);
	});

	it('should delete compare', function(){	
		browser.wait(EC.presenceOf(listButtonClearCompare));
		waitListOfElementsAndClick(listButtonClearCompare);				
		expect(browser.getCurrentUrl()).toEqual('https://catalog.onliner.by/');
	});

});

