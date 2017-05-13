<p className="pag">Page 117 - Chapter 5 - Design patterns against complexity</p>
This chapter covers
<li className="litag">	The issues with imperative error-handling schemes</li>
<li className="litag">	Using containers to prevent access to invalid data</li>
<li className="litag">	Implementing functors as a mechanism for data transformation</li>
<li className="litag">	Understanding monads as data types that facilitate composition</li>
<li className="litag">	Consolidating error-handling strategies with monadic types</li>
<li className="litag">	Interleaving and composing monadic types</li>
Null-references ... was a billion-dollar mistake.
—Tony Hoare, InfoQ
Some people mistakenly view functional programming as a paradigm devoted only to academic problems, mostly numerical in nature, that are, for the most part, oblivious to the probabilities of failure real-life systems deal with. In recent years,

<p className="pag">Page 118</p>
however, people are finding that functional programming can treat error handling more elegantly than any other development style.
Many issues can arise in software where data inadvertently becomes nuli or undefined, exceptions are thrown, or network connectivity is lost, to name a few. Our code needs to account for the potential of any of these issues occurring, which unavoidably creates complexity. As a result, we spend countless hours making sure our code throws and catches the proper exceptions and checks for nuli values everywhere we can think of, and what do we get? Even more complex code—code that doesn’t scale and becomes harder to reason about as the size and complexity of applications increase.
We need to work smarter, not harder. In this chapter, I’ll introduce the concept of functors as a means to create simple data types on which functions can be mapped. A functor is applied to data types called monads that contain specific behavior for deal- ing with errors in different ways. Monads are one of the hardest concepts to grasp in functional programming because the theory is deeply rooted in category theory, which I won’t cover. My intention is to focus only on the practical aspects. Having said that, I’ll slowly work my way into that topic, layering in some prerequisite concepts, and then show how you can use monads to create fault-tolerant function compositions in a way that imperative error-handling mechanism can’t.
5.1	Shortfalls of imperative error handling
JavaScript errors can occur in many situations, especially when an application fails to communicate with a server or tries to access properties of a nuli object. Also, third- party libraries can have functions throw exceptions to signal special error conditions. Hence, we always need to be prepared for the worst and design with failure in mind, instead of letting it become an afterthought and regretting it later. In the imperative world, exceptions are handled via the try-catch idiom.
5.1.1	Error handling with try-catch
JavaScript’s current exception-handling mechanism is geared toward throwing and catching exceptions through the popular try-catch structure present in most mod- ern programming languages:
<pre>try {
// code that might throw an exception in here
}
catch (e) {
// statements to handle any exceptions console.log('ERROR' + e.message);
}</pre>
The purpose of this structure is to surround a piece of code that you deem to be unsafe. Upon throwing an exception, the JavaScript runtime abruptly halts the
<p className="pag">Page 119</p>
program’s execution and creates a stack trace of all function calls leading up to the problematic instruction. As you know, specific details about the error, such as the message, line number, and filename, are populated into an object of type Error and passed into the catch block. The catch block becomes a safe haven so that you can potentially recover your program. For example, recall the findObject and find- Student functions:
<pre>
// findObject :: DB, String -> Object const findObject = R.curry(function (db, id) { const result = find(db, id) if(!result) {
throw new Error('Object with ID [' + id + '] not found');
}
return result;
});
// findStudent :: String -> Student
const findStudent = findObject(DB('students'));
Because any of these functions can throw an exception, in practice you would need to enclose them in a try-catch block when calling them:
try {
var student = findStudent('444-44-4444');
}
catch (e)	{
console.log('ERROR' + e.message);
}
</pre>
Just as you abstracted loops and conditional statements with functions before, you need to abstract error handling. Clearly, functions that use try-catch as shown here can’t be composed or chain together and put a great deal of pressure on the design of your code.
5.1.2	Reasons not to throw exceptions in functional programs
The structured mechanism of throwing and catching exceptions in imperative JavaScript code has many drawbacks and is incompatible with the functional design. Functions that throw exceptions
<li className="litag">	Can’t be composed or chained like other functional artifacts.</li>
<li className="litag">	Violate the principle of referential transparency that advocates a single, predict- able value, because throwing exceptions constitutes another exit path from your function calls.</li>
<li className="litag">	Cause side effects to occur because an unanticipated unwinding of the stack impacts the entire system beyond the function call.</li>
Paga 120
<li className="litag">	Violate the principle of non-locality because the code used to recover from the error is distanced from the originating function call. When an error is thrown, a function leaves the local stack and environment:</li>
<pre>try {
var student = findStudent('444-44-4444');
... more lines of code in between
}
catch (e)	{
console.log('ERROR: not found');
// Handle error here
}</pre>
<li className="litag">	Put a great deal of responsibility on the caller to declare matching catch blocks to manage specific exceptions instead ofjust worrying about a function’s single return value.</li>
<li className="litag">	Are hard to use when multiple error conditions create nested levels of exception- handling blocks:</li>
<pre>var student = null; try {
student = findStudent('444-44-44444');
}
catch (e)	{
console.log('ERROR: Cannot locate students by SSN');
try {
student = findStudentByAddress(new Address(...));
}
catch (e)	{
console.log('ERROR: Student is no where to be found!');
}
}</pre>
You’re probably asking yourself, “Is throwing exceptions completely off the table in functional programming?” I don’t believe so. In practice, they can never be off the table, because there are many factors outside of your control that you need to account for. Also, you may be writing code against a library outside of your control that imple- ments exceptions.
Using exceptions can be effective for certain edge cases. In checkType in chapter 4, you used an exception to signal a fundamental misuse of the API. They’re also useful to signal unrecoverable conditions like RangeError: Maximum call stack size exceeded, which I’ll talk about in chapter 7. Throwing exceptions has a place but shouldn’t be done excessively. A common scenario that occurs in JavaScript is the infamous Type- Error resulting from invoking a function on a null object.
<p className="pag">Page 121</p>
5.1.3	Problems with null-checking
The alternative to failing abruptly from a function cali is to return nuli. That, at least, guarantees only one route that leaves a function call, but it’s not any better. Functions that return nuli create a different responsibility for users: pesky nuli checks. Con- sider the function getCountry, which is in charge of reading a student’s address and then country:
<pre>function getCountry(student) {
let school = student.getSchool(); if(school !== null) {
let addr = school.getAddress(); if(addr !== null) { var country = addr.getCountry(); return country;
}
return null;
}
throw new Error('Error extracting country info');
}</pre>
At a glance, this function should have been simple to implement—after all, it’s just extracting an object’s property. I could have created a simple lens that focuses on this property; in the event of a null address, a lens is smart enough to return undefined, but it doesn’t help me to print an error message.
Instead, I ended up with lots of lines of code to defend myself from unexpected behavior. Defensively wrapping code with lots of try-catch or null checks is cow- ardly. Wouldn’t it be great to be able to handle errors effectively while avoiding all of this unnecessary boilerplate code?
5.2	Building a better solution: functors
Functional error handling is a radically different approach to properly cope with the adversities found in software systems. The idea, however, is somewhat similar: create a safety box (a container, if you will) around potentially hazardous code (see figure 5.1).
 
