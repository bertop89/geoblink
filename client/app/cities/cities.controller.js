'use strict';

(function() {
class CitiesComponent {
  constructor($http, $uibModal) {
  	this.$uibModal = $uibModal;
    this.$http = $http;
    this.cities = [];
  }

  $onInit() {
    this.reloadCities();
  }

  reloadCities() {
    this.$http.get('/api/cities').then(response => {
      this.cities = response.data;
    });
  }

  updateBus(city,bus) {
  	var modalInstance = this.$uibModal.open({
      templateUrl: 'app/cities/citiesModal.html',
      controller: 'ModalComponent',
      controllerAs: 'modalComponent',
      resolve: {
        city : function() {
          return city;
        },
        bus: function () {
          return bus;
        }
      }
    });

    // Forzar que reloadCities se invoque con el scope correcto
    modalInstance.result.then(angular.bind(this,this.reloadCities));
  }
}

angular.module('geoblinkApp')
  .component('cities', {
    templateUrl: 'app/cities/cities.html',
    controller: CitiesComponent
  });


})();

angular.module('geoblinkApp').controller('ModalComponent', function($http, $uibModalInstance, city, bus) {
    // Deep copy para evitar modificar el original
    this.city = angular.copy(city);
    this.bus = angular.copy(bus);

    this.submitted = false;

    this.ok = function(form) {
        this.submitted = true;

        if (form.$valid) {
            $http.put('/api/cities/'+this.city['_id']+'/businesses/',this.bus).then(response => {
              $uibModalInstance.close('ok');
            })
            .catch(err => {
                err = err.data;
                this.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, (error, field) => {
                  form[field].$setValidity('mongoose', false);
                  this.errors[field] = error.message;
                });
            });
        }
    };

    this.remove = function() {
        $http.delete('/api/cities/'+this.city['_id']+'/businesses/'+this.bus['_id']).then(response => {
          $uibModalInstance.close('ok');
        })
    }

    this.cancel = function() {
        $uibModalInstance.dismiss();
    };
});