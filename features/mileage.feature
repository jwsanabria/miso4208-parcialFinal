Feature: Create a fillup

  Scenario: As a user I want to register a fillup for my vehicule
    Given I press "Statistics"               
    #button to remove the splash screen
    When I swipe left
    #to open te menu
    #And I press "Help"
    Then I should see "Fuel economy"

  Scenario Outline: Register Fillups
        Given I press "Fillup"
        Then I enter text <price> into field with id "price"
        Then I enter text <gallons> into field with id "volume"
        Then I enter text <odometer> into field with id "odometer"
        Then I change the date picker date to "July 28 2018"
        Then I touch the "Tank was not filled to the top" input field
        Then I enter text <extra> into field with id "text1"
        Then take picture
        Then I touch "Save Fillup"
        Then I should see "History"

        Examples:
            | price  | gallons | odometer | extra           |
            | "9300" | "2"     | "100"    | "Estacion Esso" |


