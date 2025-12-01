SWAGGER - WHY WE NEED IT

What is an API?
Imagine your backend server (the computer part of your app) is like a kitchen in a restaurant. It has "recipes" (code) to make things happen, like logging in a user or showing a list of gigs.

An API is like the menu that tells other parts of your app (or other apps) what the kitchen can do. It says: "Hey, if you want login, send me an email and password, and I'll give you a special ticket (token) back."

But menus can be confusing if they're just words. That's where Swagger comes in.

What is Swagger?
Swagger is like a picture menu for your API kitchen. Instead of just reading boring text, it makes a fun web page where:

You can see all the "dishes" (API endpoints) your kitchen offers, like "/login" or "/get-gigs".
It explains what each dish needs (e.g., "bring an email and password").
It shows what you'll get back (e.g., "a login ticket or an error message").
Best part: You can click buttons to actually "order" the dish right there! It sends a real request to your kitchen and shows the response, so you can test if everything works.
Why Set It Up?
For You: When building your app, you can check the menu to remember what your API does, and test it without writing extra code.
For Your Team: They can see the menu and know how to use your kitchen.
For Others: If someone else wants to use your app's features, they have a clear guide.
How It Works (Simple Steps)
Install Tools: You add special "cookbooks" (packages) to your project so your kitchen knows how to make the picture menu.
Tell It About Your Recipes: In your code, you add simple notes (like stickers on recipes) saying "This is for login, it needs email/password, gives back a token."
Turn It On: Your server now serves the picture menu at a special web address, like http://yourserver/api-docs.
Look and Play: Open that address in a browser, and explore/test your API like a game.
It's not magic—it's just a way to make your API easy to understand and use, like drawing pictures on a menu so everyone gets it!