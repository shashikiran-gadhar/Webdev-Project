
(function () {
    angular
        .module("WebAppMaker")
        .controller("GuestController", guestController);

    function guestController($routeParams, InviteService, EventService, UserService, $rootScope, $location) {
        var vm = this;
        vm.guestID = $routeParams['gid'];
        vm.eventID = $routeParams['eid'];

        vm.logout = logout;
        vm.checkProducts = checkProducts;


        function init() {
            EventService
                .findEventById(vm.eventID)
                .success(function (event) {
                    vm.event = event;
                });

            EventService
                .findAllGuestsForEvent(vm.eventID)
                .success(function (guests) {
                    var guestIDList = guests[0].guests;
                    var guestList = [];
                    for(var i = 0; i < guestIDList.length ; i++){
                        var guestid = guestIDList[i];
                        if(vm.guestID != guestid){
                            UserService
                                .findUserById(guestid)
                                .success(function (user) {
                                    guestList.push(user.username);
                                })
                        }
                    }
                    vm.guests = guestList;
                });

        }
        init();

        function checkProducts() {
            InviteService.findInviteByEventAndGuest(vm.guestID, vm.eventID)
                .then(function (invite) {
                    invite = invite.data[0];
                    if(invite){
                        if(invite.accepted){
                            $location.url("/guest/"+vm.guestID+"/event/"+vm.eventID+"/shopping");
                        }else {
                            vm.acceptError = "Please accept the invitation to view the products";
                        }
                    }
                })
        }

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }
    }
})();