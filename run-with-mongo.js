// מריץ מסד MongoDB זמני (in-memory) ומריץ עליו את שני קובצי השאילתות דרך mongosh.
const { MongoMemoryServer } = require("mongodb-memory-server");
const { spawnSync } = require("child_process");

(async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log("MongoDB זמני עלה בכתובת:", uri, "\n");

  const files = ["01-students-queries.js", "02-recipes-aggregation.js"];
  for (const file of files) {
    console.log("\n############################################################");
    console.log("### מריץ:", file);
    console.log("############################################################\n");
    const res = spawnSync("node_modules/.bin/mongosh", [uri, "--quiet", "--file", file], {
      stdio: "inherit",
    });
    if (res.status !== 0) {
      console.error("שגיאה בהרצת", file);
      await mongod.stop();
      process.exit(res.status || 1);
    }
  }

  await mongod.stop();
  console.log("\n=== הכל רץ בהצלחה, המסד הזמני נסגר ===");
})();
