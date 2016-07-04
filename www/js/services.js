angular.module('hjalp-hybrid.services', [])

.service('MessageService', function(Restangular){

    function sendMessage (message){
      return Restangular.one('users', message.userId).all('messages').post({text: message.text})
    }

    function getMessages (userId){
      return Restangular.one('users', userId).all('messages').getList()
    }

    return {
      sendMessage: sendMessage,
      getMessages:  getMessages,
    }
  })
