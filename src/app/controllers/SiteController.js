const { request } = require('express');
const Course = require('../models/Course');
const { mutipleMongooesToObject } = require('../../until/mongooes');
class SiteController {
  // [GET] /

  // Cách viết với callback
  // index(req, res) {
  //   Course.find({}, function (err, courses) {
  //     if (!err) {
  //       res.json(courses);
  //     } else {
  //       res.status(400).json({ error: 'ERROR!!!!' });
  //     }
  //   });

  //   // res.render('home');
  // }

  // Cách viết với promise
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('home', {
          courses: mutipleMongooesToObject(courses),
        });
      })
      .catch(next);
    // .catch(error => next(error) )
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
