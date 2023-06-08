package src.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class CalculatorTest {

    int firstNum = 27;
    int secondNum = 52;


    @Test
    void add() {
        int sum = Calculator.add(firstNum, secondNum);
        Assertions.assertEquals(sum, firstNum+secondNum);
    }

    @Test
    void subtract() {
        int difference = Calculator.subtract(firstNum, secondNum);
        Assertions.assertEquals(difference, firstNum-secondNum);
    }

    @Test
    void multiply() {
        int product = Calculator.multiply(firstNum, secondNum);
        Assertions.assertEquals(product, firstNum*secondNum);
    }

    @Test
    void divide() {
        int dividend = Calculator.divide(firstNum, secondNum);
        Assertions.assertEquals(dividend, firstNum/secondNum);
    }
}