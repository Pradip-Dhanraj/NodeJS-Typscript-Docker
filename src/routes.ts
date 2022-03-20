import { Express, Request, Response } from "express";
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from "./controllers/session.controller";
import { getUrlsHandler } from "./controllers/testing.controller";
import { requireUser } from "./middlewares/requireUser";

function routes(app: Express) {

    app.get("/", (req: Request, res: Response) => {
        res.send(`App is up, running on ${process.env.NODE_ENV} environment`);
    });

    app.post("/api/session", createSessionHandler);

    app.get("/api/session", requireUser, getSessionHandler);

    app.delete("/api/session", requireUser, deleteSessionHandler);

    app.get("/api/urls", getUrlsHandler);
}

export default routes;