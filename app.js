const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler'); // Import error handler
const caregiverRoutes = require('./routes/caregiverRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const parentRoutes = require("./routes/parentRoutes");


const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/availability', availabilityRoutes);


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Childcare App API is up and running!"
  });
});

// Error Handling Middleware (must be last)
app.use(errorHandler);



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});