Feature: Update product status from BO (Back Office)
  As an employee I must be able to update product status (enable/disable)

  Scenario: I update standard product status
    Given I add product "product1" with following information:
      | name       | en-US:Values list poster nr. 1 (paper) |
      | is_virtual | false                                  |
    And product product1 type should be standard
    And product "product1" should have following values:
      | active | false |
    When I enable product product1
    Then product "product1" should have following values:
      | active | true |
    When I disable product product1
    Then product "product1" should have following values:
      | active | false |

  Scenario: I update virtual product status
    And I add product "product2" with following information:
      | name       | en-US:Values list poster nr. 2 (virtual) |
      | is_virtual | true                                     |
    And product product2 type should be virtual
    And product "product2" should have following values:
      | active | false |
    When I enable product product2
    And product "product2" should have following values:
      | active | true |
    When I disable product product2
    Then product "product2" should have following values:
      | active | false |

  Scenario: I update combination product status
    And I add product "product3" with following information:
      | name       | en-US:T-Shirt with listed values |
      | is_virtual | false                            |
    And product "product3" has following combinations:
      | reference | quantity | attributes         |
      | whiteS    | 100      | Size:S;Color:White |
      | whiteM    | 150      | Size:M;Color:White |
      | blackM    | 130      | Size:M;Color:Black |
    And product product3 type should be combination
    And product "product3" should have following values:
      | active | false |
    When I enable product product3
    And product "product3" should have following values:
      | active | true |
    When I disable product product3
    Then product "product3" should have following values:
      | active | false |

  Scenario: I disable product which is already disabled
    And product "product1" should have following values:
      | active | false |
    When I disable product product1
    Then product "product1" should have following values:
      | active | false |

  Scenario: I enable product which is already enabled
    And product "product1" should have following values:
      | active | false |
    When I enable product product1
    Then product "product1" should have following values:
      | active | true |
