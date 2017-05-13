<p className="pag">Page 84 - Chapter 4 - Toward modular, reusable code</p>
This chapter covers
<li className="litag">	Comparing function chains and pipelines</li>
<li className="litag">	Introducing the Ramda.js functional library</li>
<li className="litag">	Exploring the concepts of currying, partial application, and function binding</li>
<li className="litag">	Creating modular programs with functional composition</li>
<li className="litag">	Enhancing your program's flow with function combinators</li>
A complex system that works is invariably found to have evolved from a simple system that worked.
—John Gall, The Systems Bible (General Systemantics Press, 2012)
Modularity is one of the most important qualities of large software projects; it repre- sents the degree to which programs can be separated into smaller, independent parts. Modular programs posses the distinct quality that their meaning can be derived from the meaning of their constituent parts. These parts (or subprograms) become reusable components that can be incorporated as a whole or in pieces into

<p className="pag">Page 85</p>
other systems. This makes your code more maintainable and readable while making you more productive. As a simple use case, think of how Unix shell programs are written:
tr 'A-Z'	'a-z' <words.in | uniq | sort
Even if you have no experience with Unix programming, you can clearly see that this code involves a sequence of steps that transforms words from uppercase to lowercase, removes duplicates, and sorts the remainder. The pipe operator ( | in this case) con- nects these commands. It’s remarkable that by having clear contracts describing the inputs and outputs, small programs can be glued together to solve complex tasks. If you imagine having to write this program in traditional imperative JavaScript, a few loops, string comparisons, and perhaps a few conditional statements and global vari- ables keeping track of everything come to mind. This probably isn’t very modular, per se. In programming, we like to solve problems by breaking them into smaller pieces and reconstructing those pieces to form a solution.
In chapter 3, we used high-level functions to solve similar types of issues using tightly coupled method chains that cascade over a single wrapper object. In this chapter, we’ll extend this idea further to create loosely coupled pipelines via functional composition, which will allow you to build whole programs from independent components with more flexibility. These components can be as small as functions or as big as entire modules that separately don’t provide much value but together give meaning to the whole.
Creating modular code isn’t an easy task. We’ll look at important functional tech- niques like partial evaluation and composition, with the aid of a functional framework called Ramdajs, to bring code to the right level of abstraction in order to express solu- tions in a point-free manner via declarative function pipelines.
4.1 Method chains vs. function pipelines Chapter 3 left off with method chains used to connect a series of functions together, revealing a style of functional programming much different from any other develop- ment style. But there’s another approach for connecting functions, called pipelining.
When studying functions, it’s useful to describe them in terms of their inputs and outputs. The notation used in Haskell, for example, is popular in the functional com- munity, and you’ll see it used in many places (see figure 4.1).
 
<p className="pag">Page 86</p>
 
Remember that, in functional programming, a function is a mathematical mapping between inputs and output types, as shown in figure 4.2. For instance, a simple func- tion like isEmpty that takes a string and returns a Boolean can be expressed in this notation as
<pre>isEmpty :: String -> Boolean</pre>
This function is a referentially transparent mapping between the set of all input values of type String and the set of all Boolean values. Here’s the JavaScript lambda form together with its function signature:
<pre>// isEmpty :: String -> Boolean const isEmpty = s => !s || !s.trim();</pre>
Viewing functions as mappings of types is necessary to understand how they can be chained and pipelined:
<li className="litag">	Chaining methods together (tightly coupled, limited expressiveness)</li>
<li className="litag">	Arranging function pipelines (loosely coupled, flexible)</li>
4.1.1	Chaining methods together
Recall from chapter 3 that the map and filter functions take an array as input and return a new one. These functions can be chained together tightly via the implicit Lodash wrapper object, which manages the creation of new data structures behind the scenes. Here’s an example from chapter 3:
 
