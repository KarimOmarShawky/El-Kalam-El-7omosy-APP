import {Router} from "express";
import {withCache} from "../../lib/cache/withCache.js";
import {User} from "./model/user.model.js";
import {uploadSingleFile} from "../../lib/media/multer.js";

const router = Router();

router.get('/get-all-users' ,
    await withCache(),
    async (req, res , next) => {
     const users = await User.find();
     res.json(users)
})

router.post(
    '/upload-profile-picture',
    uploadSingleFile('profilePicture', ['image/jpeg', 'image/png']),
    async (req, res, next) => {
        res.json('ok')
    }
)
export default router;
