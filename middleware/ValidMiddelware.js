import User from "../models/User.js";

class ValidationHelper {

    // Check duplicate username
    checkDuplicateUsername = async (req, res, next) => {
        let username = req.body.username;
        User.findOne({ username: username })
            .then(user => {
                //
                if (user) {
                    res.status(409).send({ message: "Failed! Username is already in use!" });
                    return;
                }
                next();
            })
    }

    // Check duplicate email
    checkDuplicateEmail = async (req, res, next) => {
        let email = req.body.email;
        User.findOne({ email: email })
            .then(user => {
                //
                if (user) {
                    res.status(409).send({ message: "Failed! Email is already in use!" });
                    return;
                }
                next();
            })
    }

    // Check duplicate phone
    checkDuplicatePhoneNumber = async (req, res, next) => {
        let phone = req.body.phone;
        User.findOne({ phone: phone })
            .then(user => {
                //
                if (user) {
                    res.status(409).send({ message: "Failed! Phone number is already in use!" });
                    return;
                }
                next();
            })
    }

}

export default new ValidationHelper();