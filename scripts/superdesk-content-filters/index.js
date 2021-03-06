/**
 * This file is part of Superdesk.
 *
 * Copyright 2013, 2014, 2015 Sourcefabric z.ú. and contributors.
 *
 * For the full copyright and license information, please see the
 * AUTHORS and LICENSE files distributed with this source code, or
 * at https://www.sourcefabric.org/superdesk/license
 */
import './styles/content-filters.less';

import { ContentFiltersService } from './services';
import { ManageFiltersTab } from './directives';
import * as ctrl from './controllers';

// XXX: For some reason, loading the superdesk.content_filters module in
// tests fails to load due to "Unknown provider: superdeskProvider" error.
// This happens if any taste case uses the inject() function.
// Seems like something needs to be fixed in config, but for now loading
// superdesk.publish module does the trick (FWIW, it's the module that
// contained the original code for the content_filters module).
angular.module('superdesk.content_filters', ['superdesk.publish'])
.config(['superdeskProvider', function (superdesk) {
        var templateUrl = 'scripts/superdesk-content-filters/' +
                          'views/settings.html';

        superdesk.activity('/settings/content-filters', {
                label: gettext('Content Filters'),
                controller: ctrl.ContentFiltersConfigController,
                controllerAs: 'ctrl',
                templateUrl: templateUrl,
                category: superdesk.MENU_SETTINGS,
                priority: -800,
                privileges: {dictionaries: 1}
            });
    }])
    .service('contentFilters', ContentFiltersService)
    .controller('ContentFiltersConfigCtrl', ctrl.ContentFiltersConfigController)
    .controller('FilterConditionsCtrl', ctrl.FilterConditionsController)
    .controller('ManageContentFiltersCtrl', ctrl.ManageContentFiltersController)
    .controller('ProductionTestCtrl', ctrl.ProductionTestController)
    .controller('FilterSearchCtrl', ctrl.FilterSearchController)
    .directive('sdManageFiltersTab', ManageFiltersTab);
