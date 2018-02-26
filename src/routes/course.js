import {authenticate} from './user';
export const course_routes = [
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
            return {
              'course_created': true,
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
    path: '/api/course/section/add',
    handler: function (request, h){
      return 'Add new section to course';
    }
  },
  {
    method: 'POST',
    path: '/api/course/section/update',
    handler: function (request, h){
      return 'Update course section';
    }
  }
];