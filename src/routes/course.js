import {authenticate} from './user';
var models = require('../models');

export const course_routes = [
  {
    method: 'GET',
    path: '/api/course/{code}',
    handler: function (request, h){
      return models.Course.findById(request.params.code).then(course => {
        return {course: course };
      });
    }
  },
  {
    method: 'GET',
    path: '/api/courses',
    handler: function (request, h){
      return models.Course.findAll().then(courses => {
        return {courselist: courses };
      });
    }
  },
  {
    method: 'POST',
    path: '/api/course/add',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }
      return authenticate(payload.gg_token_id)
      .then(resjson => {
        if ((resjson.email_verified && resjson.email_verified === 'true')){
          return models.Course.findOrCreate({
            where:{
              creator_email: resjson.email,
              name: payload.course_name
            }
          })
          .spread((course, created) => {
            let course_created = false;
            if (created){
              course_created = true;
            }
            return {
              'course_created': course_created,
              'user_verified': true
            };
          })
          .catch(err => {
            return {
              'course_created': false,
              'user_verified': true
            };
          });
        }
        else {
          return {
            'course_created': false,
            'user_verified': false
          };
        }
      })
      .catch(err => {
        console.error(err);
        return {
          'course_created': false,
          'user_verified': false
        };
      });
    }
  },
  {
    method: 'POST',
    path: '/api/course/update',
    handler: function (request, h){
      return 'Update course';
    }
  },
  {
    method: 'POST',
    path: '/api/course/delete',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }
      return authenticate(payload.gg_token_id)
      .then(resjson => {
        if ((resjson.email_verified && resjson.email_verified === 'true')){
          return models.Course.destroy({
            where:{
              code: payload.course_code,
            },
          })
          .then(() => {
            return {
              user_verified: true
            };
          })
          .catch(err => {
            return {
              user_verified: true
            };
          });
        }
        else {
          return {
            user_verified: false
          };
        }
      })
      .catch(err => {
        console.error(err);
        return {
          user_verified: false
        };
      });
    }
  }
];