import db from "../libs/prismaInit.js";
import { getUserByIdService, getUserByUsernameService } from "../services/getUserByService.js"

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

    expect(db.users.findUnique).toHaveBeenCalledWith({ where: { id: mockUserId } });
    expect(result).toEqual(mockUser);
  });
})