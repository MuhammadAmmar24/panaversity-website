# Panaversity Web

Panaversity Web is a comprehensive platform for delivering digital learning and developer training in Generative AI applications. Built with Next.js and a suite of microservices, Panaversity offers structured programs, progress tracking, and diverse payment options.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Onboarding:** Seamless introduction for new users with interactive guides.
- **Course Enrollment:** Comprehensive enrollment process with prerequisite checks.
- **Payment Processing:** Secure handling of payments with multiple payment options.
- **Progress Tracking:** Intuitive dashboard for tracking learning progress.
- **AI-Powered Chatbot:** Real-time assistance and personalized recommendations.

## Architecture

Panaversity Web follows a **microservices architecture**, with the frontend built on Next.js and backend services containerized for scalability and reliability.

### Frontend

- **Framework:** Next.js
- **Deployment:** Vercel

### Backend

- **Microservices:** User Management, Enrollment, Payment, Course Content, Progress Tracking, Assessment, Notification, Feedback
- **Containerization:** Docker
- **Orchestration:** Kubernetes (GKE/EKS/AKS) or Serverless Containers (AWS Fargate/Azure Container Instances)

## Getting Started

### Prerequisites

- Node.js (v20.17.01)
- Docker
- VSCode
- GitHub Account
- Kubernetes Cluster (for backend microservices)

### Installation

#### Frontend (`panaversity-web`)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/panaversity/panaversity-web.git
   cd panaversity-web
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env.local` file based on `.env.example`.
   - Add necessary environment variables (e.g., API endpoints).

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

#### Backend (`panaversity-backend`)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/panaversity/panaversity-backend.git
   cd panaversity-backend
   ```

2. **Navigate to a Microservice:**
   ```bash
   cd microservices/user-management
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**
   - Create a `.env` file based on `.env.example`.
   - Add necessary environment variables (e.g., database URLs, API keys).

5. **Build and Run the Microservice:**
   ```bash
   npm run build
   npm start
   ```

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact [zia@panaversity.org](mailto:zia@panaversity.org).
```
