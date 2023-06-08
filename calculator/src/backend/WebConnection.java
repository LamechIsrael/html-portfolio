package src.backend;

import com.google.gson.Gson;
import io.javalin.Javalin;

public class WebConnection {

    // Create a Gson that will allow me to read information from the webpage
    public static Gson gson = new Gson();


    public static void main(String[] args) {

        // Get Javalin for web functionality


        Javalin app = Javalin.create(javalinConfig ->
                javalinConfig.enableCorsForOrigin("http://127.0.0.1:3000/")
        ).start();


        // Main Page

        /** This "GET" function will check if any information was received from the calculator app.
         * If any information is found, the "GET" command will try to calculate based on the request.
         * The result will be returned to the host.
         * Otherwise, the app will default to a normal homepage.*/
        app.get("/", context -> {
            context.status(200);
            String message = gson.toJson("Welcome to Lamech's Full Stack Calculator.");
            context.result(message);

        });


        app.patch("/", context -> {

            // Initialize the final result and get the body from the webpage
            int result = 0;
            String body = context.body();

            // Will default to a normal homepage, if no information is fed to it

                System.out.println(body);
                // If information is received, the application will try to do math

                try {
                    // Turn the Json data into a Gson.
                    // The Gson will create a Numbers object that holds the data needed for operation.
                    Numbers numbers = gson.fromJson(body, Numbers.class);
                    System.out.println(numbers.toString());

                    // Get the numbers and math question from the Numbers object
                    int firstNum = numbers.getFirstNumber();
                    String operand = numbers.getOperator();
                    int secondNum = numbers.getSecondNumber();

                    // Use the operand component to determine which math function should be used.
                    switch (operand) {
                        case "+":
                            result = Calculator.add(firstNum, secondNum);
                            break;
                        case "-":
                            result = Calculator.subtract(firstNum, secondNum);
                            break;
                        case "*":
                            result = Calculator.multiply(firstNum, secondNum);
                            break;
                        case "/":
                            result = Calculator.divide(firstNum, secondNum);
                            break;

                    }

                    // Return the result of the math equation to the webpage
                    System.out.println(result);
                    context.result(String.valueOf(result));
                    context.status(200);

                } catch (Exception e) {
                    // If anything is wrong, give a 404 error.
                    String message = gson.toJson("Error! No math can be done...");
                    context.result(message);
                    context.status(404);
                }

        });
    }
}