<p className="pag">Page 122</p>
In functional programming, this notion of boxing the dangerous code stili applies, but you throw away the try-catch block. Now, here’s the big difference. Walling off impurity is made a first-class citizen in functional programming by the use of func- tional data types. Let’s begin with the most basic type and move into the more advanced ones.
5.2.1	Wrapping unsafe values
Containerizing (or wrapping) values is a fundamental design pattern in functional programming because it guards direct access to the values so they can be manipulated safely and immutably in your programs. It’s like wearing armor before going to battle. Accessing a wrapped value can only be done by mapping an operation to its container. In this chapter, I’ll talk extensively about the concept of a map, but you already learned about this in chapter 3 when you used map on arrays—the array was the container of values, in that case.
It turns out you can map functions to much more than just arrays. In functional JavaScript, a map is nothing more than a function; this idea comes from referential trans- parency, where a function must always “map to” the same result given the same input. So you can also think of map as a gate that allows you to plug in a lambda expression with specific behavior that transforms an encapsulated value. In the case of arrays, you used map to create a new array with the transformed values.
Let’s illustrate this concept with a simple data type called Wrapper, in the following listing. Although this type is simple, the underlying principle is extremely powerful and will pave the way for the next sections in this chapter, so it’s important that you understand it.
Listing 5.1 Functional data type to wrap values
You can use a wrapper object to encapsulate a potentially erroneous value. Because you won’t have direct access to it, the only way to extract it is to use the identity
 
<p className="pag">Page 123</p>
function you learned about in chapter 4 (notice there’s no explicit get method on this wrapper type). Certainly JavaScript will give you easy access to this value, but the point to understand here is that once the value enters the container, it can’t directly retrieved or transformed (like a virtual barrier); see figure 5.2.
You can map any function to this container to either log to the console or manipulate it as needed:
The benefit of this simple idea is that any code written against these wrappers needs to be able to “reach into the container” via Wrapper.map in order to use the guarded value contained within. But if the value happens to be nuli or undefined, the respon- sibility is placed on the caller, which may or may not gracefully handle this case. Later, you’ll see a better alternative:
As you can see from this example, to manipulate a value within a guarded, wrapped context, you need to apply a function to it; you can’t invoke a function directly. What
 

 

 
<p className="pag">Page 124</p>
to do in the event of an error can be delegated to concrete wrapper types. In other words, you can check for nuli before calling the function, or check for an empty string, a negative number, and so on. Hence, the semantic of Wrapper.map is deter- mined by the specific implementation of the wrapping type.
Let’s not get ahead of ourselves; we have some more groundwork to cover. Con- sider this slightly different variation of map, called fmap:
fmap knows how to apply functions to values wrapped in a context. It first opens the container, then applies the given function to its value, and finally closes the value back into a new container of the same type. This type of function is known as a functor.
5.2.2	Functors explained
In essence, a functor is nothing more than a data structure that you can map func- tions over with the purpose of lifting values into a wrapper, modifying them, and then putting them back into a wrapper. It’s a design pattern that defines semantics for how fmap should work. Here’s the general definition of fmap:
The function fmap takes a function (from A -> B) and a functor (wrapped context) Wrapper(A) and returns a new functor Wrapper(B) containing the result of applying said function to the value and closing it once more. Figure 5.3 shows a quick example that uses the increment function as a mapping function from A -> B (except in this case, A and B are the same types).
Notice that because fmap basically returns a new copy of the container at each invocation, much as lenses (chapter 2) work, it can be considered immutable. In fig- ure 5.3, mapping the increment over Wrapper(1) returns a completely new object,
Figure 5.3 A value of 1 is contained within Wrapper. The functor is called with the wrapper and the increment function, which transforms the value internally and closes it back into a container.
 

 

 
<p className="pag">Page 125</p>
Wrapper(2). Let’s go over a simple example before you begin applying functors to solve more-practical problems. Consider a simple 2 + 3 = 5 addition using functors. You can curry an add function to create a plus3 function:
<pre>const plus = R.curry((a, b) => a + b);
const plus3 = plus(3);</pre>
Now you’ll store the number 2 into a Wrapper functor:
<pre>const two = wrap(2);</pre>
Calling fmap to map plus3 over the container performs addition:
Figure 5.4 The value 2 has been added to a Wrapper container. The functor is used to manipulate this value by unwrapping it from the context, applying the given function to it, and rewrapping the value back into a new context.
The purpose of having fmap return the same type (or wrap the result again into a con- tainer of the same type) is so you can continue chaining operations. Consider the fol- lowing example, which maps plus3 on a wrapped value and logs the result.
Listing 5.2 Chaining functors to apply additional behavior to a given context
<pre>const two = wrap(2);
two.fmap(plus3).fmap(R.tap(infoLogger)); //-> Wrapper(5)</pre>
 
