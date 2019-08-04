---
layout: tutorial
key: popular
title: "Java Concurrency - Volatile, Final and Atomics"
index: 1441
subcategory: java-concurrency
date: 2017-04-04
tags: [Volatile, Final, Atomics]
draft: true
---

> Volatile, Final and Atomics.

## 1. Volatile Fields
```java
private volatile boolean done;
public boolean isDone() { return done; }
public void setDone() { done = true; }
```
* The compiler will insert the appropriate code to ensure that a change to the done variable in one thread is visible from any other thread that reads the variable.

CAUTION: Volatile variables `do not` provide any atomicity. For example, the method is not guaranteed to flip the value of the field. There is no guarantee that the reading, flipping, and writing is uninterrupted.
```java
public void flipDone() { done = !done; } // not atomic
```

When is volatile Enough?
* If two threads are both reading and writing to a shared variable, then using the volatile keyword for that is not enough. You need to use a synchronized in that case to guarantee that the reading and writing of the variable is atomic.
* In case only one thread reads and writes the value of a volatile variable and other threads **only** read the variable, then the reading threads are guaranteed to see the **latest value** written to the volatile variable.
* As an alternative to a synchronized block you could also use one of the many atomic data types found in the java.util.concurrent package. For instance, the `AtomicLong` or `AtomicReference` or one of the others.


## 2. Final Variables
```java
final Map<String, Double> accounts = new HashMap<>();
```
* With final, other threads get to see the accounts variable after the constructor has finished.
* Without using final, there would be no guarantee that other threads would see the updated value of accounts—they might all see null, not the constructed HashMap.
* Of course, the operations on the map are not thread safe. If multiple threads mutate and read the map, you still need synchronization.

## 3. Atomics
There are a number of classes in the **java.util.concurrent.atomic** package that use efficient machine-level instructions to guarantee atomicity of other operations without using locks.
* AtomicInteger
* AtomicLong
* LongAdder
* LongAccumulator
* DoubleAdder
* DoubleAccumulator

```java
public static AtomicLong nextNumber = new AtomicLong(); // In some thread...
long id = nextNumber.incrementAndGet();
```
* The 'incrementAndGet' method atomically increments the AtomicLong and returns the post- increment value. That is, the operations of getting the value, adding 1, setting it, and producing the new value cannot be interrupted. It is guaranteed that the correct value is computed and returned, even if multiple threads access the same instance concurrently.

## 4. Dead Lock
Deadlock describes a situation where two or more threads are blocked forever, waiting for each other.
```java
public class TestThread {
   public static Object Lock1 = new Object();
   public static Object Lock2 = new Object();

   public static void main(String args[]) {
      ThreadDemo1 T1 = new ThreadDemo1();
      ThreadDemo2 T2 = new ThreadDemo2();
      T1.start();
      T2.start();
   }

   private static class ThreadDemo1 extends Thread {
      public void run() {
         synchronized (Lock1) {
            System.out.println("Thread 1: Holding lock 1...");

            try { Thread.sleep(10); }
            catch (InterruptedException e) {}
            System.out.println("Thread 1: Waiting for lock 2...");

            synchronized (Lock2) {
               System.out.println("Thread 1: Holding lock 1 & 2...");
            }
         }
      }
   }
   private static class ThreadDemo2 extends Thread {
      public void run() {
         synchronized (Lock2) {
            System.out.println("Thread 2: Holding lock 2...");

            try { Thread.sleep(10); }
            catch (InterruptedException e) {}
            System.out.println("Thread 2: Waiting for lock 1...");

            synchronized (Lock1) {
               System.out.println("Thread 2: Holding lock 1 & 2...");
            }
         }
      }
   }
}
```
## 5. ThreadLocal
The `ThreadLocal` class in Java enables you to create variables that can only be read and written by the same thread. Thus, even if two threads are executing the same code, and the code has a reference to a ThreadLocal variable, then the two threads cannot see each other's ThreadLocal variables.

```java
public class ThreadLocalExample {
    public static class MyRunnable implements Runnable {

        private ThreadLocal<Integer> threadLocal =
               new ThreadLocal<Integer>();

        @Override
        public void run() {
            threadLocal.set( (int) (Math.random() * 100D) );

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }

            System.out.println(threadLocal.get());
        }
    }

    public static void main(String[] args) {
        MyRunnable sharedRunnableInstance = new MyRunnable();

        Thread thread1 = new Thread(sharedRunnableInstance);
        Thread thread2 = new Thread(sharedRunnableInstance);

        thread1.start();
        thread2.start();

        try
        {
            thread1.join(); //wait for thread 1 to terminate
            thread2.join(); //wait for thread 2 to terminate
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
    }
}
```
The two output numbers will probably be different.
```raw
68
72
```
If we define the local variable in MyRunnable class as follows, we always get two identical numbers.
```java
public static class MyRunnable implements Runnable {
    private Integer num = 0;

    @Override
    public void run() {
        Random random = new Random();
        num = random.nextInt(100);

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
        }

        System.out.println(num);
    }
}
```

