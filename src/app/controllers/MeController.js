const Course = require('../models/Course');
const { mutipleMongooesToObject } = require('../../until/mongooes');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render('me/stored-courses', {
          courses: mutipleMongooesToObject(courses),
        }),
      )
      .catch(next);
  }
}

module.exports = new MeController();
