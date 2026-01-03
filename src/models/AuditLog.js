import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
    input:Object,
    decision:String,
    reason:String,
    createdAt: { type: Date, default: Date.now  }
});

export default mongoose.model("AuditLog", auditSchema);