import { DateTime } from "luxon";
import bcrypt from "bcrypt";

import User from "../models/User.js";

const SALT_ROUNDS = 10;

class AdminController {


  // ========== MANAGE ADMIN ==========
  // Get all admins
  getAllAdmins(req, res) {
    // Roles
    let roles = ["root", "admin"];
    // Find
    User.find({ roles: { $in: roles } }, { _id: 0, __v: 0, password: 0 })
      .then(admins => {
        res.status(200).send(admins)
      })

  }

  // Get admin info by username
  getAdminInfo = async (req, res) => {
    // Roles
    let roles = ["root", "admin"]
    // Data from client
    let username = req.params.adminUsername;
    User.findOne({ username: username, roles: { $in: roles } }, { password: 0, __v: 0, activeCode: 0, _id: 0 })
      .then(acc => {
        if (acc != null) { // Send data to client
          return res.status(200).send(acc);
        }
        else { // Account not found
          res.status(404).json({
            Error: "Account not found!"
          });
        }
      })

  }

  // Add admin
  addAdmin = async (req, res) => {

    let currentTime = DateTime.utc().toISO(); // Current time
    let hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    let adminID = "AD" + (Math.floor(Math.random() * 89) + 10) + Math.random().toString(36).slice(2, 6);
    adminID = adminID.toUpperCase();

    User.findOne({ userID: adminID })
      .then(acc => {
        if (acc) {
          res.status(409).send({ message: "Failed! User ID is already existed!" });
          return;
        }

        let accountInfo = {
          userID: adminID,
          username: req.body.username,
          fullname: req.body.fullname,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          gender: req.body.gender,
          password: hashPassword,
          status: 1,
          roles: ["admin"],
          createAt: currentTime,
          deleteAt: null,
          activeAt: null,
          activeCode: null
        };

        let adminAcc = new User(accountInfo);
        adminAcc.save()
          .then(() => res.status(201).json({
            Result: "Add admin account successfully."
          }))
          .catch(error => {
            return res.status(500).send(error);
          });
        return;
      })


  }

  // Update admin
  updateAdmin = (req, res) => {
    let currentTime = DateTime.utc().toISO(); // Current time
    let hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    // Roles
    let roles = ["root", "admin"]

    let adminID = req.body.adminID;
    // Check account exists or not
    User.findOne({ userID: adminID, roles: { $in: roles } })
      .then(acc => {
        if (acc) { // If exists, update info

          let accountInfo = {
            username: req.body.username,
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            password: hashPassword,
            roles: req.body.roles
          };

          User.findOneAndUpdate({ userID: adminID, roles: { $in: roles } }, accountInfo)
            .then(() => {
              res.status(200).json({
                Result: "Update admin account successfully."
              })
            })
            .catch(error => {
              return res.status(500).send(error);
            })
        }
        else { // Not exists
          res.status(404).json({
            Error: "Admin account not found!"
          });
        }
      })




  }

  // Soft delete admin account
  softDeleteAdmin = (req, res) => {
    // Roles
    let roles = ["root", "admin"]

    let username = req.body.username; // Data from client
    let currentTime = DateTime.utc().toISO(); // Current time

    let accSoftDelDetail = { // Set data for soft delete
      status: -1,
      deleteAt: currentTime
    }
    // Check account is exists or not
    User.findOne({ username: username, roles: { $in: roles } })
      .then(acc => {
        if (acc) {
          if (acc.status == -1) { // Account is already soft deleted before
            res.status(204).json({
              Error: "Admin account has been deleted before."
            })
          }
          else { // Or not, do soft delete
            User.findOneAndUpdate({ username: username, roles: { $in: roles } }, accSoftDelDetail)
              .then(() => {
                res.status(200).json({
                  Result: "Soft delete account successfully."
                })
              })
          }
        }
        else { // Account not found
          res.status(404).json({
            Error: "Account not found!"
          });
        }
      })



  }

