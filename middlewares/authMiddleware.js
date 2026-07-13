function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect("/auth/login");
    }

    next();
}

function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.session.role)) {
            return res.status(403).send("Akses ditolak");
        }

        next();
    };
}

module.exports = {
    isAuthenticated,
    authorize
};