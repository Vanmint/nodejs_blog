const Course = require('../models/Course');
const { mutipleMongooesToObject } = require('../../until/mongooes');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    // Sử dụng promise.all để gộp 2 promise với nhau và chạy đồng thời

    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([courses, deleteCount]) =>
        res.render('me/stored-courses', {
          deleteCount,
          courses: mutipleMongooesToObject(courses),
        }),
      )
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then((deleteCount) => {
    //     console.log(deleteCount)
    //   })
    //   .catch(() => {})

    // Course.find({})
    //   .then((courses) =>
    // res.render('me/stored-courses', {
    //   courses: mutipleMongooesToObject(courses),
    // }),
    //   )
    //   .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render('me/trash-courses', {
          courses: mutipleMongooesToObject(courses),
        }),
      )
      .catch(next);
  }
}

module.exports = new MeController();
