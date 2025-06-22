const prisma = require('../db/db');  // gives access to database operations (find, createm update...)

// GET: reading the product(s)
exports.getAllProducts = async (req, res) => {  // exports makes function available to other files (like routes). // async & await help handle database operations that take time
    const queries = req.query;
    const queryArr = Object.keys(queries);
    console.log(queries);
    
    const products = await prisma.product.findMany();  // prisma get all products from database
    
    if (queryArr.length > 0) {  // if queries exist -> filter prodycts // using method that gives all keys for an obj (queries) in array format
        res.json(products.filter(product => {  // using .filter to create new arr w/ only products that match the criteria (result = true) // the res.json() immediately send the filtered arr back to client
            const result = queryArr.every(key => {  // using .every to check if this product matches all query criteria 
                console.log(`Comparing product[${key}]: "${product[key]}" with queries[${key}]: "${queries[key]}"`)
                return product[key].toString().toLowerCase().includes(queries[key].toString().toLowerCase())  // returning the comparison 
            })
            return result;  // is either true (all properties match query criteria) or false (any property doesnt match)
        }))
    } else {  // queries not specified -> just return all products 
        res.json(products);  // sending back all products in json format
    }
}

exports.getProductById = async (req, res) => {
    const id = Number(req.params.id);  // get id as number from params in url (converts string to number)
    const product = await prisma.product.findUnique({where: {id}});  // getting one specific product that matches our id variable
    if (!product) return res.status(404).json({error: 'Product Not Found!'});  // product not found, return http status 404 not found & send error message as json
    res.json(product);  // if product found send back product in json format
}

// POST: creating a product & adding it to the products list
exports.createProduct = async (req, res) => {
    const { name, description, price, image_url, category } = req.body;  // extract these specific fields (properties) from (obj) req.body (the json data sent in the post request)
    const newProduct = await prisma.product.create({  // create a new product in the database
        data: { name, description, price, image_url, category }  // actual data to save
    })
    res.status(201).json(newProduct);  // http status 201 (created successfully) return newly created product in json format
}

// PUT: updating an existing product
exports.updateProduct = async (req, res) => {
    const id = Number(req.params.id);
    const { name, description, price, image_url, category } = req.body;
    const updatedProduct = await prisma.product.update({  // modify the existing product (update()) that has this id and change it to this data: {}
        where: { id },
        data: { name, description, price, image_url, category }
    })
    res.json(updatedProduct);
}

// DELETE: deleting a product from the array of existing products
exports.removeProduct = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.product.delete({  // remove product from database with this id (delete(), where{id})
        where: { id }
    })
    res.status(204).end();  // http 204 (no content - successful deletion) .end(): send empty response
}