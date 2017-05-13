<p className="pag">Page 153 Chapter 6 Bulletproofing your code</p>
This chapter covers
<li className="litag">	How functional programming affects program testing</li>
<li className="litag">	Identifying challenges of testing imperative code</li>
<li className="litag">	Testing functional code with QUnit</li>
<li className="litag">	Exploring property-based testing with JSCheck</li>
<li className="litag">	Measuring program complexity with Blanket</li>
Good fences make good neighbors
—Robert Frost, “Mending Wall”
Welcome to part 3 of this book. Having read parts 1 and 2, you’ll have noticed a central theme: functional programming makes your code easier to understand, read, and maintain. You can even say its declarative nature makes your code selfdocumented.
Now that you’ve written functional code, how do you prove that it works? In other words, how do you ensure that it meets the specifications laid out by your customers? The only way is to write code that tests whether the resulting behavior is as

<p className="pag">Page 154</p>
expected. Thinking functionally has a deep impact on application-level code and, through it, directly influences the way you design your tests.
You create unit tests to ensure that code meets a problem specification and builds fences around all possible boundary conditions that may cause it to fail. I assume you’ve written unit tests before; you’ve likely experienced that testing imperative programs can be a daunting effort, especially in large code bases. Due to side effects, imperative code is susceptible to errors originating from false assumptions about the global state of the system. Likewise, tests can’t run independently of others, as they should, making it difficult to guarantee consistent results regardless of the order in which they’re called. This is unfortunate and is the main reason testing is often left until the end or, in most cases, skipped.
In this chapter, we’ll look at why functional code is by definition inherently testable, whereas in most other paradigms, you must intentionally design your code to make it easy to test. Most of the best practices associated with proper testing—eliminating external dependencies, making functions predictable, and others—are core principles embedded in functional design. Pure, referentially transparent functions have this quality built into them for free and lend themselves to a more advanced method such as property-based testing. Before we begin, let’s take a moment to understand the influence FP has on the different types of tests and focus on where it will help you be the most productive: unit tests.
6.1	Functional programming’s influence on unit tests
Generally, there are three testing categories: unit tests, integration tests, and acceptance tests. The testing pyramid in figure 6.1 shows that the influence of FP on your code is greater as you move from acceptance tests (top) to unit tests (bottom). This is evident because functional programming is a software-development paradigm that focuses on the design of functions and modules as well as the integration among its constituent parts.
Figure 6.1 Because functional programming is a software paradigm with focus on code, its influence mostly impacts the design of unit tests, with little effect on integration tests. It’s completely agnostic to acceptance testing.
 
<p className="pag">Page 155</p>
Although important, testing the user’s acceptance criteria with regard to look and feel, usability, and navigability of your web application is distanced from the code and thus has little or nothing to do with whether your program is written functionally or imperatively. This task is better suited to test-automation frameworks. With regard to integration tests, as you saw in chapter 4, FP cedes control of the orchestration of the different components of your application to composition, which you know to work without question. So part of the time spent in integration tests is given back to you for free just by adopting FP as a paradigm.
The real focus of functional programming is on functions—the units of modularity in your code—and the interactions among them. The test-runner library of choice for this book is the popular QUnit. I won’t cover setting up testing libraries; if you’ve set up any unit test library before, QUnit will be simple to get up and running. See this book’s appendix for more details.
Here’s the basic structure of a single unit test:
<pre>
QUnit.test('Test Find Person', function(assert) {
const ssn = '444-44-4444';
const p = findPerson(ssn);
assert.equal(p.ssn, ssn);
});</pre>
The test code lives in a JavaScript file that’s not part of the main application code but imports all the functions that will be tested. Unit testing imperative programs is extremely challenging due to the presence of side effects and mutations. Let’s examine some of the downfalls of testing imperative code.
6.2	Challenges of testing imperative programs
Imperative tests suffer from the same challenges as imperative code. Because imperative code is based on global state and mutations, rather than contained data flow and joined computations, testing is a real challenge. One of the main principles to follow when designing unit tests is isolation. A unit test should run as if in a vacuum and ignorant of any other data or tests around it; but side effects in the code severely limit the extent to which you can test functions.
Imperative code is
<li className="litag">	Difficult to identify and decompose into simple tasks</li>
<li className="litag">	Dependent on shared resources that make test results inconsistent</li>
<li className="litag">	Forced to a predefined order of evaluation</li>
Let’s examine some of these challenges more closely.
6.2.1	Difficulty identifying and decomposing tasks
Unit tests are designed to test the smallest parts of your application. In procedural programs, it’s much harder to identify the units of modularity because there’s no intuitive way to slice the different sections of a single, monolithic program that wasn’t
<p className="pag">Page 156</p>
designed with that mindset to begin with. In this case, the units are functions that encapsulate your business logic. For example, recali the imperative version of showStudent that you’ve been working on throughout the book. Figure 6.2 shows a good attempt to slice it into its constituent parts.
Figure 6.2 The functional sections of the monolithic function showStudent. To simplify writing tests, these sections should be split into separate functions that deal with validation, IO, and error handling.
As you can see, this program is made up of tightly coupled business logic that’s concerned with different aspects of a program, all in a single monolithic function. But there’s no real reason to couple data validation with fetching student records and appending elements to the DOM; those can be separate testable business units that are assembled via composition. In addition, as you learned in chapter 5, you should factor out error-handling logic and allow monads to handle it.
Monads and error handling
In chapter 5, you learned about a few design patterns that you can apply to consolidate and remove error-handling code from your main functions while still keeping them fault-tolerant. By using the monads Maybe and Either, you can write point-free code that knows how to properly propagate errors through the components while making sure your program remains responsive.
 
