export const getWelcome = (req,res)=>{
    try {
        res.status(200).json({ msg: "welcome" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

export const getGreeting = (req,res)=>{
    try {
        res.status(200).json({msg:"hello world"});
    } catch (error) {
        res.status(200).json({error:"Server Error"})
    }
}

export const getName = (req,res)=>{
    try {
        res.status(200).json({msg:"Somu"});
    } catch (error) {
        res.status(200).json({error:"Server Error"})
    }
}

