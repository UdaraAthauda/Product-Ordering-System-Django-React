📦 Product Ordering System


A modern full-stack product ordering platform built with Django REST Framework (backend) and React + Chakra UI (frontend). This system lets users explore products, filter by category, add items to a cart, place orders, and track their order status — all within a clean and responsive interface.


✨ Features
🔐 Authentication & Security

Email/password authentication

Google login with OAuth

JWT-based secure API authentication



🛍️ Product & Cart Management

Browse products with category-based filtering

Add/remove/update items in the cart

Real-time cart total calculation

Quantity adjustment with instant UI updates



📦 Order Management

Place orders directly from the cart

Track live order status (Pending → Confirmed → Shipped → Delivered → Cancelled)

Cancel existing orders

Service rating & feedback system



🎨 Frontend (React + Chakra UI)

Responsive and interactive UI with Chakra UI

Dynamic product grid with filters

Order history with tab navigation (pending/delivered)

Empty state illustrations for cart & orders

⚙️ Backend (Django REST Framework)

Custom user model (email as username)

Cart & order models with constraints and relationships

Atomic transactions for safe order creation

Well-structured REST API endpoints with JWT auth



📊 Extras

SEO-friendly API endpoints for products & categories

Modular, scalable code structure

Ready for Docker deployment

Built with best practices in mind for learning and production



🏗️ Tech Stack

Frontend:

React

Chakra UI

Axios

Backend:

Django

Django REST Framework (DRF)

Simple JWT

Google OAuth (django-allauth + dj-rest-auth)

Database:

PostgreSQL (can also work with SQLite in dev mode)

Deployment-ready:

Docker

Nginx + uWSGI (for production setup)
