// The live previews test's seed: each new preview runs it once.
exports.seed = async function (knex) {
  await knex("e2e_rows").insert([{"label":"e2e-seeded-1"},{"label":"e2e-seeded-2"},{"label":"e2e-seeded-3"}]);
};
