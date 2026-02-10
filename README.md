# CapstoneConstruction Backend

## Project Overview
CapstoneConstruction is a backend REST API built using ASP.NET Core for managing construction projects. The application provides APIs to manage projects, tasks, and engineers and is intended to be consumed by a separate frontend application.

## Setup / Execution Steps
1. Clone the repository.
2. Configure the database connection using environment variables or a local `appsettings.json` file.
3. Apply database migrations using:
   `dotnet ef database update`
4. Run the application using:
   `dotnet run`
5. Access the API and Swagger UI at `https://localhost:<port>/swagger`.

## Key Features / Assumptions
- Supports CRUD operations for Projects, Tasks, and Engineers.
- A project can contain multiple tasks.
- Tasks can optionally be assigned to an engineer.
- Uses a service-layer architecture to separate business logic from controllers.
- Database migrations are included in source control.
