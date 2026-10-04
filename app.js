const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/databaseconfig');


const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const caregiverRoutes = require('./routes/caregiverRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const parentRoutes = require("./routes/parentRoutes");

const errorHandler = require('./middleware/errorHandler'); // Import error handler

const app = express();

connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/parents', parentRoutes);



app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Childcare App API is up and running!"
  });
});

// Error Handling Middleware (must be last)
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});