### 4.5 Blocking Queues
* LinkedBlockingQueue
* ArrayBlockingQueue
* DelayQueue
* PriorityBlockingQueue

### 4.6 Thread-Safe Collections
* ConcurrentHashMap
* ConcurrentLinkedQueue
* ConcurrentSkipListMap
* ConcurrentSkipListSet

There is no ConcurrentHashSet class. Instead, you can create concurrent set with map.

```java
// Prior to Java 8
Set<String> mySet = Collections.newSetFromMap(new ConcurrentHashMap<String, Boolean>());
// In Java 8
Set<String> myConcurrentSet = ConcurrentHashMap.<String>newKeySet();
```

### 4.6 Callables and Futures
A `Runnable` encapsulates a task that runs asynchronously; you can think of it as an asynchronous method with no parameters and no return value. A `Callable` is similar to a Runnable, but it returns a value. The Callable interface is a parameterized type, with a single method `call`.
```java
public interface Callable<V>
{
    V call() throws Exception; // V is the type of the returned value.
}
```

A `Future` holds the result of an asynchronous computation. The Future interface has the following methods:
```java
public interface Future<V>
{
    V get() throws . . .;
    V get(long timeout, TimeUnit unit) throws . . .;
    void cancel(boolean mayInterrupt);
    boolean isCancelled();
    boolean isDone();
}
```
The `FutureTask` wrapper is a convenient mechanism for turning a Callable into both a Future and a Runnable—it implements both interfaces. For example:
```java
Callable<Integer> myComputation = . . .;
FutureTask<Integer> task = new FutureTask<Integer>(myComputation);
Thread t = new Thread(task); // it's a Runnable
t.start();
...
Integer result = task.get(); // it's a Future
```
Callable Example, return random number.
```java
class CallableExample implements Callable
{
  public Object call() throws Exception
  {
    Random generator = new Random();
    Integer randomNumber = generator.nextInt(5);

    Thread.sleep(randomNumber * 1000);

    return randomNumber;
  }
}
```
Use Future to get result from Callable.
```java
public static void main(String[] args) throws Exception
  {
    // FutureTask is a concrete class that implements both Runnable and Future
    FutureTask[] randomNumberTasks = new FutureTask[5];

    for (int i = 0; i < 5; i++)
    {
      Callable callable = new CallableExample();

      // Create the FutureTask with Callable
      randomNumberTasks[i] = new FutureTask(callable);

      // As it implements Runnable, create Thread
      // with FutureTask
      Thread t = new Thread(randomNumberTasks[i]);
      t.start();
    }

    for (int i = 0; i < 5; i++)
    {
      // As it implements Future, we can call get()
      System.out.println(randomNumberTasks[i].get());

      // This method blocks till the result is obtained
      // The get method can throw checked exceptions
      // like when it is interrupted. This is the reason
      // for adding the throws clause to main
    }
  }
```
Output:
```raw
4
2
3
3
0
```
Similar function using only Runnable.
```java
class RunnableExample implements Runnable
{
    // Shared object to store result
    private Object result = null;

    public void run()
    {
        Random generator = new Random();
        Integer randomNumber = generator.nextInt(5);

        // As run cannot throw any Exception
        try
        {
            Thread.sleep(randomNumber * 1000);
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }

        // Store the return value in result when done
        result = randomNumber;

        // Wake up threads blocked on the get() method
        synchronized(this)
        {
            notifyAll();
        }
    }

    public synchronized Object get() throws InterruptedException
    {
        while (result == null) {
            wait();
        }

        return result;
    }
}
```
Use Future to get result from Runnable.
```java
public static void main(String[] args) throws Exception
{
    RunnableExample[] randomNumberTasks = new RunnableExample[5];

    for (int i = 0; i < 5; i++)
    {
        randomNumberTasks[i] = new RunnableExample();
        Thread t = new Thread(randomNumberTasks[i]);
        t.start();
    }

    for (int i = 0; i < 5; i++)
        System.out.println(randomNumberTasks[i].get());
}
```

## 5. Source Files
* [Source files for Java Synchronization on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-synchronization)

## 6. References
* [Synchronization in Java](https://www.javatpoint.com/synchronization-in-java)
* [Race Conditions and Critical Sections](http://tutorials.jenkov.com/java-concurrency/race-conditions-and-critical-sections.html)