<p className="pag">Page 157</p>
In order to widen the testable scope of this function, you need to find ways to split it into loosely coupled components that segregate the pure from the impure. Impure code is difficult to test due to the presence of side effects that can occur when reading and writing to external resources such as the DOM or external storage.
6.2.2	Dependency on shared resources leads to inconsistent results
In chapter 2, I talked about JavaScript’s unwieldy freedom to access globally shared data. Testing programs with side effects requires extreme care and discipline because you’re responsible for managing the state around the function under test. I’ve seen too many cases where adding a new test to a working test suite causes other unrelated tests to inadvertently fail. Why is this? In order for tests to be reliable, they must be self-contained or independent from the rest, which means each unit test essentially runs in its own sandbox, leaving the system in exactly the same state as it was found. Tests that break this rule can never consistently produce the same outcomes.
I’ll use a simple example to illustrate. Recall the imperative increment function:
<pre>var counter = 0;	// (global)
function incremento { return ++counter;
}</pre>
You can write a simple unit test to ensure that incrementing a number from 0 equals 1; this result should hold whether you run it once or 100 times. But because the function modifies and reads from external data (see figure 6.3), this isn’t the case.
Figure 6.3 Repeating a unit test for the imperative increment function is impossible due to the function’s dependency on the external counter variable.
The second iteration fails because the first modified the external counter variable to 1, preempting the global context for the second run of the same code and causing it to fail in its assertion. By the same token, functions with side effects are also prone to bugs originating from order of evaluation. Let’s examine this next.
 
<p className="pag">Page 158</p>
6.2.3	Predefined order of execution
Along the same lines as consistency, unit tests should be designed to be commutative, which means changing the order in which they run shouldn’t affect their outcome. For the same reasons as before, this principle doesn’t work with impure functions. To work around this problem, unit testing libraries like QUnit contain out-of-the-box mechanisms to set up and tear down the global testing environment in order for subsequent tests to run; but the setup of one test may be completely different than another, so you’re forced to set up preconditions at the beginning of each test. This also implies that for each test, you’re responsible for identifying all the side effects (external dependencies) of the code under test.
To illustrate, let’s create simple tests around increment to verify its behavior against negative numbers, zero, and positive numbers (see figure 6.4). In the first run (left), all tests pass. Shuffling the order of the tests (right), with no additional changes, causes the second test to fail. This is because tests with side effects run based on the assumption that you’ve adequately set up the surrounding state.
 
Incorrectly assuming a preexisting state causes the failure.
Figure 6.4 Falsely making assumptions about the global state of the system causes simple tests to fail. The left side shows that all tests executed perfectly, because each test correctly prepared its surrounding state before executing. But shuffling the tests (right) invalidates all assumptions about the state.
As you can see from this simple exercise, even if you manage to successfully run multiple unit tests for a particular function by manipulating the global context within each test, you can’t guarantee they’ll work if you move them around. A simple shift in sequence is enough to invalidate all your assertions.
Thinking functionally can also help you build reliable test suites. And if your code is written in a functional style, you’ll get this for free. Instead of hopelessly shoehorning functional principles into your test code, why not write functionally from the beginning and recover the invested time in the test phase? Let’s look at the benefits of functional code for testing.
<p className="pag">Page 159</p>
6.3	Testing functional code
Whether you’re testing imperative or functional code, many of the best practices surrounding the development of unit tests, such as isolation, predictability, and repeatability, are reciprocated in FP. Because every function clearly defines all of its input parameters, it’s straightforward to supply multiple sets of boundary conditions to perform a thorough examination of all paths in your code. With respect to side effects, recall from previous chapters that all of the functions are simple and clearly defined, and all of the impure code can be safely wrapped in monads.
In addition, the impurity found in manual looping constructs has also been addressed by ceding control to higher-order operations like map, reduce, filter, and recursion, as well as using functional libraries that are side effect-free. These techniques and design patterns allow you to effectively abstract the complexity of your code so that you can test more productively and worry only about the main pieces of your business logic. This section discusses benefits of testing functional code, including the following:
<li className="litag">	Treating a function as a black box</li>
<li className="litag">	Focusing on business logic instead of control flow</li>
<li className="litag">	Separating the pure from the impure with monadic isolation</li>
<li className="litag">	Mocking external dependencies</li>
6.3.1	Treating a function as a black box
Functional programming encourages you to write independent functions that know how to work on a set of inputs in a loosely coupled manner, regardless of the rest of the application. These functions are also side effect-free and referentially transparent, which results in predictable test runs whose outcome is the same regardless of how many times they’re invoked and in what order. This allows you to treat a function as a black box and only focus on the inputs that assert the corresponding outputs. Testing a function like showStudent, for example, requires the same level of effort as testing the functional increment function shown in figure 6.5.
 
