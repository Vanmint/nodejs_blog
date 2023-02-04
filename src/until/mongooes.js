module.exports = {
  mutipleMongooesToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongooses.toObject() : mongoose;
  },
};
