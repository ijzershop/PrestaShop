<?php
class CoverageNotPublicTest extends PHPUnit_Framework_TestCase
{
    /**
     * @covers CoveredClass::<!public>
     */
    public function testSomething()
    {
        $o = new CoveredClass;
        $o->publicMethod();
    }
}
