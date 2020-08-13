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
