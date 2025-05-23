const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Admin login or register (no password)
router.post('/admin/login', async (req, res) => {
const { name, email } = req.body;
if (!name || !email) return res.status(400).json({ message: 'Name and email required' });

let admin = await Admin.findOne({ email });
if (!admin) {
admin = new Admin({ name, email });
await admin.save();
}
res.json({ success: true, admin });
});

module.exports = router; 