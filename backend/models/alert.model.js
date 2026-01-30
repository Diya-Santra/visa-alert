import mongoose from "mongoose";


const alertSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    visaType: {
        type: String,
        enum: ["Tourist", "Business", "Student"],
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Booked", "Expired"],
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Alert=new mongoose.model("Alert",alertSchema)

export default Alert