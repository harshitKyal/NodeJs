const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
        default: ''
        
    },
    featured: {
        type: Boolean,
        default:false      
    },
    abbr: {
        type: String,
        required: true,
        default: ''
    }
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;