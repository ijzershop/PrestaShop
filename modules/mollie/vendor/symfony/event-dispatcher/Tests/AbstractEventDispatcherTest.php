<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\EventDispatcher\Tests;

use PHPUnit\Framework\TestCase;
use Symfony\Component\EventDispatcher\Event;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

abstract class AbstractEventDispatcherTest extends TestCase
{
    /* Some pseudo events */
    const preFoo = 'pre.foo';
    const postFoo = 'post.foo';
    const preBar = 'pre.bar';
    const postBar = 'post.bar';

    /**
     * @var EventDispatcher
     */
    private $dispatcher;

    private $listener;

    protected function setUp()
    {
        $this->dispatcher = $this->createEventDispatcher();
        $this->listener = new TestEventListener();
    }

    protected function tearDown()
    {
        $this->dispatcher = null;
        $this->listener = null;
    }

    abstract protected function createEventDispatcher();

    public function testInitialState()
    {
        $this->assertEquals([], $this->dispatcher->getListeners());
        $this->assertFalse($this->dispatcher->hasListeners(self::preFoo));
        $this->assertFalse($this->dispatcher->hasListeners(self::postFoo));
    }

    public function testAddListener()
    {
        $this->dispatcher->addListener('pre.foo', [$this->listener, 'preFoo']);
        $this->dispatcher->addListener('post.foo', [$this->listener, 'postFoo']);
        $this->assertTrue($this->dispatcher->hasListeners());
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->assertTrue($this->dispatcher->hasListeners(self::postFoo));
        $this->assertCount(1, $this->dispatcher->getListeners(self::preFoo));
        $this->assertCount(1, $this->dispatcher->getListeners(self::postFoo));
        $this->assertCount(2, $this->dispatcher->getListeners());
    }

    public function testGetListenersSortsByPriority()
    {
        $listener1 = new TestEventListener();
        $listener2 = new TestEventListener();
        $listener3 = new TestEventListener();
        $listener1->name = '1';
        $listener2->name = '2';
        $listener3->name = '3';

        $this->dispatcher->addListener('pre.foo', [$listener1, 'preFoo'], -10);
        $this->dispatcher->addListener('pre.foo', [$listener2, 'preFoo'], 10);
        $this->dispatcher->addListener('pre.foo', [$listener3, 'preFoo']);

        $expected = [
            [$listener2, 'preFoo'],
            [$listener3, 'preFoo'],
            [$listener1, 'preFoo'],
        ];

        $this->assertSame($expected, $this->dispatcher->getListeners('pre.foo'));
    }

    public function testGetAllListenersSortsByPriority()
    {
        $listener1 = new TestEventListener();
        $listener2 = new TestEventListener();
        $listener3 = new TestEventListener();
        $listener4 = new TestEventListener();
        $listener5 = new TestEventListener();
        $listener6 = new TestEventListener();

        $this->dispatcher->addListener('pre.foo', $listener1, -10);
        $this->dispatcher->addListener('pre.foo', $listener2);
        $this->dispatcher->addListener('pre.foo', $listener3, 10);
        $this->dispatcher->addListener('post.foo', $listener4, -10);
        $this->dispatcher->addListener('post.foo', $listener5);
        $this->dispatcher->addListener('post.foo', $listener6, 10);

        $expected = [
            'pre.foo' => [$listener3, $listener2, $listener1],
            'post.foo' => [$listener6, $listener5, $listener4],
        ];

        $this->assertSame($expected, $this->dispatcher->getListeners());
    }

    public function testGetListenerPriority()
    {
        $listener1 = new TestEventListener();
        $listener2 = new TestEventListener();

        $this->dispatcher->addListener('pre.foo', $listener1, -10);
        $this->dispatcher->addListener('pre.foo', $listener2);

        $this->assertSame(-10, $this->dispatcher->getListenerPriority('pre.foo', $listener1));
        $this->assertSame(0, $this->dispatcher->getListenerPriority('pre.foo', $listener2));
        $this->assertNull($this->dispatcher->getListenerPriority('pre.bar', $listener2));
        $this->assertNull($this->dispatcher->getListenerPriority('pre.foo', function () {}));
    }

    public function testDispatch()
    {
        $this->dispatcher->addListener('pre.foo', [$this->listener, 'preFoo']);
        $this->dispatcher->addListener('post.foo', [$this->listener, 'postFoo']);
        $this->dispatcher->dispatch(self::preFoo);
        $this->assertTrue($this->listener->preFooInvoked);
        $this->assertFalse($this->listener->postFooInvoked);
        $this->assertInstanceOf('Symfony\Component\EventDispatcher\Event', $this->dispatcher->dispatch('noevent'));
        $this->assertInstanceOf('Symfony\Component\EventDispatcher\Event', $this->dispatcher->dispatch(self::preFoo));
        $event = new Event();
        $return = $this->dispatcher->dispatch(self::preFoo, $event);
        $this->assertSame($event, $return);
    }