<p className="pag">Page 87</p>
This is clearly a syntactical improvement over imperative code and drastically improves its readability. Unfortunately, it’s contrived and tightly coupled to the owning object that confines the number of methods you can apply in the chain, which limits expres- siveness of the code. In this case, you’re obliged to use only the set of operations pro- vided by Lodash, and you wouldn’t be able to easily connect functions from different libraries (or your own) into one program.
NOTE There are ways to extend an object with additional functionality using mixins, but you’re still responsible for managing the mixin object yourself. I don’t cover mixins in this book, but you can read about them in “A fresh look at JavaScript Mixins” (Angus Croll, JavaScript, JavaScript ..., May 30, 2011, http://mng.bz/15Zj).
At a high level, you can visualize a simple sequence of array methods as shown in fig- ure 4.3. It would be best to break the chain (so to speak) and have a lot more free- dom to arrange a sequence of independent functions; you can achieve this with function pipelines.
4.1.2	Arranging functions in a pipeline
Functional programming removes the limitations present in method chaining and provides the flexibility to combine any set of functions, no matter where they come from. A pipeline is a directional sequence of functions loosely arranged so that the out- put of one is input into the next. Figure 4.4 illustrates this abstractly by connecting functions that work with different types of objects.
Figure 4.4 A Function pipeline that starts with a function f and input of type A and generates an object of type B, subsequently passed into g, which outputs an object of type C as the final result. Functions f and g can belong to any library or can be your own functions.
 
Figure 4.3 A chain of arrays is made up of methods invoked sequentially via the owning object. Internally, each method returns a new array containing the result of each function call.
 
<p className="pag">Page 88</p>
In this chapter, you’ll learn techniques that can arrange function calls into high-level, succinct function pipelines, just like figure 4.4. If this diagram looks familiar, it’s because this pattern is equivalent to the pipes and filters object-oriented design pattern seen in many enterprise applications, which was inspired by functional programming (the filters in this case became the individual functions).
Comparing figures 4.3 and 4.4 reveals a key difference between the approaches: chaining makes tight connections via an object’s methods, whereas a pipeline links inputs and outputs of any functions—arriving at loosely coupled components. But for this linkage to be possible, the connecting functions must be compatible in terms of arity and type, which we’ll examine next.
4.2	Requirements for compatible functions
Object-oriented programs use pipelines sporadically, in specific scenarios (authentica- tion/authorization is usually one of them); on the other hand, functional program- ming relies on pipelines as the sole method of building programs. Depending on the task at hand, there’s usually quite a gap between a problem definition and a proposed solution; therefore, computations must be carried out in well-defined stages. These stages are represented by functions that execute with the condition that their inputs and outputs be compatible in two ways:
<li className="litag">	Type—The type returned by one function must match the argument type of a receiving function.</li>
<li className="litag">	Arity —A receiving function must declare at least one parameter in order to handle the value returned from a preceding function call.</li>
4.2.1	Type-compatible functions
When designing function pipelines, it’s important that there exists a level of compati- bility between what functions return and what they accept. In terms of type, this isn’t as big a concern in JavaScript as it is with statically typed languages, because JavaScript is loosely typed. Hence, if an object behaves like a certain type in practice, it’s that type. This is also known as duck typing. “If it walks like a duck and talks like a duck, it’s a duck.”
NOTE Statically typed languages have the advantage of using type systems to alert you about potential problems without having to run your code. Type sys- tems are an important topic in functional programming but aren’t covered in this book.
JavaScript’s dynamic dispatch mechanism attempts to find properties and methods in your objects regardless of type information. Although this is extremely flexible, you often need to know what types of values a function is expecting; having this clearly defined (perhaps documented in code using the Haskell notation) makes your pro- grams easier to understand.
<p className="pag">Page 89</p>
Formally speaking, two functions f and g are type-compatible if the output of f has a type equivalent to the set of inputs of g. For example, here’s a simple program to process a student’s Social Security number:
At this point, you should be able to follow the correspondence between the input of normalize and the output of trim so that you can invoke them in a simple, manual, pipeline sequence, as shown in the following listing.
Listing 4.1 Building a manual function pipeline with trim and normalize
Types are certainly important but, in JavaScript, not as criticai as being compatible with the number of arguments a function accepts.
4.2.2 Functions and arity: the case for tuples
Arity can be defined as the number of arguments a function accepts; it’s also referred to as the function’s length. We usually take arity for granted in other programming par- adigms, but in functional programming, as a corollary to referential transparency, the number of arguments a function declares is often directly proportional to its complex- ity. For instance, a function that works on a single string is likely much simpler than one taking three or four arguments:
Pure functions that expect a single argument are the simplest to use because the implication is that they serve a single purpose—a singular responsibility. Our goal is to work with functions with as few arguments as possible, because they’re more flexible
 

 

 
<p className="pag">Page 90</p>
and versatile than those that depend on multiple arguments. Unfortunately, unary functions aren’t easy to come by. In real life, isValid can be embellished with an error message that clearly describes what happened:
But how can you return two different values? Functional languages have support for a structure called a tuple. It’s a finite, ordered list of elements, usually grouping two or three values at a time, and written (a, b, c). Based on this concept, you can use a tuple as a return value from isValid that groups a status with a possible error mes- sage, to be returned as a single entity and subsequently passed to another function if need be. Let’s explore tuples in more detail.
Tuples are immutable structures that pack together items of different types so that they can be passed into other functions. There are other ways of returning ad hoc data, such as object literals or arrays:
<pre>return {
status : false,	or return [false, 'Input is too long!'];
message:	'Input is too long!'
};</pre>
But when it comes to transferring data between functions, tuples offer more advantages:
<li className="litag">	Immutable—Once created, you can’t change a tuple’s internal contents.</li>
<li className="litag">	Avoid creating ad hoc types—Tuples can relate values that may have no relation- ship at all to each other. So defming and instantiating new types solely for grouping data together makes your model unnecessarily convoluted.</li>
<li className="litag">	Avoid creating heterogeneous arrays—Working with arrays containing different types of elements is hard because it leads to writing code filled with lots of defensive type checks. Tradi tionally, arrays are meant to store objects of the same type.</li>
Moreover, tuples behave much like the value objects shown in chapter 2. One con- crete use case is in the concept of a Status, a simple data type containing a status flag and a message: (false, 'Some error occurred!'). Unlike other functional languages, such as Scala, JavaScript has no native support for a Tuple data type. For instance, given the following Scala tuple definition
<pre>var t =	(30, 60,	90)</pre>
you can access each individual part like this:
<pre>var sumAnglesTriangle = t._1 + t._2 + t._3 = 180</pre>
 
<p className="pag">Page 91</p>
But JavaScript provides all the tools out of the box required for you to implement your own version of Tuple, as shown next.
Listing 4.2 Typed Tuple data type
The Tuple object in listing 4.2 is an immutable, fixed-length structure used to hold a heterogeneous set of n typed values that can be used for inter-function communica- tion. For instance, you can use it to build quick value objects, such as Status:
<pre>const Status = Tuple(Boolean, String);</pre>
Let’s finish the student SSN validation example to take advantage of tuples.
 
<p className="pag">Page 92</p>
Listing 4.3 Using tuples for the isValid function
<pre>// trim :: String -> String
const trim = (str) => str.replace(/A\s*|\s*$/g,
// normalize :: String -> String
const normalize = (str) => str.replace(/\-/g, '');
// isValid :: String -> Status const isValid = function (str) { if(str.length === 0){
return new Status(false,
'Invald input. Expected non-empty value!');
}
else {
return new Status(true, 'Success!');
}
}</pre>
Declares a Status type that holds values for status (Boolean) and message (String)
<pre>isValid(normalize(strim('444-44-4444'))); //-> (true, 'Success!')</pre>
The occurrence of 2-tuples is so frequent in software that it’s worth making them first- class objects. When combined with JavaScript ES6 support for destructured assignment, you can map tuple values to variables in a clean manner. Using tuples, the following code creates an object called StringPair.
Listing 4.4 StringPair type
Tuples are one way to reduce a function’s arity, but there’s a better alternative for cases in which tuples aren’t sufficient. Let’s spice things up a bit by introducing function curry- ing, which not only abstracts arity but also encourages modularity and reusability.
4.3	Curried function evaluation
Passing a function’s return value as input to a unary function is straightforward, but what if the target function expects more parameters? In order to understand currying in JavaScript, first you must understand the difference between a curried and a regular (non-curried) evaluation. In JavaScript, a regular or non-curried function call is per- mitted to execute with missing arguments. In other words, if you define a function f(a,b,c) and call it with just a, the evaluation proceeds, and the JavaScript runtime
 
