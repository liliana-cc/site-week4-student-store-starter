const express = require('express');  // importing express library
const productRoutes = require('./routes/productRoutes');  // importing routes
const orderRoutes = require('./routes/orderRoutes')
const orderItemRoutes = require('./routes/order-itemRoutes')

const app = express();

app.use(express.json());  // middleware for parsing json bodies

app.use('/products', productRoutes);  // registering product routes under the /products path
app.use('/orders', orderRoutes);
app.use('/orderitems', orderItemRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})