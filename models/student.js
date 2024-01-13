const mongoose=require('mongoose');
const studentSchema= new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    rollNo: {
        type: 'number',
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('student',studentSchema);