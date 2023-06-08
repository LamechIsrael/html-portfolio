/**JavaScript buttons for the calculator */

/*Collects the buttons and field from the HTML document */
const buttons = document.getElementsByTagName("button");
const field = document.getElementById("inputField");
const bottomResult = document.getElementById("texter");
const backendURL = "http://localhost:8080/";

/*Create a global variable for our total
Also, create a global boolean variable. When the 'newNumber' variable is true, clear the text field.
And any number pressed is entered into the textField. */
let total = 0;
let newNumber = true;
let firstNum = "";
let operator = "";
let secondNum = "";
let firstNumGotten = false;

/* Adds event listeners to each button */
for (button of buttons) {
  let id = button.innerHTML;

  /* Will decide what the button will do (what lister it will get) depending on the button's class */

  // Clear button will clear the text field and set the textField and equation total to 0.
  if (button.className == "clear") {
    button.addEventListener("click", function (Event) {
      newNumber = true;
      field.value = 0;
      total = 0;
    });

    // Number buttons will input a number into the text Field.
    // It will clear the field old field data, at the start of a program or after operands are pressed.
  } else if (button.className == "number") {
    button.addEventListener("click", function (Event) {
      if (newNumber == true) {
        field.value = id;
        newNumber = false;
      } else {
        field.value = field.value.toString() + "" + id.toString();
      }
    });
    continue;
    // Equals button will finish the equation and put it into the text field.
  } else if (button.className == "equals") {
    newNumber = true;
    secondNum = field.value;
    sendNumbers(firstNum, operator, secondNum);
    continue;
    // Operand buttons will take the value in the text field and place it into an equation.
    // This button connects to the back end for math.
  } else if (button.className == "operand") {
    button.addEventListener("click", function (Event) {
      newNumber = true;
      //console.log(firstNum);

      if (firstNumGotten == false) {
        firstNum = field.value;
        operand = id;
        firstNumGotten = true;
      } else {
        secondNum = field.value;
        sendNumbers(firstNum, operator, secondNum);
      }
    });
  } else if (button.id == "connection") {
    button.addEventListener("click", function (Event) {
      testConnection();
    });
  }
}

/** Sends the numbers and operator to be calculated */
async function sendNumbers(firstNum, oper, secondNum) {
  const numbers = {
    firstNumber: firstNum,
    operator: oper,
    secondNumber: secondNum,
  };
  const response = await fetch(backendURL, {
    body: JSON.stringify(numbers),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  if (response.status === 200) {
    const body = await response.json();
    result = body.result;
    console.log(result);
    alert(`The answer is: ${result}`);
  } else {
    console.log("Didn't Work...");
    console.log(response);
    //alert("FAILED TO CONNECT");
  }
  bottomResult.innerHTML = `${firstNum} ${operator} ${secondNum} = RESPONSE CODE ${response.status}`;
}

/** This button is just to test if I can connect to the backend.
 * It really doesn't have any other use.
 * But it will change the text on the button, if the backend is both active and readable.
 * I created it, because I was tired of opening up the Dev Tools to see if the two apps communicated.
 */
async function testConnection() {
  const response = await fetch(backendURL, {
    method: "GET",
    headers: { "Content-Type": "text" },
    mode: "cors",
  });

  if (response.status === 200) {
    const body = await response.json();
    result = body.result;
    document.getElementById("connection").innerHTML =
      "Test Connection: Succeeded";
    console.log(response);
  } else {
    console.log("Connection Failed.");
    document.getElementById("connection").innerHTML = "Test Connection: Failed";
  }
}