The outcome of fmap yields another context of the same type, which you can map R.identity over to extract its value. Notice that because the value never escapes the wrapper, you can map as many functions as you want to it and transform its value at each step of the way:
<pre>two.fmap(plus3).fmap(plus10); //-> Wrapper(15)</pre>
This can be a bit tricky to understand, so figure 5.4 shows how fmap works with plus3.
 
<p className="pag">Page 126</p>
Running this code prints the following message on the console:
<pre>InfoLogger [INFO] 5</pre>
Does this pattern of chaining functions look familiar? This is intentional: you’ve been using functors all along without realizing it. This is exactly what the map and filter functions do for arrays (you can review sections 3.3.2 and 3.3.4 if you need to):
<pre>map	:: (A -> B)	-> Array(A) -> Array(B)
filter :: (A -> Boolean) -> Array(A) -> Array(A)</pre>
map and filter are type-preserving functors, which is what activates the chaining pat- tern. Consider another functor you’ve seen all along: compose. As you learned in chapter 4, it’s a mapping from functions into other functions (also type-preserving):
<pre>compose :: (B -> C) -> (A -> B) -> (A -> C)</pre>
Functors, like any other functional programming artifact, are governed by some impor- tant properties:
<li className="litag">	They must be side effect-free. You can map the R.identity function to obtain the same value over a context. This proves functors are side effect-free and pre- serves the structure of the wrapped value:</li>
<pre>wrap('Get Functional').fmap(R.identity); //-> Wrapper('Get Functional')</pre>
<li className="litag">	They must be composable. This property indicates that the composition of a func- tion applied to fmap should be exactly the same as chaining fmap functions together. As a result, the following expression is exactly equivalent to the pro- gram in listing 5.2:</li>
<pre>two.fmap(R.compose(plus3, R.tap(infoLogger))).map(R.identity); //-> 5</pre>
It’s no surprise that functors have these requirements. As a result, they’re prohibited from throwing exceptions, mutating elements, or altering a function’s behavior. Their practical purpose is to create a context or an abstraction that allows you to securely manipulate and apply operations to values without changing any original values. This is evident in the way map transforms one array into another without altering the origi- nal array; this concept equally translates to any container type.
But functors by themselves aren’t compelling, because they’re not expected to know how to handle cases with null data. Ramda’s R.compose, for instance, will break if a null function reference is passed into it. This isn’t a flaw in the design; it’s inten- tional. Functors map functions of one type to another. More-specialized behavior can be found in functional data types called monads. Among other things, monads can streamline error handling in your code, allowing you to write fluent function compo- sitions. What’s their relationship to functors? Monads are the containers that functors “reach into.”
<p className="pag">Page 127</p>
Don’t let the term monad discourage you; if you’ve written jQuery code, then monads should be familiar. Behind all the complicated rules and theories, the pur- pose of monads is to provide an abstraction over some resource—whether it’s a simple value, a DOM element, an event, or an AJAX call—so that you can safely process the data contained within it. In this respect, you can classify jQuery as a DOM monad:
<pre>$('#student-info').fadeIn(3000).text(student.fullname());</pre>
This code behaves like a monad because jQuery is taking charge of applying the fadeIn and text transformations safely. If the student-info panel doesn’t exist, applying methods to the empty jQuery object will fail gracefully rather than throw exceptions. Monads aimed at error handling have this powerful quality: safely propa- gating errors so your application is fault-tolerant. Let’s dive into monads next.
5.3	Functional error handling using monads
Monads solve all the problems of traditional error handling outlined earlier when applied to functional programs. But before diving into this topic, let’s first understand a limitation in the use of functors. As you saw earlier, you can use functors to safely apply functions to values in an immutable and safe manner. But when used through- out your code, functors can easily get you into an uncomfortable situation. Consider an example of fetching a student record by SSN and then extracting its address prop- erty. For this task, you can identify two functions—findStudent and getAddress— both using functor objects to create a safe context around their returned values:
Just as you’ve done all along, to run this program, you compose both functions together:
<pre>const studentAddress = R.compose( getAddress,
findStudent(DB('student'))
);</pre>
Although you avoid all error-handling code, the result isn’t what you expect. Instead of a wrapped address object, the returned value is a doubly wrapped address object:
<pre>studentAddress('444-44-4444'); //-> Wrapper(Wrapper(address))</pre>
 