  // Delete
  deleteAdmin(req, res) {

    // Roles
    let roles = ["root", "admin"]

    let username = req.body.username; // Data from client

    // Check account is exist or not
    User.findOne({ username: username, roles: { $in: roles } })
      .then(acc => {
        if (acc != null) { // If exist, delete account
          User.findOneAndRemove({ username: username, roles: { $in: roles } })
            .then(() => {
              res.status(200).json({
                Result: "Delete admin account successfully."
              })
            })
        }
        else { // Account not found
          res.status(404).json({
            Error: "Admin account not found!"
          });
        }
      })



  }



  // ========== MANAGE EMPLOYEE ==========
  getAllEmployees(req, res) {
    // Roles
    let roles = ["employee"];
    // Find
    User.find({ roles: { $in: roles } }, { _id: 0, __v: 0, password: 0 })
      .then(employees => {
        res.status(200).send(employees)
      })

  }

  // Get info by username
  getEmployeeInfo = async (req, res) => {
    // Roles
    let roles = ["employee"]
    // Data from client
    let username = req.params.employeeUsername;
    User.findOne({ username: username, roles: { $in: roles } }, { password: 0, __v: 0, activeCode: 0, _id: 0 })
      .then(acc => {
        if (acc != null) { // Send data to client
          return res.status(200).send(acc);
        }
        else { // Account not found
          res.status(404).json({
            Error: "Account not found!"
          });
        }
      })

  }

  // Add Employee
  addEmployee = async (req, res) => {

    let currentTime = DateTime.utc().toISO(); // Current time
    let hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    let employeeID = "EP" + (Math.floor(Math.random() * 89) + 10) + Math.random().toString(36).slice(2, 6);
    employeeID = employeeID.toUpperCase();

    User.findOne({ userID: employeeID })
      .then(acc => {
        if (acc) {
          res.status(409).send({ message: "Failed! User ID is already existed!" });
          return;
        }

        let accountInfo = {
          userID: employeeID,
          username: req.body.username,
          fullname: req.body.fullname,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          gender: req.body.gender,
          password: hashPassword,
          status: 1,
          roles: ["employee"],
          createAt: currentTime,
          deleteAt: null,
          activeAt: null,
          activeCode: null
        };

        let employeeAcc = new User(accountInfo);
        employeeAcc.save()
          .then(() => res.status(201).json({
            Result: "Add employee account successfully."
          }))
          .catch(error => {
            return res.status(500).send(error);
          });
        return;
      })


  }

  // Update employee
  updateEmployee = (req, res) => {
    let currentTime = DateTime.utc().toISO(); // Current time
    let hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    // Roles
    let roles = ["employee"]

    let employeeID = req.body.employeeID;
    // Check account exists or not
    User.findOne({ userID: employeeID, roles: { $in: roles } })
      .then(acc => {
        if (acc) { // If exists, update info

          let accountInfo = {
            username: req.body.username,
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            password: hashPassword,
            roles: req.body.roles
          };

          User.findOneAndUpdate({ userID: employeeID, roles: { $in: roles } }, accountInfo)
            .then(() => {
              res.status(200).json({
                Result: "Update employee account successfully."
              })
            })
            .catch(error => {
              return res.status(500).send(error);
            })
        }
        else { // Not exists
          res.status(404).json({
            Error: "Employee account not found!"
          });
        }
      })




  }

  // Soft delete employee account
  softDeleteEmployee = (req, res) => {
    // Roles
    let roles = ["employee"]

    let username = req.body.username; // Data from client
    let currentTime = DateTime.utc().toISO(); // Current time

    let accSoftDelDetail = { // Set data for soft delete
      status: -1,
      deleteAt: currentTime
    }
    // Check account is exists or not
    User.findOne({ username: username, roles: { $in: roles } })
      .then(acc => {
        if (acc) {
          if (acc.status == -1) { // Account is already soft deleted before
            res.status(204).json({
              Error: "Employee account has been deleted before."
            })
          }
          else { // Or not, do soft delete
            User.findOneAndUpdate({ username: username, roles: { $in: roles } }, accSoftDelDetail)
              .then(() => {
                res.status(200).json({
                  Result: "Soft delete account successfully."
                })
              })
          }
        }
        else { // Account not found
          res.status(404).json({
            Error: "Account not found!"
          });
        }
      })



  }

