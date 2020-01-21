import express, { Request, Response, NextFunction} from "express";
import createError from "http-errors";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import cookieParser from "cookie-parser";

// Routes (route handlers)
import homeRouter from "./api/routes/home";


// API keys and Passport configuration

// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "public")));

/**
 * Primary app routes.
 */
app.get("/", homeRouter);

/**
 * API examples routes.
 */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});


export default app;
