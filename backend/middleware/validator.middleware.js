import { countries } from "../contries/contries.js";

export const validateAlert = (req, res, next) => {
    const { country, visaType, status } = req.body;
    
    if (!country || !visaType || !status) {
        const error = new Error("Country, visaType, and status are required");
        error.statusCode = 400;
        return next(error);
    }

    if (!countries.includes(country)) {
        const error = new Error(`Invalid country. Must be a valid country from the provided list.`);
        error.statusCode = 400;
        return next(error);
    }

    const validVisaTypes = ["Tourist", "Business", "Student"];
    if (!validVisaTypes.includes(visaType)) {
        const error = new Error(`Invalid visaType. Must be one of: ${validVisaTypes.join(", ")}`);
        error.statusCode = 400;
        return next(error);
    }

    const validStatus = ["Active", "Booked", "Expired"];
    if (!validStatus.includes(status)) {
        const error = new Error(`Invalid status. Must be one of: ${validStatus.join(", ")}`);
        error.statusCode = 400;
        return next(error);
    }

    next();
};
