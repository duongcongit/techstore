import jwtHelper from '../helpers/JWTHelper.js';


class AuthMiddleWare {

    // Amin
    isAdminAuth = async (req, res, next) => {
        // Get token from .env
        const AdminAccessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
        // Get token from client
        const AdminTokenFromClient = req.body.token || req.query.token || req.headers['access-token'];

        // Verify token
        if (AdminTokenFromClient) {
            try {
                // Verify token
                const decoded = await jwtHelper.verifyToken(AdminTokenFromClient, AdminAccessTokenSecret);
                req.jwtDecoded = decoded;

                next();
            }
            catch (error) { // Error
                return res.status(401).json({
                    message: 'Unauthorized.',
                });

            }
        }
        else { // No token
            return res.status(403).json({
                message: 'No token provided.',
            });
        }

    }

}




export default new AuthMiddleWare();