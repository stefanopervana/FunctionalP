<p className="pag">Page 205 Chapter 8 Managing asynchronous events and data</p>
This chapter covers
<li className="litag">	Identifying the challenges of writing asynchronous code</li>
<li className="litag">	Avoiding the use of nested callbacks through functional techniques</li>
<li className="litag">	Streamlining asynchronous code using promises</li>
<li className="litag">	Generating data lazily with function generators</li>
<li className="litag">	Introducing reactive programming</li>
<li className="litag">	Applying reactive programming to tackle eventdriven code</li>
Functional programmers argue that there are great material benefits— that a functional programmer is an order of magnitude more productive than his conventional counterpart, because functional programs are an order of magnitude shorter.
—John Hughes, “Why Functional Programming Matters”1
Index 1 From Research Topics in Functional Programming,” ed. D. Turner (Addison-Wesley, 1990), 17-42, http:// mng.bz/Zr02.

<p className="pag">Page 206</p>
Until now, you’ve been learning how to think functionally and using functional techniques to write, test, and optimize your JavaScript code. All of these techniques are designed to tame the complexities intrinsic to midand large-scale web applications, which can easily become increasingly difficult to maintain. Many years ago, interaction with web applications was limited to submitting large forms and rendering entire pages at once. Applications have evolved, and with them the demands of users. Nowadays, we all expect pages to behave more like native applications that respond and react in real time.
In the world of client-side JavaScript, the number of challenges we face is greater than in any other environment. This is directly influenced by the emergence of bulky client code that not only shares the burden associated with conventional web middleware, but also needs to effectively interact with user input, communicate with remote servers (via AJAX), and display data on the screen, all at once. The proposed solution in this book is functional programming, which is ideal for systems that need to maintain a high level of integrity despite all of these concerns.
In this chapter, you’ll apply functional programming to tackle real-world JavaScript programming challenges related to asynchronous data flows where code isn’t linear to the program’s execution. Some of the examples feature browser technology like AJAX and local storage requests. The goal is to use functional programming in conjunction with ES6 promises, as well as introduce reactive programming, both of which are used to turn messy callback code into elegant, fluent expressions. Reactive programming will seem familiar because it’s a way of thinking about problems that follows closely from functional programming.
Asynchronous behavior is tricky to get right. Unlike normal functions, asynchronous functions can’t just return data to the caller. Instead, you rely on the infamous callback pattern that notifies you when long-running computations, database fetches, or remote HTTP calls have been computed. You also use callbacks to handle browser events like clicks, key presses, and mobile gestures in response to user interaction. You need to build code that responds to these events happening after your program is run, which poses many challenges for a functional design that instead expects data to come in predictably and at the right time. After all, how you can compose or chain functions for behavior that will happen in the future?
8.1	Challenges of asynchronous code
Modern JavaScript programs are seldom loaded in a single request; most often, data is progressively loaded on the page by multiple asynchronous requests that respond to a user’s needs. A simple use case is an email client. Your inbox can have thousands of long email threads, yet you see and interact only with the recent ones. It doesn’t make sense for you to have to wait a few seconds (or even minutes) for your entire inbox to load. As JavaScript developers, we deal with problems of this nature frequently, and
<p className="pag">Page 207</p>
they all involve implementing some form of nonblocking asynchronous calls, which can present the following challenges:
<li className="litag">	The creation of temporal dependencies among your functions</li>
<li className="litag">	The inevitable fall into a callback pyramid</li>
<li className="litag">	An incompatible mix of synchronous and asynchronous code</li>
8.1.1	Creating temporal dependencies among functions
Consider a function used to perform an AJAX request to fetch a list of student objects from the server. In figure 8.1, because getJSON is asynchronous, the function returns as soon as the request is sent and gives control back to the program, which subsequently invokes showStudents. But at this point in time, the students object is still nuli because the slower remote request hasn’t yet completed. The only way to ensure that the right order of events transpires is to create a temporal dependency between the asynchronous code and the action to take next. This involves including showStudents in the callback function so that it’s executed at the right time.
Figure 8.1 This code has a big problem. Can you spot it? Because you need to fetch data asynchronously, the students object will never be populated in time to be added to the roster table.
Temporal coupling or temporal cohesion occurs when the execution of certain functions is logically grouped together. This is done when functions need to wait for data to be available or need to wait for other functions to run. Whether you’re depending on data or, in this case, time, both can cause side effects.
Because performing remote IO operations is noticeably slower than the rest of your code, you delegate them to nonblocking processes that can request data and “wait” for it to come back. When data is received, the user-provided callback function is invoked. This is precisely what getJSON does; the following listing shows the details.
 
