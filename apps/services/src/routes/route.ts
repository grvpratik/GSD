import { Hono } from "hono";

import { searchController } from "../controller/search.controller";

export const base = new Hono();


base.all("/", (c) => {
	return c.json({ status: "ok", message: "Server is running" });
});

base.post('/search',searchController)


//project details
base.post("/build/:id")
base.post("/personal/:id")

// edits 
base.post("/build/:id/edit");
base.post("/personal/:id/edit");

//projects schedules
base.post("/build/:id/schedule");
base.post("/personal/:id/schedule");
