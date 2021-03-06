'use strict';

describe('auth', function() {

    beforeEach(window.module('superdesk.templates-cache'));
    beforeEach(window.module('superdesk.activity'));
    beforeEach(window.module('superdesk.auth'));
    beforeEach(window.module('superdesk.menu'));
    beforeEach(window.module('superdesk.authoring'));

    it('can use routes with auth=false without identity', inject(function($rootScope, $location, $route) {
        $location.path('/reset-password/');
        $rootScope.$digest();
        expect($location.path()).toBe('/reset-password/');
    }));

    it('can reload a route after login', inject(function($compile, $rootScope, $route, $q, auth) {
        var elem = $compile('<div sd-login-modal></div>')($rootScope.$new()),
            scope = elem.scope();
        $rootScope.$digest();
        $rootScope.$digest();

        spyOn(auth, 'login').and.returnValue($q.when({}));
        spyOn($route, 'reload');
        $route.current = {};

        scope.authenticate();
        $rootScope.$digest();

        expect($route.reload).not.toHaveBeenCalled();

        $route.current = {redirectTo: '/test'};
        scope.authenticate();
        $rootScope.$digest();

        expect($route.reload).toHaveBeenCalled();
    }));
});