<p className="pag">Page 208</p>
Listing 8.1 Function getJSON using the native XMLHttpRequest
<pre>const getJSON = function (url, success, error) { let req = new XMLHttpRequest(); req.responseType = 'json'; req.open('GET', url); req.onload = function() { if(req.status == 200)	{
let data = JSON.parse(req.responseText); success(data);
}
else {
req.onerror();
}
}
req.onerror = function ()	{
if(error) {
error(new Error(req.statusText));
}
};
req.send();
};</pre>
Callback functions are commonly used in JavaScript. But they’re hard to scale when you need to load more data sequentially, which leads to the popular callback pattern.
8.1.2	Falling into a callback pyramid
The main use of callbacks is to avoid blocking the UI to wait for long-running processes to complete. Functions that accept a callback instead of returning values implement a form of inversion of control: “Don’t call me, I’ll call you.” As soon as an event happens, such as data being available or a user clicking a button, the callback function is invoked with the requested data to allow your synchronous code to run:
<pre>var students = null; getJSON('/students', function(students) {
showStudents(students);
},
function (error) {
console.log(error.message);
}
);</pre>
In the event of an error, the corresponding error callback function is called, giving you the chance to report the error and recover. But this inversion of control works against the design of functional programs, where functions are supposed to be independent of one another and are expected to return values to the caller immediately. As I said earlier, this situation worsens if you need to add more asynchronous logic into already-nested callbacks.
<p className="pag">Page 209</p>
To show this, consider a slightly more complicated scenario. Suppose that after fetching a list of students from the server, you also need to fetch grades—but only for students residing in the United States. This data is then sorted by SSN and displayed on an HTML page, as shown in the next listing.
Listing 8.2 Nested JSON calls, each with its own success and error callbacks
Before you read this book, this code would’ve looked acceptable to you; but to a functional programmer such as yourself, it looks messy and tangled (later, I’ll show you a complete functional version of this code). The same effect occurs when handling events. Listing 8.3 interleaves AJAX calls with user-input handling. It listens for clicks and mouse events, fetches multiple pieces of data from the server, and renders the data on the DOM.
Listing 8.3 Retrieving student records from the server by SSN
<pre>var _selector = document.querySelector;
_selector('#search-button').addEventListener('click' ,
function (event) {
event.preventDefault();

let ssn = _selector('#student-ssn').value;
if(!ssn) {
console.log('WARN: Valid SSN needed!');
return;
}
else {
getJSON('/students/${ssn}', function (info) {
_selector('#student-info').innerHTML = info; _selector('#student-info').addEventListener('mouseover', function() {
getJSON('/students/${info.ssn}/grades', function (grades) {
// ... process list of grades for this //	student...
});
});
})
.fail(function() {
console.log('Error occurred!');
});
}
});</pre>
 
<p className="pag">Page 210</p>

Again, this code is hard to follow. As you can see, nesting a sequence of callbacks quickly makes the code resemble a horizontal pyramid like the one shown in figure 8.2. This is known casually as “callback hell” or the “Christmas tree of doom,” characteristic of programs dealing with lots of asynchronous code and user/DOM behavior.
When a program begins taking this form, you find yourself relying on spacing and syntactic organization, such as grouping statements just to improve readability. But this is just putting lipstick on a pig. Let’s see how thinking functionally can help in this situation.
8.1.3	Using continuation-passing style
Listing 8.3 is another example of a program that hasn’t been properly decomposed. The nested callback functions not only are hard to read, but also create closures that enclose their own scope plus the variable scope of the functions in which they’re nested. The only reason to nest a function in another is when it needs direct access to
 