<p className="pag">Page 93</p>
sets b and c to undefined, as shown in figure 4.5. This is unfortunate and most likely the reason why currying isn’t a built-in feature of the language. As you can imagine, not declaring any arguments and relying on the arguments object within functions only exacerbates this issue.
On the other hand, a curried function is one where all arguments have been explicitly defined so that, when called with a subset of the arguments, it returns a new function that waits for the rest of the parameters to be supplied before running. Figure 4.6 rep- resents this visually.
Currying is a technique that converts a multivariable function into a stepwise sequence of unary functions by suspending or “procrastinating” its execution until all arguments have been provided, which could happen later. Here’s the formal defini- tion of a curry of three parameters:
<pre>curry(f) ::	(a,b,c) -> f(a) -> f(b)-> f(c)</pre>
This formal notation suggests that curry is a mapping from functions to functions that deconstructs the input (a,b,c) into separate single-argument invocations. In pure functional programming languages, like Haskell, currying is a built-in feature and automatically part of all function definitions. Because JavaScript doesn’t auto- matically curry functions, you need to write some supporting code to enable this. Before we go into auto-currying, let’s start with a simple scenario of manually curry- ing two arguments.
 

 
<p className="pag">Page 94</p>
Listing 4.5 Manual currying with two arguments
Let’s take another look at curry2, implementing the checkType function used in the Tuple type shown in listing 4.2. This example use functions from another functional library called Ramda.js.
Another functional library?
Like Lodash, Ramda.js provides lots of useful functions to connect functional pro- grams and also enables a pure functional style of coding. The reason for using it is that its parameters are conveniently arranged to facilitate currying, partial applica- tion, and composition, which I'll cover later in this chapter. For more details about setting up Ramda, see the appendix.
Once it’s installed, you can use the global variable R to access all of its functionality, such as R.is:
 

 
<p className="pag">Page 95</p>
<pre>else {
throw new TypeError('Type mismatch.
Expected [' + typeDef + '] but found [' + typeof actualType + ']');
}
});
</pre>
checkType(String)('Curry');  //-> String

checkType(Number)(3); //-> Number
checkType(Date)(new Date()); //-> Date
checkType(Object)({}); //-> Object
checkType(String)(42); //-> Throws TypeError

For simple tasks, curry2 is adequate; but as you start building more-complex function- ality, you’ll need to handle any number of arguments automatically. Normally, I’d show you the function internals, but curry is a particularly long and convoluted func- tion to explain, so I’ll spare you the headache and move into a more useful discussion (you can find curry and its flavors—curryRight, curryN, and so on—implemented in both Lodash and Ramda).
You can use R.curry to simulate the automatic currying mechanism in pure func- tional languages that works on any number of arguments. You can imagine automatic currying as artificially creating nested function scopes corresponding to the number of arguments declared. This example curries fullname:
<pre>// fullname ::	(String, String) -> String
const fullname = function (first, last) {
}</pre>
The multiple arguments are transformed into unary functions of this form:
<pre>// fullname :: String -> String -> String const fullname =
function (first) {
return function (last) {
...
}
}</pre>
Now let’s jump into some of the practical applications of currying. In particular, it can be used to implement popular design patterns:
<li className="litag">	Emulating function interfaces</li>
<li className="litag">	Implementing reusable, modular function templates</li>
4.3.1	Emulating function factories
In the object-oriented world, interfaces are abstract types used to define a contract that classes must implement. If you create an interface with the function findStudent(ssn),
<p className="pag">Page 96</p>
concrete implementers of this interface must implement this function. Consider the following “short” Java example to illustrate this concept:
<pre>
public interface StudentStore {
Student findStudent(String ssn);
}
public class DbStudentStore implements StudentStore { public Student findStudent(String ssn) {
// ...
ResultSet rs = jdbcStmt.executeQuery(sql); while(rs.next()){
String ssn = rs.getString("ssn");
String name = rs.getString("firstname") + rs.getString("lastanme"); return new Student(ssn, name);
}
}
}
public class CacheStudentStore implements StudentStore { public Student findStudent(String ssn) {
// ...
return cache.get(ssn);
}
}</pre>
Sorry for the long-winded code snippet (Java is that verbose!). This code shows two implementations of the same interface: one that reads students from a database and the other that reads from a cache. But from the point of the view of the calling code, it cares only about calling the method and not where the object came from. This is the beauty of object-oriented design via the factory method pattern. Using a function factory, you can obtain the proper implementation:
<pre>
StudentStore store = getStudentStore(); store.findStudent("444-44-4444");</pre>
You have no reason to miss out in the functional programming world, and currying is the solution. Translating the Java code into JavaScript, you can create a function that looks up student objects in a data store as well as an array (these are the two implementers):
 
