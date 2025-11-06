# MyChart Portal

A modern healthcare patient portal built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Build

```bash
npm run build
# or
yarn build
```

## Features

### 1. Dashboard

- Quick access to all portal features
- Personalized welcome message
- Real-time notifications and announcements
- Card-based navigation interface

### 2. Appointments

- Schedule new appointments
- View upcoming appointments
- Reschedule or cancel existing appointments
- Specialized imaging visit scheduling

### 3. Visits

- View past visit history
- Access visit summaries
- Download clinical notes
- Track upcoming visits

### 4. Messages

- Secure messaging with healthcare providers
- View message history
- Automated message notifications
- Categorized message organization

### 5. Billing

- View current balances
- Make payments
- Access billing history
- Download statements
- Insurance information

### 6. Medications

- Current medication list
- Prescription refill requests
- Medication history
- Personal medication notes
- Pharmacy management

### 7. Test Reports

- View test results
- Download lab reports
- Track result history
- Result notifications

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Zustand (State Management)
- Lucide Icons
- Shadcn UI Components

## Project Structure

```
src/
├── api/              # API integration
├── components/       # Shared UI components
├── features/         # Feature-specific modules
├── lib/             # Utilities and helpers
└── store/           # State management
```