Can be run in any order.
Figure 6.5 Tests against the functional increment function, which can be repeated or run in a different order without altering their outcome
160
Recali from chapter 1 that declaring all function parameters explicitly in the function signature makes functions more configurable. This simplifies testing significantly because nothing is hidden from the caller at the moment of supplying proper arguments and creating expectations of what the functions are supposed to do. Simple functions typically declare one or two parameters that are put together via composition to create richer functions.
6.3.2	Focusing on business logic instead of control flow
The theme of decomposing tasks into simple functions has been a pattern throughout this book. I mentioned in chapter 1 that when writing functional code, you’ll spend most of your time decomposing your problem into smaller parts. This is the challenging step; the rest of the time is spent gluing them together. Fortunately, libraries like Lodash and Ramda fill in the functional gaps in the JavaScript by providing glue points with functions like curry and compose. Together with the functional combinatore you learned about in section 4.6, the upfront time spent designing and decomposing is given back to you in the testing phase. Your only responsibility is to test the individual functions that make up the main logic of your program. As an example, let’s begin writing some tests for the functional version of computeAverageGrade (here’s the code again for quick reference).
Listing 6.1 Testing the computeAverageGrade program
<pre>const fork = function(join, funcl, func2){ return function(val) {
return join(func1(val), func2(val));
};
};
const toLetterGrade = function (grade) { if (grade >= 90) return 'A'; if (grade >= 80) return 'B'; if (grade >= 70) return 'C'; if (grade >= 60) return 'D'; return 'F';
};
const computeAverageGrade =
R.compose(toLetterGrade, fork (R.divide, R.sum, R.length)); QUnit.test('Compute Average Grade', function(assert) { assert.equal(computeAverageGrade([80, 90, 100]),	'A');
});</pre>
This program uses many simple functions, such as Ramda’s R.divide, R.sum, and R.length, combined using a custom functional combinator fork, the result of which is composed with toLetterGrade. The functions provided in Ramda have already been thoroughly tested for you, so there’s no need to reinvent the wheel. This is the
<p className="pag">Page 161</p>
benefit of using functional libraries whenever possible. All that’s left for you to do is write a unit test for toLetterGrade:
<pre>QUnit.test('Compute Average Grade: toLetterGrade', function (assert) {
assert.equal(toLetterGrade(90), 'A'); assert.equal(toLetterGrade(200),'A'); assert.equal(toLetterGrade(80), 'B'); assert.equal(toLetterGrade(89), 'B'); assert.equal(toLetterGrade(70), 'C'); assert.equal(toLetterGrade(60), 'D'); assert.equal(toLetterGrade(59), 'F'); assert.equal(toLetterGrade(-10),'F');
});</pre>
Because toLetterGrade is pure, you can run it several times against different inputs to test many of its boundary conditions. Because it’s referentially transparent, you can also shift the order of these test cases without altering the result of the test. Later, you’ll learn an automated way of generating proper sample input; but for now, you’ll do this manually to see that the function works correctly against a comprehensive set of input. Now that all the individual pieces of the program have been tested, you can safely assume the program as a whole works, because it’s driven by the power of composition and functional combinators.
Along the same lines, what about fork? Functional combinators don’t require much testing, because they contain no business logic other than orchestrating function calls in your application’s control flow. Recall from section 4.6 that combinators are useful for substituting standard control artifacts like if-else (alternation) and loops (sequence).
Some libraries implement combinators out of the box, like R.tap; but when using custom ones (like fork), you can test them independent of the rest of the application and apart from the business logic. For the sake of completeness, let’s write a quick test for fork that showcases another good use of R.identity:
<pre>QUnit.test('Functional Combinator: fork', function (assert) {
const timesTwo = fork((x) => x + x, R.identity, R.identity); assert.equal(timesTwo(1), 2); assert.equal(timesTwo(2), 4);
});</pre>
Again, testing with a simple function is sufficient, because combinators are completely agnostic when it comes to the arguments provided. Using functional libraries, composition, and combinators makes development and testing trivial; but things can get messy when you’re dealing with impure behavior.
6.3.3	Separating the pure from the impure with monadic isolatimi
In previous chapters, you learned that most programs have pure and impure parts. This is especially true in client-side JavaScript, because interacting with the DOM is
PAGE 162
what the language was meant for. On the server, you’ll have other requirements such as reading from a database or file. You learned how to use composition to combine the pure and impure functions that make up your programs. But this still made them impure; you relied on the IO monad to push the line of purity even further away so that you could obtain referential transparency from the application’s perspective, making it more declarative and easier to reason about. In addition to IO, you used other monads like Maybe and Either to create a surefire way to run programs that are still responsive in the event of failure. With all these techniques, you can control most side effects. But when your JavaScript code needs to read and write to the DOM, how can you guarantee that your tests remain isolated and repeatable?
Recall that the nonfunctional version of showStudent makes no effort to separate its impure parts: it’s all mixed together, so it will run as a whole on each and every test. This is utterly inefficient and unproductive because you would need to run the entire program every time even when you only wanted to validate, say, that db.get(ssn) worked with different combinations of Social Security numbers. Another disadvantage is that you can’t test it thoroughly because all statements are tightly coupled. For instance, the first block of code will exit the function early with an exception and prevent you from testing db.get(ssn) against invalid input.
On the other hand, functional programming is aimed at reducing the involvement of operations that cause side effects (like IO) to minimal functions (simple reads and writes) so that you can increase the testable scope of your application logic while decoupling the boundaries of IO testing you aren’t responsible for. Let’s revisit the functional version of showStudent:
<pre>const showStudent = R.compose( map(append('#student-info')), liftIO, map(csv),
map(R.props(['ssn', 'firstname', 'lastname'])),
chain(findStudent),
chain(checkLengthSsn),
lift(cleanInput));</pre>
Looking closely at both programs, you can see how the functional version is essentially taking the imperative version apart and bolting it together with composition and monads. As a result, you dramatically increase the testable scope of showStudent and clearly recognize and isolate the pure functions from the impure (see figure 6.6).
Let’s analyze the testability of the components of showStudent. Of the five functions, only three can be tested reliably: cleanInput, checkLengthSsn, and csv. Although findStudent has side effects when reading data from external resources, you’ll see ways to get around this in a later section. The remaining function, append, has no real business logic because it’s been reduced to appending to the DOM whatever data is given to it. It’s not in your best interest, and it isn’t the best use of your time, to test DOM APIs; leave that to browser manufacturers. With functional programming, you can take a hard-to-test program and split it into highly testable pieces.
<p className="pag">Page 163</p>
Figure 6.6 Identifying the testable areas of the showStudent program. The components that perform IO are impure and can’t be tested reliably because they contain side effects. Other than having impure parts, the scope of the entire program remains highly testable.
Now, let’s compare this against the nonfunctional, tightly coupled code in listing 6.2. In the functional version, you’re able to test roughly 90% of the program reliably, whereas the imperative version has the same fate as the procedural increment function—it fails on subsequent or out-of-order runs.
The following listing shows the unit tests for each testable component in figure 6.6.
Listing 6.2 Unit testing pure components of showStudent
 

 
<p className="pag">Page 164</p>
Because these functions are isolated and thoroughly tested on their own (again, later I’il show you an automated mechanism for generating input data), you can safely refactor them without fear of breaking things in other places.
You have one last function to test: findStudent. This function originates from the impure safeFindObject, which queries an external object storage to look up student records. But the side effects in this function are manageable by using a technique called mock objects.
6.3.4	Mocking external dependencies
Mocking is a popular testing technique used to simulate the behavior of a function’s external dependencies in a controlled, assertable manner, so it’s good for dealing with some types of side effects. Mock objects will cause your test to fail if its expectations aren’t met. They’re like programmable dummy methods (or stubs) that you can use to define up front the expected behavior of an object that interact with your functions. In this case, mocking the call to the DB object gives you complete control over this external resource in order to create more predictable and consistent tests. For this task, you’ll use a QUnit mock plug-in called Sinon.JS (see the appendix for details on how to set up this plug-in).
Sinon.JS enhances the test environment with a sinon object used to create mock versions of any object, all accessible in a mock context. In this case, you populate the context with the DB object, which will serve as the acting stub for this dependency:
<pre>const studentDb = DB('students');
const mockContext = sinon.mock(studentDb);</pre>
Using this mock context, you can set many expectations for the behavior of the mocked object to assert things like how many times it’s called, what arguments it receives, as well as what its return value should be. To validate the behavior of the Either monad that wraps the return value of the safeFindObject, you’ll create two unit tests: one that exercises the Either.Right type and another that triggers an Either.Left. You’ll take advantage of the curried nature of findStudent that lets you easily inject any storage implementation to be used to perform the lookups, similar to what you did in chapter 4 with the factory method pattern. As you’ve seen in the code listings, this function invokes the get method on the storage object; now that you have full control of this object via the mock context, you can easily control the desired return value, as shown next.
Listing 6.3 Mocking the external dependency of findStudent
 