<p className="pag">Page 97</p>
Because the functions are curried, you can separate the function definition from eval- uation with a generic factory method findStudent, whose implementation details could have originated from either implementation:
<pre>const findStudent = useDb ? fetchStudentFromDb(db)
: fetchStudentFromArray(arr);
findStudent('444-44-4444');</pre>
Now, findStudent can be passed to other modules without the caller knowing the concrete implementation (this will be important in chapter 6 for unit testing to mock interaction with the object store). In matters of reuse, currying also allows you to cre- ate a family of function templates.
4.3.2	Implementing reusable function templates
Suppose you need to configure different logging functions to handle different states in your application, such as errors, warnings, debug, and so on. Function templates define a family of related functions based on the number of arguments that are cur- ried at the moment of creation. This example will use the popular library Log4js, a logging framework for JavaScript that is far superior to the typical console.log. You can find installation information in the appendix. Here’s the basic setup:
<pre>const logger = new Log4js.getLogger('StudentEvents'); logger.info('Student added successfully!');</pre>
But with Log4js, you can do much more. Suppose you need instead to display mes- sages on the screen in a pop-up. You can configure an appender to do so:
<pre>logger.addAppender(new Log4js.JSAlertAppender());</pre>
You can also change the layout by configuring the layout provider so that it outputs messages in JSON format instead of plain text:
<pre>appender.setLayout(new Log4js.JSONLayout());</pre>
There are many settings you can configure, and copying and pasting this code into each file causes lots of duplication. Instead, let’s use currying to define a reusable function template (a logger module, if you will), which will give you the utmost flexi- bility and reuse.
Listing 4.6 Creating a logger function template
 
<p className="pag">Page 98</p>
If you’re implementing multiple error-handling statements into one function or file, you also have the flexibility of partially setting all but the last parameter:
<pre>const logError = R.curry(logger)('console', 'basic', 'FJS', 'ERROR');
logError('Error code 404 detected!!'); logError('Error code 402 detected!!');</pre>
Behind the scenes, subsequent calls to curry are called on this function, finally yield- ing a unary function. The fact that you’re able to create new functions from existing ones and pass any number of parameters to them leads to easily building functions in steps as arguments are defined.
In addition to gaining lots of reusability in your code, as I mentioned, the principal motivation behind currying is to convert multiargument functions into unary func- tions. Alternatives to currying are partial function application and parameter binding, which are moderately supported by the JavaScript language, to produce functions of smaller arity that also work well when plugged into function pipelines.
4.4	Partial application and parameter binding
Partial application is an operation that initializes a subset of a nonvariadic function’s parameters to fixed values, creating a function of smaller arity. In simpler terms, if you have a function with five parameters, and you supply three of the arguments, you end up with a function that expects the last two.
Like currying, partial application can be used to directly reduce the length of a func- tion, but in a slightly different manner. Because a curried function is, essentially, a par- tially applied function, there tends to be confusion about the techniques. Their main
 
<p className="pag">Page 99</p>
difference lies in the internai mechanism and control over parameter passing. I’il attempt to clarify:
<li className="litag">	Currying generates nested unary functions at each partial invocation. Inter- nally, the final result is generated from the step-wise composition of these unary functions. Also, variations of curry allow you to partially evaluate a number of arguments; therefore, it gives you complete control over when and how evalua- tion takes place.</li>
<li className="litag">	Partial application binds (assigns) a function’s arguments to predefined values and generates a new function of fewer arguments. The resulting function con- tains the fixed parameters in its closure and is completely evaluated on the subse- quent call.</li>
Now that this is clear, let’s move on to examine a possible implementation of partial.
Listing 4.7 Implementation of partial
For this discussion of partial application and function binding, we’ll go back to using Lodash, because it has slightly better support for function binding than Ramda. On the surface, however, using _.partial has a similar feel to using R.curry, and both support placeholder arguments with their respective placeholder objects. With the same logger function shown earlier, you can partially apply certain parameters to cre- ate more-specific behavior:
<pre>const consoleLog = _.partial(logger, 'console', 'json', 'FJS Partial');</pre>
Let’s use this function to reemphasize the difference between curry and partial. After applying these three arguments, the resulting consoleLog function expects the
 
<p className="pag">Page 100</p>
other two arguments when called (not in steps, but all at once). So, unlike currying, calling consoleLog with just one argument won’t return a new function and will instead evaluate with the last one set to undefined. But you can continue applying partial arguments to consoleLog by using _.partial again:
<pre>const consoleInfoLog = _.partial(consoleLog, 'INFO');
consoleInfoLog('INFO logger configured with partial');</pre>
Currying is an automated way of using partial applications—this is its main difference from partial. Another variation is function binding, which is also available natively in JavaScript as Function.prototype.bind()} It works a bit differently than partial does:
<pre>const log =_.bind(logger, undefined, 'console', 'json', 'FJS Binding');
log('WARN', 'FP is too awesome!');</pre>
What is this undefined second argument to _.bind? Bind lets you create bound func- tions, which can execute within the context of an owning object (passing undefined tells the runtime to bind this function to the global context). Let’s see some practical uses of _.partial and _.bind that do the following:
<li className="litag">	Extend the core language</li>
<li className="litag">	Bind delayed functions</li>
4.4.1	Extending the core language
Partial application can be used to extend core data types like String and Number with useful utilities than enhance the expressiveness of the language. Just be mindful that extending the language this way may make your code less portable to platform upgrades if new, conflicting methods are added to the language. Consider the follow- ing examples:
Index 1 See “Function.prototype.bind(),” MozillaDeveloperNetwork, http://mng.bz/MY75.
 