<p className="pag">Page 211</p>
its outer variables in order to fulfill its purpose. But in this case, the inner callback function that processes all the grades still keeps references to unnecessary external data. One solution that makes this code better is to unravel it by using continuationpassing style (CPS). In the following listing, I refactored listing 8.3 using CPS.
Listing 8.4 Refactoring student retrieval using continuation-passing style
<pre>var _selector = document.querySelector;
_selector('#search-button').addEventListener('click'/ handleMouseMovement);
var processGrades = function (grades) {
// ... process list of grades for this student...
};
var handleMouseMovement = () =>
getJSON('/students/${info.ssn}/grades', processGrades);
var showStudent = function (info) {
_selector('#student-info').innerHTML = info; _selector('#student-info').addEventListener(
'mouseover', handleMouseMovement);
};
var handleError = error =>
console.log('Error occurred' + error.message);
var handleClickEvent = function (event) { event.preventDefault();
let ssn = _selector('#student-ssn').value; if(!ssn) {
alert('Valid SSN needed!'); return;
}
else {
getJSON('/students/${ssn}', showStudent).fail(handleError);
}
};</pre>
All I did was separate the inner callbacks into separate functions or lambda expressions. CPS is a style of programming used for nonblocking programs that encourages you to separate pieces of a program into individual components; for this reason, it’s an intermediate form of functional programming. In this case, the callback functions are known as the current continuations, which are provided by its callers on the return value. An important advantage of CPS is its efficiency in terms of the context stack (revisit chapter 7 for information on JavaScript’s function stack). If your program is completely in CPS (like listing 8.4), continuing into other functions will clean up the current function’s context and prepare a new one to support the function that continues the flow of the program—every function is essentially in tail form.
Using continuations also fixes a problem in listing 8.2 that occurs when interlacing synchronous and asynchronous behavior. The problematic section of code is the
<p className="pag">Page 212</p>
nested loop that makes AJAX requests to retrieve each student’s grades and compute their average:
<pre>for (let i = 0; i < students.length; i++)	{
let student = students[i]; if (student.address.country === 'US')	{
getJSON('/students/${student.ssn}/grades', function (grades) {
showStudents(student, average(grades));
},
function (error) {
console.log(error.message);
}
);
}
}</pre>
At a glance, this code looks like it should work and print the names of students Alonzo Church and Haskell Curry with their respective information (the code uses an HTML table to append all data for each student, but it could also be a file or a database insert). Running it, however, produces the result shown in figure 8.3.
Figure 8.3 Results from running the buggy imperative code that mixes asynchronous functions with a synchronous loop. While fetching the remote data, the function call will always refer to the last iterated student record (in its closure) and print it several times.
Certainly not what you expected. Why is the same student printed twice? The error is due to using a synchronous artifact—a loop, in this case—to execute an asynchronous function, getJSON. The loop doesn’t understand that it needs to wait for getJSON to complete. Regardless of using the block-scoped keyword let, all the inner calls to showStudents(student, average(grades)) see the last student object reference in its closure, displaying the same student record. We discussed this in chapter 2 when we looked at the ambiguous loop problem, and it’s a testimony that a function’s closure isn’t a copy of its enclosing environment but an actual reference to it. Notice that the grade column is still correct, though. This is because the fetched value is properly passed into the callback by coupling the right value to the function’s parameter.
 
<p className="pag">Page 213</p>
As you learned in chapter 2, the solution to this problem is to properly scope the student object into a function that makes the AJAX request. Using CPS in this case is not as straightforward as before, because the nested callback function to handle the grades depends on the student object as well. Remember, this is a side effect. Restoring the continuation requires you to think about what you learned in chapter 4 on currying, to help link function inputs and outputs:
This new code computes the correct results shown in figure 8.4.
Figure 8.4 Passing the current student object as a parameter properly sets the function’s closure and solves the ambiguity resulting from executing remote calls in a loop.
Adopting a continuation passing style helps to break the temporal dependency in your code, as well as disguise the asynchronous flow into a linear evaluation of functions—both good things. But someone else reading this code, who isn’t familiar with it, may be confused as to why the functions aren’t executing at the right times. You need to make these long-running operations first-class objects in your programs.
 

 
<p className="pag">Page 214</p>
8.2	First-class asynchronous behavior with promises
The previous code example is defmitely an improvement over the imperative asynchronous programs you saw at the beginning of the chapter, but it’s far from being functional. As with any functional program, you also seek other qualities like these:
<li className="litag">	Using composition and point-free programming</li>
<li className="litag">	Flattening the nested structure into a more linear flow</li>
<li className="litag">	Abstracting the notion of temporal coupling so that you don’t need to be concerned with it</li>
<li className="litag">	Consolidating error handling to a single function rather than multiple error callbacks so that it’s not in the way of the code</li>
Whenever I talk about flattening structures, composition, and consolidating behavior, a design pattern should come to mind; this sounds like the job for a monad. Let’s explore the Promise monad. Just to give you a rough idea, imagine a monad that wraps a long computation (this isn’t the actual Promise interface, but a close analogy):
<pre>Promise.of(<long computation>).map(fun1).map(fun2);//-> Promise(result)</pre>
Unlike the other monads you learned about in this book, promises know to “wait” for the long-running computation to complete before the mapped functions are run. In this manner, this data type tackles head-on the problem of latency present in asynchronous calls. Just like Maybe and Either document functions with uncertain return values, promises make the notion of waiting for data honest and transparent; they also have the benefit of providing a simpler alternative for executing, composing, and managing asynchronous operations when compared to traditional callback-based approaches.
You can use promises to wrap a value or a function to be processed in the future (if you have some Java experience, this is similar to the Future<V> object). A longrunning operation can be a complex calculation, fetching data from a database or a server, reading a file, and so on. In the event of a failure, promises allow you to consolidate error-handling logic using approaches with a look and feel much like that used with Maybe and Either. In a similar fashion, a promise can provide information about the state of the work being done, so you can ask questions such as these: Has data been fetched successfully? And were there any errors during the operation?
As you can see in figure 8.5, at any point in time a promise can be in any of these states: pending, fulfilled, rejected, or settled. It begins with a status of pending (also called unresolved). Depending on the outcome of the long-running operation, the promise can move into either fulfilled (in case resolve is called) or rejected (in case reject is called). Once a promise has been fulfilled, it can notify other objects (continuations or callbacks) that its data has arrived; or, in the case of errors, it can invoke
<p className="pag">Page 215</p>
Figure 8.5 How an async operation is wrapped in a Promise and provided with two callbacks: one for resolve and another for reject. The promise begins with a status of pending and then is either fulfilled or rejected, invoking the function resolve or reject, respectively, before moving into the settled state.
any failure callback function that you registered with it. At this point, the promise is said to be in the settled state.
Promises allow you to reason about your programs more effectively and to cut through tangled and tightly coupled callbacks. Just as Maybe was used to eliminate the number of nested if-else conditions resulting from null-checks in your code, Promise can be used to convert a series of nested callback functions into a sequence of actions, similar to a monad’s map functor.
ES6 has adopted the Promises/A+ standard, which is an open standard for the interoperability of JavaScript promises across browser manufacturers. The reference document can be found at https://promisesaplus.com; I encourage you to read it to learn more about the intricacies of this protocol as well as the terminology. At a basic level, here’s how you can construct a Promise object:
<pre>var fetchData = new Promise(function (resolve, reject) {
// fetch data async or run long-running computation
if (<success>) {
resolve(result);
}
else {
reject(new Error('Error performing this operation!'));
}
});</pre>
The promise constructor takes a single function (called the action function) that wraps the asynchronous operation; it takes two callbacks (you can think of them as continuations), resolve and reject, to be invoked in cases where the promise is
 
