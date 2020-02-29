const fs = require("fs");
const db = require("../db");
const { Comment, Resume } = require("../db/models");

const comments = JSON.parse(fs.readFileSync("comments.json", "utf8"));
const files = [
  { fileName: "example.pdf", title: "Frontend Dev", type: "resume" },
  { fileName: "example2.pdf", title: "Roast me plz", type: "resume" },
  { fileName: "example3.pdf", title: "Software Eng", type: "resume" },
  { fileName: "example4.pdf", title: "Data Scientist", type: "resume" },
  {
    fileName: "example5.pdf",
    title: "Cover Letter",
    type: "coverLetter"
  },
  {
    fileName: "example6.pdf",
    title: "Another Cover Letter",
    type: "coverLetter"
  },
  { fileName: "example7.pdf", title: "Reach out", type: "outreach" },
  {
    fileName: "example8.pdf",
    title: "LinkedIn Outreach Message",
    type: "outreach"
  }
];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  await Promise.all(
    comments.map(comment => {
      return Comment.create({
        id: comment.id,
        documentId: comment.documentId,
        comment: comment.comment,
        x: comment.x,
        y: comment.y,
        color: comment.color,
        pageNumber: comment.pageNumber
      });
    })
  );
  await Promise.all(
    files.map(file => {
      return Resume.create({
        fileName: file.fileName,
        title: file.title,
        type: file.type
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
