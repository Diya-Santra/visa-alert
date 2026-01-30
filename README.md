# setup process: 

## Backend setup
```

1. cd backend
2. npm install
3. node index.js
```

## Frontend setup
```
1. cd frontend
2. npm install
3. npm run dev
```

# Design decisions
I've implemented this structure in modular fashion where both the frontend and the backend has a structure which can be easily modified and upgraded by other developers.
## backend
At first I've implemented the backend. For setup I've did the logger middleware setup and basic express setup then setup the database connection and also the models. Next, I've setup the routes which can be helpful or mentioned in the problem statement in a modular fashion. Then wrote all the controllers and connected it to the main entrypoint "index.js". I've also added validation which checks all the countries and also the type checks.
## frontend
I've created the frontend also in a modular fashion where the end developer can change and add the components which can be used in App.jsx itself. I've also created a CreateAlertModel which can be helpful for inserting the user in the database itself. I've implemented the pagination for better data handling and also implemented dropdown for updating the value.

# Improvement in production
## backend
In production environment I'll try to make it clusterize which gives us power to capitalize on vertical scaling and implement autoscaling features for horizontal scaling. I'll try to use typescript for better types and also make it service based so that we can implement different databases and services at one place. I'll try to use redis for caching.

## frontend
In production I'll try to make the UI and color coding more like the company color coding itself. I try to use typescript for better coding. I'll try to use Nextjs for better SEO. I'll try to add react-router-dom (if working in react) or Use Nextjs default file based routing. I'll try to deploy it on vercel so that we can take care of the CDN itself.

# Where AI helped and where I did
I've used AI for automating all the redundant work like creating all the coutries array and doing all the validation stuff. 
  I've implemented most of the code by myself and also I've worked on understanding the assignment better with AI.
