import express from "express"
import dotenv from "dotenv"
import connectDb from "./Db/dbConnection.js"
import alertRoutes from "./routes/alert.route.js"
import logger from "./middleware/logger.middleware.js"
import errorHandler from "./middleware/error.middleware.js"

dotenv.config()

const app=express()

// Middleware
app.use(express.json())
app.use(logger)

// Routes
app.use("/alerts", alertRoutes)

// Error Handler (must be last)
app.use(errorHandler)

const PORT=process.env.PORT || 5000
const dbUrl=process.env.MONGO_URL

connectDb(dbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });