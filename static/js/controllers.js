angular.module('app', ['ngResource']);
      
//This controller controls the application
function BackendController($scope,$resource){
  
    $scope.gaEvent = function($event){
      $scope.clicked = $event.target.name;
      //Call your own backend to log an event.
      $scope.log_event($scope.clicked);
    };
    
    $scope.backend_locations = [
      {url : 'code-comparison.appspot.com', urlName : 'remote backend' },       
      {url : 'localhost:8080', urlName : 'localhost' } ];

    $scope.showdetails = false;
    $scope.apikey = "1234";
    
    //Replace this url with your final URL from the SingPath API path. 
    //$scope.remote_url = "localhost:8080";
    $scope.remote_url = "code-comparison.appspot.com";
    $scope.model = "message";
    $scope.waiting = "Ready";
    
    $scope.item = {};
    $scope.item.data = {"message": "Hi Chris"};
    
    //resource calls are defined here

    $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                            {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                               }
                        );

    $scope.update = function(id){
      $scope.UpdateResource = $resource('http://:remote_url/:apikey/:model/:id', 
                    {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model, "id":id }, 
                    {'update': { method: 'PUT',    params: {} }});
      
      var item = new $scope.UpdateResource($scope.item.data);
      $scope.waiting = "Loading";
      item.$update(function(response) { 
              $scope.item = response;
              $scope.list();
              $scope.waiting = "Ready";
            });
    };
    
    $scope.add = function(){
      $scope.SaveResource = $resource('http://:remote_url/:apikey/:model', 
                    {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model}, 
                    {'save': { method: 'POST',    params: {} }});
   
      $scope.waiting = "Loading";
      var item = new $scope.SaveResource($scope.item.data);
      $scope.item = item.$save(function(response) { 
              $scope.item = response;
              $scope.list();
              $scope.waiting = "Ready";
            }); 
    };
    
    $scope.list = function(){
      data = {'remote_url':$scope.remote_url,
              'model_type':$scope.model,
              'apikey':$scope.apikey
             }
      $scope.waiting = "Updating";       
      $scope.Model.get(data,
            function(response) { 
              $scope.items = response;
              $scope.waiting = "Ready";
            });  
    };
            
    $scope.load = function(id){
      data = {'remote_url':$scope.remote_url,
              'model_type':$scope.model,
              'apikey':$scope.apikey, 
              'id': id
            }
      $scope.waiting = "Loading";
      $scope.Model.get(data, 
          function(response){   
              $scope.item = response;
              $scope.item_data = $scope.item.data;
              $scope.waiting = "Ready";  
          });        
    };
    
    $scope.delete = function(id){
      data = {'remote_url':$scope.remote_url,
              'model_type':$scope.model,
              'apikey':$scope.apikey, 
              'id': id
            }
      $scope.waiting = "Deleting";      
      $scope.Model.remove(data, 
          function(response){
              $scope.waiting = "Ready";
              $scope.list();
          });
    };
    //To add key/value pairs when creating new objects
    $scope.add_key_to_item = function(){
      $scope.item.data[$scope.newItemKey] = $scope.newItemValue;
      $scope.newItemKey = "";
      $scope.newItemValue = "";
    };
    
    $scope.get_metadata = function(){
      data = {'remote_url':$scope.remote_url,
              'model_type':"metadata",
              'apikey':$scope.apikey
             }
      $scope.waiting = "Updating";       
      $scope.Model.get(data,
            function(response) { 
              $scope.metadata = response;
              $scope.waiting = "Ready";
            });  
    };
    
    $scope.log_event = function(message){
      data = {'remote_url':$scope.remote_url,
              'model_type':"log",
              'apikey':$scope.apikey, 
              'obj': JSON.stringify({"message":message})
            }
      $scope.Model.get(data, 
          function(response){
              $scope.last_log = response;
          });
    
    };
    
    $scope.list();         
}
