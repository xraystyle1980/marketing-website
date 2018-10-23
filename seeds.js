require("dotenv").config({
  path: __dirname + "/.env"
});
const fs = require("fs");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

const Story = require("./models/story");
const Category = require("./models/category");
const Contact = require("./models/contact");

const categories = [
  {
    name: "Hard"
  },
  {
    name: "Easy"
  }
];
const stories = [
  {
    name: "Basketball",
    content:
      "Ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.",
    order: 1
  },
  {
    name: "Swimming",
    content:
      "Porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.",
    order: 2
  },
  {
    name: "Weightlifting",
    content:
      "fLeo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.",
    order: 3
  },
  {
    name: "Ping Pong",
    content:
      "Consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula Michael Phelps is the fast fish.",
    order: 4
  }
];

const contacts = [
  {
    name: "Brian Willson",
    email: "fijiwypoh@mailinator.net",
    body:
      "Fugit quia excepteur ipsam anim molestiae est elit animi ut ad est ut",
    createdAt: new Date()
  },
  {
    name: "Jasper Wynn",
    email: "blablu@gmail.com",
    body:
      "Fugit quia excepteur ipsam anim molestiae est elit animi ut ad est ut",
    createdAt: new Date()
  },
  {
    name: "Sonia Romero",
    email: "fritz@gmx.com",
    body:
      "Quidem dolorum ex qui quis rerum culpa laboriosam doloremque excepturi voluptatum blanditiis cum",
    createdAt: new Date()
  }
];

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Story.remove();
  await Category.remove();
  await Contact.remove();
  console.log("Data Deleted. To load sample data, run\n\n\t node seeds.js\n\n");
  process.exit();
}

async function seedStories(stories, categories) {
  stories.map((p, index) => {
    var random = Math.floor(
      Math.random(categories.length) * categories.length + 1
    );
    p["categories"] = [];
    for (let i = 0; i < random; i++) {
      p["categories"][i] = categories[i];
    }
  });
  await Story.insertMany(stories);
}

async function loadData() {
  try {
    const createdCategories = await Category.insertMany(categories);
    seedStories(stories, createdCategories);
    await Contact.insertMany(contacts);
    console.log("👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
