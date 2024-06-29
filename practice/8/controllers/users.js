import UserModel from "../models/user.js";

export async function handleGetUsers(request, response) {
    try {
        const userData = await UserModel.find({});
        return response.json({ data: userData, status: true, message: "Users retrieved successfully" });
    } catch (error) {
        return response.status(500).json({
            data: [],
            status: false,
            message: error.message
        });
    }
}

export async function handleGetUserById(request, response) {
    try {
        const { id } = request.params;

        const userData = await UserModel.
        findOne({userid: id})

        if (!userData) {
            return response.status(404).json({
                data: [],
                status: false,
                message: "User not found"
            });
        }
        return response.json({ data: userData, status: true, message: "User retrieved successfully" });
    } catch (error) {
        return response.status(500).json({
            data: [],
            status: false,
            message: error.message
        });
    }
}

export async function handleUpdateUser(request, response) {
    try {
        const { id } = request.params;
        const updateUser = await UserModel.findOneAndUpdate(
            { userid: id },
            request.body,
            { new: true }
        )
        if (!updateUser) {
            return response.status(404).json({
                data: [],
                status: false,
                message: "User not found"
            });
        }
        return response.json({
            data: updateUser,
            status: true,
            message: "User updated successfully"
        });
    } catch (error) {
        return response.status(500).json({
            data: [],
            status: false,
            message: error.message
        });
    }
}

export async function handleDeleteUser(request, response) {
    try {
        const { id } = request.params;
        const deleteUser = await UserModel.
        findOneAndDelete({userid: id})
        
        if (!deleteUser) {
            return response.status(404).json({
                data: [],
                status: false,
                message: "User not found"
            });
        }
        return response.json({
            data: deleteUser,
            status: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        return response.status(500).json({
            data: [],
            status: false,
            message: error.message
        });
    }
}

export async function handleCreateUser(request, response) {
    try {
        const userResponse = await UserModel.create(request.body);
        return response.json({
            data: userResponse,
            status: true,
            message: "User created successfully"
        });
    } catch (error) {
        return response.status(500).json({
            data: [],
            status: false,
            message: error.message
        });
    }
}
