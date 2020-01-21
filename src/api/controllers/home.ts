import { Request, Response } from "express";
import { APP_NAME } from "./../../core/util/secrets";

export const index = (req: Request, res: Response) => {
    res.render("index", { title: APP_NAME});
};
