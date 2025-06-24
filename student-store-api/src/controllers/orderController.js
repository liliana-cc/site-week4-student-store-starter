const prisma = require('../db/db');  // gives access to database operations (find, createm update...)

// GET: reading the order(s)
exports.getAllOrders = async (req, res) => {  // exports makes function available to other files (like routes). // async & await help handle database operations that take time
    const queries = req.query;
    const queryArr = Object.keys(queries);
    console.log(queries);
    
    const orders = await prisma.order.findMany({
        include: {  // including the relation
            orderItem: true,
        }
    });  // prisma get all orders from database

    orders.forEach((order) => {  // updating order total
        order.total = order.orderItem.reduce((total, currentOrderItem) => {
        total += currentOrderItem.quantity * currentOrderItem.price;
        return total;
        }, 0)
    })

    if (queryArr.length > 0) {  // if queries exist -> filter orders // using method that gives all keys for an obj (queries) in array format
        res.json(orders.filter(order => {  // using .filter to create new arr w/ only orders that match the criteria (result = true) // the res.json() immediately send the filtered arr back to client
            const result = queryArr.every(key => {  // using .every to check if this order matches all query criteria 
                console.log(`Comparing order[${key}]: "${order[key]}" with queries[${key}]: "${queries[key]}"`)
                return order[key].toString().toLowerCase().includes(queries[key].toString().toLowerCase())  // returning the comparison 
            })
            return result;  // is either true (all properties match query criteria) or false (any property doesnt match)
        }))
    } else {  // queries not specified -> just return all orders 
        res.json(orders);  // sending back all orders in json format
    }
}

exports.getOrderById = async (req, res) => {
    const id = Number(req.params.id);  // get id as number from params in url (converts string to number)
    const order = await prisma.order.findUnique({
        where: {id},
        include: {orderItem: true }});  // getting one specific order that matches our id variable
    if (!order) return res.status(404).json({error: 'Order Not Found!'});  // order not found, return http status 404 not found & send error message as json
    res.json(order);  // if order found send back order in json format
}

exports.getTotal = async (req, res) => {
    const id = Number(req.params.order_id);  // get id as number from params in url (converts string to number)
    const orderItems = await prisma.orderItem.findMany({where: {orderId: id}});  // prisma get all orders items w/ id specified in link
    
     const sum = orderItems.reduce((total, currentOrderItem) => {
        total += currentOrderItem.quantity * currentOrderItem.price;
        return total;
    }, 0)

    if (orderItems.length > 0) {
        res.json(sum);  // if order found send back order in json format
    } else {
        return res.status(404).json({error: 'Order Item Not Found!'});  // order not found, return http status 404 not found & send error message as json
    }
}

// POST: creating an order & adding it to the orders list
exports.createOrder = async (req, res) => {
    const { customer, total, status, orderItem } = req.body;  // extract these specific fields (properties) from (obj) req.body (the json data sent in the post request)
    const newOrder = await prisma.order.create({  // create a new order in the database
        data: { customer, total, status, orderItem }  // actual data to save
    })
    res.status(201).json(newOrder);  // http status 201 (created successfully) return newly created product in json format
}

exports.addOrderItems = async (req, res) => {
    const id = Number(req.params.order_id);  // get id as number from params in url (converts string to number)
    const { productId, quantity, price } = req.body;
    try {
        const newOrderItem = await prisma.orderItem.create({  // create a new order item in the database
        data: { 
            orderId: Number(id), 
            productId: Number(productId), 
            quantity: Number(quantity), 
            price: Number(price) }  // actual data to save
    })
        res.status(201).json(newOrderItem);  // http status 201 (created successfully) return newly created product in json format
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// PUT: updating an existing order
exports.updateOrder = async (req, res) => {
    const id = Number(req.params.id);
    console.log('HERE',req.body)
    const { customer, total, status, orderItem } = req.body;
    const updatedOrder = await prisma.order.update({  // modify the existing order (update()) that has this id and change it to this data: {}
        where: { id },
        data: { customer, total, status, orderItem}
    })
    res.json(updatedOrder);
}

// DELETE: deleting an order from the array of existing orders
exports.removeOrder = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.order.delete({  // remove order from database with this id (delete(), where{id})
        where: { id }
    })
    res.status(204).end();  // http 204 (no content - successful deletion) .end(): send empty response
}