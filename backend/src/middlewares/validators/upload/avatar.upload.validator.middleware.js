const avatarUploadValidatorMiddleware = (req, res, next) => {
    if (!req.files || !req.files.avatar) {
        res.status(400).json({success: false, reason: "Nem adott át fájlt."});
        return;
    }

    const {avatar} = req.files;

    const {mimetype, size} = avatar;

    if (size > 8000000) {
        res.status(400).json({success: false, reason: "Ez a fájl nagyobb, mint 8MB."});
        return;
    }

    if (!mimetype.startsWith("image")) {
        res.status(400).json({success: false, reason: "Ez a fájl nem kép kiterjesztésű."});
        return;
    }

    next();

}

export default avatarUploadValidatorMiddleware;