<p className="pag">Page 216</p>
either fulfilled or rejected, respectively. Notice the strong influence of the Either design pattern as well. Let’s look at a quick example using promises in conjunction with the simple Scheduler from chapter 4:
Just like a monad’s map, promises provide a mechanism to apply transformations against a value that doesn’t exist yet—a value in the future.
8.2.1	Future method chains
The Promise object defines a then method (analogous to a functor’s fmap), which applies an operation on a value returned in a promise and closes it back into a Promise. Similar to Maybe.map(f), Promise.then(f) can be used for chaining data transformations as well as joining functions in time, abstracting the use of temporal coupling among your functions. With this, you can chain multiple levels of dependent asynchronous behavior linearly without creating new nested levels, as seen in figure 8.6.
Figure 8.6 A sequence of chained promises joined via the then method. Each then clause is executed serially with one promise value after the next as soon as each is fulfilled.
 

 
<p className="pag">Page 217</p>
The then method takes two optional arguments: a callback for success and another for error. Providing error callbacks into each then block is ideal for reporting detailed errors, but you can also use a series of success callbacks and defer all error-handling logic to a single catch method at the end. Before you begin chaining promises, let’s refactor getJSON to take advantage of Promise—known as promisifying a function.
Listing 8.5 Promisifying getJSON
Promisifying your APIs is good practice. It makes working with your code a lot easier than with traditional callbacks. Because promises are designed to wrap any type of long-running operation, not just fetching data, they can be used with any object that implements a then method (known as a thenable). Soon, all JavaScript libraries will incorporate promises into their functions.
Promises with jQuery
If you're a jQuery user, you've probably interacted with promises already. jQuery's $.getJSON operation (and any variation of the JQuery $.ajax calls) returns its own Deferred object (a nonstandard version of a Promise), which implements the Promise interface and has a then method. Hence, you can use Promise.resolve() to treat the Deferred object as a Promise:
<pre>Promise.resolve($.getJSON('/students')).then(function ()	...);</pre>
This object is now a thenable and used just like any promisified object. I chose to implement my own getJSON in listing 8.5 to illustrate the process of refactoring an API call to use promises.
 
