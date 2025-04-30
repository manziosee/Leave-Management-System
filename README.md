# Leave Management System
A modern, responsive leave management system designed to streamline employee leave requests, approvals, and tracking for organizations of all sizes.

## Live Demo

The application is hosted on Vercel:  
🔗 [Leave Management System Live Demo](https://leave-management-system-woad.vercel.app/)

## Features

- **User Authentication**: Secure login with email/password or Google OAuth
- **Leave Application**: Intuitive form for submitting leave requests
- **Leave Tracking**: View leave history and current status
- **Approval Workflow**: Managers can approve/reject leave requests
- **Team Calendar**: Visual overview of team availability
- **Leave Balances**: Track remaining leave days by type
- **Holiday Management**: View upcoming public holidays
- **Dark/Light Mode**: Supports both color schemes
- **Responsive Design**: Works on desktop, tablet, and mobile

## Technologies Used

### Frontend
- **React** (v18) with TypeScript
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **React Router** (Routing)
- **React Icons** & **Lucide React** (Icons)
- **Context API** (State management)

### Backend (Mocked for demo)
- Local storage for session persistence
- Mock data services

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/leave-management-system.git
   cd leave-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to:
   ```bash
   http://localhost:5173/
   ```

### Building for Production

```bash
npm run build
```

## Project Structure

```
leave-management-system/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components
│   ├── context/       # Context providers
│   ├── pages/         # Application pages
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .eslintrc.js       # ESLint configuration
├── index.html         # Main HTML file
├── package.json       # Project dependencies
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run lint`: Runs ESLint to check for code issues
- `npm run preview`: Previews the production build locally

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact [your email].

---

**Note**: This is a frontend-only demo application with mocked backend services. In a production environment, you would need to connect it to a real backend API.