<p className="pag">Page 165</p>
Figure 6.7 shows the result of running the tests with QUnit and Sinon.JS for the testable parts of showStudent.
 
Figure 6.7 Execution of all unit tests for the showStudent program. Tests 3 and 4 use QUnit with Sinon.JS because they require mocked dependencies to simulate the functionality of fetching a student record.
 
<p className="pag">Page 166</p>
The fact that functional code is orders of magnitude more testable than imperative code boils down to one principle: referential transparency. The essence of an assertion is verifying that referential transparency always holds:
assert.equal(computeAverageGrade([80, 90, 100]),	'A');
There’s a lot more to referential transparency than meets the eye. This concept can extend into other realms of software development, such as program specifications. After all, the sole purpose of tests is to verify that the specifications of the system are met.
6.4 Capturing specifications with property-based testing
Unit tests can be used as artifacts to document and capture the runtime specification of a function. In the case of computeAverageGrade, for example
<pre>QUnit.test('Compute Average Grade', function (assert) { assert.equal(computeAverageGrade([80, 90, 100]),'A'); assert.equal(computeAverageGrade([80, 85, 89]),	'B');
assert.equal(computeAverageGrade([70, 75, 79]),	'C');
assert.equal(computeAverageGrade([60, 65, 69]),	'D');
assert.equal(computeAverageGrade([50, 55, 59]),	'F');
assert.equal(computeAverageGrade([-10]),	'F');
});</pre>
you can come up with a simple document that states the following:
<li className="litag">	“If the student’s average is 90 or above, the student is awarded an A.”</li>
<li className="litag">	“If the student’s average is between 80 and 89, the student is awarded a B.”</li>
<li className="litag">	... And so on</li>
Natural language is often used as a means to capture the requirements a system shall fulfill; but natural languages express meaning in a certain context, often not known by all parties, and this generates ambiguity when you try to translate requirements to code. This is why you have to constantly bug product owners or team leads to clarify ambiguities present in task specifications. One of the main causes of ambiguity is a result of adopting an imperative style of documentation when using if-then cases: if case A, then the system should do B. The downside of this approach is that it doesn’t describe the totality of the task to account for all boundary conditions. What if case A doesn’t occur? What is the system expected to do then?
Good specifications shouldn’t be case-based; they should be generic and universal. Look at the slight difference in wording in these two statements:
<li className="litag">	“If the student’s average is 90 or above, the student is awarded an A.”</li>
<li className="litag">	“Only an average of 90 or above will award the student an A.”</li>
By removing the imperative-case clauses, the second statement is much more complete. Not only does it express what happens when the student reaches 90 or above, but it also places the restriction that no other numerical range will result in an A. You can derive from the second statement that, at the least, any other computed
<p className="pag">Page 167</p>
average won’t result in the student being awarded an A, which you couldn’t intuit from the first.
Universal requirements are much easier to work with, because they aren’t dependent on the status of the system at any point in time. For this reason, like unit tests, good specifications don’t have side effects or make assumptions about their surrounding context.
Referentially transparent specifications increase our understanding of what functions are supposed to do and give us a clear picture of the input conditions they must satisfy. Because referentially transparent functions are consistent and have clear input parameters, they lend themselves to being easily tested with automated mechanisms that can push them to the limit. This brings us into a much more compelling testing modality called property-based testing. A property-based test makes a statement about what the output of a function should be when executed against a definite set of inputs. The canonical framework or reference implementation is Haskell’s QuickCheck.
QuickCheck: Property-based test for Haskell
QuickCheck is a Haskell library for randomized property-based testing of a program's specification or properties. You design a specification of a pure program in the form of properties the program should fulfill, and QuickCheck generates a large permutation of test cases against your program and produces a report. You can find more information at https://hackage.haskell.org/package/QuickCheck.
By the same token, JavaScript emulates QuickCheck with a library called JSCheck (see the appendix for setup information), by none other than Douglas Crockford,1 author of JavaScript: The Good Parts (O’Reilly, 2008). JSCheck can be used to create a technical response to a matching referentially transparent specification of a function or program. Hence, proving the properties of a function is done by generating a large number of random test cases aimed at rigorously exercising all possible output paths of your function.
Also, property-based tests control and manage the evolution of your program as it’s being refactored to ensure that new code doesn’t introduce unintentional bugs into the system. The main advantage of using a tool like JSCheck is that its algorithm generates abnormal datasets to test with. Some of the edge cases it generates would most likely be overlooked if you had to manually write them.
The JSCheck module is nicely encapsulated into a global JSC object:
<pre>JSC.claim(name, predicate, specifiers, classifier)</pre>
Index 1 Douglas Crockford is a popular computer programmer, writer, and speaker best known for his ongoing involvement in the evolution of the JavaScript language, popularizing JSON, and creating several JavaScript libraries like JSLint, JSMin, and JSCheck, among others. He’s also the author of the must-read JavaScript: The Good Parts.
<p className="pag">Page 168</p>
At the heart of this library is the creation of claims and verdicts. A claim is made up of the following:
<li className="litag">	Name—Description of the claim (similar to QUnit’s test description).</li>
<li className="litag">	Predicate—Function that returns a verdict of true when the claim is satisfied or false otherwise.</li>
<li className="litag">	Specifiers—Array describing the type of the input parameters and the specification with which to generate random datasets.</li>
<li className="litag">	Classifier (optional)—Function associated with each test case that can be used to reject non-applicable cases</li>
Claims are passed into JSCheck.check to run random test cases. This library wraps creating a claim and feeding it into the engine in a single call to JSCheck.test, so you’ll use this shortcut method in the example tests. Let’s look at an example of writing a simple JSCheck specification for computeAverageGrade that captures the following specification: “Only an average of 90 or above will award the student an A.”
Listing 6.4 Property-based test for computeAverageGrade
 