<p className="pag">Page 128</p>
In order to extract this value, you have to apply R.identity twice:
Certainly you don’t want to access data this way in your code; just think about the case when you have three or four composed functions. You need a better solution. Enter monads.
5.3.1	Monads: from control flow to data flow
Monads are similar to functors, except that they can delegate to special logic when handling certain cases. Let’s examine this idea with a quick example. Consider apply- ing a function half :: Number -> Number to any wrapped value, as shown in figure 5.5:
<pre>Wrapper(2).fmap(half); //-> Wrapper(l)
Wrapper(3).fmap(half); //-> Wrapper(1.5)</pre>
Figure 5.5 Functors apply a function to a wrapped value. In this case, the wrapped value 2 is halved, returning a wrapped value of 1.
But now suppose you want to restrict half to even numbers only. As is, the functor only knows how to apply the given function and close the result back in a wrapper; it has no additional logic. What can you do if you encounter an odd input value? You could return null or throw an exception. But a better strategy is to make this function more honest about how it handles each case and state that it returns a valid number when given the correct input value, or ignores it otherwise.
In the spirit of Wrapper, consider another container called Empty:
 

 

 
<p className="pag">Page 129</p>
With this new requirement, you can implement half in the following way (figure 5.6):
Figure 5.6 Function half can return either a wrapped value or an empty container, depending on the nature of the input.
A monad exists when you create a whole data type around this idea of lifting values inside containers and defining the rules of containment. Like functors, it’s a design pattern used to describe computations as a sequence of steps without having any knowledge of the value they’re operating on. Functors allow you to protect values, but when used with composition, monads are what let you manage data flow in a safe and side effect-free manner. In the previous example, you return an Empty container instead of null when trying to halve an odd number, which lets you apply operations on values without being concerned about errors that occur:
Monads can be targeted at a variety of problems. The ones we’ll study in this chapter can be used to consolidate and control the complexity of imperative error-handling mechanisms and, thus, allow you to reason about your code more effectively.
Theoretically, monads are dependent on the type system of a language. In fact, many people advocate that you can only understand them if you have explicit types, as in Haskell. But you’ll see that having a typeless language like JavaScript makes
 

 

 
<p className="pag">Page 130</p>
monads easy to read and frees you from having to deal with all the intricacies of a static type system.
You need to understand these two important concepts:
<li className="litag">	Monad—Provides the abstract interface for monadic operations</li>
<li className="litag">	Monadic type—A particular concrete implementation of this interface</li>
Monadic types share a lot of the same principles as the Wrapper object you learned about at the beginning of the chapter. But every monad is different and, depending on its purpose, can define different semantics driving its behavior (that is, for how map or fmap should work). These types define what it means to chain operations or nest functions of that type together, yet all must abide by the following interface:
<li className="litag">	Type constructor—Creates monadic types (similar to the Wrapper constructor).</li>
<li className="litag"> Unit function—Inserts a value of a certain type into a monadic structure (similar to the wrap and empty functions you saw earlier). When implemented in the monad, though, this function is called of.</li>
<li className="litag">	Bind function—Chains operations together (this is a functor’s fmap, also known as flatMap). From here on, I’ll use the name map, for short. By the way, this bind function has nothing to do with the function-binding concept of chapter 4.</li>
<li className="litag">	Join operation—Flattens layers of monadic structures into one. This is especially important when you’re composing multiple monad-returning functions.</li>
Applying this new interface to the Wrapper type, you can refactor it in the following way.
Listing 5.3 Wrapper monad
 
<p className="pag">Page 131</p>
Wrapper uses the functor map to lift data into the container so that you can manipulate it side effect-free—walled off from the outside world. Not surprisingly, the _.iden- tity function is used to inspect its contents:
<pre>Wrapper.of('Hello Monads!')
.map(R.toUpper)
.map(R.identity); //-> Wrapper('HELLO MONADS!')</pre>
The map operation is considered a neutral functor because it does nothing more than map the function and close it. Later, you’ll see other monads add their own special touches to map. The join function is used to flatten nested structures—like peeling an onion. This can be used to eliminate the issues found with functors earlier, as shown next.
Listing 5.4 Flattening a monadic structure
<pre>// findObject :: DB -> String -> Wrapper const findObject = R.curry(function(db, id) { return Wrapper.of(find(db, id));
});
// getAddress :: Student -> Wrapper const getAddress = function(student) {
return Wrapper.of(student.map(R.prop('address')));
}
const studentAddress = R.compose(getAddress, findObject(DB('student'))); studentAddress('444-44-4444').join().get(); // Address</pre>
Because the composition in listing 5.4 returns a set of nested wrappers, the join oper- ation is used to flatten out the structure into a single layer, as in this example:
<pre>Wrapper.of(Wrapper.of(Wrapper.of('Get Functional'))).join();
//-> Wrapper('Get Functional')</pre>
Figure 5.7 illustrates the join operation.
Figure 5.7 Using the join operation to recursively flatten a nested monad structure, like peeling an onion
 
<p className="pag">Page 132</p>
With regard to arrays (which are also containers that can be mapped to), this is analo- gous to the R.flatten operation:
<pre>R.flatten([1, 2,	[3, 4], 5,	[6,	[7, 8,	[9,	[10, 11], 12]]]]);
//=>	[1, 2, 3, 4, 5, 6, 7, 8,	9, 10, 11, 12]</pre>
Monads typically have many more operations that support their specific behavior, and this minimal interface is merely a subset of its entire API. A monad itself, though, is abstract and lacks any real meaning. Only when implemented as a concrete type does its power begins to shine. Fortunately, most functional programming code can be implemented with just a few popular concrete types, which eliminates lots of boiler- plate code while achieving an immense amount of work. Now, let’s look at some full- fledged monads: Maybe, Either, and IO.
5.3.2	Error handling with Maybe and Either monads
In addition to wrapping valid values, monadic structures can also be used to model the absence of one—as null or undefined. Functional programming reifies errors (turns them into a “thing”) by using the Maybe and Either types to do the following:
<li className="litag">	Wall off impurity</li>
<li className="litag">	Consolidate null-check logic</li>
<li className="litag">	Avoid exception throwing</li>
<li className="litag">	Support compositionally of functions</li>
<li className="litag">	Centralize logic for providing default values</li>
Both types provide these benefits in their own way. I’ll begin with the Maybe monad. CONSOLIDATING NULL CHECKS WITH MAYBE
The Maybe monad focuses on effectively consolidating null-check logic. Maybe is an empty type (a marker type) with two concrete subtypes:
<li className="litag">	Just(value) —Represents a container that wraps a defined value.</li>
<li className="litag">	Nothing() —Represents either a container that has no value or a failure that needs no additional information. In the case of a Nothing, you can still apply functions over its (in this case, nonexistent) value.</li>
These subtypes implement all the monadic properties you saw earlier, as well as some additional behavior unique to their purpose. Here’s an implementation of Maybe.
Listing 5.5 Maybe monad with subclasses Just and Nothing
 
