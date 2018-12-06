// executionModel.js
var mongoose = require('mongoose');
// Setup schema
var executionMutantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['R', 'E','P']
    },
    result: {
        type: String,
        enum: ['S', 'F']
    }, 
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export execution model
var ExecutionMutant = module.exports = mongoose.model('executionMutant', executionMutantSchema);
module.exports.get = function (callback, limit) {
    ExecutionMutant.find(callback).limit(limit);
}