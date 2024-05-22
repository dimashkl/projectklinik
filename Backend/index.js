import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import JadwalDokterRoute from "./routes/JadwalDokterRoute.js";
import FormulirRoute from "./routes/FormulirRoute.js";
import DataPasienRoute from "./routes/DataPasienRoute.js";
import ProfileFaskesRoute from "./routes/ProfileFaskesRoute.js";
import FasilitasRoute from "./routes/FasilitasRoute.js";
import FileUpload from "express-fileupload";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

//(async()=>{
//   await db.sync();
//})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(AuthRoute);
app.use(JadwalDokterRoute);
app.use(FormulirRoute);
app.use(DataPasienRoute);

app.use(ProfileFaskesRoute);
app.use(FasilitasRoute);


app.listen(process.env.APP_PORT, ()=> {
    console.log("Server up and running...");
});