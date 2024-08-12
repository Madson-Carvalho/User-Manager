import prisma from "../utils/prisma";

class UserService {
    async createUser(name: string, email: string, password: string, phone: string, address: string) {
        return prisma.user.create({
            data: {
                name,
                email,
                password,
                phone,
                address
            }
        });
    }

    async updateUser(id: string, name: string, email: string, password: string, phone: string, address: string) {
        return prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password,
                phone,
                address
            }
        })
    }

    async deleteUser(id: string) {
        return prisma.user.delete({
            where: {
                id
            }
        })
    }

    async findAllUsers() {
        return prisma.user.findMany();
    }

    async findUserById(id: string) {
        return prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async findUserToLogin(email: string, password: string) {
        return prisma.user.findUnique({
            where: {
                email,
                password
            }
        })
    }
}

export default new UserService();