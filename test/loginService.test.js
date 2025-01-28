import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import db from "../libs/prismaInit.js";
import { loginService } from "../services/loginService.js";

describe("loginService", () => {
  let sx;

  before(() => {
    sx = sinon.createSandbox();

    sx.stub(db, "users").value({});
  });

  afterEach(() => {
    sx.restore();
  });
});
