const express= require('express')
const cors=require('cors')
const app=express()
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const dotenv=require('dotenv')

dotenv.config({path:'backend/config/config.env'})
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser());
//for image upload
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const errorMiddleware= require('./middleware/error')
//rote imports
const userRoute=require('./routes/userRoutes')
const productRoute=require('./routes/productRoutes')
const orderRoute=require('./routes/orderRoutes')
const paymentRoute= require('./routes/paymentRoutes')
app.use("/api/v1",productRoute);
app.use('/api/v1',userRoute);
app.use("/api/v1",orderRoute);
app.use('/api/v1', paymentRoute)

// Middleware for error
app.use(errorMiddleware)




module.exports=app