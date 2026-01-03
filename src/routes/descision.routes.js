import express from 'express';
import Policy from '../models/Policy.js';
import AuditLog from '../models/AuditLog.js';
import { evaluatePolicy } from '../services/descision.service.js';
import { descisionSchema } from '../validators/descision.schema.js';

const router = express.Router();

router.post("/evaluate", async(req, res) => {
    const input = descisionSchema.parse(req.body);
    
    const policy = await Policy.findOne();
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    const result = await evaluatePolicy(policy.ruleText,input);

    await AuditLog.create({
       input,
        descision: result.descision,
        reason:result.reason
    });
    res.json(result);
});

export default router;
