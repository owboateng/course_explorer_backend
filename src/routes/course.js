export const course_routes = [
  {
    method: 'POST',
    path: '/api/course/add',
    handler: function (request, h){
      return 'Add new course';
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