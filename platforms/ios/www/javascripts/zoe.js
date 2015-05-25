'use strict';

//Closure it
var Zoe = (function(){
  var exports = {
    version: '0.0.1'
  };

  var storage = {
    /**
    * @method
    * @name getItem
    * @param key String
    * @description Get item from localstorage, if timestamp defined in the fetched object
    * then compare it to the current time, return null if timestamp is expired
    * if no timestamp found then just returns the object as fetched from localStorage
    * @return Object
    */
    getItem: function(key){
      var item, exp;
      try{
        item = JSON.parse(localStorage.getItem(key)) || null;
        if(item && item.timestamp){
          exp = new Date().getTime();
          item = exp < item.timestamp ? item : null;
        }
      }catch(e){
        item = null;
      }finally{
        return item;
      }
    },
    /**
    * @method
    * @name setItem
    * @param key String
    * @param data Object
    * @param expiration Integer expiration in milliseconds
    * @description Set item to localstorage, adds a timestamp attribute based in the
    * expiration minutes passed
    * @return Object
    */
    setItem: function(key, data, expiration){
      var item;
      try{
        if(data){
          if(expiration){
            data.timestamp =  new Date().getTime() + expiration;
          }
          item = data;
        }else{
          throw new Error('Warning: No data has been passed to the storage engine');
        }
        localStorage.setItem(key, JSON.stringify(item));
      }catch(e){
        item = null;
      }finally{
        return item;
      }
    },
    /**
    * @method
    * @name removeItem
    * @description Just maps to localStorage.remove item method
    * @param key String
    * @returns localStorage.removeItem if key is defined, undefined otheriwse
    */
    removeItem: function(key){
      if(key){
        return localStorage.removeItem(key);
      }
    },
    /**
    * @method
    * @name updateExpiration
    * @param key String
    * @param expiration Integer new expiration to set
    * @description Update item timestamp (override actually)
    * @return Object
    */
    updateExpiration: function(key, expiration){
      var item;
      try{
        item = this.getItem(key);
        item = this.setItem(key, item, expiration);
      }catch(e){
        item = null;
      }finally{
        return item;
      }
    }
  };

  exports.storage = storage;

  return exports;
}());