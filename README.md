# Molly

Molly is a discord bot created exclusively for the discord server [Deep Rock Galactic France](https://discord.gg/TBxaXEC).
If you don't know it, Deep Rock Galactic is a great co-op and action game available on Steam and Xbox!
Check out [this](https://store.steampowered.com/app/548430/Deep_Rock_Galactic/) link if you want to know more about it.

## Installation

You must first install all the node dependencies with the command 'npm install' at the root of the project.

```bash
npm install
```

After that you have to create the files "token.json" and "database.json" in the json folder and edit them like this: 

**token.json**

```json
{
    "token": "your_bot_token"
}
```

**database.json**

```json
{
    "host": "your_database_ip",
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "your_database"
}
```

Once this is done, the bot will automatically configure the database and create the required tables. The bot will then launch and will be 100% operational!
