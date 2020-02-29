const fs = require("fs");
const db = require("../server/db");
const { Comment } = require("../server/db/models");

const comments = JSON.parse(fs.readFileSync("comments.json", "utf8"));

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  await Promise.all(
    comments.map(comment => {
      return Comment.create({
        id: comment.id,
        documentId: comment.documentId,
        comment: comment.comment
      });
    })
  );

  console.log("Seeding Successful");
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
