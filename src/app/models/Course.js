const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, required: true },
    level: { type: String },
    access: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Course', Course);
