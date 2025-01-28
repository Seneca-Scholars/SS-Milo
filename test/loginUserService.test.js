import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import db from "../libs/prismaInit.js";
import { generateAuthToken, hashPassword} from "../utilities/utilities.js"; 
import bcrypt from "bcrypt";
import { loginUserService } from "../services/loginService.js";

describe("loginUserService", () => {
  let sx;

  before(() => {
    sx = sinon.createSandbox();

    const findUniqueStub = sx.stub(db.users, "findUnique").resolves(null); //so that it defaults to no user found
    sx.stub(bcrypt.compare).reolves(null); 
  });

  afterEach(() => {
    sx.restore();
  });
  it("should successfully login with valid credentials", async () => {
    const mockUsername = "johndoe";
    const mockPassword = "secret123";
    const mockHashedPassword = await hashPassword(mockPassword);
    const mockUser = { username: mockUsername, passwordHash: mockHashedPassword };

    findUnique.resolves(mockUser);
    bcrypt.compare.resolves(true);
    const mockToken = "mockToken";
    sx.stub(generateAuthToken).returns(mockToken);

    const result = await loginUserService(mockUsername, mockPassword);

    expect(result).to.have.property('token').that.equals(mockToken);
    expect(result).to.have.property('user').that.deep.equals(mockUser);
    expect(db.users.findUnique).calledOnceWithExactly({ where: { username: mockUsername } });
    expect(bcrypt.compare).calledOnceWithExactly(mockPassword, mockHashedPassword); 
  });
});   
