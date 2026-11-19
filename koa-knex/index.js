const Router = require("@koa/router");
const Koa = require("koa");
const knex = require("knex");
const config = require("./knexfile");

// Knex connects on the first query, so the server starts without the database.
const db = knex(config);

const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.method === "GET" && ctx.path === "/health") {
    ctx.body = { status: "ok" };
    return;
  }
  await next();
});

const router = new Router();
const port = process.env.PORT || 3000;

router.get("/", async (ctx) => {
  await db("visits").insert({});
  const [{ total }] = await db("visits").count({ total: "*" });
  ctx.body = { visits: Number(total) };
});

// The live previews test: the marker of the commit this runs and the seeded rows.
const e2eMarker = require("./e2e-marker.json");

router.get("/e2e", async (ctx) => {
  const rows = await db("e2e_rows").orderBy("id").pluck("label");
  ctx.set("Cache-Control", "no-store");
  const previewValue = (process.env.E2E_PREVIEW_VALUE ?? "").startsWith("preview-") ? "set" : "unset";
  ctx.body = { marker: e2eMarker.marker, rows, previewValue };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