<p className="pag">Page 133</p>
 
<p className="pag">Page 134</p>
Maybe explicitly abstracts working with “nullable” values (null and undefined) so you’re free to worry about more important things. As you can see, Maybe is basically an abstract umbrella object for the concrete monadic structures Just and Nothing, each containing its own implementations of the monadic properties. I mentioned earlier that the implementation for the behavior of the monadic operations ultimately depends on the semantics imparted by a concrete type. For instance, map behaves dif- ferently depending on whether the type is a Nothing or a Just. Visually, a Maybe struc- ture can store a student object as shown in figure 5.8:
// findStudent :: String -> Maybe(Student) function findStudent(ssn)
 
Figure 5.8 A Maybe structure has two subtypes: Just and Nothing. Calling findStudent returns its value wrapped in Just or the absence of a value in Nothing.
This monad is frequently used with calls that contain uncertainty: querying a database, looking up values in a collection, requesting data from the server, and so on. Let’s con- tinue with the example started in listing 5.4 of extracting the address property of a stu- dent object that’s fetched from a local store. Because a record may or may not exist, you wrap the result of the fetch in a Maybe and add the safe prefix to these operations:
<pre>// safeFindObject :: DB -> String -> Maybe const safeFindObject = R.curry(function(db, id) { return Maybe.fromNullable(find(db, id));
});</pre>
 
<p className="pag">Page 135</p>
<pre>// safeFindStudent :: String -> Maybe(Student)
const safeFindStudent = safeFindObject(DB('student'));
const address = safeFindStudent('444-44-4444').map(R.prop('address')); address; //-> Just(Address(...)) or Nothing</pre>
Another benefit of wrapping results with monads is that it embellishes the function sig- nature, making it self-documented and honest about the uncertainty of its return value. Maybe.fromNullable is useful because it handles the null-checking on your behalf. Calling safeFindStudent will produce a Just(Address(...)) if it encounters a valid value or a Nothing otherwise. Mapping R.prop over the monad behaves as expected. In addition, it does a good job of detecting programmatic errors or misuses of an API call: you can use it to enforce preconditions indicating whether parameters are permitted to be invalid. If an invalid value is passed into Maybe.fromNullable, it produces a Nothing type, such that calling get() to open the container will throw an exception:
<pre>TypeError: Can't extract the value of a Nothing.</pre>
Monads expect you to stick to mapping functions over them instead of directly extracting their contents. Another useful operation of Maybe is getOrElse as an alter- native to returning default values. Consider the example of setting the value of a form field, or a generic default in case there’s no data to set:
<pre>const userName = findStudent('444-44-4444').map(R.prop('firstname'));
document.querySelector('#student-firstname').value = username.getOrElse('Enter first name');</pre>
If the fetch operation is successful, the student’s username is displayed; otherwise, the else branch executes printing the default string.
Maybe in disguise
You may see Maybe appear in different forms such as the Optional or Option type, used in languages like Java 8 and Scala. Instead of Just and Nothing, these lan- guages declare Some and None. Semantically, though, they do the same things.
Now let’s revisit the pessimistic null-check anti-pattern shown earlier that rears its ugly head frequently in object-oriented software. Consider the getCountry function:
<pre>function getCountry(student) { let school = student.school(); if(school !== null) {
let addr = school.address(); if(addr !== null) {
return addr.country();
}
}
return 'Country does not exist!';
}</pre>
<p className="pag">Page 136</p>
What a drag. If the function returns 'Country does not exist!', which statement caused the failure? In this code, it’s hard to discern which line is the problematic one. When you write code like this, you aren’t paying attention to style and correct- ness; you’re defensively patching function calls. Without monadic traits, you’re basi- cally stuck with nuli checks sprinkled all over the place to prevent TypeError exceptions. The Maybe structure encapsulates this behavior in a reusable manner. Consider this example:
<pre>const country = R.compose(getCountry, safeFindStudent);</pre>
Because safeFindStudent returns a wrapped student object, you can eliminate this defensive programming habit and safely propagate the invalid value. Here’s the new getCountry:
In the event that any of these properties returns null, this error is propagated through all the layers as a Nothing, so that all subsequent operations are gracefully skipped. The program is not only declarative and elegant, but also fault-tolerant.
Function lifting
Look closely at this function:
<pre>const safeFindObject = R.curry(function(db, id) { return Maybe.fromNullable(find(db, id));
});</pre>
Notice that its name is prefixed with safe and it uses a monad directly to wrap its return value. This is a good practice because you make it clear to the caller that the function is housing a potentially dangerous value. Does this mean you need to instru- ment every function in your program with monads? Not necessarily. A technique called function lifting can transform any ordinary function into a function that works on a container, making it “safe.” It can be a handy utility so that you aren't obligated to change your existing implementations:
<pre>const lift = R.curry(function (f, value) { return Maybe.fromNullable(value).map(f);
});</pre>
 
