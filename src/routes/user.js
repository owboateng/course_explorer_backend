import fetch from 'node-fetch';
var models = require('../models');

export const user_routes = [
  {
    method: 'POST',
    path: '/api/user/add',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }
      
      return fetch(
        'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + payload.gg_token_id
      )
      .then(res => res.json())
      .then(json => {return json});
    }
  },
  {
    method: 'POST',
    path: '/api/user/update',
    handler: function (request, h){
      return 'Update user';
    }
  }
];