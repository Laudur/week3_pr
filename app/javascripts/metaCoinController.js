var app = angular.module('metaCoinApp', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("metaCoinController", [ '$scope', '$location', '$http', '$q', '$window', '$timeout', function($scope , $location, $http, $q, $window, $timeout) {
    $scope.accounts = [];
    $scope.account = "";
    $scope.balanceC = "";
    $scope.balanceA = "";
    $scope.balanceB = "";
    $scope.adrC ="";

    $scope.refreshBalance = function() {
        var meta = MetaCoin.deployed();

        meta.getBalance.call({from: $scope.account})
        .then(function(value) {
            $timeout(function () {
                $scope.balanceC = value.valueOf();
            });
        }).catch(function(e) {
       	  console.log(e);
  	  setStatus("Error getting balance C; see log.");
        });

meta.getBalanceA.call({from: $scope.account})
        .then(function(value) {
            $timeout(function () {
                $scope.balanceA = value.valueOf();
            });
        }).catch(function(e) {
       	  console.log(e);
  	  setStatus("Error getting balance C; see log.");
        });

meta.getBalanceB.call({from: $scope.account})
        .then(function(value) {
            $timeout(function () {
                $scope.balanceB = value.valueOf();
            });
        }).catch(function(e) {
       	  console.log(e);
  	  setStatus("Error getting balance C; see log.");
        });
    };

    $window.onload = function () {

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
	      alert("There was an error fetching your accounts.");
	      return;
	    }

	    if (accs.length == 0) {
	      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
	      return;
	    }	    

            $scope.accounts = accs;
            $scope.account = $scope.accounts[0];

	    var meta = MetaCoin.deployed();
	    meta.getAddress.call({from: $scope.account})
		.then(function(value) {
		    $timeout(function () {
		        $scope.adrC = value.valueOf();
		    });
		}).catch(function(e) {
	       	  console.log(e);
	  	  setStatus("Error getting balance C; see log.");
		});
            $scope.refreshBalance();
        });
    }

$scope.sendCoin = function(amount) {
  var meta = MetaCoin.deployed();

  setStatus("Initiating transaction... (please wait)");

  meta.donateSplit(amount, {from: $scope.account}).then(function() {
    setStatus("Transaction complete!");
    $scope.refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error donating; see log.");
  });
};
}]);
