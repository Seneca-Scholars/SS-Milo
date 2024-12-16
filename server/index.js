import express from "express";
import cors from "cors";
import {
  initializeDatabase,
  insertDummyData,
} from "./controllers/dbController.js";
// import { getUserById, getUserByUsername } from './controllers/getUserByController.js';
import { authenticateToken, verifyRoute  } from "./controllers/verifyController.js";
import authRoutes from "./routes/authRoutes.js"
import loginRoutes from "./routes/loginRoutes.js"
import deleteUserRoutes from './routes/deleteUserRoutes.js';
import addUserRoutes from './routes/addUserRoutes.js';
import updatedUserRoutes from './routes/updateUserRoutes.js';
import peopleRoutes from './routes/peopleRoutes.js';
import getUserByRoutes from './routes/getUserByRoutes.js';
import dotenv  from 'dotenv'; 
import session from "express-session"; 

dotenv.config();

const app = express();
app.use(
  session({
    secret: 'truth', 
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await initializeDatabase();
    await insertDummyData();

    app.use('/', peopleRoutes);

   app.use('/', addUserRoutes);

   app.use('/update', updatedUserRoutes);

    app.use('/delete', deleteUserRoutes);

    app.use('/auth', authRoutes); 


    app.use('/svr', loginRoutes); 
    

    app.use('/users', getUserByRoutes);

    app.use('/users', getUserByRoutes);

    app.use('/auth/verify', authenticateToken, verifyRoute); 


    app.listen(3000, () => console.log("hearing u on 3000"));
  } catch (err) {
    process.exit(1);
  }
})();
