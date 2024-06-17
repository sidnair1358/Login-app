const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/index");
const {
  addUser,
  getUser,
  checkUserExists,
  getAllUsers,
} = require("../models/user");
const bcrypt = require("bcrypt");

jest.mock("../models/user");

const app = express();
app.use(express.json());
app.use("/user", userRouter);

describe("User Routes", () => {
  describe("GET /user", () => {
    it("should retrieve all users", async () => {
      const mockUsers = [
        {
          id: 1,
          firstName: "Sid",
          lastName: "Nair",
          email: "sid@email.com",
        },
      ];
      getAllUsers.mockResolvedValue(mockUsers);

      const response = await request(app).get("/user");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User retrieved");
      expect(response.body.payload).toEqual(mockUsers);
    });

    it("should return a 500 error if retrieval fails", async () => {
      getAllUsers.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/user");

      expect(response.status).toBe(500);
    });
  });

  describe("POST /user/register", () => {
    it("should register a new user", async () => {
      checkUserExists.mockResolvedValue([{ exists: false }]);
      addUser.mockResolvedValue();

      const response = await request(app).post("/user/register").send({
        firstName: "Sid",
        lastName: "Nair",
        email: "sid@email.com",
        password: "password",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Sign up succesfull");
      expect(response.body.signUpSuccess).toBe(true);
    });

    it("should return a 409 error if email is already registered", async () => {
      checkUserExists.mockResolvedValue([{ exists: true }]);

      const response = await request(app).post("/user/register").send({
        firstName: "Sid",
        lastName: "Nair",
        email: "sid@email.com",
        password: "password",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("Email already registered");
    });

    it("should return a 400 error if user details are missing", async () => {
      const response = await request(app)
        .post("/user/register")
        .send({ firstName: "Sid" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Missing user details");
    });
  });

  describe("POST /user/login", () => {
    it("should login an existing user", async () => {
      const mockUser = [
        {
          id: 1,
          firstName: "Sid",
          lastName: "Nair",
          email: "sid@email.com",
          password: "hashedPassword",
        },
      ];
      getUser.mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const response = await request(app)
        .post("/user/login")
        .send({ email: "sid@email.com", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful");
      expect(response.body.loginSuccess).toBe(true);
      expect(response.body.payload).toEqual(mockUser);
    });

    it("should return a 401 error if password is incorrect", async () => {
      const mockUser = [
        {
          id: 1,
          firstName: "Sid",
          lastName: "Nair",
          email: "sid@email.com",
          password: "hashedPassword",
        },
      ];
      getUser.mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const response = await request(app)
        .post("/user/login")
        .send({ email: "sid@email.com", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Incorrect Email or Password");
    });
  });
});