  // Delete
  deleteEmployee(req, res) {

    // Roles
    let roles = ["employee"]

    let username = req.body.username; // Data from client

    // Check account is exist or not
    User.findOne({ username: username, roles: { $in: roles } })
      .then(acc => {
        if (acc != null) { // If exist, delete account
          User.findOneAndRemove({ username: username, roles: { $in: roles } })
            .then(() => {
              res.status(200).json({
                Result: "Delete Employee account successfully."
              })
            })
        }
        else { // Account not found
          res.status(404).json({
            Error: "Employee account not found!"
          });
        }
      })



  }



  // ========== MANAGE CUSTOMERS ==========
  getAllCustomers(req, res) {
    // Roles
    let roles = ["customer"];
    // Find
    User.find({ roles: { $in: roles } }, { _id: 0, __v: 0, password: 0 })
      .then(customers => {
        res.status(200).send(customers)
      })

  }

  // Get customer info by username
  getCustomerInfo = async (req, res) => {
    // Roles
    let roles = ["customer"]
    // Data from client
    let username = req.params.customerUsername;
    User.findOne({ username: username, roles: { $in: roles } }, { password: 0, __v: 0, activeCode: 0, _id: 0 })
      .then(acc => {
        if (acc != null) { // Send data to client
          return res.status(200).send(acc);
        }
        else { // Account not found
          res.status(404).json({
            Error: "Account not found!"
          });
        }
      })

  }

  // Update customer
  updateCustomer = (req, res) => {
    // Data from client
    let username = req.body.username;
    // Check account exists or not
    User.find({ username: username })
      .then(acc => {
        if (acc.length >= 1) { // If exists, update info
          User.findOneAndUpdate({ username: username }, req.body)
            .then(() => {
              res.status(200).json({
                Result: "Update customer account successfully."
              })
            })
        }
        else { // Not exists
          res.status(404).json({
            Error: "Customer account not found!"
          });
        }
      })




  }

  // Soft delete customer account
  softDeleteCustomer = (req, res) => {
    // Roles
    let roles = ["customer"]

    let username = req.body.username; // Data from client
    let currentTime = DateTime.utc().toISO(); // Current time

    let accSoftDelDetail = { // Set data for soft delete
      status: -1,
      deleteAt: currentTime
    }
    // Check account is exists or not
    User.findOne({ username: username, roles: { $in: roles } })
      .then(acc => {
        if (acc) {
          if (acc.status == -1) { // Account is already soft deleted before
            res.status(204).json({
              Error: "Customer account has been deleted before."
            })
          }
          else { // Or not, do soft delete
            User.findOneAndUpdate({ username: username, roles: { $in: roles } }, accSoftDelDetail)
              .then(() => {
                res.status(200).json({
                  Result: "Soft delete account successfully."
                })
              })
          }
        }
        else { // Account not found
          res.status(404).json({
            Error: "Account not found!"
          });
        }
      })



  }

  // Delete
  deleteCustomer(req, res) {

    // Roles
    let roles = ["customer"]

    let username = req.body.username; // Data from client

    // Check account is exist or not
    User.findOne({ username: username, roles: { $in: roles } })
      .then(acc => {
        if (acc != null) { // If exist, delete account
          User.findOneAndRemove({ username: username, roles: { $in: roles } })
            .then(() => {
              res.status(200).json({
                Result: "Delete customer account successfully."
              })
            })
        }
        else { // Account not found
          res.status(404).json({
            Error: "Customer account not found!"
          });
        }
      })



  }



}

export default new AdminController();