<p className="pag">Page 137</p>
Instead of directly using the monad in the body of the function, you can keep it as is
<pre>const findObject = R.curry(function(db, id) { return find(db, id);
});</pre>
and use lift to bring this function into the container:
<pre>const safeFindObject = R.compose(lift, findObject);
safeFindObject(DB('student'), '444-44-4444');
</pre>
Lifting can work with any function on any monad!
Clearly, Maybe excels at centrally managing checks for invalid data, but it provides Nothing (pun intended) with regard to what went wrong. We need a more proactive solution—one that can let us know the cause of the failure. For this, the best tool to use is the Either monad.
RECOVERING FROM FAILURE WITH EITHER
Either is slightly different from Maybe. Either is a structure that represents a logical separation between two values a and b that would never occur at the same time. This type models two cases:
<li className="litag">	Left(a) —Contains a possible error message or throwable exception object</li>
<li className="litag">	Right(b) —Contains a successful value</li>
Either is typically implemented with a bias on the right operand, which means map- ping a function over a container is always performed on the Right(b) subtype. It’s analogous to the Just branch of Maybe.
A common use of Either is to hold the results of a computation that may fail to provide additional information as to what the failure is. In unrecoverable cases, the left can contain the proper exception object to throw. The following listing shows the implementation of the Either monad.
Listing 5.6 Either monad with Left and Right subclasses
 
<p className="pag">Page 138</p>
 
<p className="pag">Page 139</p>
 

 
If the data access operation is successful, a student object is stored in the right side (biased to the right); otherwise, an error message is provided on the left, as shown in figure 5.9.
 
