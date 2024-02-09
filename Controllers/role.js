require('dotenv').config();
const db = require('../models/index');

// Import necessary models
const Role = db.Role;
const Module = db.Module;
const Permission = db.Permission;

// // Define your API endpoint
// const createRoleWithPermissions = async (req, res) => {
//     try {
//         const { role, description, permissions } = req.body;

//         // check if role already existing role
//         // const existingRole = await Role.findOne({where: {name: role}});
//         // if(existingRole){
//         //     return res.status(400).json({error: "Role already exists"})
//         // }
//         // Create the role
//         const newRole = await Role.create({
//             name: role,
//             description: description
//         });
//         // Loop through each permission and assign it to the respective module
//         for (const perm of permissions) {
//             const { module, all, create, read, update, delete: del } = perm;
//             // Find or create the module
//             let moduleInstance = await Module.findOne({ where: { name: module } });
//             if (!moduleInstance) {
//                 moduleInstance = await Module.create({ name: module });
//             }
//             // Find or create the permission
//             let permissionInstance = await Permission.findOne({ where: { name: module } });
//             if (!permissionInstance) {
//                 permissionInstance = await Permission.create({ name: module });
//             }
//             // Associate permission with module
//             await moduleInstance.addPermission(permissionInstance, {
//                 through: {
//                     all: !!all, // Convert to boolean
//                     create: !!create, // Convert to boolean
//                     read: !!read, // Convert to boolean
//                     update: !!update, // Convert to boolean
//                     delete: !!del // Convert to boolean
//                 }
//             });
//             // Associate the module with the role
//             await newRole.addModule(moduleInstance);
//         }
//         res.status(201).json({ message: 'Role created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


const createRoleWithPermissions = async (req, res) => {
  try {
    const { role, description, permissions } = req.body;
    // Create the role entry
    const newRole = await Role.create({
      name: role,
      description: description
    });
    // Iterate through permissions and associate modules with permissions
    for (const permissionData of permissions) {
      const { module, all, create, read, update, delete: del } = permissionData;
      // Find or create the module
      const [newModule, created] = await Module.findOrCreate({
        where: { name: module }
      });
      // Create a new permission
      const newPermission = await Permission.create({
        all,
        create,
        read,
        update,
        delete: del
      });
 
      // Associate the permission with the module
      await newPermission.addModule(newModule);
      // Associate the permission with the role
      await newRole.addPermission(newPermission);
    }
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};



module.exports = { createRoleWithPermissions }

// require('dotenv').config();
// var db = require('../models/index');

// // Import necessary models
// const Role = db.Role
// const Module = db.Module
// const Permission = db.Permission

// // Define your API endpoint

// const createRoleWithPermissions = async (req, res) => {
//     try {
//         const { role, description, permissions } = req.body;
//         // Create the role
//         const newRole = await Role.create({
//             name: role,
//             description: description
//         });
//         // Loop through each permission and assign it to the respective module
//         for (const perm of permissions) {
//             const { module, all, create, read, update, delete: del } = perm;
//             // Find or create the module
//             const [moduleInstance, created] = await Module.findOrCreate({
//                 where: { name: module }
//             });
//             // Add permissions to the module
//             await moduleInstance.addPermission(moduleInstance, {
//                 through: {
//                     all: all,
//                     create: create,
//                     read: read,
//                     update: update,
//                     delete: del
//                 }
//             });
//             // Associate the module with the role
//             await newRole.addModule(moduleInstance);
//         }
//         res.status(201).json({ message: 'Role created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };