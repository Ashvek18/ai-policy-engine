import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    name:String,
    description:String,
    ruleText:String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Policy", policySchema);