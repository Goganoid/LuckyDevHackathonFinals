# LuckyDevFinals
## [Task](https://drive.google.com/file/d/10u201Y0vTwEw38z9LDZJdpuVvuvg9xNq/view?usp=sharing)
## Default logins
User - john_doe@gmail.com // 123456
Company - company_email@gmail.com // 123456
## Tech Stack
Backend:
- [.NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- ASP.NET
- Entity framework
- In Memory Database
  
Frontend:
- TypeScript
- React
- Bootstrap

Production version is hosted on Azure.

[Website](https://luckydevfinal.azurewebsites.net/)

Please, note that Azure has to warm up the server on the first request so the response may take 30-40 seconds. If you encounter any problems, DM me in Telegram [@yokano](https://t.me/yokano).
You can run the local development version using instructions inside the `LuckyDev` folder.

## Local Start

## Run Client
```
cd ClientApp
npm install
npm start
```

## Where is the client?
Open ClientApp folder and follow instructions inside it.

## Starting the server

First, install dependencies
#### `dotnet restore`

Then start the server
#### `dotnet run --launch-profile LuckyDevFinals`

It will be launched on https://localhost:7003. To see API and documentation open https://localhost:7003/swagger.

## Project structure
 - Controllers/ — API endpoints
 - Data/ — Code-first database configuration
 - Entities/ — Database entities and DTOs
 - Extensions/ — helper functions for startup configuration
 - Helpers/ — Misc functions
 - Migrations/ — database migrations
 - Pages/ — default error page