<p className="pag">Page 101</p>
Before implementing your own function, make sure to feature-check it first so you can stay on top of new language updates:
<pre>if(!String.prototype.explode) {
String.prototype.explode = _.partial(String.prototype.match, /[\w]/gi);
}</pre>
There are cases where partial application doesn’t work, such as when you’re working with delayed functions like setTimeout. For this, you need to use function binding.
4.4.2	Binding into delayed functions
Using function binding to set the context object is important when you’re working with methods that expect a certain owning object to be present. For instance, func- tions such as setTimeout and setInterval in the browser expect the this reference to be set to global context, the window object; otherwise, they don’t work. Passing undefined tells the runtime to do just this. For instance, setTimeout can be used to create a simple scheduler object to run delayed tasks. Here’s an example of using both _.bind and _.partial:
<pre>const Scheduler = (function ()	{
const delayedFn = _.bind(setTimeout, undefined, _, _);
return {
delay5:	_.partial(delayedFn,	_, 5000),
delaylO: _.partial(delayedFn, _, 10000), delay:	_.partial(delayedFn,	_, _)
};
})();
Scheduler.delay5(function ()	{
consoleLog('Executing After 5 seconds!')
});</pre>
Using Scheduler, you can invoke any piece of code wrapped in a function body with a certain delay (this timer isn’t guaranteed by the runtime engine, but that’s a separate issue). Because both bind and partial are functions returning other functions, you can easily nest them. As you can see in the previous code, you build each delay operation
 
<p className="pag">Page 102</p>
from the composition of a bound function and a partially applied function. Function binding isn’t as useful as partial application in functional programming, and it’s also a bit trickier to use, because it involves once again setting the function context. I cover it here in case you run into it when exploring this topic on your own.
Both partial application and currying are useful. Currying is the most widely used technique to create function wrappers that abstract a function’s behavior, either to preset its arguments or to partially evaluate them. This is beneficial because pure functions with fewer arguments are easier to work with than functions with many argu- ments. Either approach facilitates supplying the proper arguments so that functions don’t have to blatantly access objects outside of their scope, while reducing them to unary functions. Isolating the logic of obtaining this necessary data makes functions more reusable; and, more important, it simplifies their composition.
4.5	Composing function pipelines
In chapter 1, we talked about the importance of being able to split a problem into smaller, simpler subproblems (or tasks) in order to put them back together to arrive at a solution—like pieces in a puzzle. The intention of functional programs is to gain the required structure that leads to composition, the backbone of functional programming. By now you understand the concepts of purity and side effect-free functions that make this such a powerful technique. Recall that a side effect-free function is one that doesn’t depend on any external data; everything the function needs must be provided as argu- ments. In order to properly use composition, your functions must be side effect-free.
Furthermore, if a program is built from pure functions, the resulting program is itself pure, allowing it to be composed further as a part of even more-complex solu- tions without antagonizing other parts of the system. This topic is extremely impor- tant to understand, because it will be the central theme of the book going forward. So before we dive into functional composition, let’s take a moment to understand it with a concrete example that composes widgets in an HTML page.
4.5.1	Understanding composition with HTML widgets
The idea of composition is intuitive and certainly not unique to functional program- ming. Consider how HTML widgets are laid out on a page. Complex widgets are built from the combination of simple ones, which in turn can form part of even bigger wid- gets. For instance, combining three input text boxes with an empty container pro- duces a simple student form, as shown in figure 4.7.
The student form is a now a component (itself a widget) that can be composed with others into a more complex component to create an entire student console form (see figure 4.8). You get the idea; the student console widget could be plugged in to a bigger dashboard if need be. In this case, we say the console is composed of (or made up of) the address and bio forms. Objects with simple behavior (which don’t have external dependencies) compose fairly well and can be used to build complex structures from simple ones, like interlocking building blocks.
<p className="pag">Page 103</p>
Figure 4.8 Student console widget built from smaller widgets including an address form, a bio form, a button, and a container
To demonstrate, let’s create a recursive tuple definition called Node:
<pre>const Node = Tuple(Object, Tuple);</pre>
This can be used to hold an object and a reference to another node (tuple). It turns out this is the functional definition of a list of elements, made up recursively of a head and a tail. Using a curried function called element
<pre>const element = R.curry(function(val, tuple) {
return new Node(val, tuple);
});</pre>
you can create a null-terminated list of any type. Figure 4.9 shows a simple list of numbers.
var grades = element(1, element(2, element(3, element(4, nuli))));
Figure 4.9 Highlighting the head and tail sections forming a list of numbers. The head and tail are readily available as functions for array processing in functional languages.
 

 
<p className="pag">Page 104</p>
This is more or less how lists are constructed in languages like ML and Haskell. On the other hand, complex objects with high degrees of coupling to other external objects don’t have clear rules for composition and can be extremely hard to work with. Func- tional composition can have a similar fate when side effects and mutations are pres- ent. Now, let’s dive into the composition of functions.
4.5.2	Functional composition: separating description from evaluation
In essence, functional composition is a process used to group together complex behavior that has been broken into simpler tasks. I defined it briefly in chapter 1, and now I’ll explain it in detail. Let’s go over a quick example that uses Ramda’s R.compose to combine two pure functions:
Arguably, this code is easy to read, and its meaning easily derived by glancing at the function’s constituent parts. The interesting quality of this program is that evaluation never takes place until countWords is run; in other words, the functions passed by name (explode and count) are dormant within the composition. The result of com- position is another function that waits to be called with its respective argument: the argument to countWords. This is the beauty of function composition: separating a func- tion ’s description from its evaluation.
I’ll explain what happens behind the scenes. The call to countWords(str) runs explode with the given sentence and passes its output (array of strings) into count, which computes the length of the array. Composition connects outputs with inputs, creating true function pipelines. Let’s examine a more formal definition. Consider two functions f and g with their respective input and output types:
Figure 4.10 draws a set of arrows connecting all groups. This abstract example shows a function (arrow) f that takes an argument of type B and returns a C. Another function (arrow) g takes an A and returns a B. The composition of g :: A -> B and f :: B -> C,
 

 
<p className="pag">Page 105</p>
 
Figure 4.10 Showing the set of input and output types for functions f and g. Function g maps A values to B values, and function f maps B values to C values. Composition happens because f and g are compatible.
 
