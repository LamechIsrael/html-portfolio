# Full Stack Java Calculator

This is a simple Java project to prove that I can perform Java programming tasks.
I understand that a calculator seems to be so simple that it wouldn't prove I know anything. But just take a look.

In this program, I use Java to create an object with constructors, getters, and setters.
I use test cases to be sure my math works.
I use Maven to utilize REST, so I can communicate with the front end.
These are what most employers state they want in a programmer.

Also, this is a very complicated calculator.
This is because I don't input numbers from the backend but the front.
So, I show that I can program in HTML, decorate a page with CSS, and create functionality with JavaScript.

All to create a simple Fullstack project.


# Fixing the CORS Issue...

The Javalin app wouldn't allow my front end to communicate with it, because localhost apps don't meet the CORS requirements. So, I scoured the internet for a way to fix it.

After some trial and error, I've isolated what I needed to get around the CORS authorization:

Javalin app = Javalin.create(javalinConfig ->
                javalinConfig.enableCorsForOrigin("")
        ).start();

Just put into the quotes the root origin your front end is from.
