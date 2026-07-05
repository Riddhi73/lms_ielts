require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "No database connection string found. Set DIRECT_URL or DATABASE_URL in .env",
  );
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const database = new PrismaClient({ adapter });

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Photography" },
        { name: "Finance" },
        { name: "Engineering" },
        { name: "Film" },
        { name: "Accounting" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database category", error);
  } finally {
    await database.$disconnect();
  }
}

main();
