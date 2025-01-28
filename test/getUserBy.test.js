import db from "../libs/prismaInit.js";
import {
  getUserByIdService,
  getUserByUsernameService,
} from "../services/getUserByService.js";

jest.mock("../libs/prismaInit.js", () => ({
  users: {
    findUnique: jest.fn(),
  },
}));

describe("getUserByIdService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user by ID", async () => {
    const mockUserId = 1;
    const mockUser = { id: 1, username: "testuser" };
    db.users.findUnique.mockResolvedValueOnce(mockUser);

    const result = await getUserByIdService(mockUserId);

    expect(db.users.findUnique).toHaveBeenCalledWith({
      where: { id: mockUserId },
    });
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if user is not found", async () => {
    const mockUserId = 1;
    db.users.findUnique.mockResolvedValueOnce(null);
    await expect(getUserByIdService(mockUserId)).rejects.toThrow(
      "you were not found"
    );
    expect(db.users.findUnique).toHaveBeenCalledWith({
      where: { id: mockUserId },
    });
  });

  it("should handle database errors", async () => {
    const mockUserId = 1;
    db.users.findUnique.mockRejectedValueOnce(new Error("Database error"));

    await expect(getUserByIdService(mockUserId)).rejects.toThrow(
      "Database error"
    );
    expect(db.users.findUnique).toHaveBeenCalledWith({
      where: { id: mockUserId },
    });
  });

  describe("getUserByUsernameService", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return a user by username", async () => {
      const mockUsername = "testuser";
      const mockUser = { id: 1, username: "testuser" };
      db.users.findUnique.mockResolvedValueOnce(mockUser);
      const result = await getUserByUsernameService(mockUsername);

      expect(db.users.findUnique).toHaveBeenCalledWith({
        where: { username: mockUsername },
      });
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user is not found", async () => {
      const mockUsername = "testuser";
      db.users.findUnique.mockResolvedValueOnce(null);
      await expect(getUserByUsernameService(mockUsername)).rejects.toThrow(
        "user not found"
      );

      expect(db.users.findUnique).toHaveBeenCalledWith({
        where: { username: mockUsername },
      });
    });
  });
  it("should handle database errors", async () => {
    const mockUsername = "testuser";
    db.users.findUnique.mockRejectedValueOnce(new Error("database error"));
    await expect(getUserByUsernameService(mockUsername)).rejects.toThrow(
      "database error"
    );
    expect(db.users.findUnique).toHaveBeenCalledWith({
      where: { username: mockUsername },
    });
  });
});
