import Alert from "../models/alert.model.js";

// GET 
export const getAlerts = async (req, res, next) => {
    try {
        const { country, status } = req.query;
        const query = {};
        if (country) query.country = country;
        if (status) query.status = status;

        const alerts = await Alert.find(query).sort({ id: 1 });
        res.status(200).json({ 
            success: true, 
            count: alerts.length, 
            alerts 
        });
    } catch (error) { 
        next(error); 
    }
};

// POST 
export const createAlert = async (req, res, next) => {
    try {
        const lastAlert = await Alert.findOne().sort({ id: -1 });
        const alert = await Alert.create({
            id: (lastAlert?.id || 0) + 1,
            ...req.body
        });
        res.status(201).json({ 
            success: true, 
            message: "Created", 
            alert 
        });
    } catch (error) { 
        next(error); 
    }
};

// PUT 
export const updateAlert = async (req, res, next) => {
    try {
        const alert = await Alert.findOneAndUpdate(
            { id: Number(req.params.id) },
            req.body,
            { new: true, runValidators: true }
        );
        if (!alert){
            return res.status(404).json({ 
                success: false, 
                message: "Not Found" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Updated", 
            alert 
        });
    } catch (error) { 
        next(error); 
    }
};

// DELETE 
export const deleteAlert = async (req, res, next) => {
    try {
        const targetId = Number(req.params.id);
        const deleted = await Alert.findOneAndDelete({ id: targetId });
        if (!deleted){ 
            return res.status(404).json({ 
                success: false, 
                message: "Not Found" 
            });
        }
        await Alert.updateMany({ id: { $gt: targetId } }, { $inc: { id: -1 } });
        res.status(200).json({ 
            success: true, 
            message: "Deleted"
        });
    } catch (error) { 
        next(error); 
    }
};