Figure 4.11 The composition of two functions is a new function directly mapping the inputs of the first function to the output of the second. The composition is also a referentially transparent mapping between inputs and outputs.
pronounced (“f composed of g”), results in another function (arrow) from A -> C, as shown in figure 4.11. This can be expressed more formally as
<pre>f • g = f(g) = compose ::	(B -> C) -> (A -> B) -> (A -> C)</pre>
Recall that with referential transparency, functions are nothing more than arrows con- necting one object of a group to another.
This leads to another important software development principle, which is the backbone of modular systems. Because composition loosely binds type-compatible functions at their boundaries (inputs and outputs), it fairly satisfies the principle of programming to interfaces. In the previous example, you have a function explode :: String -> [String] composed with the function count :: [String] -> Number; in other words, each function only knows or cares about the next function’s interface and isn’t worried about its implementation. Although it isn’t part of the JavaScript lan- guage, compose can be naturally expressed as a higher-order function.
Listing 4.8 Implementation of compose
 
<p className="pag">Page 106</p>
Luckily, Ramda provides an implementation of R.compose that you can use so you don’t have to implement this yourself. Let’s write a validation program that checks for a valid SSN (you’ll reuse a lot of these helper functions throughout the book):
Taking this fundamental concept further, as you can see in figure 4.12, entire pro- grams can be built with the combination of simple functions.
Figure 4.12 Complex functions can be built by composing simple functions. Just as functions combine, entire programs made from different modules (containing more functions) that can also combine in this fashion.
This concept isn’t limited to functions; entire programs can be built from the combi- nation of other side effect-free, pure programs or modules. (Based on the earlier def- inition of a function, used throughout this book, I’ll use the terms function, program, and module loosely to refer to any executable unit with inputs and output.)
 

 
<p className="pag">Page 107</p>
Composition is a conjunctive operation, which means it joins elements using a logicai AND operator. For instance, the function isValidSsn is made from checkLengthSsn and cleanInput. In this manner, programs are derivations of the sum of all their parts. In chapter 5, we’ll tackle problems that require disjunctive behavior to express condi- tions where functions can return one of two results, A OR B.
Alternatively, you can augment JavaScript’s Function prototype to add compose. Here’s the exact same behavior in a style similar to function chaining from chapter 3:
 
If you like this better, feel free to use it. In the next chapter, you’ll learn that this mecha- nism of chaining methods is prevalent in functional algebraic data types called monads. Personally, I recommend sticking to the more functional form, because it’s much more succinct and flexible and works better in conjunction with functional libraries.
4.5.3 Composition with functional libraries
One of the benefits of working with a functional library such as Ramda is that all func- tions have been properly configured with currying in mind, making them versatile when composed into function pipelines. Let’s look at another example. Here’s a list of students with their respective grades in a class:
<pre>const students = ['Rosser', 'Turing', 'Kleene', 'Church'];
const grades =	[80, 100,	90,	99];</pre>
Suppose you need to find the student with the highest grade in the class. You learned in chapter 3 that working with collections of data is one of the cornerstones of func- tional programming. The code in listing 4.9 is made up of the composition of several curried functions, each in charge of transforming this data in a particular way:
<li className="litag">	R.zip—Creates a new array by pairing the contente of adjacent arrays. In this case, pairing these two arrays yields [['Rosser', 80], ['Turing', 100], ...].</li>
<li className="litag">	R.prop—Specifies the value to be used in sorting. In this case, passing a 1 points to the second element of a subarray (grade).</li>
<li className="litag">	R.sortBy—Performs a natural ascending sort of the array by the given property.</li>
<li className="litag">	R.reverse—Reverses the entire array to get the highest number at the first element.</li>
<li className="litag">	R.pluck—Builds an array by extracting an element at a specified index. Passing a 0 points to the student name element.</li>
<li className="litag">	R.head—Takes the first element.</li>
<p className="pag">Page 108</p>
Listing 4.9 Computing the smartest student
Using composition can be challenging, especially when you’re just getting acquainted with the framework or you’re just beginning to understand the problem domain. When I use composition in my own work, I often find myself thinking about where I should begin. Again, the hardest part is the exercise of breaking a task into smaller pieces; once this is finalized, composition is compelling for recombining functions.
In addition, something you’ll soon realize and begin to love about functional com- position is how you’re naturally drawn to expressing the entire solution succinctly in one or two lines. Because you’re forced to create functions that map to the different stages in your algorithm, you begin to build an ontology with which you can stitch together expressions that describe parts of your solution, allowing team members to more quickly understand your code. The following listing is similar to an exercise from chapter 3.
Listing 4.10 Using descriptive function aliases
<pre>const first = R.head;
const getName = R.pluck(0);
const reverse = R.reverse;
const sortByGrade = R.sortBy(R.prop(1));
const combine = R.zip;
R.compose(first, getName, reverse, sortByGrade, combine);</pre>
Although this instance of the program is easier to read, there’s no added reusability because these functions are specific to the particular task at hand. Rather, I recom- mend getting acquainted with the functional vocabulary of head, pluck, zip, and oth- ers, so that, through practice, you gain comprehensive knowledge of your functional framework of choice. It will make the transition to other frameworks or other func- tional languages easier, because they all use many of the same naming conventions. This will quickly pay dividends in your productivity.
Listings 4.9 and 4.10 uses pure functions to express an entire solution, but you know this isn’t always possible. As an application developer, you’ll face many situations where you need to do things like read from local storage and make remote HTTP requests, among other tasks, which unavoidably create side effects. For this, you must
 
