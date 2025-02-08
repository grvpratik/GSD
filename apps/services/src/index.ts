import { Hono } from "hono";

import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { projectDetails } from "./routes/gemini";
import { base } from "./routes/route";
import { errorHandler } from "./error";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors());

app.route("/", base);

app.post("/ai/project", projectDetails);
app.onError((err, c) => {
	console.error(`${err}`);
	return c.json(
		{
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				status: 500,
			},
		},
		500
	);
});

// Not found handler
app.notFound((c) => {
	return c.json(
		{
			error: {
				message: "Not Found",
				status: 404,
			},
		},
		404
	);
});

export default app;
