const prisma = require('../db/db');  // gives access to database operations (find, createm update...)

// GET: reading the order-item(s)
exports.getAllOrderItems = async (req, res) => {  // exports makes function available to other files (like routes). // async & await help handle database operations that take time
    const queries = req.query;
    const queryArr = Object.keys(queries);
    console.log(queries);
    
    const orderItems = await prisma.OrderItem.findMany();  // prisma get all orders items from database
    
    if (queryArr.length > 0) {  // if queries exist -> filter order items // using method that gives all keys for an obj (queries) in array format
        res.json(orderItems.filter(orderItem => {  // using .filter to create new arr w/ only order items that match the criteria (result = true) // the res.json() immediately send the filtered arr back to client
            const result = queryArr.every(key => {  // using .every to check if this order item matches all query criteria 
                console.log(`Comparing orderItem[${key}]: "${orderItem[key]}" with queries[${key}]: "${queries[key]}"`)
                return orderItem[key].toString().toLowerCase().includes(queries[key].toString().toLowerCase())  // returning the comparison 
            })
            return result;  // is either true (all properties match query criteria) or false (any property doesnt match)
        }))
    } else {  // queries not specified -> just return all orders 
        res.json(orderItems);  // sending back all orders in json format
    }
}

exports.getOrderItemById = async (req, res) => {
    const id = Number(req.params.id);  // get id as number from params in url (converts string to number)
    const orderItem = await prisma.orderItem.findUnique({where: {id}});  // getting one specific order item that matches our id variable
    if (!orderItem) return res.status(404).json({error: 'Order Not Found!'});  // order item not found, return http status 404 not found & send error message as json
    res.json(orderItem);  // if order found send back order in json format
}

// POST: creating an order item & adding it to the orders items list
exports.createOrderItem = async (req, res) => {
    const { orderId } = req.params;
    const { productId, quantity, price } = req.body;  // extract these specific fields (properties) from (obj) req.body (the json data sent in the post request)

    try {
         const newOrderItem = await prisma.orderItem.create({  // create a new order item in the database
        data: { 
            orderId: Number(orderId), 
            productId: Number(productId), 
            quantity: Number(quantity), 
            price: Number(price) }  // actual data to save
    })
        res.status(201).json(newOrderItem);  // http status 201 (created successfully) return newly created product in json format
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}