<p className="pag">Page 109</p>
be able to isolate and separate the impure from the pure code; as you’ll see in chapter 6, this will make testing extremely simple.
4.5.4	Coping with pure and impure code
Impure code causes externally observable side effects after it’s run and has external dependencies to access data beyond the scope of its constituent functions. It only takes one function to be impure for your entire program to follow suit.
With that said, you don’t have to make your functions 100% pure to reap the ben- efits of functional programming. Although this is the perfect scenario, you must also learn to tolerate pure and impure behavior by creating a clear separation between the two and isolating the impurity as much as possible—ideally, in single functions. Then composition can be used to glue the pure and impure pieces back together. Recall from chapter 1 that you began implementing the requirements for the showStudent function, which looked like this:
<pre>const showStudent = compose(append, csv, findStudent);</pre>
One way or another, most of these functions emit side effects through the arguments they receive:
<li className="litag">	findStudent uses a reference to a local object store or some external array.</li>
<li className="litag">	append directly writes and modifies HTML elements.</li>
Let’s continue improving this program by using curry to partially evaluate the invari- able parameters of each function. You’ll also add code to sanitize the input parameter and refactor the HTML operations with more fine-grained functions. Finally, you’ll make the find operation more functional by dislodging it from the object store.
Listing 4.11 showStudent program using currying and composition
 
<p className="pag">Page 110</p>
The code in listing 4.11 defìnes four functions that make up showStudent (I added their type signatures so that you can more easily follow the correspondence between each successive invocation). This program executes all the functions beginning with trim and works backward until it calls append, linking the output of one function and passing it to the next. But wait a second; remember the Unix program with which I started the chapter? This program executes each function in a left-to-right manner using the Unix built-in pipe | operator. Piping functions evaluates programs in the opposite order of composition (see figure 4.13).
If the thought of composing functions in this naturally reversed flow feels odd to you, or you visualize your programs as a left-associative sequence, you can use Ramda’s mir- ror function to compose, called pipe, which achieves the same results:
<pre>R.pipe(
trim,
normalize,
findStudent,
csv,
append('#student-info'));</pre>
As evidence of how important this is, F# provides built-in support for this using its pipe-forward operator |>. In JavaScript, we don’t have this luxury, but we can safely rely on functional libraries to do the job effectively Note from both R.pipe and R.compose that you’re creating new functions without having to explicitly declare any of their formal arguments, as you’d normally have to. Functional composition encour- ages this writing style, which goes by the name of point-free coding.
 

 
<p className="pag">Page 111</p>
4.5.5	Introducing point-free programming
If you look closer at the function in listing 4.10, you can see that it doesn’t show the parameters of any of its constituent functions, as would a traditional function declara- tion. Here it is again:
<pre>R.compose(first, getName, reverse, sortByGrade, combine);</pre>
Using compose (or pipe) means never having to declare arguments (known as the points of a function), making your code declarative and more succinct or point-free.
Point-free programming brings functional JavaScript code closer to that of Haskell and the Unix philosophy. It can be used to increase the level of abstraction by forcing you to think of composing high-level components instead of worrying about the low- level details of function evaluation. Currying plays an important role because it gives you the flexibility to partially define all but the last argument of an inlined function reference. This style of coding is also known as tacit programming, much like the Unix program from the start of the chapter, which is written next in a point-free way.
Listing 4.12 Point-free version of a Unix program using Ramda functions
The program in listing 4.12 is made up of point-free function expressions that are defined only by name (some with an argument partially defined), without declaring what types of arguments they take or how they’re connected within the bigger expres- sion. As composition morphs into this coding style, it’s important to keep in mind that overdoing it can create obscure or obfuscated programs. Not everything has to be point-free. In some cases, breaking out your function composition into two or three at a time can go a long way.
Point-free code can raise questions related to error handling and debugging. In other words, because throwing exceptions causes side effects to occur, should you resort to returning null from within composed functions? Checking for null within functions is acceptable but adds a lot of duplicated, boilerplate code and assumes you return sensible default values for the program to proceed. Also, how would you attempt to debug all of these commands, which appear on a single line? These are valid con- cerns and will be addressed in the next chapter, where I’ll present more point-free programs that include automatic support for error handling.
 
