import prisma from "../src/utils/prisma";
import UserService from "../src/service/UserService";

jest.mock('../src/utils/prisma', () => ({
    user: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
    },
}));

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user', async () => {
        const mockUser = {
            id: '89273ba5-1ed9-45e7-b58a-9e8fa72458da',
            name: 'Madson',
            email: 'madson@example.com',
            password: '123456',
            phone: '48999999999',
            address: 'Rua Teste, 389 - Cidade',
        };

        (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

        const user = await UserService.createUser(
            mockUser.name,
            mockUser.email,
            mockUser.password,
            mockUser.phone,
            mockUser.address
        );

        expect(user).toEqual(mockUser);
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                name: mockUser.name,
                email: mockUser.email,
                password: mockUser.password,
                phone: mockUser.phone,
                address: mockUser.address
            }
        });
    });

    it('should update a user', async () => {
        const mockUser = {
            id: '89273ba5-1ed9-45e7-b58a-9e8fa72458da',
            name: 'Madson',
            email: 'madson@example.com',
            password: '123456',
            phone: '48999999999',
            address: 'Rua Teste, 389 - Cidade',
        };

        (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

        const updatedUser = await UserService.updateUser(
            mockUser.id,
            mockUser.name,
            mockUser.email,
            mockUser.password,
            mockUser.phone,
            mockUser.address
        );

        expect(updatedUser).toEqual(mockUser);
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: mockUser.id },
            data: {
                name: mockUser.name,
                email: mockUser.email,
                password: mockUser.password,
                phone: mockUser.phone,
                address: mockUser.address
            }
        });
    });

    it('should delete a user', async () => {
        const mockUser = {
            id: '89273ba5-1ed9-45e7-b58a-9e8fa72458da',
            name: 'Madson',
            email: 'madson@example.com',
            password: '123456',
            phone: '48999999999',
            address: 'Rua Teste, 389 - Cidade',
        };

        (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

        const deletedUser = await UserService.deleteUser(mockUser.id);

        expect(deletedUser).toEqual(mockUser);
        expect(prisma.user.delete).toHaveBeenCalledWith({
            where: { id: mockUser.id },
        });
    });

    it('should return all users', async () => {
        const mockUsers = [
            {
                id: '89273ba5-1ed9-45e7-b58a-9e8fa72458da',
                name: 'Madson',
                email: 'madson@example.com',
                password: '123456',
                phone: '48999999999',
                address: 'Rua Teste, 389 - Cidade',
            },
            {
                id: 'c8ea542d-cde7-4325-a7fe-3ede0ce7dd89',
                name: 'Madson 2',
                email: 'madson2@example.com',
                password: '123456',
                phone: '48999999999',
                address: 'Rua Teste, 388 - Cidade',
            }
        ];

        (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

        const users = await UserService.findAllUsers();

        expect(users).toEqual(mockUsers);
        expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return a user by id', async () => {
        const mockUser = {
            id: '89273ba5-1ed9-45e7-b58a-9e8fa72458da',
            name: 'Madson',
            email: 'madson@example.com',
            password: '123456',
            phone: '48999999999',
            address: 'Rua Teste, 389 - Cidade',
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        const user = await UserService.findUserById(mockUser.id);

        expect(user).toEqual(mockUser);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: mockUser.id },
        });
    });

    it('should return a user by email and password', async () => {
        const mockUser = {
            id: '89273ba5-1ed9-45e7-b58a-9e8fa72458da',
            name: 'Madson',
            email: 'madson@example.com',
            password: '123456',
            phone: '48999999999',
            address: 'Rua Teste, 389 - Cidade',
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        const user = await UserService.findUserToLogin(
            mockUser.email,
            mockUser.password
        );

        expect(user).toEqual(mockUser);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: {
                email: mockUser.email,
                password: mockUser.password
            },
        });
    });
});
