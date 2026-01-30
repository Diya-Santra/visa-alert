import { countries } from "../contries/contries.js";

export const getCountries = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: countries.length,
            countries
        });
    } catch (error) {
        next(error);
    }
};
