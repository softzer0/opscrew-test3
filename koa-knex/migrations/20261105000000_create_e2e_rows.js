// The live previews test's table, which only the seed fills.
exports.up = function (knex) {
  return knex.schema.createTable("e2e_rows", (table) => {
    table.increments("id");
    table.string("label").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("e2e_rows");
};
