import {authenticate} from './user';
var models = require('../models');

export const section_routes = [
  {
    method: 'GET',
    path: '/api/course/sections/{course_code}',
    handler: function (request, h){
      return models.Section.findAll({
        where:{course_code:request.params.course_code}
      })
      .then(sections => {
        return {sectionlist: sections };
      });
    }
  },
  {
    method: 'GET',
    path: '/api/course/sections/{course_code}/stats',
    handler: function (request, h){
      return models.Section.findAll({
        where:{course_code:request.params.course_code}
      })
      .then(sections => {
        let sections_with_stats = [];
        if (sections.length > 0){
          let count = 1;
          sections_with_stats = sections.map((section) => {
            let sec = {};
            sec.reads = Math.floor((Math.random() * 100) + 1);
            sec.title = 'Section ' + count;
            count += 1;
            return sec;
          });
        }
        return {sectionlist: sections_with_stats };
      });
    }
  },
  {
    method: 'POST',
    path: '/api/course/section/add',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }
      return authenticate(payload.gg_token_id)
      .then(resjson => {
        if ((resjson.email_verified && resjson.email_verified === 'true')){
          return models.Section.findOrCreate({
            where:{
              course_code: payload.course_code,
              title: payload.title
            },
            defaults: {
              content: payload.content
            }
          })
          .spread((section, created) => {
            let sec_created = false;
            if (created){
              sec_created = true;
            }
            return {
              section_created: sec_created,
              user_verified: true
            };
          })
          .catch(err => {
            return {
              section_created: false,
              user_verified: true
            };
          });
        }
        else {
          return {
            section_created: false,
            user_verified: false
          };
        }
      })
      .catch(err => {
        console.error(err);
        return {
          section_created: false,
          user_verified: false
        };
      });
    }
  },
  {
    method: 'POST',
    path: '/api/course/section/update',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }
      return authenticate(payload.gg_token_id)
      .then(resjson => {
        if ((resjson.email_verified && resjson.email_verified === 'true')){
          return models.Section.update(
            {
              title: payload.title,
              content: payload.content
            },
            {
              where:{ id: payload.section_id},
            }
          )
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
  },
  {
    method: 'POST',
    path: '/api/course/section/delete',
    handler: function (request, h){
      let payload = request.payload;
      if (typeof(payload) === 'string'){
        payload = JSON.parse(payload);
      }
      return authenticate(payload.gg_token_id)
      .then(resjson => {
        if ((resjson.email_verified && resjson.email_verified === 'true')){
          return models.Section.destroy({
            where:{
              id: payload.section_id,
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