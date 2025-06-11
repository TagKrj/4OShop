# 4O Fashion E-commerce Project

[English (Current) | Tiếng Việt](README.vi.md)

<div align="center">
  <img src="assets/images/fashion-slideshow-06.jpg" alt="4O Fashion E-commerce Preview" width="100%" />
</div>


## Overview

4O Fashion is a modern e-commerce web application for fashion products that allows users to browse, search, and purchase clothing and accessories online. It offers features like user authentication, shopping cart management, wishlists, order processing, and payment integration.

## Project Structure

The project follows the MVVM (Model-View-ViewModel) architecture pattern:

- **models/**: Contains data models that represent the domain entities (products, cart items, orders, etc.)
- **views/**: Contains UI components and templates for displaying data to users
- **viewmodels/**: Contains the logic that connects the models to the views
- **services/**: Contains utility services like API service for backend communication
- **scripts/**: Contains JavaScript files for page-specific functionality
- **styles/**: Contains CSS stylesheets for the UI
- **assets/**: Contains images and other static resources

## Features

### User Authentication
- User registration and login system
- User profile management
- Authentication token handling for secure API access

### Product Catalog
- Browse products by categories and types
- Gender-specific clothing sections
- Search functionality
- Detailed product pages with descriptions, prices, and ratings
- Featured products section

### Shopping Cart
- Add products to cart
- Update product quantities
- Remove products from cart
- Calculate cart totals

### Wishlist
- Add/remove products to a personal wishlist
- Move items from wishlist to cart

### Checkout Process
- Multiple shipping address management
- Address creation, editing, and deletion
- Order summary and confirmation
- Multiple payment methods

### Order Management
- Order history view
- Order status tracking
- Order details

### Notifications
- User notifications system
- Order status updates
- Promotional notifications

## Technical Details

### API Integration
The application connects to a RESTful API backend at `http://20.255.56.110:8000/api/` that handles:
- Data storage and retrieval
- User authentication
- Order processing
- Payment integration

### Code Organization

#### Models
- **productModel.js**: Represents a fashion product with properties like title, price, description
- **cartModel.js**: Represents items in the shopping cart
- **orderModel.js**: Represents customer orders
- **addressModel.js**: Manages user shipping addresses
- **paymentModel.js**: Handles payment methods and transactions
- **notificationModel.js**: Handles user notifications

#### ViewModels
- **productViewModel.js**: Manages product data and operations
- **cartViewModel.js**: Handles cart operations
- **addCartViewModel.js**: Manages adding items to cart
- **wishlistViewModel.js**: Handles wishlist operations
- **loginViewModel.js**: Manages user authentication
- **registerViewModel.js**: Handles user registration
- **searchViewModel.js**: Processes search queries
- **paymentViewModel.js**: Handles payment processing

### Data Flow
1. ViewModels fetch data from the API
2. Data is transformed into model instances
3. Views render the data for user interaction
4. User actions trigger ViewModel methods
5. ViewModels update models and API as needed

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### Running the Application
1. Clone the repository
2. Open the main HTML file in a web browser
3. Or use a local development server (like Live Server in VS Code)

## Development Guidelines

### Adding New Features
1. Create or update the relevant model(s)
2. Implement ViewModel logic to handle the feature
3. Create or update the corresponding view
4. Connect everything together using event listeners and DOM manipulation

### API Communication
Example of making an API request:

```javascript
// Example of adding an item to cart
import apiService from '../services/apiService.js';

async function addToCart(token, productId, quantity, size, color) {
    try {
        const response = await apiService.post('/cart/add/', { 
            product: productId, 
            quantity, 
            size, 
            color 
        }, token);
        
        return response;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}
```