<p className="pag">Page 169</p>
<li className="litag">	JSC.number(90, 100)—Describes the types of elements in the input array. In this case, they’re numeric (including integers and floating-point numbers) in the range from 90 to 100.</li>
The predicate function is a bit tricky to understand. The predicate returns a true verdict when a claim holds, but what happens in the body of the predicate is for you to determine depending on your specific program and what you want it to verify. In addition to the verdict function used to announce the result of the test case, you’re also given the generated random input and the expected output. In this case, the result you want to announce is the check to validate that computeAverageGrade returns the expected grade: A. This example uses a few specifiers, but there are many more you can read about on the project’s website, and you can also create your own.
Now that you understand the main pieces of the program, let’s go ahead and run it. The report can be lengthy, because JSCheck will generate by default 100 random test cases based on the specification provided. I’ve trimmed it, but you can still follow what’s happening:
<pre>Compute Average Grade: 100 classifications, 100 cases tested, 100 pass</pre>
Testing for an A on grades:
<pre>90.042,98.828,99.359,90.309,99.175,95.569,97.101,92.24 pass 1</pre>
Testing for an A on grades:
<pre>90.084,93.199, pass 1
// and so on 98 more times Total pass 100, fail 0</pre>
JSCheck programs are self-documented; you can easily describe the contract for your function’s inputs and outputs to a level regular unit tests can’t. You can also see the significant level of detail that a JSCheck report contains. JSCheck programs can run as standalone scripts or embedded into QUnit tests; that way, they can be included as part of your test suites. The interaction between these libraries is shown in figure 6.8.
In the next example, you’ll use JSCheck to test the checkLengthSsn program, which has the following specification:
<li className="litag">	A valid Social Security number must satisfy these conditions:</li>
-	Contains no spaces
-	Contains no dashes
-	Is nine characters long
-	Follows the format outlined by ssa.gov, composed of three parts:
1	The first set of three digits is called the Area Number.
2	The second set of two digits is called the Group Number.
3	The final set of four digits is called the Serial Number.
<p className="pag">Page 170</p>
Figure 6.8 The integration of the main components: JSCheck and QUnit. A QUnit test encapsulates a JSCheck test specification. The specification and the function being tested are supplied to the verdict function, which is run through the JSCheck engine to invoke the pass/fail callbacks. These callbacks can be used to trigger QUnit assertions.
The following listing shows the code; then I explain the relevant parts.
Listing 6.5 JSCheck test for checkLengthSsn
 

 
<p className="pag">Page 171</p>
This program joins the forces of JSCheck and QUnit through the JSC.on_fail and JSC.on_pass functions, which report to QUnit about any assertions that are fulfilled or that violate the specification provided. Because the specifier
JSC.SSN(JSC.integer(100, 999), JSC.integer(10, 99), JSC.integer(1000,9999))
describes the contract for valid SSNs, this program is expected to always output the correct results for any combination of SSN of the form XXX-XX-XXXX:
<pre>Check Length SSN:
100 classifications, 100 cases tested, 100 pass
Testing Custom SSN:	121-76-4808 pass 1
Testing Custom SSN:	122-87-7833 pass 1
Testing Custom SSN:	134-44-6044 pass 1
Testing Custom SSN:	139-47-6224 pass 1
Testing Custom SSN:	992-52-3288 pass 1
Testing Custom SSN:	995-12-1487 pass 1
Testing Custom SSN:	998-46-2523 pass 1
Total pass 100</pre>
Nothing out of the ordinary here. But you can tweak the specification to also include invalid input with a three-digit Group Number and see how the program behaves:
<pre>JSC.SSN(JSC.integer(100, 999),JSC.integer(10, 999),JSC.integer(1000,9999))</pre>
Running QUnit with JSCheck flags failures as expected. Figure 6.9 shows the output of a single failure, for brevity.
Figure 6.9 A failure detected as a result of an invalid property check with QUnit. When you randomize the input to include invalid inputs, the JSCheck algorithm has enough entropy that 89 of 90 tests fail.
Where did JSC.SSN come from? JSCheck specifiers behave just like functional combinators that can be composed to create more-specialized specifiers. This case uses a custom JSC.SSN made from the combination of three JSC.integer specifiers describing the properties of each SSN group, as shown next.
 
