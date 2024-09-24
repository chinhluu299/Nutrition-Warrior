# Nutrition Warrior
## Mobile application for Nutrition and Fitness 
**Features:**
+ Register, Login, Forgot password (Authentication)
+ Provide physical condition and select goals
+ Manage personal account
+ Nutrition monitoring
+ Cooking guide
+ Food lookup
+ Add food to daily log
+ Exercise guide
+ Add workout to daily log
+ Daily workouts
+ Daily log
+ View statistical charts
+ User tracking
+ Post updates
+ Feedback from virtual assistant
+ Meal analysis
+ Food detection (Yolov8)

**Technologies and Architecture:**
<img width="948" alt="Screen Shot 2024-09-24 at 00 01 21" src="https://github.com/user-attachments/assets/15d74b64-01ac-4f76-80ea-34233f3087e1">

**API Gateway:** Uses .NET with the Ocelot library to route requests. The gateway integrates a user authentication mechanism.

**Services:**

+ ***Authentication Service:*** This service is responsible for user authentication using JWT Bearer. It handles functions related to account authentication, authorization, account creation, etc.

++ Technology: ASP.NET 8

++ Language: C#

++ Database: SQL (SQL Server)

+ ***Main Service:*** This service manages the main functions of the application related to exercise and nutrition.

++ Technology: Django Rest Framework (DRF)

++ Language: Python

++ Database: NoSQL (MongoDB)

+ ***Social Service:*** This service manages functions related to social interactions like posting content.

++ Technology: ExpressJS

++ Language: Javascript

++ Database: NoSQL (MongoDB)

+ ***Notification Service:*** This service manages functionalities related to notifications.

++ Technology: ExpressJS

++ Language: Javascript

++ Database: NoSQL (MongoDB)

**Message Queue:** RabbitMQ

**Notification:** Expo

**Cache:** Redis
