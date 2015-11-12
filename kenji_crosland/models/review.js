//A review is a subdocument of the recipe document (recipe.js)
var mongoose = require('mongoose');
var reviewSchema = module.exports.reviewSchema = mongoose.Schema({
  text: String,
  rating: {type: Number, min:0, max:5}
});

var Review = module.exports.Review = mongoose.model('Review', reviewSchema);
