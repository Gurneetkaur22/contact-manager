const express = require('express');
const router = express.Router();

let contacts = [];
let nextId = 1;

// Get all contacts
router.get('/', (req, res) => {
  res.json(contacts);
});

// Get single contact
router.get('/:id', (req, res) => {
  const contact = contacts.find(c => c._id == req.params.id);
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
});

// Create contact
router.post('/', (req, res) => {
  const contact = {
    _id: nextId++,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  contacts.push(contact);
  res.status(201).json(contact);
});

// Update contact
router.put('/:id', (req, res) => {
  const contact = contacts.find(c => c._id == req.params.id);
  if (!contact) return res.status(404).json({ message: 'Contact not found' });

  contact.name = req.body.name || contact.name;
  contact.email = req.body.email || contact.email;
  contact.phone = req.body.phone || contact.phone;
  contact.address = req.body.address || contact.address;

  res.json(contact);
});

// Delete contact
router.delete('/:id', (req, res) => {
  const index = contacts.findIndex(c => c._id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Contact not found' });

  contacts.splice(index, 1);
  res.json({ message: 'Contact deleted' });
});

module.exports = router;