# ./vendor/bin/behat -c tests/Integration/Behaviour/behat.yml -s product --tags update-combination-suppliers
@reset-database-before-feature
@clear-cache-before-feature
@product-combination
@update-combination-suppliers
Feature: Update product combination suppliers in Back Office (BO)
  As an employee
  I need to be able to update product combination suppliers from BO

  Background:
    Given language with iso code "en" is the default one
    And attribute group "Size" named "Size" in en language exists
    And attribute group "Color" named "Color" in en language exists
    And attribute "S" named "S" in en language exists
    And attribute "M" named "M" in en language exists
    And attribute "L" named "L" in en language exists
    And attribute "White" named "White" in en language exists
    And attribute "Black" named "Black" in en language exists
    And attribute "Blue" named "Blue" in en language exists
    And attribute "Red" named "Red" in en language exists

  Scenario: I update combination suppliers:
    Given I add new supplier supplier1 with following properties:
      | name                    | my supplier 1      |
      | address                 | Donelaicio st. 1   |
      | city                    | Kaunas             |
      | country                 | Lithuania          |
      | enabled                 | true               |
      | description[en-US]      | just a supplier    |
      | meta title[en-US]       | my supplier nr one |
      | meta description[en-US] |                    |
      | meta keywords[en-US]    | sup,1              |
      | shops                   | [shop1]            |
    And I add new supplier supplier2 with following properties:
      | name                    | my supplier 2      |
      | address                 | Donelaicio st. 2   |
      | city                    | Kaunas             |
      | country                 | Lithuania          |
      | enabled                 | true               |
      | description[en-US]      | just a supplier    |
      | meta title[en-US]       | my supplier nr two |
      | meta description[en-US] |                    |
      | meta keywords[en-US]    | sup,2              |
      | shops                   | [shop1]            |
    And I add new supplier supplier3 with following properties:
      | name                    | my supplier 3    |
      | address                 | Donelaicio st. 3 |
      | city                    | Kaunas           |
      | country                 | Lithuania        |
      | enabled                 | true             |
      | description[en-US]      | just a 3         |
      | meta title[en-US]       | my third supp    |
      | meta description[en-US] |                  |
      | meta keywords[en-US]    | sup,3            |
      | shops                   | [shop1]          |
    And I add product "product1" with following information:
      | name[en-US] | universal T-shirt |
      | is_virtual  | false             |
    And product product1 type should be standard
    And I generate combinations for product product1 using following attributes:
      | Size  | [S,M]              |
      | Color | [White,Black,Blue] |
    And product product1 should have following list of combinations:
      | reference      | combination name        | attributes           | impact on price | final price | quantity | is default |
      | product1SWhite | Size - S, Color - White | [Size:S,Color:White] | 0               | 0           | 0        | true       |
      | product1SBlack | Size - S, Color - Black | [Size:S,Color:Black] | 0               | 0           | 0        | false      |
      | product1Blue   | Size - S, Color - Blue  | [Size:S,Color:Blue]  | 0               | 0           | 0        | false      |
      | product1MWhite | Size - M, Color - White | [Size:M,Color:White] | 0               | 0           | 0        | false      |
      | product1MBlack | Size - M, Color - Black | [Size:M,Color:Black] | 0               | 0           | 0        | false      |
      | product1MBlue  | Size - M, Color - Blue  | [Size:M,Color:Blue]  | 0               | 0           | 0        | false      |
    And combination "product1SWhite" should not have any suppliers assigned
    When I set following suppliers for combination "product1SWhite":
      | reference               | supplier reference | combination supplier reference | currency | price tax excluded |
      | product1SWhiteSupplier1 | supplier1          | sup white shirt S 1            | USD      | 5                  |
    Then combination "product1SWhite" should have following suppliers:
      | product supplier reference     | currency | price tax excluded |
      | my first supplier for product3 | USD      | 10                 |