<p className="pag">Page 172</p>
Listing 6.6 Custom JSC.SSN specifier
JSCheck works only with pure programs, which means you can’t test the showStudent program entirely, but you can use it to test each component in isolation. I leave that to you as an exercise. Property-based testing is compelling because it exercises functions to the limit. Its best quality, in my opinion, is that it can be used to verify whether code is indeed referentially transparent, because it’s expected to work consistently against the same contract and verdict. But why submit your code to such a heavy procedure? The answer is simple: to make your tests effective.
6.5	Measuring effectiveness through code coverage
Measuring a unit test’s effectiveness is an arduous task if not done with the proper tools in place, because it involves studying the test’s code coverage through the functions under test. Getting coverage information involves traversing all unique paths belonging to a program’s control flow; one way to achieve this is by studying the flow of code against a function’s boundary conditions.
Certainly, code coverage alone isn’t an indicator of quality, but it does describe the degree to which your functions are tested, which correlates to better quality. Would you want code that’s never seen the light of day deployed to production? I didn’t think so.
Code-coverage analysis can find areas in your code that haven’t been tested, allowing you to create additional tests to uncover them. Normally, this includes code for error handling that you let slip through the cracks and forget to come back to. You can use code coverage to measure the percentage of lines of code that are executed when invoking a program via unit tests. To compute this information, you can use a library called Blanket.js, which is a code-coverage tool for JavaScript. It’s designed to
 
