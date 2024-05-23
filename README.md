# Marketplace For Recruiters And Candidates Angular Web Application

## Overview

This project is a marketplace web application designed to connect recruiters with candidates. The front-end is developed using Angular, and the back-end is powered by a JSON server for handling data. The application allows recruiters to post job listings and candidates to apply for these jobs.

## Authors

- [**KADDARI Ziad**](https://www.linkedin.com/in/ziadkaddari/)
- [**OUFKIR Abdelhakim**](https://www.linkedin.com/in/oufkir-abdel-hakim/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (>= 12.x)
- Angular CLI (>= 11.x)

### Front-End Setup

1. Clone the repository:
    ```sh
    git clone [https://github.com/Ziadkad/Angular-Application-de-gestion-de-CV]
    cd GestionCV
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the Angular development server:
    ```sh
    ng serve
    ```
   The application will be running at `http://localhost:4200/`.

### Back-End Setup

1. Navigate to the `server` directory:
    ```sh
    cd JsonServer
    ```

2. Install JSON server globally if you haven't already:
    ```sh
    npm install -g json-server
    ```

3. Start the JSON server:
    ```sh
    json-server --watch db.json
    ```
   The JSON server will be running at `http://localhost:3000/`.

## Usage

### Accessing the Application

Open your browser and navigate to `http://localhost:4200/`. You will be able to see the marketplace application where recruiters can post jobs and candidates can apply for them.

### Sample Data

The `db.json` file in the `JsonServer` directory contains sample data for recruiters, job postings, and candidates. You can modify this file to test different scenarios.

## Features

- **Recruiter Features**:
  - Create and manage job postings
  - View applications for their job postings

- **Candidate Features**:
  - Browse available job listings
  - Apply for jobs
  - Manage their profile

## Project Structure
```
Projet/
├── GestionCV/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── add-offer/
│   │   │   │   ├── applications/
│   │   │   │   ├── candidates/
│   │   │   │   ├── contact/
│   │   │   │   ├── faq/
│   │   │   │   ├── footer/
│   │   │   │   ├── home/
│   │   │   │   ├── my-offers/
│   │   │   │   ├── navbar/
│   │   │   │   ├── offers/
│   │   │   │   ├── profile/
│   │   │   │   ├── signin/
│   │   │   │   ├── signup/
│   │   │   │   ├── signup-candidates/
│   │   │   │   ├── signup-choose/
│   │   │   │   ├── signup-companies/
│   │   │   │   └── validators/
│   │   ├── enums/
│   │   ├── guards/
│   │   ├── interfaces/
│   │   ├── services/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   │   └── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   └── package.json  
├── JsonServer/
│   └── db.json
└── README.md
```





## API Endpoints

### Recruiters

- `GET /companies` - Get all recruiters
- `GET /companies/:id` - Get recruiter by ID
- `POST /companies` - Add a new recruiter

### Job Postings

- `GET /jobOffers` - Get all job postings
- `GET /jobOffers/:id` - Get job posting by ID
- `POST /jobOffers` - Add a new job posting
- `PUT /jobOffers/:id` - Update job posting by ID
- `DELETE /jobOffers/:id` - Delete job posting by ID

### Candidates

- `GET /candidates` - Get all candidates
- `GET /candidates/:id` - Get candidate by ID
- `POST /candidates` - Add a new candidate
- `PUT /candidates/:id` - Update candidate by ID
- `DELETE /candidates/:id` - Delete candidate by ID

### Applications

- `GET /postulations` - Get all candidates
- `GET /postulations/:id` - Get candidate by ID
- `POST /postulations` - Add a new candidate
- `PUT /postulations/:id` - Update candidate by ID
- `DELETE /postulations/:id` - Delete candidate by ID


## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy coding! If you have any questions or need further assistance, feel free to contact us.

- [**KADDARI Ziad**](https://www.linkedin.com/in/ziadkaddari/)
- [**OUFKIR Abdelhakim**](https://www.linkedin.com/in/oufkir-abdel-hakim/)