<p className="pag">Page 218</p>
First let’s go over a simple example that fetches student data from the server using this new promise-based getJSON, and then you’ll incorporate the call to fetch grades so that you can see the chained promises:
<pre>getJSON('/students').then( function(students) {
console.log(R.map(student => student.name, students));
},
function (error) {
console.log(error.message);
}
);
Now, instead of continuation passing, you’ll refactor listing 8.2 with a superior solution based on promises. Here’s the code from listing 8.2 once more:
getJSON('/students',
function (students) {
students.sort(function(a, b){
if(a.ssn < b.ssn) return -1; if(a.ssn > b.ssn) return 1; return 0;
});
for (let i = 0; i < students.length; i++)	{
let student = students[i]; if (student.address.country === 'US')	{
getJSON('/students/${student.ssn}/grades', function (grades) {
showStudents(student, average(grades));
},
function (error) {
console.log(error.message);
});
}
}
},
function (error) {
console.log(error.message);
}
);</pre>
The functional approach in listing 8.6 makes the following changes:
<li className="litag">	Instead of nesting asynchronous calls, chain them together using then and use the Promise monad to abstract out asynchronous parts of the code.</li>
<li className="litag">	Remove all variable declarations and mutations in favor of lambda functions.</li>
<li className="litag">	Take advantage of Ramda’s curried functions to create succinct data-transformation steps like sorting, filtering, and mapping.</li>
<li className="litag">	Consolidate error-handling logic into a final catchall function.</li>
<li className="litag">	Lift the data into an IO monad to write data to the DOM in a side effect-free manner.</li>
<p className="pag">Page 219</p>
Listing 8.6 Fetching student and grade data with asynchronous calls
Because promises remove the details of handling asynchronous calls, you can create programs that feel as if every function executes one after the other, without any wait time or knowledge that you’re requesting data from an external server; promises hide the asynchronous flow but emphasize the notion of time with then. In other words, you could just as easily swap getJSON(url) with a promisified local storage call, say getJSON(db), and your code would work exactly the same. This level of flexibility is known as location transparency. Also notice that the code has a point-free style. Figure 8.7 illustrates the behavior of this program.
The code in listing 8.6 fetches each student and appends them to the DOM one at a time. But by serializing operations to fetch grades, you’re losing some precious time. Promise also has the ability to take advantage of the browser’s multiple connections to fetch multiple items at once. Consider a slight variation to this problem. Suppose that for the same set of students, you want to compute their total average grade. In this case, it doesn’t matter in which order you fetch the data or which requests arrive first, so you can do it concurrently. For this, you use Promise.all() as shown next.
 
<p className="pag">Page 220</p>
Figure 8.7 The flow of behavior through the chained use of promises. Each thenable block contains a function that transforms the data passed through it. Although this program is bug-free and has all the desired functional qualities, it’s inefficient because it uses a waterfall sequence of getJSON requests to fetch each student’s grades.
Listing 8.7 Fetching multiple items at once with Promise.all()
Using Promise.all takes advantage of the browser’s ability to download multiple things at once. The resulting promise resolves as soon as all promises in the iterable argument have resolved. Listing 8.7 brings together two basic componente of functional code: splitting a program into simple functions and then composing them together via a monadic data type that orchestrates the program’s entire execution. Figure 8.8 illustrates what’s happening.
 

 
<p className="pag">Page 221</p>
Figure 8.8 The flow of behavior through the chained use of linear as well as concurrent promises with Promise.all(). Each thenable block contains a function that transforms the data passed through it. This program is efficient because it can spawn several parallel connections to fetch all the data at once.
But monads aren’t effective only for forming method chains. As you learned in previous chapters, they’re also effective when used with composition.
8.2.2	Composing synchronous and asynchronous behavior
When you think of the way inputs and outputs of composed functions are linked together, your intuition tells you that these functions must be executing linearly one after the other. But using promises, you can execute functions that are separated in time, while still preserving the look of an otherwise synchronous program made up of functions that compose. This concept is a bit mind-bending to grasp, so I’ll explain with an example.
Throughout the code examples in the book, you’ve used a synchronous version of find(db, ssn) to implement showStudent. To make things easier, you assumed find was synchronous. Now you’ll implement the actual asynchronous version that relies on the browser’s local store using IndexedDB, which can be to used to store objects mapped by a certain key (SSN ). If you’ve never used this API, don’t worry. Because you use promises to implement find, as shown in the following listing, the important thing to understand here is that if a student object exists, the promise will resolve with that object; otherwise, it will be rejected.
 
