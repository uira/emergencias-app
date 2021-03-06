var emergencias = angular.module("emergencias", [
    'ionic','ionic.service.core',
    'ionic.service.push',
    'emergencias.controllers',
    'emergencias.services',
    'emergencias.filters',
    'emergencias.config',
    // 'emergencias.meu_percurso',
    'ngStorage',
    'ngCordova'
]);

emergencias.run(function($ionicPlatform, $ionicPush) {

    $ionicPlatform.ready(function() {

        Ionic.io();

        // this will give you a fresh user or the previously saved 'current user'
        var user = Ionic.User.current();
        // if the user doesn't have an id, you'll need to give it one.
        if (!user.id) {
            user.id = Ionic.User.anonymousId();
            // user.id = 'your-custom-user-id';
        }
        // console.log("User ID: ", user.id);
        //persist the user
        user.save();

        // Push
        $ionicPush.init();

        $ionicPush.register(function(token) {
            console.log("Device token:",token.token);
        });
    });
})

emergencias.config(function($stateProvider, $httpProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    //$ionicConfigProvider.scrolling.jsScrolling(false);
    $httpProvider.defaults.cache = true;

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|geo|ms-appx|x-wmapp0):/);

    $stateProvider
    .state('emergencias', {
        url: "/emergencias",
        abstract: true,
        templateUrl: 'templates/menu.html',
        // template: "<ion-nav-view name='template' />",
        controller: 'AppCtrl'
    })

    .state('emergencias.programacao', {
        url: '/programacao',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('emergencias.mesas', {
        url: '/programacao',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao-mesas.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('emergencias.rodas', {
        url: '/programacao',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao-rodas.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('emergencias.redes', {
        url: '/redes',
        views: {
            'menu-view': {
                templateUrl: 'templates/redes.html',
                controller: 'RedesCtrl'
            },
        }
    })

    .state('emergencias.programacao_redes', {
        url: '/redes/:meeting',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao-redes.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('emergencias.territorios', {
        url: '/territorios',
        views: {
            'menu-view': {
                templateUrl: 'templates/territorios.html',
                controller: 'PercursosCtrl'
            },
        }
    })

    .state('emergencias.programacao_territorios', {
        url: '/territorios/:territory',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao-territorios.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('emergencias.cultural', {
        url: '/programacao',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao-cultural.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('emergencias.event-detail', {
	url: '/programacao/event/:event',
        views: {
            'menu-view': {
                templateUrl: 'templates/event-detail.html',
                controller: 'EventCtrl'
            }
        }
    })

    .state('emergencias.notifications', {
	url: '/notifications',
	views: {
	    'menu-view': {
		templateUrl: 'templates/notifications.html',
		controller: 'NotificationsCtrl'
	    }
	}
    })

    .state('emergencias.onde', {
        url: '/programacao/onde',
        views: {
            'menu-view': {
                templateUrl: 'templates/onde.html',
            }
        }
    })

    .state('emergencias.about', {
        url: '/programacao/sobre',
        views: {
            'menu-view': {
                templateUrl: 'templates/about.html',
            }
        }
    })

    .state('emergencias.evento', {
        url: '/programacao/evento',
        views: {
            'menu-view': {
                templateUrl: 'templates/emergencias.html',
            }
        }
    })

    // .state('emergencias.social', {
    //     url: '/emergencias/social',
    //     views: {
    //         'menu-view': {
    //             templateUrl: 'templates/social.html',
    //             controller: 'SocialCtrl'
    //         }
    //     }
    // });

    $urlRouterProvider.otherwise('/emergencias/programacao');
})
