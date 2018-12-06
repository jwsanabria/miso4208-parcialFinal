Feature: Create a fillup

  Scenario Outline: Validations Fillups
        Given I press "Fillup"
        When I enter text <price> into field with id "price"
        And I enter text <gallons> into field with id "volume"
        And I enter text <odometer> into field with id "odometer"
        And I hide my keyboard
        And I enter <extra> into input field number 4
        And I press view with id "date"
        # Format "dd-mm-aaaa"
        And I set the date to <datefillup> on DatePicker with index 1
        And I press the "Done" button
        And I wait up to 5 seconds to see "Extra data"
        And I scroll down
        And I hide my keyboard
        And I press the "Save Fillup" button
        And I wait for 1 second
        And I take a picture
        Then I should see <result>

        Examples:
            | price  | gallons | odometer | datefillup   | extra           | result |
            | ""     | ""      | ""       | "10-08-2018" | "Estacion Esso" | "Invalid value for volume" |
            | ""     | "4"     | "130"    | "10-08-2018" | "Estacion Esso" | "Invalid value for price"  |
            | "9300" | ""      | "180"    | "13-08-2018" | "Estacion Esso" | "Invalid value for volume" |
            | "9300" | "4"     | ""       | "13-08-2018" | "Estacion Esso" | "Invalid value for odometer" |

  Scenario Outline: Register partials Fillups
        Given I press "Fillup"
        When I enter text <price> into field with id "price"
        And I enter text <gallons> into field with id "volume"
        And I enter text <odometer> into field with id "odometer"
        And I hide my keyboard
        And I enter <extra> into input field number 4
        And I toggle checkbox number 1
        And I take a picture
        And I press view with id "date"
        # Format "dd-mm-aaaa"
        And I set the date to <datefillup> on DatePicker with index 1
        And I take a picture
        And I press the "Done" button
        And I wait up to 5 seconds to see "Extra data"
        And I scroll down
        And I press the "Save Fillup" button
        And I wait for 1 second
        And I take a picture
        Then I should see "History"

        Examples:
            | price  | gallons | odometer | datefillup   | extra           |
            | "9300" | "2"     | "100"    | "10-08-2018" | "Estacion Esso" |
            | "9350" | "4"     | "130"    | "11-08-2018" | "Estacion Esso" |
            | "9340" | "2"     | "180"    | "13-08-2018" | "Estacion Esso" |


Scenario Outline: Register full Fillups
        Given I press "Fillup"
        When I enter text <price> into field with id "price"
        And I enter text <gallons> into field with id "volume"
        And I enter text <odometer> into field with id "odometer"
        And I hide my keyboard
        And I enter <extra> into input field number 4
        And I take a picture
        And I press view with id "date"
        # Format "dd-mm-aaaa"
        And I set the date to <datefillup> on DatePicker with index 1
        And I take a picture
        And I press the "Done" button
        And I wait up to 5 seconds to see "Extra data"
        And I scroll down
        And I press the "Save Fillup" button
        And I wait for 1 second
        And I take a picture
        Then I should see "History"

        Examples:
            | price  | gallons | odometer | datefillup   | extra           |
            | "9200" | "9"     | "200"    | "15-08-2018" | "Estacion Esso" |
            | "9550" | "9"     | "430"    | "20-08-2018" | "Estacion Esso" |
            | "9240" | "9"     | "680"    | "01-09-2018" | "Estacion Esso" |




