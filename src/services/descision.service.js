import { openai } from "../config/openai.js";

export async function evaluatePolicy(policyText,input) {
    try{
    const prompt=`
    You are a banking policy engine.
    Given the policy and input, return a JSON response only.
    
    Policy:
    ${policyText}
    
    Input:
    ${JSON.stringify(input)}
    
    Respond Strictly in this format:
    {
        "descision": "APPROVED" or "REJECTED",
        "reason": "short explanation"
    }
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0
    });

    return JSON.parse(response.choices[0].message.content);
}catch(error){
    console.error("AI Failed, using fallback:", error);
    return fallbackDecision(input);
}}

function fallbackDecision(input) {
    const {userType,amount,country} = input;

    let limit = 0;
    if(userType === "Gold") limit = 200000;
    else if(userType === "Preferred") limit = 100000; 
    else limit = 50000;

    if(country ==="International" && amount > limit){
        return {
            descision: "REJECTED",
            reason:`Limit Exeeded, Max Allowed Limit is ${limit}`
        };
    }
    return{
        descision: "APPROVED",
        reason: "Approved by Fallback Rule Engine"
    }
}   