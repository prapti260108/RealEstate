const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const videoRoutes = require('./Routes/videoRoutes');
const path = require('path');
const Projectrouter = require('./Routes/Projectroutes');
const brochurerouter = require('./Routes/brochureRequestRoutes');
const Contactrouter = require('./Routes/contactRoutes');
const uploadRoutes = require("./Routes/uploadRoutes");
const imageRoutes = require("./Routes/imageRoutes");
const mediaRoutes = require("./Routes/mediaRouter");
const sliderRoutes = require("./Routes/sliderRouter");
const teamRoutes = require("./Routes/teamRouter");
const inquiryRoutes = require("./Routes/inquiryRoutes");
const serchingRoutes = require("./Routes/serchingRoutes");
const blogRouter = require("./Routes/blogRouter");
const plottingFloralRoutes = require("./Routes/plottingFloralRoutes");
const plottingRouter = require("./Routes/plottingRouter");
const pricingRequestRoutes = require("./Routes/pricingRequestRoutes");
const cors = require("cors");



const { getChat, handleChat } = require('./chatbot');

const app = express();
const port = 3000;

dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api', videoRoutes);
app.use('/api', Projectrouter);
app.use('/api', brochurerouter);
app.use('/api', Contactrouter);
app.use('/api', uploadRoutes);
app.use('/api', imageRoutes);
app.use('/api', mediaRoutes);
app.use('/api', sliderRoutes);
app.use('/api', teamRoutes);
app.use('/api', inquiryRoutes);
app.use('/api', serchingRoutes);
app.use('/api', blogRouter);

//
app.use("/api",plottingFloralRoutes)
app.use("/api",plottingRouter)
app.use("/api",pricingRequestRoutes)

// Chatbot routes
app.get('/api/chat', getChat);
app.post('/api/chat', handleChat);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