<p className="pag">Page 173</p>
complement your existing JavaScript unit tests with code-coverage statistics. It works in three phases:
1	Load source files
2	Instrument the code by adding tracker lines
3	Connect the hooks in the test runner to output coverage details
Blanket collects coverage information with the help of an instrumentation phase during which it captures meta-information regarding statement execution, which you can display nicely in a QUnit report. Details for setting up Blanket can be found in the appendix. You can instrument any JavaScript module or program via the custom data-covered attribute in the script include line. By analyzing the statementcoverage percentage, you can see that functional code is much more testable than imperative code.
6.5.1	Measuring the effectiveness of testing functional code
Throughout this chapter, you’ve seen that functional programs are more testable due to the ease with which tasks can be broken apart to become atomic, verifiable unite. But don’t take my word for it; you can measure it empirically by performing a statement-by-statement percentage-coverage analysis on the showStudent program. First, let’s look at the simplest test case: a positive test.
MEASURING EFFECTIVENESS OF IMPERATIVE AND FUNCTIONAL CODE WITH VALID INPUTS
First let’s look at code-coverage statistics against a successful run of the imperative version of showStudent, shown in listing 6.2. Using Blanket with QUnit, mark this program to be instrumented:
<pre><script src="imperative-show-student-program.js" data-cover></script></pre>
Now, running the following test
<pre>QUnit.test('Imperative showStudent with valid user', function (assert) { const result = showStudent('444-44-4444'); assert.equal(result, '444-44-4444, Alonzo, Church');
});</pre>
produces an 80% total statement-coverage percentage, as shown in the QUnit/Blanket output in figure 6.10.
This shouldn’t surprise you, because the error-handling code was all skipped. For imperative programs, 75-80% code coverage is considered to be very good. What you can take from this run is that 80% is the best coverage you can get with a single unit test execution. On the other hand, let’s instrument and run a positive test against the functional version:
<pre><script src="functional-show-student-program.js" data-cover></script></pre>
<p className="pag">Page 174</p>
Figure 6.10 QUnit/Blanket output running the imperative showStudent with valid input. The highlighted lines represent statements that never ran. Because 12 of 15 lines ran, this registers only 80% of total coverage information on this function.
Again, running the “happy path” test runs the program with a valid SSN, but this time producing a whopping figure of 100% coverage (see figure 6.11)!
Figure 6.11 A positive unit test against the functional showStudent generates a 100% line-percentage coverage. Every line of the testable business logic is executed!
But wait: if the input was valid, why didn’t it skip the error-handling logic? This is the work of monads in the code, which can propagate the concept of an empty value, or nothingness (in the form of an Either.Left or a Maybe.Nothing) seamlessly throughout the entire program; thus, every function is run, yet logic encapsulated in mapping functions is skipped.
It’s remarkable how functional code is so robust and flexible. Now, let’s run a negative test with invalid input.
 

 
<p className="pag">Page 175</p>
Figure 6.12 The imperative version of showStudent skips the positive path of execution, which translates to only a few lines being executed and a low 40% coverage.
MEASURING EFFECTIVENESS OF IMPERATIVE AND FUNCTIONAL CODE WITH INVALID INPUTS
Let’s measure the effectiveness of both programs when run with invalid conditions, such as when the input is nuli. As you can see from figure 6.12, the imperative code reports (not surprisingly) a mediocre coverage value:
<pre>QUnit.test('Imperative Show Student with nuli', function (assert) { const result = showStudent(null); assert.equal(result, null);
});</pre>
This result is due to the presence of if-else blocks that create divergent control flow that branches in different directions. As you’ll see shortly, this also leads to complex functions.
In contrast, the functional program handles the null case much more gracefully, because it only skips logic that would manipulate the invalid input (now null) directly. But the entire structure of the program (the interaction among functions) stays put and is successfully invoked and tested from start to finish. Recall that because there’s an error, the output of the functional code is a Nothing. You don’t have to check for a null output—the following test case is sufficienti
<pre>QUnit.test('Functional Show Student with null', function (assert) { const result = showStudent(null).run(); assert.ok(result.isNothing);
});</pre>
 