    public function testDispatchForClosure()
    {
        $invoked = 0;
        $listener = function () use (&$invoked) {
            ++$invoked;
        };
        $this->dispatcher->addListener('pre.foo', $listener);
        $this->dispatcher->addListener('post.foo', $listener);
        $this->dispatcher->dispatch(self::preFoo);
        $this->assertEquals(1, $invoked);
    }

    public function testStopEventPropagation()
    {
        $otherListener = new TestEventListener();

        // postFoo() stops the propagation, so only one listener should
        // be executed
        // Manually set priority to enforce $this->listener to be called first
        $this->dispatcher->addListener('post.foo', [$this->listener, 'postFoo'], 10);
        $this->dispatcher->addListener('post.foo', [$otherListener, 'postFoo']);
        $this->dispatcher->dispatch(self::postFoo);
        $this->assertTrue($this->listener->postFooInvoked);
        $this->assertFalse($otherListener->postFooInvoked);
    }

    public function testDispatchByPriority()
    {
        $invoked = [];
        $listener1 = function () use (&$invoked) {
            $invoked[] = '1';
        };
        $listener2 = function () use (&$invoked) {
            $invoked[] = '2';
        };
        $listener3 = function () use (&$invoked) {
            $invoked[] = '3';
        };
        $this->dispatcher->addListener('pre.foo', $listener1, -10);
        $this->dispatcher->addListener('pre.foo', $listener2);
        $this->dispatcher->addListener('pre.foo', $listener3, 10);
        $this->dispatcher->dispatch(self::preFoo);
        $this->assertEquals(['3', '2', '1'], $invoked);
    }

    public function testRemoveListener()
    {
        $this->dispatcher->addListener('pre.bar', $this->listener);
        $this->assertTrue($this->dispatcher->hasListeners(self::preBar));
        $this->dispatcher->removeListener('pre.bar', $this->listener);
        $this->assertFalse($this->dispatcher->hasListeners(self::preBar));
        $this->dispatcher->removeListener('notExists', $this->listener);
    }

    public function testAddSubscriber()
    {
        $eventSubscriber = new TestEventSubscriber();
        $this->dispatcher->addSubscriber($eventSubscriber);
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->assertTrue($this->dispatcher->hasListeners(self::postFoo));
    }

    public function testAddSubscriberWithPriorities()
    {
        $eventSubscriber = new TestEventSubscriber();
        $this->dispatcher->addSubscriber($eventSubscriber);

        $eventSubscriber = new TestEventSubscriberWithPriorities();
        $this->dispatcher->addSubscriber($eventSubscriber);

        $listeners = $this->dispatcher->getListeners('pre.foo');
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->assertCount(2, $listeners);
        $this->assertInstanceOf('Symfony\Component\EventDispatcher\Tests\TestEventSubscriberWithPriorities', $listeners[0][0]);
    }

    public function testAddSubscriberWithMultipleListeners()
    {
        $eventSubscriber = new TestEventSubscriberWithMultipleListeners();
        $this->dispatcher->addSubscriber($eventSubscriber);

        $listeners = $this->dispatcher->getListeners('pre.foo');
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->assertCount(2, $listeners);
        $this->assertEquals('preFoo2', $listeners[0][1]);
    }

    public function testRemoveSubscriber()
    {
        $eventSubscriber = new TestEventSubscriber();
        $this->dispatcher->addSubscriber($eventSubscriber);
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->assertTrue($this->dispatcher->hasListeners(self::postFoo));
        $this->dispatcher->removeSubscriber($eventSubscriber);
        $this->assertFalse($this->dispatcher->hasListeners(self::preFoo));
        $this->assertFalse($this->dispatcher->hasListeners(self::postFoo));
    }

    public function testRemoveSubscriberWithPriorities()
    {
        $eventSubscriber = new TestEventSubscriberWithPriorities();
        $this->dispatcher->addSubscriber($eventSubscriber);
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->dispatcher->removeSubscriber($eventSubscriber);
        $this->assertFalse($this->dispatcher->hasListeners(self::preFoo));
    }

    public function testRemoveSubscriberWithMultipleListeners()
    {
        $eventSubscriber = new TestEventSubscriberWithMultipleListeners();
        $this->dispatcher->addSubscriber($eventSubscriber);
        $this->assertTrue($this->dispatcher->hasListeners(self::preFoo));
        $this->assertCount(2, $this->dispatcher->getListeners(self::preFoo));
        $this->dispatcher->removeSubscriber($eventSubscriber);
        $this->assertFalse($this->dispatcher->hasListeners(self::preFoo));
    }

    public function testEventReceivesTheDispatcherInstanceAsArgument()
    {
        $listener = new TestWithDispatcher();
        $this->dispatcher->addListener('test', [$listener, 'foo']);
        $this->assertNull($listener->name);
        $this->assertNull($listener->dispatcher);
        $this->dispatcher->dispatch('test');
        $this->assertEquals('test', $listener->name);
        $this->assertSame($this->dispatcher, $listener->dispatcher);
    }

