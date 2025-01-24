import bcrypt from "bcrypt";
import { generateAuthToken } from "../utilities/utilities.js";
import db from "../libs/prismaInit.js";
import loginUserService from "../services/loginUserService.js";

jest.mock("../libs/prismaInit.js", () => ({
  users: { findUnique: jest.fn() },
}));

jest.mock("../utilities/utilities.js", () => ({
  generateAuthToken: jest.fn(),
}));