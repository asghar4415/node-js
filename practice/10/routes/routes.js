import express from 'express'
import { handleGetUrls, handleShortenUrl ,   handleRedirectUrl, handleGetUrlStats} from '../controllers/users.js'

const router = express.Router()

router.get("/", handleGetUrls)
router.post("/shorten", handleShortenUrl);
router.get("/:shortId", handleRedirectUrl);
router.get("/:shortId/stats", handleGetUrlStats);

export default router;