import Admin from "../models/Admin.js";


class AdminController {

  // ========== MANAGE ADMIN ==========
  // Get all admin
  getAllAdmins(req, res) {
    Admin.find({}, { _id: 0, __v: 0, password: 0 })
      .then(admins => {
        res.send(admins)
      })

  }


}

export default new AdminController();
