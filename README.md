# SendIT Parcel Delivery System

A full-stack parcel delivery application with real-time tracking, notifications, and user management.

## Features

- **User Authentication**: Secure login/register system
- **Parcel Management**: Create, track, and manage deliveries
- **Real-time Tracking**: Live map tracking for parcels
- **Notifications**: Email and SMS alerts for status updates
- **Weight-based Pricing**: Transparent pricing based on parcel weight
- **Admin Dashboard**: Comprehensive admin interface

## Tech Stack

### Backend
- **NestJS**: Node.js framework
- **PostgreSQL**: Database
- **Prisma**: ORM
- **JWT**: Authentication
- **Passport**: Authentication strategies

### Frontend
- **Angular 17**: Modern Angular with standalone components
- **TypeScript**: Type-safe development
- **CSS3**: Modern styling with gradients and animations

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sendit_db"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Create test user**:
   ```bash
   npm run create-test-user
   ```

6. **Start the backend server**:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd sendit-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

## Testing the Login Functionality

### Test Credentials
- **Email**: `test@example.com`
- **Password**: `password123`

### Steps to Test

1. **Start both servers** (backend on port 3000, frontend on port 4200)

2. **Open the application** in your browser at `http://localhost:4200`

3. **Click the "Login" button** in the navigation bar

4. **Enter the test credentials**:
   - Email: `test@example.com`
   - Password: `password123`

5. **Click "Log In"** - you should be redirected to the dashboard

6. **Verify the dashboard** shows your user information and navigation options

### Expected Behavior

- ✅ Purple login button opens modal
- ✅ Form validation works (email format, required fields)
- ✅ Successful login redirects to dashboard
- ✅ Dashboard shows user information
- ✅ Logout functionality works
- ✅ Authentication state persists across page refreshes

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token
- `GET /auth/profile` - Get user profile

### Parcels
- `GET /parcels` - Get user's parcels
- `POST /parcels` - Create new parcel
- `GET /parcels/:id` - Get parcel details
- `PUT /parcels/:id` - Update parcel

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS configuration includes your frontend URL
2. **Database Connection**: Verify your PostgreSQL connection string in `.env`
3. **JWT Secret**: Make sure `JWT_SECRET` is set in your environment variables
4. **Port Conflicts**: Ensure ports 3000 (backend) and 4200 (frontend) are available

### Debug Mode

To run in debug mode:
```bash
# Backend
npm run start:debug

# Frontend
npm start
```

## Project Structure

```
parcel_delivery/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── parcel/         # Parcel management
│   │   ├── user/           # User management
│   │   └── ...
│   └── prisma/             # Database schema
└── sendit-frontend/        # Angular frontend
    └── src/app/
        ├── core/           # Core services and models
        ├── features/       # Feature modules
        └── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 