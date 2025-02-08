import { Hono } from "hono";

import { searchController } from "../controller/search.controller";
import { buisness } from "./buisnessRoute";
import { personal } from "./personalRoute";

export const base = new Hono();

base.all("/", (c) => {
	return c.json({ status: "ok", message: "Server is running" });
});

base.post("/search", searchController);
base.route("/buisness", buisness);
base.route("/personal", personal);
