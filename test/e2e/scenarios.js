'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../static/index.html');
  });


  it('should load the page and find the API key', function() {
    expect(element('a.brand').text()).
        toBe('BaaS (1234)');
  });


  /*
describe('view1', function() {

    beforeEach(function() {
      //browser().navigateTo('#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element('a.brand').text()).
        toMatch("BaaS (1234)");
      pause();
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      //browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      //expect(element('[ng-view] p:first').text()).
      //  toMatch(/partial for view 2/);
    });

  });
*/
});
