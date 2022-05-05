const request = require("supertest");
const { response } = require("../src/app");
const app = require("../src/app");
const User = require("../src/models/User");

const { userOne, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("should register a new user", async () => {
  await request(app)
    .post("/register")
    .send({
      name: "Amos",
      email: "mos@gmail.com",
      password: "sapastus",
      phone: "08143351712",
      salary: "5000000",
      bankName: "GT Bank",
      accountNumber: "0221234563",
      isVerified: true,
    })
    


});

test("should login existing users", async () => {
  await request(app)
    .post("/signIn")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
});
