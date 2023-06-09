import jwtHelper from '../helpers/JWTHelper.js';
import User from '../models/Customer.js';


class AuthMiddleWare {

    // Amin
    isAdminAuth = async (req, res, next) => {
        const AdminAccessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
        const AdminTokenFromClient = req.body.token || req.query.token || req.headers["access_token"];

        if (AdminTokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(AdminTokenFromClient, AdminAccessTokenSecret);

                req.jwtDecoded = decoded;

                next();
            }
            catch (error) {
                return res.status(401).json({
                    message: 'Unauthorized.',
                });

            }
        }
        else {
            return res.status(403).json({
                message: 'No token provided.',
            });
        }

    }

}




export default new AuthMiddleWare();