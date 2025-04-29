# 🍽️ MealMile Microservices Platform

MealMile is a modular microservices-based food delivery and management system. It allows restaurants to register and manage orders, deliveries, reviews, and payments using a React frontend and multiple Node.js-based backend services, all orchestrated using Docker Compose.

---

## 📦 Services Overview

| Service             | Description                                              | Port |
|---------------------|----------------------------------------------------------|------|
| **restaurant_service** | Handles user auth, restaurant registration & location  | 8086 |
| **order_service**      | Manages order creation and status updates             | 8089 |
| **delivery_service**   | Assigns delivery and tracks status                    | 8090 |
| **review_service**     | Collects user reviews and ratings for restaurants     | 8095 |
| **payment_service**    | Integrates Stripe for secure payments                 | 8087 |
| **frontend**           | React-based web client                                | 3000 |

---

## 🗂️ Project Structure

```
MealMile/
├── restaurant_service/
├── order_service/
├── delivery_service/
├── review_service/
├── payment_service/
├── frontend/
├── docker-compose.yml
```

---

## ⚙️ Environment Setup

Each service has its own `.env` file. Examples:

### restaurant_service/.env
```
PORT=8086
MONGO_URL=mongodb+srv://<your-connection>
JWT_SECRET=your_jwt_secret
DEV_MODE=development
```

### payment_service/.env
```
PORT=8087
STRIPE_SECRET_KEY=your_stripe_key
FRONTEND_URL=http://localhost:3000
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
```

### order_service/.env:
```
PORT=8089  
MONGO_URL=mongodb+srv://<your-connection-string>  
DEV_MODE=development 
```

### delivery_service/.env:
```
PORT=8090  
MONGO_URL=mongodb+srv://<your-connection-string>  
DEV_MODE=development  
```

### review_service/.env:
```
PORT=8095  
MONGO_URL=mongodb+srv://<your-connection-string>  
DEV_MODE=development 
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/MealMile.git
cd MealMile
```

### 2. Build and Start All Services
```bash
docker-compose build
docker-compose up
```

### 3. Access the Frontend
Open your browser at:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 📬 Webhook Testing (Stripe)

To test payment webhooks:

```bash
stripe login
stripe listen --forward-to localhost:8087/api/webhook
```

---

## 🛑 Stopping the Services

```bash
docker-compose down        # Stop containers
docker-compose down -v     # Stop + remove volumes
```

---

## 🐞 Common Issues

- ❌ **"Service not available"** – container may not have started  
- ❌ **"Connection refused"** – check Docker service name & port  
- ❌ **"Stripe webhook not working"** – verify Stripe CLI is running  

---

## 👨‍💻 Authors

**Team ID**: Y3S2-WD-02  

---

## 📄 License

This project is for academic and educational use. All rights reserved by the authors.

---

