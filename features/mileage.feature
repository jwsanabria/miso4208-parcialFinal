Feature: Create a fillup

  Scenario: As a user I want to register a fillup for my vehicule
    Given I press "Statistics"               
    #button to remove the splash screen
    When I swipe left
    #to open te menu
    #And I press "Help"
    Then I should see "Fuel economy"