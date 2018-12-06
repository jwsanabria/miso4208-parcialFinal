Feature: View Statistics

    Scenario: As a user I want to reviw my statistics for my vehicule
        Given I press "Statistics"               
        When I swipe left
        And I take a picture
        Then I should see "Fuel economy"