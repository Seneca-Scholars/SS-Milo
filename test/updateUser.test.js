import db from "../libs/prismaInit";
import { updateUserService } from "../services/updateUserService.js";

jest.mock("../libs/prismaInit.js", () =>({
    users: {
        update: jest.fn(),
    },
}));

describe("updateUserService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it("should update a user with valid data", async () => {
        const mockUserId = 1;
        const mockUpdatedData = { firstName: "John", lastName: "Doe" };
        const mockUpdatedUser = { id: 1, firstName: "John", lastName: "Doe", username: "johndoe" }; 
        db.users.update.mockResolvedValue(mockUpdatedUser);

        const result = await updateUserService(mockUserId, mockUpdatedData);

        expect(db.users.update).toHaveBeenCalledWith({ 
            where: { id: mockUserId }, 
            data: mockUpdatedData 
        });
        expect(result).toEqual(mockUpdatedUser);
    });

    it("should throw an error for invalid user ID", async () => {
        const invalidUserId = "invalid";
        const mockUpdatedData = { firstName: "John", lastName: "Doe" };

        await expect(updateUserService(invalidUserId, mockUpdatedData)).rejects.toThrow("invalid user ID");
        expect(db.users.update).not.toHaveBeenCalled();
    });
    it("should throw an error for no updated data", async () => {
        const mockUserId = 1;

        await expect(updateUserService(mockUserId, {})).rejects.toThrow("0 data provided for update");
        expect(db.users.update).not.toHaveBeenCalled();
    });
    it("should throw an error for undefined updated data", async () => {
        const mockUserId = 1;

        await expect(updateUserService(mockUserId)).rejects.toThrow("0 data provided for update");
        expect(db.users.update).not.toHaveBeenCalled();
    });

});

