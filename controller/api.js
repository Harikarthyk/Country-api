const Api = require("../model/api");

exports.getApiKey = async(req, res) => {
    try{

        const { user } = req; 
        
        if(!user){
            return res.status(400).json({
                success: false,
                error: "User not found."
            });
        }

        const api = await Api.findOne({ user: user?._id });
        if(api === null){
            return res.status(400).json({
                success: false,
                error: "No Api Key found"
            });
        }
        return res.status(200).json({
            success: true,
            API: api._id,
            api: api
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        })
    }
}   

exports.newApiKey = async(req, res) => {
    try{
        const { user } = req; 
        
        if(!user){
            return res.status(400).json({
                success: false,
                error: "User not found."
            });
        }

        const existingApiForUser = await Api.findOne({ user: user._id });
        
        if(existingApiForUser !== null){
            return res.status(400).json({
                success: false,
                error: "Api Key Already generated .",
                API: existingApiForUser._id
            });
        }

        const api = await Api.create({
            user: user._id
        });

        return res.status(201).json({
            success: true,
            API: api._id
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}

exports.updateApiKey = async(req, res) => {
    try{
        const { user } = req; 
        
        if(!user){
            return res.status(400).json({
                success: false,
                error: "User not found."
            });
        }
        
        const { apiId } = req.params;

        const updatedApiKey = await Api.findOneAndUpdate({ _id: apiId }, { $set: req.body }, { new : true });
        
    
        return res.status(200).json({
            success: true,
            API: updatedApiKey._id,
            api: updatedApiKey
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}