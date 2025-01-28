import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import db from "../libs/prismaInit.js";
import { generateAuthToken } from "../utilities/utilities.js"; 
import bcrypt from "bcrypt";
import { loginUserService } from "../services/loginService.js";

describe("loginUserService", () => {
  let sx;

  before(() => {
    sx = sinon.createSandbox();

    sx.stub(db.users, "findUnique").resolves(null);//so that it defaults to no user found
    sx.stub(bcrypt.compare).returns(true);//default to success on pw comparison
  });

  afterEach(() => {
    sx.restore();
  });
});   
