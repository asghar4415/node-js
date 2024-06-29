import express from 'express'
import {
    handleGetUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser
} from '../controllers/users.js'


const router = express.Router()

router.post("/createuser", handleCreateUser); 
router.get("/getuser", handleGetUsers); 
router.get("/getuser/:id", handleGetUserById);
router.put("/updateuser/:id", handleUpdateUser); 
router.delete("/deleteuser/:id", handleDeleteUser);

export default router
