const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// MongoDB URI from environment variable or default value for testing with Minikube
const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:pass123@mongo-service:27017/?authSource=admin';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Mongoose schema for Item
const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});
const Item = mongoose.model('Item', ItemSchema);

// API routes
app.get('/', (req, res) => res.send('Welcome to prac7p'));

// Create a new item (POST)
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).send({ message: 'Error creating item' });
  }
});

// Get all items (GET)
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving items' });
  }
});

// Delete an item by ID (DELETE)
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).send({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting item' });
  }
});

// Update an item by ID (PUT)
app.put('/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, quantity } = req.body;

  try {
    // Find the item and update it
    const updatedItem = await Item.findByIdAndUpdate(itemId, { name, quantity }, { new: true });

    if (!updatedItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(500).send({ message: 'Error updating item' });
  }
});

// Start server on port 3000
app.listen(3000, () => console.log('🚀 Server running on port 3000'));
