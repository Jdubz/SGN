var db = require('./db.js');

module.exports = {
  getAllUsers: function (callback) {
    db.Users.findAll().then(function(data) {
      var results = [];
      for (var i in data) {
        results.push(data[i].dataValues);
      }
      callback(null, results);
    }).catch(function(error) {
      callback(error, null);
    });
  },
  searchUsers: function (query, callback) {
    db.Users.findAll({where: query})
      .then(function(result) {
        var results = [];
        for (var i in result) {
          results.push(result[i].dataValues);
        }
        callback(null, results);
    }).catch(function(error) {
      callback(error, null);
    });
  },
  newUser: function (user, callback) {
    var newUser = db.Users.create(user)
    .then(function(data) {
      callback(null, data.dataValues);
    }).catch(function(error) {
      if (error.errors) {
        if (error.errors[0].message === 'fbID must be unique') {
          callback(new Error('user already exists'), null);
        } else {callback(error, null)}
      } else {callback(error, null)}
    });
  }
};