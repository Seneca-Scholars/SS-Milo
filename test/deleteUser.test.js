import db from "../libs/prismaInit";
import { deleteUserService } from "../services/deleteUserService";

jest.mock("../libs/prismaInit.js", () => ({
    users: { findUnique: jest.fn() },
  }));

  describe("deleteUserService", () => { 
  beforeEach(() => {
    jest.clearAllMocks();
  });
  });
