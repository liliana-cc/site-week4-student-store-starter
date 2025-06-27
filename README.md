## Unit Assignment: Student Store

Submitted by: **Liliana Cantero**

Deployed Application (optional): [Student Store Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [x] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [x]  Use Prisma to define models for `products`, `orders`, and `order_items`.
  - [x]  **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of your `products`, `orders`, and `order_items` tables. 
- [x] **Products Model**
  - [x] Develop a products model to represent individual items available in the store. 
  - [x] This model should at minimum include the attributes:
    - [x] `id`
    - [x] `name`
    - [x] `description`
    - [x] `price` 
    - [x] `image_url`
    - [x] `category`
  - [x] Implement methods for CRUD operations on products.
  - [x] Ensure transaction handling such that when an product is deleted, any `order_items` that reference that product are also deleted. 
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Products Model.
- [x] **Orders Model**
  - [x] Develop a model to manage orders. 
  - [x] This model should at minimum include the attributes:
    - [x] `order_id`
    - [x] `customer_id`
    - [x] `total_price`
    - [x] `status`
    - [x] `created_at`
  - [x] Implement methods for CRUD operations on orders.
  - [x] Ensure transaction handling such that when an order is deleted, any `order_items` that reference that order are also deleted. 
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Model.
- [x] **Order Items Model**
  - [x] Develop a model to represent the items within an order. 
  - [x] This model should at minimum include the attributes:
    - [x] `order_item_id`
    - [x] `order_id`
    - [x] `product_id`
    - [x] `quantity`
    - [x] `price`
  - [x] Implement methods for fetching and creating order items.  
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Items Model.
- [x] **API Endpoints**
  - [x] Application supports the following **Product Endpoints**:
    - [x] `GET /products`: Fetch a list of all products.
    - [x] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [x] `POST /products`: Add a new product to the database.
    - [x] `PUT /products/:id`: Update the details of an existing product.
    - [x] `DELETE /products/:id`: Remove a product from the database.
  - [x] Application supports the following **Order Endpoints**:
    - [x] `GET /orders`: Fetch a list of all orders.
    - [x] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [x] `POST /orders`: Create a new order with specified order items.
    - [x] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [x] `DELETE /orders/:order_id`: Remove an order from the database.
    - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Postman or another API testing tool to demonstrate the successful implementation of each endpoint. For the `DELETE` endpoints, please use Prisma Studio to demonstrate that any relevant order items have been deleted. 
- [x] **Frontend Integration**
  - [x] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.
  - [x] Ensure the home page displays products contained in the product table.
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use `npm start` to run your server and display your website in your browser. 
    - [x] Demonstrate that users can successfully add items to their shopping cart, delete items from their shopping cart, and place an order
    - [x] After placing an order use Postman or Prisma Studio demonstrate that a corresponding order has been created in your orders table.

### Stretch Features

- [x] **Added Endpoints**
  - [x] `GET /order-items`: Create an endpoint for fetching all order items in the database.
  - [x] `POST /orders/:order_id/items` Create an endpoint that adds a new order item to an existing order. 
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders.
  - [ ] The page lists all past orders for the user, including relevant information such as:
    - [ ] Order ID
    - [ ] Date
    - [ ] Total cost
    - [ ] Order status.
  - [ ] The user should be able to click on any individual order to take them to a separate page detailing the transaction.
  - [ ] The individual transaction page provides comprehensive information about the transaction, including:
    - [ ] List of order items
    - [ ] Order item quantities
    - [ ] Individual order item costs
    - [ ] Total order cost
- [ ] **Filter Orders**.
  - [ ] Create an input on the Past Orders page of the frontend application that allows the user to filter orders by the email of the person who placed the order. 
  - [ ] Users can type in an email and click a button to filter the orders.
  - [ ] Upon entering an email address adn submitting the input, the list of orders is filtered to only show orders placed by the user with the provided email. 
  - [ ] The user can easily navigate back to the full list of ordres after filtering. 
    - [ ] Proper error handling is implemented, such as displaying "no orders found" when an invalid email is porvided.
- [ ] **Deployment**
  - [ ] Website is deployed using [Render](https://courses.codepath.org/snippets/site/render_deployment_guide).
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the deployed version of your website in your walkthrough with the URL visible. 



### Walkthrough Video

Please watch all videos for the sake of simplicity for grading. Thank you!

[Student Store Walkthrough Part 1](https://www.loom.com/share/c798b7afed7e4a2ca8a291809aeb01c7?sid=529e7c62-46b2-4eaf-80e9-ca51cbd7de08)
[Student Store Walkthrough Part 2](https://www.loom.com/share/a465212a30814098afabe5b2545bc108?sid=da7eca6c-1e92-4470-bcd1-c7ac1133d35a)
[Student Store Walkthrough Cascade Delete](https://www.loom.com/share/26b4f6489d5444138296d65249b7e447?sid=8138553a-5000-4eff-aa59-12cc71d2fac4)



### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, the topics discussed this week, specifically on the connectivity between models, controllers, and routes, were very helpful! As for feeling unprepared at any point of this project, I would say I was not prepared for how much of a scavenger hunt it could be. Looking over front-end ui code that I did not make was challenging, especially when trying to figure out which variables connected to the backend I created, but it was refreshing and useful since I am aware this is a skill we will need to hone in on as we continue our careers in the industry.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would have loved to implement a login page that stores login information locally for users to see their saved orders. I would have also liked to work on a more personalized front end and the capability of users to see their past orders and potentially reorder.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

My project demo this week was better than last weeks for sure! I gave myself time to practice and really settle in with what I wanted to present. While presenting is still nerveracking, I appreciate all of the constructive advice I get as I know it will make me a better presenter in the future. I would love to not use as many filler words and be intentional with every word I use as time is precious when presenting. I think an advisor also mentioned my excessive comments on the code I presented, which I believe was helpful as it would make the code easier to understand and digest if there weren't so much visual noise. I believe it was also mentioned that I should reduce the comments in my actual code, however, since this is a project meant to help me build my skills, I think my comments will help bring me clarity in the future if I ever want to look back at my projects for reference on future endeavors. That being said, I understand that in a team / professional environment, making comments for code easy to read and not distracting is imperative, but for my personal usage, I will add as many helpful and clarifying comments for myself.

### Open-source libraries used

- https://www.prisma.io/docs/orm/reference/prisma-client-reference
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- https://expressjs.com/en/guide/writing-middleware.html
- https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

Thank you for Jasmine for helping bring me clarity on the handleOnCheckout function and also Ayomide for working and struggling through the creation of that function together. I also want to thank Paola and Sarvesh for helping me set up node mon and bringing clarity on the endpoints aspect. Finally, a special thank you to Devarsh for being a compassionate and approachable instructor. Our SalesforcexCodepath family is becoming more tight-nit, and I am beyond grateful for the opportunity to work alongside so many amazing and hardworking individuals!





