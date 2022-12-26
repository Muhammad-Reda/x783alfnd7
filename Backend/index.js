import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AkunRoute from "./routes/AkunRoute.js";
import BayiRoute from "./routes/BayiRoute.js";
import IbuRoute from "./routes/IbuRoute.js";
import InformasiPosyanduRoute from "./routes/InformasiPosyanduRoute.js";
import KaderRoute from "./routes/KaderRoute.js";
import PerkembanganBayiBalitaRoute from "./routes/PerkembanganBayiBalitaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js";
import InformasPerkembanganRoute from "./routes/InformasiPerkembanganRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
});

// (async () => {
//     await db.sync();
// })();

app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: "auto",
        },
    })
);

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.use(AkunRoute);
app.use(BayiRoute);
app.use(IbuRoute);
app.use(InformasiPosyanduRoute);
app.use(KaderRoute);
app.use(PerkembanganBayiBalitaRoute);
app.use(AuthRoute);
app.use(ProfileRoute);
app.use(InformasPerkembanganRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running....");
});