    /**
     * @see https://bugs.php.net/62976
     *
     * This bug affects:
     *  - The PHP 5.3 branch for versions < 5.3.18
     *  - The PHP 5.4 branch for versions < 5.4.8
     *  - The PHP 5.5 branch is not affected
     */
    public function testWorkaroundForPhpBug62976()
    {
        $dispatcher = $this->createEventDispatcher();
        $dispatcher->addListener('bug.62976', new CallableClass());
        $dispatcher->removeListener('bug.62976', function () {});
        $this->assertTrue($dispatcher->hasListeners('bug.62976'));
    }

    public function testHasListenersWhenAddedCallbackListenerIsRemoved()
    {
        $listener = function () {};
        $this->dispatcher->addListener('foo', $listener);
        $this->dispatcher->removeListener('foo', $listener);
        $this->assertFalse($this->dispatcher->hasListeners());
    }

    public function testGetListenersWhenAddedCallbackListenerIsRemoved()
    {
        $listener = function () {};
        $this->dispatcher->addListener('foo', $listener);
        $this->dispatcher->removeListener('foo', $listener);
        $this->assertSame([], $this->dispatcher->getListeners());
    }

    public function testHasListenersWithoutEventsReturnsFalseAfterHasListenersWithEventHasBeenCalled()
    {
        $this->assertFalse($this->dispatcher->hasListeners('foo'));
        $this->assertFalse($this->dispatcher->hasListeners());
    }

    public function testHasListenersIsLazy()
    {
        $called = 0;
        $listener = [function () use (&$called) { ++$called; }, 'onFoo'];
        $this->dispatcher->addListener('foo', $listener);
        $this->assertTrue($this->dispatcher->hasListeners());
        $this->assertTrue($this->dispatcher->hasListeners('foo'));
        $this->assertSame(0, $called);
    }

    public function testDispatchLazyListener()
    {
        $called = 0;
        $factory = function () use (&$called) {
            ++$called;

            return new TestWithDispatcher();
        };
        $this->dispatcher->addListener('foo', [$factory, 'foo']);
        $this->assertSame(0, $called);
        $this->dispatcher->dispatch('foo', new Event());
        $this->dispatcher->dispatch('foo', new Event());
        $this->assertSame(1, $called);
    }

    public function testRemoveFindsLazyListeners()
    {
        $test = new TestWithDispatcher();
        $factory = function () use ($test) { return $test; };

        $this->dispatcher->addListener('foo', [$factory, 'foo']);
        $this->assertTrue($this->dispatcher->hasListeners('foo'));
        $this->dispatcher->removeListener('foo', [$test, 'foo']);
        $this->assertFalse($this->dispatcher->hasListeners('foo'));

        $this->dispatcher->addListener('foo', [$test, 'foo']);
        $this->assertTrue($this->dispatcher->hasListeners('foo'));
        $this->dispatcher->removeListener('foo', [$factory, 'foo']);
        $this->assertFalse($this->dispatcher->hasListeners('foo'));
    }

    public function testPriorityFindsLazyListeners()
    {
        $test = new TestWithDispatcher();
        $factory = function () use ($test) { return $test; };

        $this->dispatcher->addListener('foo', [$factory, 'foo'], 3);
        $this->assertSame(3, $this->dispatcher->getListenerPriority('foo', [$test, 'foo']));
        $this->dispatcher->removeListener('foo', [$factory, 'foo']);

        $this->dispatcher->addListener('foo', [$test, 'foo'], 5);
        $this->assertSame(5, $this->dispatcher->getListenerPriority('foo', [$factory, 'foo']));
    }

    public function testGetLazyListeners()
    {
        $test = new TestWithDispatcher();
        $factory = function () use ($test) { return $test; };

        $this->dispatcher->addListener('foo', [$factory, 'foo'], 3);
        $this->assertSame([[$test, 'foo']], $this->dispatcher->getListeners('foo'));

        $this->dispatcher->removeListener('foo', [$test, 'foo']);
        $this->dispatcher->addListener('bar', [$factory, 'foo'], 3);
        $this->assertSame(['bar' => [[$test, 'foo']]], $this->dispatcher->getListeners());
    }
}

class CallableClass
{
    public function __invoke()
    {
    }
}

class TestEventListener
{
    public $preFooInvoked = false;
    public $postFooInvoked = false;

    /* Listener methods */

    public function preFoo(Event $e)
    {
        $this->preFooInvoked = true;
    }

    public function postFoo(Event $e)
    {
        $this->postFooInvoked = true;

        $e->stopPropagation();
    }
}

class TestWithDispatcher
{
    public $name;
    public $dispatcher;

    public function foo(Event $e, $name, $dispatcher)
    {
        $this->name = $name;
        $this->dispatcher = $dispatcher;
    }
}

class TestEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return ['pre.foo' => 'preFoo', 'post.foo' => 'postFoo'];
    }
}

class TestEventSubscriberWithPriorities implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'pre.foo' => ['preFoo', 10],
            'post.foo' => ['postFoo'],
        ];
    }
}

class TestEventSubscriberWithMultipleListeners implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return ['pre.foo' => [
            ['preFoo1'],
            ['preFoo2', 10],
        ]];
    }
}