<p className="pag">Page 222</p>
Listing 8.8 find function using the browser’s locai store
I’ve omitted the details of setting up the db object because they’re not relevant to this discussion. You can learn how to initialize and use the indexed locai store API here: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API. What you’ll learn from reading this document is that the APIs are all asynchronous—rely on callback passing—for reading and writing to storage. But how can you compose functions together that execute at different moments in time? Until now, the find function has always been synchronous. Luckily, promises abstract the execution of asynchronous code so that composing functions with promises is equivalent to composing functions in the future, with not much change to the code. Before you implement the code, let’s create a few helper functions:
 

 
<p className="pag">Page 223</p>
Using these functions with R.compose produces the code in the next listing.
Listing 8.9 Asynchronous version of showStudent
Here you can really see the power of composition with promises. As figure 8.9 shows, when findStudentAsync runs, the entire program waits for the asynchronous function to return to the caller with data, in order to proceed to execute the rest of the functions. The promise in this case acts as a gateway into the asynchronous part. It’s also declarative in that nothing in this program reveals the internal behavior of the asynchronous nature of the function or that callbacks are being used. Thus, compose can still be used to orchestrate point-free programs that glue together functions that won’t execute at the same time, but rather in the future, showing its true color as a functional combinator.
I	added error-handling logic as well; running this program with an existing SSN showStudentAsync ('444-44-4444') successfully appends the student record to the
Figure 8.9 When composing synchronous code with asynchronous behavior, there’s a point of inflexion in the program where the code shifts into a time-bound adjacent sequence of events that happen within the confines of the promise type.
 

 
<p className="pag">Page 224</p>
page. Otherwise, if the promise is rejected, the error is safely propagated throughout the program until the catch clause prints the following:
[ERROR] Error: Student not found!
This program is certainly complex, yet you were able to preserve its functional style by combining many concepts learned throughout this book: composition, higher-order functions, monads, containerization, mapping, chaining, and others. Furthermore, this notion of a program waiting or yielding for data to become available is such a compelling concept that it has been introduced as a first-class citizen in ES6 JavaScript, as you’ll see next.
8.3	Lazy data generation
One of ES6’s most powerful features is the ability of functions to cooperate with others by pausing to provide data without necessarily running to completion. This brings many (possibly infinite) opportunities for functions to become vehicles for lazily producing data instead of having to process massive data structures all at once.
On one hand, you can have large collections of objects that are transformed according to business rules (you’ve done this all along with map, filter, reduce, and others); on the other, you can specify rules that govern how data should be created. For instance, the function x => x * x, in the mathematical sense, is nothing more than a specification for all squared numbers (1, 4, 9, 16, 25, and so on). With some special syntax, this is known as a generator.
A generator function is a language-level artifact defined with the function* notation (yes, a function with an asterisk). This new type of function has the unique quality that it can be exited using the new keyword yield and later reentered having its context (all local variable bindings) saved across reentrances. If you’re not familiar with a function’s execution context, see chapter 7 for more information. Unlike typical function calls, the ability to reenter a generator is possible because the execution context of a generator function can be temporarily paused and then resumed at will.
Lazily evaluated languages can generate lists of arbitrary size as required by the program. IfJavaScript were lazily evaluated, you could theoretically do something like the following:
<pre>R.range(1, Infinity).take(1); //-> [1]
R.range(1, Infinity).take(3); //->	[1,2,3]</pre>
This is conceptual, of course. As you learned in chapter 7, JavaScript evaluates functions eagerly, so the calls to R.range(1, Infinity) will fail to complete and will overflow the browser’s function stack. Generators provide lazy behavior through an internal iterator object that’s created when the generator function is called. The iterator serves data to the caller on demand on every call to yield, as shown in figure 8.10.
<p className="pag">Page 225</p>
With generators, you can implement the lazy program to take a certain number of elements from an infinite set:
<pre>function take(amount, generator) { let result = []; for (let n of generator) { result.push(n); if(n === amount) { break;
}
}
return result;
}
take(3, range(1, Infinity)); //-> [1, 2, 3]</pre>
 
<p className="pag">Page 226</p>
With a few limitations, generators behave much like any standard function cali. You can pass arguments to them, and perhaps a function, to drive the nature of the generated values:
Another quality of generator functions is that they can be used recursively.
8.3.1	Generators and recursion
Just like any function call, generators can be called from other generators. This is useful in cases where you want to create a flattened view of a nested set of objects, which is ideal when iterating over trees. Because generators can be looped over with for..of, delegating to another generator is similar to merging two collections and iterating over the entire thing. Recall the apprentice graph from chapter 3, shown again in figure 8.11.
 