<p className="pag">Page 112</p>
Another obvious concern is how to handle situations where you need to use condi- tional logic or have some way of running multiple functions in sequence. In the next section, I’ll discuss helpful utilities to manage your application’s control flow.
4.6	Managing control flow with functional combinators
In chapter 3, I gave a comparison of a program’s control flow in both imperative and functional paradigms and highlighted the significant differences between them. Imperative code uses procedural control mechanisms like if-else and for to drive a program’s flow, but functional programming doesn’t. As we leave the imperative world behind, we need to find alternatives to fill in that gap; for this, we can use func- tion combinators.
Combinators are higher-order functions that can combine primitive artifacts like other functions (or other combinators) and behave as control logic. Combinators typ- ically don’t declare any variables of their own or contain any business logic; they’re meant to orchestrate the flow of a functional program. In addition to compose and pipe, there’s an infinite number of combinators, but we’ll look at some of the most common ones:
<li className="litag">	identity</li>
<li className="litag">	tap</li>
<li className="litag">	alternation</li>
<li className="litag">	sequence</li>
<li className="litag">	fork (join)</li>
4.6.1	Identity (l-combinator)
The identity combinator is a function that returns the same value it was provided as an argument:
<pre>identity ::	(a) -> a</pre>
It’s used extensively when examining the mathematical properties of functions, but it has other practical applications as well:
<li className="litag">	Supplying data to higher-order functions that expect it when evaluating a func- tion argument, as you did earlier when writing point-free code (listing 4.12).</li>
<li className="litag">	Unit testing the flow of function combinators where you need a simple function result on which to make assertions (you’ll see this in chapter 6). For instance, you could write a unit test for compose that uses identity functions.</li>
<li className="litag">	Extracting data functionally from encapsulated types (more on this in the next chapter).</li>
<p className="pag">Page 113</p>
4.6.2	Tap (K-combinator)
tap is extremely useful to bridge void functions (such as logging or writing a file or an HTML page) into your composition without having to any create additional code. It does this by passing itself into a function and returning itself. Here’s the function signature:
<pre>tap ::	(a -> *) -> a -> a</pre>
This function takes an input object a and a function that performs some action on a. It runs the given function with the supplied object and then returns the object. For instance, using R.tap, you can take a void function like debugLog
<pre>const debugLog = _.partial(logger, 'console', 'basic', 'MyLogger',
'DEBUG');</pre>
and embed it within the composition of other functions. Here are some examples:
<pre>const debug = R.tap(debugLog);
const cleanInput = R.compose(normalize, debug, trim);
const isValidSsn = R.compose(debug, checkLengthSsn, debug, cleanInput);</pre>
Having the call to debug (based on R.tap) won’t alter the result of the program in any way. In fact, this combinator throws away the result of the function passed into it (if any). This will compute the result and also perform debugging along the way:
<pre>isValidSsn('444-44-4444');
// output
MyLogger	[DEBUG]	444-44-4444	     //	clean	input
MyLogger	[DEBUG]	444444444     	//	check	length
MyLogger	[DEBUG]	true      //	final	result</pre>
4.6.3	Alternation (OR-combinator)
The alt combinator allows you to perform simple conditional logic when providing default behavior in response to a function call. This combinator takes two functions and returns the result of the first one if the value is defined (not false, null, or undefined); otherwise, it returns the result of the second function. Let’s implement it here:
<pre>const alt = function (func1, func2) { return function (val) {
return func1(val) || func2(val);
}
};</pre>
Alternatively, you could also write this function succinctly using curry and lambdas:
<pre>const alt = R.curry((func1, func2, val) => func1(val) || func2(val));</pre>
<p className="pag">Page 114</p>
You can use this combinator as part of the showStudent program to handle the case when the fetch operation returns unsuccessfully, so that you can create a new studenti:
<pre>
const showStudent = R.compose( append('#student-info'), csv,
alt(findStudent, createNewStudent)); showStudent('444-44-4444');</pre>
To understand what’s happening, think of this code emulating a simple if-else state- ment equivalent to the imperative conditional logici:
<pre>
var student = findStudent('444-44-4444'); if(student !== null) { let info = csv(student); append('#student-info', info);
}
else {
let newStudent = createNewStudent('444-44-4444'); let info = csv(newStudent); append('#student-info', info);
}</pre>
4.6.4	Sequence (S-combinator)
The seq combinator is used to loop over a sequence of functions. It takes two or more functions as parameters and returns a new function, which runs all of them in sequence against the same value. This is the implementation:
<pre>
const seq = function(/*funcs*/) {
const funcs = Array.prototype.slice.call(arguments); return function (val) {
funcs.forEach(function (fn) { fn(val);
});
};
};</pre>
With it, you can perform a sequence of related, yet independent, operations. For instance, after finding the student object, you can use seq to both render it on the HTML page and log it to the console. All functions will run in that order against the same stu- dent object:
<pre>
const showStudent = R.compose(
seq(
append('#student-info'),
consoleLog),
csv,
findStudent));</pre>
<p className="pag">Page 115</p>
The seq combinator doesn’t return a value; it just performs a set of actions one after the other. If you want to inject it into the middle of a composition, you can use R.tap to bridge the function with the rest.
4.6.5	Fork (join) combinator
The fork combinator is useful in cases where you need to process a single resource in two different ways and then combine the results. This combinator takes three func- tions: a join function and two terminal functions that process the provided input. The result of each forked function is ultimately passed in to a join function of two argu- ments, as shown in figure 4.14.
NOTE This isn’t to be confused with the Java fork-join framework, which helps with multiprocessing. This comes as a fork combinator implementation in Haskell and other functional toolkits.
This is the implementation:
<pre>const fork = function(join, funcl, func2){
return function(val) {
return join(func1(val), func2(val));
};
};</pre>
Now let’s see it in action. Let’s revisit computing the average letter grade from an array of numbers. You can use fork to coordinate the evaluation of three utility functions:
<pre>const computeAverageGrade =
R.compose(getLetterGrade, fork(R.divide, R.sum, R.length));

computeAverageGrade([99, 80, 89]); //-> 'B'</pre>
The next example checks whether the mean and median of a collection of grades are equal:
<pre>const eqMedianAverage = fork(R.equals, R.median, R.mean);
eqMedianAverage([80, 90, 100])); //-> True
eqMedianAverage([81, 90, 100])); //-> False</pre>
 
<p className="pag">Page 116</p>
Some people view composition as restrictive, but you can see for yourself that it’s quite the opposite: combinators unlock freedom and facilitate point-free programming. Because combinators are pure, they can be composed into other combinators, provid- ing an infinite number of alternatives to express and reduce the complexity of writing any type of application. You’ll see them used again in the following chapters.
Through the basic principles of immutability and purity, functional programming enables a fine level of modularity and reusability of the functions that make up your program. In chapter 2, you learned that in JavaScript, functions can also be used to implement modules. Using these same principles, you can also compose and reuse entire modules. I’ll leave this idea for you to contemplate on your own.
Modular functional programs consist of abstract functions that can be understood and reused independently and whose meaning is derived from rules governing their composition. In this chapter, you learned that composing pure functions is the back- bone of functional programming. These techniques take advantage of the abstraction (via currying and partial application) of pure functions with the goal of making them composable. So far, I haven’t talked about error handling, which is a critical part of any robust, fault-tolerant application; that’s what we’ll visit next.
4.7	Summary
<li className="litag">	Functional chains and pipelines connect reusable and modular componen- tized programs.</li>
<li className="litag">	Ramda.js is a functional library adapted for currying and composition, with a powerful arsenal of utility functions.</li>
<li className="litag">	Currying and partial evaluation can be used to reduce the arity of pure func- tions by partially evaluating a subset of a function’s arguments and transform- ing them into unary functions.</li>
<li className="litag">	You can break a task into simple functions and compose them together to arrive at the entire solution.</li>
<li className="litag">	Using function combinators allows you to orchestrate complicated program flows to tackle any real-world problem as well as write in a point-free manner.</li>