<p className="pag">Page 176</p>
Figure 6.13 The functional version of showStudent skips lines related only to manipulating the data that would have originated from an otherwise valid input.
Figure 6.13 shows the areas that were left untouched due to the skipped logic.
Even in the presence of invalid data, the functional program doesn’t just skip execution of entire sections of code. It gracefully and safely propagates the invalid condition in monads, outputting a decent 80% (twice as much as the imperative counterpart); see figure 6.14.
Because it’s a lot more testable, the functional code should give you a sense of security and comfort to deploy it to your production systems—in case immutability and elimination of side effects hasn’t done the trick. As mentioned earlier, the presence of conditional and loop blocks in imperative code not only makes it hard to test and hard to
 

 
Figure 6.14 The functional showStudent continues to yield great coverage results even against invalid inputs.
<p className="pag">Page 177</p>
reason about, but also further increases the complexity of the function in question. How can you measure complexity?
6.5.2	Measuring the complexity of functional code
You can measure a program’s complexity by closely examining its control flow. At a glance, you determine that a block of code is complex when it’s visually difficult to follow. Functional programming presents a nice declarative view of the code that makes it visually appealing. This equates to reduced complexity from the developer’s point of view. In this section, you’ll see that functional code is also less complex from an algorithmic point of view.
Many factors can contribute to complex code, including conditional blocks and loops, which can also be nested in other structures. Branching logic, for instance, is mutually exclusive and splits the control-flow logic into two independent branches according to a Boolean condition. Multiple if-else blocks in your code can be hard to trace; the process is even harder when their conditions are based on external factors—side effects dictating the path the code should follow. The higher the number of conditional blocks and nested conditional blocks, the harder functions are to test, which is why it’s important to keep your functions as simple as possible. This is deeply rooted in FP’s philosophy of reducing all functions to simple lambda expressions whenever possible and combining them using composition and monads.
Cyclomatic complexity (CC) is a quantitative software metric used to measure the number of linearly independent paths that functions take. From this concept comes the idea of verifying a function’s boundary conditions, to ensure that all possible paths through the functions are tested. This is accomplished with some simple graph theory of nodes and edges (as shown in figure 6.15):
<li className="litag">	Nodes correspond to indivisible blocks of code.</li>
<li className="litag">	Directed edges connect two blocks of code if the second block can be possibly executed after the first.</li>
Figure 6.15 Imperative if-else blocks and for loops in imperative code are translated into the use of map, filter, and reduce in functional programs.
 
<p className="pag">Page 178</p>
In chapter 3, we studied the difference between an imperative control-flow graph and a functional one, and how functional cedes all branching and iteration logic to higher-order operations like map and filter.
What contributes to CC? Mathematically, the complexity of any program can be computed as M = E N + P, where
<li className="litag">	E = Number of edges in the flow</li>
<li className="litag">	N = Number of nodes or blocks</li>
<li className="litag">	P = Number of nodes that have exit points</li>
All control structures contribute to CC; the lower the value, the better. A conditional block affects complexity the most because it bifurcates the program’s control flow into two linearly independent paths. So, naturally, the greater the number of control artifacts, the larger the CC metric will be, and, thus, the harder the program is to test.
Let’s revisit the control flow of the imperative showStudent. To easily delineate the flow, I’ve annotated the statements that translate to nodes in the graph and then generated a flowchart, shown in figure 6.16. Applying the CC formula to this graph with 11 edges, 10 nodes, and 3 exit points yields M = E N + P = 11 10 + 3 = 4.
On the other hand, measuring CC in functional programs is much simpler because FP tends to avoid both loops and conditional statements as much as possible in favor of higher-order functions, functional combinators, and other abstractions. All this translates to fewer nodes and edges and all paths in the function being linearly independent. Hence, functional programs tend to have a cyclomatic complexity value near 1. This is exactly what happens with the functional showStudent, because it’s composed
Figure 6.16 Potential nodes in the imperative version of showStudent. These labels have been converted into a flowchart of nodes and edges, which illustrates the number of different linearly independent paths through the code caused by the presence of conditional statements.
 
<p className="pag">Page 179</p>
of many functions that don’t contain nodes and edges (just single exit points), making its cyclomatic complexity value M = E N + P = 0 0 + 1 = 1. In the realm of complexity, some other related metrics extrapolated from both programs are worth noting (see table 6.1). You can measure them with the help of the website at http:// jscomplexity.org.
Table 6.1 Other important static code metrics comparing the imperative to the functional Solutions
The cyclomatic complexity density reexpresses the original CC value as a percentage based on the number of imperative lines of code, which is also substantially lower in functional programs. The degree to which a program is testable is directly proportional to how well the program is designed. Simply put, the more modular your code is, the easier it is to test. Functional programs easily take the lead because they embrace the modularity of your units, which are the functions themselves.
Because functional programming is heavily rooted in eliminating manual loops in favor of higher-order functions; composition instead of imperative; sequential evaluation of code; and higher levels of abstractions with currying, it’s not senseless to think that all this could affect performance. Can we have our cake, and eat it too?
6.6 Summary
<li className="litag">	Programs that rely on abstractions to join very simple functions are modular.</li>
<li className="litag">	Modular code based on pure functions is easy to test and leads the way for more-rigorous types of testing methodology such as property-based testing.</li>
<li className="litag">	Testable code must have a straightforward control flow.</li>
<li className="litag">	A simple control flow reduces the complexity if your program as a whole. This can be measured quantitatively via complexity metrics.</li>
<li className="litag">	Reduced complexity leads to programs that are easy to reason about.</li>
 