Notice in both the Maybe and Either types that some operations are empty (no-op). These are deliberate and are meant to act as placeholders that allow functions to safely skip execution when the specific monad deems appropriate.
Now, let’s put Either to use. This monad offers another alternative for the safeFindObject function:
<p className="pag">Page 140</p>
Let’s pause for a second. You may be wondering, “Why not use the 2-tuple (or a Pair) type discussed in chapter 4 to capture the object and a message?” There’s a subtle rea- son. Tuples represent what’s known as a product type, which implies a logicai AND rela- tionship among its operands. In the case of error handling, it’s more appropriate to use mutually exclusive types to model the case of a value either existing OR not; in the case of error handling, both could not exist simultaneously.
With Either, you can extract the result by calling getOrElse (providing a suitable default just in case):
<pre>const findStudent = safeFindObject(DB('student'));
findStudent('444-44-4444').getOrElse(new Student()); //->Right(Student)</pre>
Unlike the Maybe.Nothing structure, the Either.Left structure can contain values to which functions can be applied. If findStudent doesn’t return an object, you can use the orElse function on the Left operand to log the error:
<pre>const errorLogger = _.partial(logger, 'console', 'basic', 'MyErrorLogger', 'ERROR');
findStudent('444-44-4444').orElse(errorLogger);</pre>
This prints to the console:
<pre>MyErrorLogger [ERROR] Student not found with ID: 444-44-4444</pre>
The Either structure can also be used to guard your code against unpredictable func- tions (implemented by you or someone else) that may throw exceptions. This makes your functions more type-safe and side effect-free by eliminating the exception early on instead of propagating it. Consider an example using JavaScript’s decodeURI- Component function, which can produce a URI error if it’s invalidi
As shown in this code, it’s also customary to populate Either.Left with an error object that contains stack trace information as well as an error message; this object can be thrown if necessary to signal an unrecoverable operation. Suppose you want to nav- igate to a given URL that needs to be decoded first. Here’s the function invoked with invalid and valid input:
 

 
<p className="pag">Page 141</p>
Functional programming leads to avoiding ever having to throw exceptions. Instead, you can use this monad for lazy exception throwing by storing the exception object into the left structure. Only when the left structure is unpacked does the exception take place:
<pre>
...
catch (uriError) {
return Either.Left(uriError);
}</pre>
Now you’ve learned how monads help emulate a try-catch mechanism that contains potentially hazardous function calls. Scala implements a similar notion using a type called Try—the functional alternative to try-catch. Although not fully a monad, Try represents a computation they may either result in an exception or return a fully com- puted value. It’s semantically equivalent to Either, and it involves two cases classes for Success and Failure.
Functional programming projects worth exploring
Most of the topics explored in this and the previous chapter, such as partial applica- tion, tuples, composition, functors, and monads, as well as other topics presented later, are implemented as modules in a formal specification called Fantasy Land (https://github.com/fantasyland). Fantasy Land is a reference implementation of functional concepts that defines how to implement a functional algebra in JavaScript. We've been using libraries like Lodash and Ramda for their ease of use; neverthe- less, Fantasy Land and a functional library called Folktale (http://folktalejs.org/) are worth exploring if you're eager to get deep into more-functional data types.
Monads can help you cope with uncertainty and possibilities for failure in real-world software. But how do you interact with the outside world?
5.3.3	Interacting with external resources using the IO monad
Haskell is believed to be the only programming language that relies heavily on monads for IO operations: file read/writes, writing to the screen, and so on. You can translate that to JavaScript with code that looks like this:
<pre>IO.of('An unsafe operation').map(alert);</pre>
Although this is a simple example, you can see intricacies of IO tucked into lazy monadic operations that are passed to the platform to execute (in this case, a simple alert message). But JavaScript unavoidably needs to be able to interact with the ever- changing, shared, stateful DOM. As a result, any operation performed on the DOM,
Paga 142
whether read or write, causes side effects and violates referential transparency. Let’s begin with most basic IO operations:
When executed independently, the output of these standalone functions can never be guaranteed. Not only does order of execution matter, but, for instance, calling read multiple times can yield different responses if the DOM was modified between calls by another call to write. Remember, the main reason for isolating impure behavior from pure code, as you did in chapter 4 with showStudent, is to always guarantee a consis- tent result.
You can’t avoid mutations or fix the problem with side effects, but you can at least work with IO operations as if they were immutable from the application point of view. This can be done by lifting IO operations into monadic chains and letting the monad drive the flow of data. To do so, you can use the IO monad.
Listing 5.7 IO monad
 

 
<p className="pag">Page 143</p>
This monad works differently than the others, because it wraps an effect function instead of a value; remember, a function can be thought of as a lazy value, if you will, waiting to be computed. With this monad, you can chain together any DOM opera- tions to be executed in a single “pseudo” referentially transparent operation and ensure that side effect-causing functions don’t run out of order or between calls.
Before I show you this, let’s refactor read and write as manually curried functions:
<pre>const read = function (document, id) { return function ()	{
return document.querySelector('\#${id}').innerHTML;
};
};
const write = function(document, id) { return function(val) {
return document.querySelector('\#${id}').innerHTML = val;
};
};</pre>
And in order to avoid passing the document object around, make life easier and par- tially apply it to these functions:
const readDom = _.partial(read, document); const writeDom = _.partial(write, document);
With this change, both readDom and writeDom become chainable (and composable) functions awaiting execution. You do this in order to chain these IO operations together later. Consider a simple example that reads a student’s name from an HTML element and changes it to start-case (capitalize the first letter of each word):
Writing to the DOM, the last operation in the chain, isn’t pure. So what do you expect the changeToStartCase output to be? The nice thing about using monads is that you preserve the requirements imposed by pure functions. Just like any other monad, the output from map is the monad itself, an instance of IO, which means at this stage noth- ing has been executed yet. What you have here is a declarative description of an IO operation. Finally, let’s run this code:
<pre>changeToStartCase.run();</pre>
 

 
<p className="pag">Page 144</p>
Inspecting the DOM, you’ll see this:
<pre><div id="student-name">Alonzo Church</div></pre>
There you have it: IO operations in a referentially transparent-ish way! The most important benefit of the IO monad is that it clearly separates the pure and impure parts. As you can see in the definition of changeToStartCase, the transformation functions that map over the IO container are completely isolated from the logic of reading and writing to the DOM. You can transform the contents of the HTML ele- ment as needed. Also, because it all executes in one shot, you guarantee that noth- ing else will happen between the read and write operations, which can lead to unpredictable results.
Monads are nothing more than chainable expressions or chainable computa- tions. This allows you to build sequences that apply additional processing at each step—like a conveyor belt in an assembly line. But chaining operations isn’t the only modality where monads are used. Using monadic containers as return types creates consistent, type-safe return values for functions and preserves referential transpar- ency. Recall from chapter 4 that this satisfies the requirement for composing func- tion chains and compositions.
5.4	Monadic chains and compositions
As you can see, monads bring the world of side effects under control, so you can use them in composable structures. As you know from chapter 4, compositionality is the trick to reducing complexity in your code. But in chapter 4, you hadn’t bothered to check for invalid data: if findStudent had returned null, the entire program would have failed, as shown in figure 5.10.
Figure 5.10 Functions findStudent and append are being composed. Without the proper checks, if the former produces a null return value, the latter will fail with a TypeError exception.
Fortunately, with little code, monads can also be made composable so that you can enjoy their fluent, expressive error-handling mechanism to create safe composi- tions. Wouldn’t it be nice if functions arranged in a pipeline gracefully sidestepped null mines?
As you can see in figure 5.11, the first step is to make sure the first function to be executed wraps its result in a proper monad: both Maybe and Either work in this case.
 
<p className="pag">Page 145</p>
 
Figure 5.11 Same two functions as in figure 5.10; but this time the nuli value travels in a monad (Either or Maybe), which causes the rest of the functions in the pipeline to gracefully fail.
As you know, there are two variations for combining functions in functional program- ming: chain and compose. Recall that showStudent from the previous chapter had three parts:
1	Normalize user input
2	Find the student record
3	Add the student information to the HTML page
You’re also adding input validation to the mix to make it even more complex. Hence, this program has two points of failure: a validation error and an unsuccessful student- fetch operation. You can refactor them to include the Either monad to supply appro- priate error messages, as shown next.
Listing 5.8 Refactoring functions to use Either
 
<p className="pag">Page 146</p>
Because these functions are curried, you can partially evaluate them to create simpler ones, as you did before, as well as add some helper logging functions:
<pre>const debugLog = _.partial(logger, 'console', 'basic',
'Monad Example', 'TRACE');
const errorLog = _.partial(logger, 'console', 'basic',
'Monad Example', 'ERROR');
const trace = R.curry((msg, val)=> debugLog(msg + ':' + val));</pre>
And that’s it! The monadic operations take care of the rest and ensure that the data travels through the function calls at no additional cost. Let’s look at how you can use
Either and Maybe to add automatic error handling to showStudent.
Listing 5.9 showStudent using monads for automatic error handling
Listing 5.9 shows the use of the chain method. This is nothing more than a shortcut to avoid having to use join after map to flatten the layers resulting from combining monad-returning functions. Like map, chain applies a function to the data without wrapping the result back into the monad type.
Also, notice how both monads interleave seamlessly. This is because both Either and Maybe implement the same monadic interface. Now, calling
<pre>showStudent('444-44-4444').orElse(errorLog);</pre>
generates two results: if the student object is successfully found, it appends the student information to the HTML as expected and returns:
<pre>Monad Example [INFO] Either.Right('444-44-4444, Alonzo,Church')</pre>
Otherwise, it skips the entire operation gracefully and uses the orElse clause:
<pre>Monad Example [ERROR] Student not found with ID: 444444444</pre>
Chaining isn’t the only pattern; you can easily introduce error-handling logic with compose. To do this, you perform the simple object-oriented-to-functional transform you’ve seen before to convert monad methods into functions that polymorphically
 
<p className="pag">Page 147</p>
work across any monad type (following from the Liskov Substitution Principle). In particular, you can create generalized map and chain functions, shown in the follow- ing listing.
Listing 5.10 General map and chain functions that work on any container
<pre>// map ::	(ObjectA -> ObjectB), Monad -> Monad[ObjectB]
const map = R.curry(function (f, container) { return container.map(f);
});
// chain ::	(ObjectA -> ObjectB), M -> ObjectB
const chain = R.curry(function (f, container) { return container.chain(f);
});</pre>
You can use these functions to inject monads into a compose expression. The code in listing 5.11 produces the same results as listing 5.9. Because monads control how data flows from one expression to the next, this style of coding is also known as pro- grammable commas, which is also point-free. In this case, a comma is used to delimit one expression from another in the same way a semicolon traditionally delineates one statement from the next in JavaScript. Also, using lots of trace statements lets you see the data flowing through the operations (logging statements are useful for debug- ging, as well).
Listing 5.11 Monads as programmable commas
<pre>const showStudent = R.compose(
R.tap(trace('Student added to HTML page')) map(append('#student-info')),
R.tap(trace('Student info converted to CSV')), map(csv),
map(R.props(['ssn', 'firstname', 'lastname'])),
R.tap(trace('Record fetched successfully!')), chain(findStudent),
R.tap(trace('Input was valid')),
chain(checkLengthSsn),
lift(cleanInput));</pre>
Running the code prints the following log messages on the console:
<pre>Monad Example [TRACE] Input was valid:Either.Right(444444444)</pre>
<pre>Monad Example [TRACE] Record fetched successfully!: Either.Right(Person [firstname: Alonzo| lastname: Church])</pre>
<pre>Monad Example [TRACE] Student converted to row: Either.Right(444-44-4444, Alonzo, Church)</pre>
<pre>Monad Example [TRACE] Student added to roster: Either.Right(1)</pre>
<p className="pag">Page 148</p>
Tracing through programs
Listing 5.11 demonstrates how easy it is to trace through functional code. Without having to drill into the body of those functions, you can demarcate an entire program with tracing statements that execute before and after function calls, which is incred- ibly useful for troubleshooting and debugging. If this program were written in an object-oriented style, you couldn’t possibly do this without having to modify the actual functions or perhaps instrument them using aspect-oriented programming, which isn’t a trivial endeavor. Functional programming gives you this for free!
Finally, let’s diagram this entire flow to clearly see what’s going on; see figure 5.12. Fig- ure 5.13 shows the behavior of this same program in the event that findStudent is unsuccessful.
 
Figure 5.12 Step-by-step flow of the showStudent function in the case where findStudent successfully finds a student object by the provided SSN
Figure 5.13 The case of an unsuccessful findStudent as it affects the rest of the composition. Regardless of the failure of any of the components in the pipeline, the program remains fault-tolerant and gracefully skips any procedures that depended on the data.
 
<p className="pag">Page 149</p>
You may be wondering if you’re finally done with showStudent. Not quite. From the discussion of the IO monad, now you know you can improve the code that deals with DOM reads and writes:
<pre>map(append('#student-info')),</pre>
Because append has automatic currying, it’ll work well with IO. All you need to do at this point is lift the value from csv, extract its content by mapping the R.identity function into IO using IO.of, and then proceed with chaining both operations:
<pre>const liftIO = function (val) { return IO.of(val);
};</pre>
This produces the following program.
Listing 5.12 Complete showStudent program
<pre>const showStudent = R.compose( map(append('#student-info')), liftIO, map(csv),
map(R.props(['ssn', 'firstname', 'lastname'])),
chain(findStudent),
chain(checkLengthSsn),
lift(cleanInput));</pre>
Incorporating the IO monad allows you to achieve something truly amazing. You see, running showStudent(ssn) now runs through all the logic of validating and fetching the student record, as it should. Once this completes, the program waits on you to write this data to the screen. Because you’ve lifted the data into an IO monad, you need to call its run function for the data that’s lazily contained within it (in its closure) to be flushed out to the screen:
<pre>showStudent(studentId).run(); //-> 444-44-4444, Alonzo, Church</pre>
A common pattern that occurs with IO is to tuck the impure operation toward the end of the composition. This lets you build programs one step at a time, perform all the necessary business logic, and finally deliver the data on a silver platter for the IO monad to finish the job, declaratively and side effect-free.
Just to show how functional programming makes code easier to reason about, for the sake of comparison (apologies for reviving some ugly code), let’s bring back the equivalent nonfunctional version of showStudent:
<pre>function showStudent(ssn) { if(ssn != null) {
ssn = ssn.replace(/As*|\-|\s*$/g, '');
if(ssn.length !== 9)	{
throw new Error('Invalid Input');
}
let student = db.get(ssn); if (student) {
document.querySelector('#${elementId}').innerHTML = '${student.ssn},
${student.firstname},
${student.lastname}';
}
else {
throw new Error('Student not found!');
}
}
else {
throw new Error('Invalid SSN!');
}
}</pre>
<p className="pag">Page 150</p>

Due to side effects, lack of modularity, and imperative error handling, this program is difficult to use and test; we’ll examine this more closely in the next chapter. Whereas composition controls program flow, monads control data flow. Both are possibly the most important concepts in the functional programming ecosystem.
This chapter completes part 2 of the book. Your developer toolbox is equipped with all the functional concepts you need to take on real-world solutions.
5.5	Summary
<li className="litag">	Exception-throwing mechanisms in object-oriented code result in impure func- tions that impose a great deal of responsibility on the caller to provide adequate try-catch logic.</li>
<li className="litag">	The pattern of value containerization is used to create side effect-free code by wrapping possible mutations under a single referentially transparent process.</li>
<li className="litag">	Use functors to map functions to containers in order to access and modify objects in a side effect-free and immutable manner.</li>
<li className="litag">	Monads are a functional programming design pattern used to reduce an appli- cation’s complexity by orchestrating a secure flow of data through functions.</li>
<li className="litag">	Resilient and robust function compositions interleave monadic types such as Maybe, Either, and IO.</li>
