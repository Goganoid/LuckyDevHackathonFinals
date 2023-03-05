# LuckyDevFinals
## Tech Stack
Backend:
- [.NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- ASP.NET
- Entity framework
- Sqlite for development, SQL server for production
  
Frontend:
- TypeScript
- React
- Bootstrap

Production version is hosted on Azure.

Website: -_-

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