Figure 8.11 Revisiting the apprentice graph from chapter 3, where each node represents a student object and each line represents a “student-of” relationship
You can easily model the data included in the branches of this tree using simple generators like so (I’ll show the printed result of running this program later):
function* AllStudentsGenerator(){ yield 'Church';
 

 
<p className="pag">Page 227</p>
Because recursion is such an integrai part of functional programming, I also want to demonstrate that despite the special semantics behind generators, they behave much like standard function calls, which can delegate to themselves. Here’s a simple traversal of the same tree (recall that each node contains a Person object), this time using recursion:
Running this code produces the same output as previous: Church, Rosser, Mendelson, Sacks, Turing, Gandy, Kleene, Nelson, Constable. As you can see, control is given to the other generators and then, once completed, returned to the caller in the exact
 

 
228
same spot where it left off. From the for..of loop point of view, however, it just calls an internai iterator until it runs out of data and doesn’t know recursion is even taking place.
8.3.2	The Iterator protocol
Generators are closely tied to another ES6 artifact called iterators, which is the reason you can loop over generators like any other data structure (such as arrays). Behind the scenes, a generator function returns a Generator object that conforms to the iterator protocol; this means it implements a method called next() that returns a value resulting from using the yield keyword. This object has the following properties:
<li className="litag">	done—Has the value true if the iterator is passed the end of the sequence. Otherwise, a value of false means the iterator was able to produce another value in the sequence.</li>
<li className="litag">	value—Any value returned by the iterator.</li>
This is enough for you to understand how generators work behind the scenes. Let’s look at the range generator again, implemented in a raw format:
With this implementation, you can create generators to produce any kind of data that governs a certain pattern or specification. Here’s the squares generator, for instance:
<pre>function squares() { let n = 1; return {
[Symbol.iterator]() { return this;
},
next() {
return { value: n * n++ };
}
};</pre>
 
<p className="pag">Page 229</p>
For more details about working with iterators and iterables, please visit https:// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols. With the internal @@iterator property, many things in JavaScript can be treated as iterable objects. You already expect arrays to work this way:
<pre>var iter = ['S',	't',	'r',	'e',	'a', 'm'][Symbol.iterator]();
iter.next().value; // S iter.next().value; // t</pre>
But even strings can be iterated over:
<pre>var iter = 'Stream'[Symbol.iterator]();
iter.next().value// -> S
iter.next().value// -> t
</pre>
I want to call out the idea of thinking about data as streams that, when probed, produce discrete sequences of events or values. As you’ve seen all along, these values flow into a sequence of pure higher-order functions and transform into your desired output. This way of thinking is vitally important and gives rise to another programming paradigm (based on functional programming) called reactive programming.
8.4	Functional and reactive programming with RxJS
I’ve mentioned before that the nature of web applications has changed drastically, mostly influenced by the AJAX revolution. As we push the limits of the web, users’ expectations become increasingly demanding of not just more data, but also more interactivity. Applications need to be able to process user input coming from different sources like button presses, text fields, mouse movements, finger gestures, voice commands, and others, and it’s important to be able to interact with all of these in a consistent manner.
In this section, I’ll introduce a reactive library called Reactive Extensions for JavaScript (RxJS) that you can use to elegantly combine asynchronous and eventbased programs (refer to the appendix for installation information). RxJS works in ways similar to the functional promise-based examples you saw earlier in this chapter, but it provides a higher degree of abstraction and many more powerful operations. Before we get started, you must understand the concept of observables.
8.4.1	Data as observable sequences
An observable is any data object that you can subscribe to. Applications can subscribe to asynchronous events emitted from reading a file, a web service call, querying a database, pushing system notifications, handling user input, traversing a collection of elements, or even parsing a simple string. Reactive programming unifies all of these data providers into a single concept called an observable stream, using the Rx.Observable
<p className="pag">Page 230</p>
object. A stream is a sequence of ordered events happening over time. To extract its value, you must subscribe to it. Let’s look at some examples:
 
Running this code creates an observable sequence from a range of numbers that will emit the values 1, 2, 3. Finally, it flags the completion of the stream:
<pre>Next: 1
Next: 2
Next: 3
Completed</pre>
Consider another example using the earlier squares generator function to populate the stream of values (you add a parameter to generate a finite number of squares):
As you can see from these examples, you can work with any type of data in the exact same manner using Rx.Observable, because it converts this data into a stream. Rx.Observable wraps or lifts any observable object so that you can map and apply different functions to transform the observed values into the desired output. Hence, it’s a monad.
8.4.2 Functional and reactive programming
The Rx.Observable object unites the world of functional and reactive programming. It implements the equivalent of the minimal monadic interface you learned about in chapter 5 (map, of, and join) as well as many methods specific to stream manipulation. Here’s a quick example:
 

 
<p className="pag">Page 231</p>
 
To illustrate what’s happening behind the scenes, the diagram in figure 8.12 shows the transformation.
If you hadn’t just read a functional programming book, you would’ve felt that the hardest part about reactive programming is learning to “think reactively.” But thinking reactively isn’t that different from thinking functionally, just with a different set of tools; so half the battle is won. In fact, there’s so much overlap, that most of the documentation on reactive programming found on the web begins by teaching functional programming techniques. Streams bring declarativeness and chained computations into your code. Hence, reactive programming tends to resemble functional programming, giving rise to the term functional reactive programming (FRP).
Suggested reading
Reactive programming has been on the rise since 2013, so a sizeable amount of content is available related to it and FRP. My goal isn't to teach you reactive programming, but to demonstrate that reactive programming is really functional programming applied to asynchronous and event-based problems.
If you wish to learn more about reactive programming and the FRP world, you can check out Functional Reactive Programming (Manning 2016) by Stephen Blackheath and Anthony Jones, which you can obtain at https://www.manning.com/books/ functional-reactive-programming. If you're interested in learning about using RxJS with functional programming, I recommend that you read RxJS in Action (Manning, forthcoming 2017) by Paul Daniels and Luis Atencio, which you can begin reading using the Manning Early Access Program (MEAP) at https://www.manning.com/ books/rxjs-in-action.
Now that you understand observables, let’s use RxJS to handle user input. When you need to interact with and capture events from many different sources, you can easily get into code that’s tangled and hard to read. Consider a simple example of reading and validating an SSN field:
<pre>document.querySelector('#student-ssn')
.addEventListener('change', function (event) {
let value = event.target.value;</pre>
<p className="pag">Page 232</p>
<pre>value = value.replace(/A\s*|\-|\s*$/g, ''); console.log(value.length !== 9 ? 'Invalid' :	'Valid'));
});
//-> 444	Invalid
//-> 444-44-4444 Valid
</pre>
Because the change event happens asynchronously, you’re forced to write all the business logic in a single callback function. As you saw earlier in the chapter, this doesn’t scale if you continue to pile on more event-handling code for every button, field, and link on the page. Your only opportunity for reuse will be to refactor and pull out core logic from the callback. How can you scale this so that your code’s complexity doesn’t grow in proportion to adding more logic?
Just as with asynchronous code, you can’t force functional programming to cooperate nicely with traditional event-based functions—both paradigms are diverse. The same way promises solved the impedance mismatch between functional and asynchronous functions, you need the layer of abstraction provided by Rx.Observable to bridge the world of events to the functional world. This example code that listens for change events fired over time as the user updates a student SSN input field can be modeled as a stream (see figure 8.13).
 
Figure 8.13 Shows the event values for SSN treated as an observable stream created from subscribing to the change event of the student SSN input field
With that in mind, you can refactor the previous imperative event-based code using FRP, which means subscribing to the event and using pure functions to implement all the business logic:
 
<p className="pag">Page 233</p>
This code reuses the same functions from previous chapters, so the value passed in to subscribe is wrapped in an Either containing Right(SSN) on a valid input or Left(null) otherwise. RxJS excels at chaining linear asynchronous data flows to handle events, but that’s not all. It also incorporates promises into its powerful APIs, so you can use one programming model for all things asynchronous. Let’s look at that next.
8.4.3	RxJS and promises
RxJS can convert any Promises/A+-compliant object into an observable sequence. This means you can wrap the long-running getJSON function so that, on resolution, its value will be converted into a stream. Consider the example of showing a sorted list of students who reside in the United States:
You can see that this code retains a lot of what you learned about promises, with a few differences. Notice the centralized error-handling logic in subscribe. If the promise can’t be fulfilled because the web service you’re accessing is down, it propagates the error through and invokes the error-callback printing (this is proper for a monad):
<pre>Error: IO Error</pre>
Otherwise, the list of student objects is sorted (in this case, by first name) and passed in to flatMapLatest, which converts the response object into an observable array of students. Finally, you filter out students not residing in the United States from the stream and print the results. The RxJS toolkit offers many more features, and you’ve only just scratched the surface of what it can do. For more in-depth information, visit https://xgrommx.github.io/rx-book.
In this book, we tackled all different types of challenging JavaScript problems using functional programming; these included processing collections, working with AJAX requests, database calls, handling user events, and others. Now that you’ve explored the theory in detail as well as programs that demonstrate real-world usage of
 
<p className="pag">Page 234</p>
these functional techniques, you grok the essence of thinking functionally and will soon be intuitively applying it.
8.5	Summary
<li className="litag">	Promises provide a functional solution to callback-driven design, which has plagued JavaScript programs for a long time.</li>
<li className="litag">	Promises gives you the ability to chain as well as compose functions “in the future,” abstracting out the low-level intricacies of temporally dependent code.</li>
<li className="litag">	Generators take another approach to asynchronous code by providing programming artifacts, backed by lazy iterators, that allow you to yield for data to be available.</li>
<li className="litag">	Functional reactive programming raises the level of abstraction of your programs so that you can focus on treating events as logically independent units. This lets you focus on your task at hand instead of coping with complex implementation details.</li>
