import fetch from 'node-fetch';
import {constants} from '../constants';
var models = require('../models');

export function authenticate(token){
  return fetch(
    'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token
  )
  .then(res => res.json())
  .then(resjson => {return resjson});
}

export const user_routes = [
  {
    method: 'POST',
    path: '/api/user/add',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }

      return authenticate(payload.gg_token_id)
        .then(resjson => {
          if ((resjson.email_verified && resjson.email_verified === 'true')){
            return models.User.findOrCreate({
              where:{email: resjson.email}, 
              defaults: {
                first_name: resjson.given_name,
                last_name: resjson.given_name,
                role: constants.STUDENT,
                link_profile_pix: resjson.picture
                }
              })
              .spread((user, created) => {
                return {'user_verified': true};
              })
              .catch(err => {
                return {'user_verified': false};
              });
          }
          else {
            return {'user_verified': false};
          }
        })
        .catch(err => {
          console.error(err);
          return {'user_verified': false};
        });
    }
  }
];