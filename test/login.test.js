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

describe("loginUserService", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should successfully login a user with valid creds", async () => {
      const mockUser = {
        id: 1,
        username: "johndoe",
        passwordHash: await bcrypt.hash("password123", 10),
      };
      const mockToken = "mocked-jwt-token";
  
      db.users.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      generateAuthToken.mockReturnValue(mockToken);
  
      const result = await loginUserService("johndoe", "password123");
  
      expect(db.users.findUnique).toHaveBeenCalledWith({ //ensures my mock is being called w arguement
        where: { username: "johndoe" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", mockUser.passwordHash);
      expect(generateAuthToken).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ token: mockToken, user: mockUser });
    });

    it("should throw an error for an invalid username", async () => {
        db.users.findUnique.mockResolvedValue(null);
    
        await expect(loginUserService("invalidUser", "password123")).rejects.toThrow(
          "invalid username or password"
        );
      });
});  