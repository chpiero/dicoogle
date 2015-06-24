/*jshint esnext: true*/
'use strict';

var Reflux = require('reflux');

import {ActionCreators} from '../actions/searchActions';

import {Endpoints} from '../constants/endpoints';

import {getPatients} from '../handlers/requestHandler';

var SearchStore = Reflux.createStore({
    listenables: ActionCreators,
    init: function () {
        console.log("sadasd");
        this._contents = {};

        //this.listenTo(ActionCreators, "request");

        // subscribe to listen for whole ProductStore first as there is no `waitFor` in Reflux
        // (https://github.com/voronianski/flux-samples/blob/master/facebook-flux/js/stores/CartStore.js#L55)
    },

    request : function(url){


    },

    onSearch : function(data){
      var self = this;
      getPatients(data.text, data.keyword,
        function(data){
          //SUCCESS
          console.log("success", data);
          self._contents = data;

          //DEBUG WAIT
          setTimeout(self.triggerWithDelay, 700)
        },
        function(xhr){
          //FAILURE
          self.trigger({
              success:false,
              status: xhr.status
            });
        }
      );


      /*var self = this;

        console.log("store param: ", data.text);

        //'http://localhost:8080/search?query=wrix&keyword=false&provicer=lucene'
        var url = Endpoints.base + '/searchPatient?query='+data.text+'&keyword=false&provicer=lucene';
        console.log("store url;",url);

        $.ajax({

          url: url,
          dataType: 'json',
          success: function(data) {
            console.log(data);

            // self.trigger({
            //   data:data,
            //   success: true
            // });
            self._contents = data;

            //DEBUG WAIT
            setTimeout(self.triggerWithDelay, 1500)


            //ActionCreators.completed(data)
          },
          error: function(xhr, status, err) {
            //ActionCreators.failed(err);
            self.trigger({
              success:false,
              status: xhr.status
            });
          }
        });
        //this._contents = data;


        //this.trigger(data);
        */
    },

    triggerWithDelay :function(){
      this.trigger({
        data:this._contents,
        success: true
      });
    }


});

export {SearchStore};

window.store = SearchStore;