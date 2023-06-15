import User from "../models/User.js";

class ValidationHelper {

    // Check duplicate username
    checkDuplicateUsername = async (req, res) => {
        let username = req.body.username;
        User.findOne({ username: username })
            .then(user => {
                //
                if (user) {
                    return res.status(409).send({ message: "Failed! Username is already in use!" });
                }
                return res.status(200).send({ message: "Username is ready to use!" });
            })
    }

    // Check duplicate email
    checkDuplicateEmail = async (req, res, next) => {
        let email = req.body.email;
        User.findOne({ email: email })
            .then(user => {
                //
                if (user) {
                    return res.status(409).send({ message: "Failed! Email is already in use!" });
                }
                return res.status(200).send({ message: "Email is ready to use!" });
            })
    }

    // Check duplicate phone
    checkDuplicatePhoneNumber = async (req, res, next) => {
        let phone = req.body.phone;
        User.findOne({ phone: phone })
            .then(user => {
                //
                if (user) {
                    return res.status(409).send({ message: "Failed! Phone is already in use!" });
                }
                return res.status(200).send({ message: "Phone number is ready to use!" });
            })
    }

}

export default new ValidationHelper();