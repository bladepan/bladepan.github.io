function HomeCtl($scope, $rootScope, $location) {
    $scope.currentPath = 'home';
    $scope.sections = [
        {
            id : 'home',
            title : 'Home'
        },
        {
            id : 'files',
            title : 'Files'
        }
    ];
    $scope.resume = {
        title : 'Resume',
        url : 'XiaozhongPanResume.pdf'
    };
    $scope.files = [
        $scope.resume,
        {
            title : 'Virginia Tech Unofficial Academic Transcript',
            url : 'XiaozhongPanUnofficialAcademicTranscipt.pdf'
        }
    ];

    var sectionMap = {};
    for (var i = 0; i < $scope.sections.length; i++) {
        var section = $scope.sections[i];
        sectionMap[section.id] = section;
    };

    $rootScope.$on('$locationChangeSuccess',function(argument) {
        var path = $location.path();
        var realPath = 'home';
        if (path != null && path.length>1) {
            realPath = path.substring(1);
        }
        if (!sectionMap[realPath]) {
            realPath = 'home';
        }
        console.log(realPath);
        if(realPath != $scope.currentPath){
            $scope.currentPath = realPath;
            //maybe scroll top
        }
    });
}

var myApp = angular.module('myApp',[]);

myApp.controller('HomeCtl', HomeCtl);
console.log("define HomeCtl");