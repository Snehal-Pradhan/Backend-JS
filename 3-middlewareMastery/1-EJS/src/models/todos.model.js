import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
    },
    description : String,
    status : {
        type : String,
        enum : ["pending","completed"],
        default : "pending",
    },
    dueDate : Date,
},{
    timestamps: true
}
);

export default mongoose.model("Todos",todoSchema);