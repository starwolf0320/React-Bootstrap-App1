1. Create React Bootstrap App
   1. create mern-marketplace folder
   2. npx create-react-app frontend
   3. npm start
   4. npm install react-bootstrap
   5. link bootstrap.css CDN to index.html
   6. create <>
   7. header
   8. create Navbar, LinkContainer, Navbar.Brand
   9. create Navbar.Toggle, Navbar.Collapse,
   10. Nav, Nav.Link Cart and Nav.Link Sign In
   11. main
   12. create Container and sample content
   13. footer
   14. create Container, Row, Col, copyright
   15. Update style.css to se min-height for main
2. List Products
   1. create an array of products in products.js
   2. copy some images (680x830) in images folder in public folder
   3. create Product.js component
   4. show product name from props
   5. Use Product component in App.js by creating map() over products
   6. complete Product component to show the products
3. Create Rating Component
   1. create components/Rating.js
   2. link to fontawesome.css in index.html
   3. create div.rating
   4. define Rating object with render()
   5. if !props.value return empty div
   6. else use fa fa-star, fa-star-half-o and fa-star-o
   7. last span for props.text || ''
   8. style div.rating, span and last span
   9. Edit Product component
   10. Use Rating component
4. Product Details Screen
   1. Install react-router-dom react-router-bootstrap
   2. Use BrowserRouter and Route for Home Screen
   3. Create HomeScreen.js
   4. Add product list code there
   5. Create ProductScreen.js
   6. Add new Route from product details to App.js
   7. Create 3 columns for product image, info and action
5. Create Node.JS Server
   1. run npm init in root folder
   2. npm install express
   3. create server.js
   4. add start command as node backend/server.js
   5. require express
   6. create route for / return backend is ready.
   7. move products.js from frontend to backend
   8. create route for /api/products
   9. return products
   10. run npm start
6. Load Products From Backend
   1. edit HomeScreen.js
   2. define products, loading and error.
   3. create useEffect
   4. define async fetchData and call it
   5. install axios
   6. get data from /api/products
   7. show them in the list
7. Install Babel And Nodemon
   1. npm install -D babel core, cli, node, preset-env
   2. Create .babelrc and set presets to @babel/preset-env
   3. npm install -D nodemon
   4. set start: nodemon --watch backend --exec babel-node backend/server.js
   5. convert require to import in server.js
   6. npm start
8. Install ESlint For Code Linting
   1. npm install -D eslint
   2. install VSCode eslint extension
   3. Set VSCode setting for eslint
   4. Install prettier extension
   5. npm install -D eslint-config-prettier
   6. Add extends: "prettier"
9. Add Redux to Home Screen
   1. npm install redux react-redux
   2. Create store.js
   3. initState= {products:[]}
   4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
   5. export default createStore(reducer, initState)
   6. Edit HomeScreen.js
   7. shopName = useSelector(state=>state.products)
   8. const dispatch = useDispatch()
   9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data})
   10. Add store to index.js
10. Show Loading and Message Box
    1. Create Loading Component
    2. Create Message Box Component
    3. Use them in HomeScreen
11. Add Redux to Product Screen
    1. create product details constants, actions and reducers
    2. add reducer to store.js
    3. use action in ProductScreen.js
    4. add /api/product/:id to backend api
