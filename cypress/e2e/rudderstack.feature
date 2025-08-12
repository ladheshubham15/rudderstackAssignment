Feature: RudderStack basic flow
  Scenario: send event to HTTP Source and verify destination delivery
    Given I am logged into the RudderStack dashboard with "RUDDER_EMAIL" and "RUDDER_PASSWORD"
    When I go to the Connections page
    And I read and save the data plane URL and the HTTP "JavaScript" source write key
    And I POST a sample event to the data plane using the write key
    Then the "Webhook Connection" destination should show at least 1 delivered event
