const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");

const { userOne, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("should register a new user", async () => {
  const response = await request(app)
    .post("/users/register")
    .send({
      name: "Amos Omoerah",
      email: "mos@gmail.com",
      password: "sapastus",
      phone: "08143351712",
      salary: "5000000",
      bankName: "GT Bank",
      accountNumber: "0221234563"
    }).expect(201)


});

test("should login existing users", async () => {
  await request(app)
    .post("/users/signIn")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
});
