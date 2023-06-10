import { DateTime } from "luxon";

import Admin from "../models/Admin.js";
import Customer from "../models/Customer.js";


class AdminController {

  // ========== MANAGE ADMIN ==========
  // Get all admins
  getAllAdmins(req, res) {
    Admin.find({}, { _id: 0, __v: 0, password: 0 })
      .then(admins => {
        res.status(200).send(admins)
      })

  }

  // Add admin
  addAdmin(req, res) {
    // Get data from client
    let adminAccountInfo = req.body;
    let username = adminAccountInfo.username;
    // Check account is exists or not
    Admin.find({ username: username })
      .then(acc => {
        if (acc.length >= 1) { // Exists
          res.status(409).json({
            Error: "Admin account is existed!"
          });
        }
        else { // Create new account
          let adminAcc = new Admin(adminAccountInfo);
          adminAcc.save()
            .then(() => res.status(201).json({
              Result: "Add admin account successfully."
            }))
            .catch(error => { });
        }
      })

  }

  // Update admin
  updateAdmin = (req, res) => {
    // Data from client
    let username = req.body.username;
    // Check account exists or not
    Admin.find({ username: username })
      .then(acc => {
        if (acc.length >= 1) { // If exists, update info
          Admin.findOneAndUpdate({ username: username }, req.body)
            .then(() => {
              res.status(200).json({
                Result: "Update admin account successfully."
              })
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
    let username = req.body.username; // Data from client
    let currentTime = DateTime.utc().toISO(); // Current time

    let accSoftDelDetail = { // Set data for soft delete
      status: -1,
      deleteAt: currentTime
    }
    // Check account is exists or not
    Admin.findOne({ username: username })
      .then(acc => {
        if (acc) {
          if (acc.status == -1) { // Account is already soft deleted before
            res.status(204).json({
              Error: "Admin account has been deleted before."
            })
          }
          else { // Or not, do soft delete
            Admin.findOneAndUpdate({ username: username }, accSoftDelDetail)
              .then(() => {
                res.status(200).json({
                  Result: "Soft delete admin account successfully."
                })
              })
          }
        }
        else { // Account not found
          res.status(404).json({
            Error: "Admin account not found!"
          });
        }
      })



  }

  // Delete
  deleteAdmin(req, res) {
    let username = req.body.username; // Data from client

    // Check account is exist or not
    Admin.findOne({ username: username })
      .then(acc => {
        if (acc != null) { // If exist, delete account
          Admin.findOneAndRemove({ username: username })
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


  // ========== MANAGE USER ==========

  // Get all customers
  getAllCustomers = (req, res) => {
    Customer.find({}, { password: 0, __v: 0, activeCode: 0, _id: 0 })
      .then(customers => {
        return res.status(200).send(customers)
      })
  }

  // Update customer
  updateCustomer = (req, res) => {
    // Data from client
    let username = req.body.username;
    // Check account is exists or not
    Customer.find({ username: username })
      .then(acc => {
        if (acc.length >= 1) { // If exist, update account
          Customer.findOneAndUpdate({ username: username }, req.body)
            .then(() => {
              res.status(200).json({
                Result: "Update customer account successfully."
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

  // Soft delete
  softDeleteCustomer = (req, res) => {
    let username = req.body.username; // Data from client
    let currentTime = DateTime.utc().toISO(); // Current time
    // Data for soft client
    let accSoftDelDetail = {
      status: -1,
      deleteAt: currentTime
    }
    // Check account is exist or not
    Customer.findOne({ username: username })
      .then(acc => {
        if (acc) { // If exist
          if (acc.status == -1) { // If account has been soft delete before
            res.status(204).json({
              Error: "Customer account has been deleted before."
            })
          }
          else { // Or not, do soft delete
            Customer.findOneAndUpdate({ username: username }, accSoftDelDetail)
              .then(() => {
                res.status(200).json({
                  Result: "Soft delete customer account successfully."
                })
              })
          }
        }
        else { // Account not found
          res.status(404).json({
            Error: "Customer account not found!"
          });
        }
      })

  }

  // Delete
  deleteCustomer = (req, res) => {
    let username = req.body.username; // Data from client
    // Check account is exist or not
    Customer.find({ username: username })
      .then(acc => { // If exist, delete account
        if (acc.length >= 1) {
          Customer.findOneAndRemove({ username: username })
            .then(() => {
              res.status(200).json({
                Result: "Delete customer account successfully."
              })
            })
        }
        else { //  Account not found
          res.status(404).json({
            Error: "Customer account not found!"
          });
        }
      })


  }

}

export default new AdminController();
