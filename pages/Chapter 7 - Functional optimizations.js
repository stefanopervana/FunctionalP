<p className="pag">Page 180 - Chapter 7 - Functional optimizations</p>
This chapter covers
<li className="litag">	Indicating where functional code is performant</li>
<li className="litag">	Examining the internals of JavaScript function execution</li>
<li className="litag">	Implications of nesting function contexts and recursion</li>
<li className="litag">	Optimizing function evaluation with lazy evaluation</li>
<li className="litag">	Speeding up program execution with memoization</li>
<li className="litag">	Unwinding recursive calls with tail recursive functions</li>
We should forget about small efficiencies, say about 97% of the time ... premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%.
—Donald Knuth, The Art of Computer Programming

<p className="pag">Page 181</p>
Always optimize last, or so they say. In previous chapters, you learned how to write and test your functional code; and now, nearing the end of this wonderful journey, we look at ways to optimize it. No single programming paradigm is the Holy Grail, and each has its share of trade-offs: performance versus abstraction, for example. Functional programming provides layers of abstractions around your code to achieve its high level of fluency and declarativeness. With all of this internal currying, recursion, and monadic wrapping composed together to solve even the simplest types of problems, you may wonder, “Is functional code as performant as imperative code?”
Its true that with most modern web applications nowadays, excluding games, there’s nothing to be gained from cutting milliseconds of execution time from your programs. Computers have become incredibly fast and compiler technology amaz- ingly smart, which guarantees fast performance of correct code. FP isn’t any less per- formant than imperative code, as you may think; it just shines in different ways.
It’s not wise to begin using a new paradigm without understanding its implications for the environment in which it’s running. So, in this chapter, I’ll explain some aspects of functional JavaScript code that you need to be aware of, especially when processing large amounts of data. I’ll be talking about core JavaScript features, like closures, so make sure you’ve read and understood chapter 2. I’ll also discuss some interesting optimization techniques such as lazy evaluation, memoization, and recur- sive call optimizations.
Functional programming won’t speed up the evaluation times of individual func- tions; rather, its strategy is based on avoiding duplicated function calls and delaying calling code until it’s absolutely needed, which may speed up your application overall. In pure functional languages, these optimizations are built into the platform and can be used without any involvement from you. In JavaScript, though, you’ll need to man- ually plug in these optimizations via custom code or functional libraries. But before we dive in, I’ll briefly show you the challenges of using JavaScript functionally and why these optimizations are important.
7.1	Under the hood of function execution
Because FP relies on evaluating functions for everything you do, when learning about performance and optimizations, it’s important to understand what goes on in each function call. Every function call in JavaScript internally creates a record (a frame) in the function context stack.
NOTE A stack is a basic data structure that contains objects such that insertion and removal follow a last-in first-out (LIFO) approach. Consider the analogy of a pile of dishes stacked one on top of another: all operations on the stack are performed at the top.
The context stack is a component of the JavaScript programming model responsible for managing the execution of a function and the variables it closes over (if you don’t know what this means, please revisit closures in section 2.4). The stack always starts
<p className="pag">Page 182</p>
with the global execution context frame, which contains all global data, as shown in figure 7.1.
Index 1 Information taken from David Shariff s excellent blog post “What Is the Execution Context & Stack in JavaScript?” June 19, 2012, http://mng.bz/mqTu.
 
The global context frame always resides at the bottom of the stack. Each function con- text frame takes up a certain amount of memory depending on the number of local variables contained within it. Without any local variables, an empty frame is approxi- mately 48 bytes. Local variables and parameters like numbers and Booleans require 8 byes each. Intuitively, the more variables the function body declares, the larger the stack frame. Each frame contains roughly the following information:1
 
From this structure, we can extract a few important insights. First, the variable- Object property is what primarily determines the size of the stack frame, because it has references to a function’s arguments, the actual array-like arguments object (cov- ered in chapter 2), as well as any local variables and functions. Second, the function’s scope chain is what links or references this function’s context with its parent execu- tion context (I’ll talk more about the scope chain later). Whether directly or indi- rectly, every function’s scope chain eventually links to the global context.
NOTE A function’s scope chain is different from a JavaScript object’s proto- type chain. Although both behave in similar ways, the latter refers to the link established in object inheritance through the prototype property. The scope chain refers particularly to the access an inner function has to its outer func- tion’s closure.
<p className="pag">Page 183</p>
The behavior of the stack is determined by the following important rules:
<li className="litag">	JavaScript is single-threaded, which means it has synchronous execution.</li>
<li className="litag">	There is one and only one global context (shared among all function contexts).</li>
<li className="litag">	You can have an unlimited number of function contexts (for client-side code, different browsers can impose different limits).</li>
<li className="litag">	Each function call creates a new execution context, even when calling itself recursively.</li>
As you know, functional programming exploits the use of functions to the maximum degree, and you’re encouraged to decompose problems into as many functions as possible as well as curry them for additional flexibility and reuse. But using lots of cur- ried functions has its own implications on the context stack.
7.1.1	Currying and the function context stack
Personally, I am a huge fan of currying. In fact, I’d like for JavaScript to automatically curry all function evaluations. But this additional level of abstraction can cause some context overhead compared to a regular function evaluation. To understand this bet- ter, let’s explore what happens under the hood of a curried function call in JavaScript.
Recall from chapter 4 that when you curry a function, you internally transform its evaluation mechanism from a single-shot call with all parameters, to multiple one-at-a- time inner function executions. In other words, the logger function from chapter 4
const logger = function (appender, layout, name, level, message)
when curried, becomes this nested structure:
<pre>const logger =
function (appender) {
return function (layout) { return function (name) { return function (level) {
return function (message) {
...</pre
A nested structure uses the function stack more heavily than a straight call. First I’ll explain the non-curried execution of logger. Due to JavaScript’s synchronous execu- tion, a call to logger results in pausing execution of the global context to make way for logger to run, becoming the new active context and creating a reference to the global context for purposes of variable resolution. This is shown in figure 7.2.
Internally, the logger function makes calls to other Log4js operations, which create new function contexts that are put on the stack (if you haven’t done so, you can visit the appendix for an introduction to Log4js). Due to closures in JavaScript, the func- tion contexts resulting from inner function calls are stacked one on top of the other, each taking up its fair share of allocated memory and linked via the scopeChain refer- ence (see figure 7.3).
<p className="pag">Page 184</p>
Figure 7.2 When invoking any function, like logger in this case, the single-threaded JavaScript runtime pauses the current global context and activates the context for the new function to run. At this point, a link is created between the global context and the function context, traversable via the scopeChain. Once logger returns, its execution context is popped off the stack, and the global context resumes.
Figure 7.3 How the function context grows when running nested functions. Because each function produces a new stack frame, the stack grows in proportion to the level of nesting in functions. Both currying and recursion rely on nested function calls.
Finally, once the Log4js code completes, it gets popped off the stack; the logger func- tion follows suit, leaving the runtime back in its original state—with only the single global context running (refer back to figure 7.1). This is the magic behind closures in JavaScript.
Although this approach is powerful, deeply nested functions can consume large amounts of memory. In chapter 8, I’ll introduce you to RxJS, a functional library used to handle asynchronous code. The latest release, RxJS 5, is a complete revamp of the code from the previous version with focus on performance; reducing the number of closures was a top priority.
 

 
<p className="pag">Page 185</p>
Figure 7.4 With currying, each parameter of the curried function is internally transformed to a nested call. This flexibility of being able to supply parameters sequentially has the downside of occupying additional stack frames.
Now let’s look at the curried version of the logger function, illustrated in figure 7.4.
Currying all functions might seem like a good idea, but overdoing it can lead to programs that take up larger chunks of stack space and run significantly slower. You can run this simple benchmark program to prove it:
<pre>const add = function (a, b) {
return a + b;
};
const c_add = curry2(add);
const input = _.range(80000);
addAll(input, add); //->511993600000000
addAll(input, c_add); //-> browser halts
function addAll(arr, fn)
 { let result= 0;
for(let i = 0; i < arr.length; i++) 
{ for(let j = 0; j < arr.length; j++) {
result += fn(arr[i], arr[j]);
}
}
return result;
}</pre>
 
<p className="pag">Page 186</p>

This program creates an array of 80,000 numbers and compares the non-curried ver- sion to the curried function. The non-curried version returns the correct result in a few seconds, whereas the curried function causes the browser to halt. Undoubtedly, there’s a price to pay with currying, but having to process such large datasets in most applications is highly unlikely.
This isn’t the only situation that can cause the stack to grow. Inefficient or incor- rect recursive solutions are the leading cases where the stack overflows.
7.1.2	Challenges of recursive code
New function contexts are created even when functions call themselves. An incorrect recursive call—one where the base case is never reached—can easily cause the stack to overflow. Luckily, recursion is one of those cases where it either works or it doesn’t, and when it doesn’t, it’s not shy about letting you know. If you’ve ever had the plea- sure of seeing the dreaded Range Error: Maximum Call Stack Exceeded or too much recursion error, you know what I mean. You can benchmark your browser with this simple script to get an approximate function stack size:
<pre>function increment(i) {
console.log(i);
increment(++i);
}
increment(1);</pre>
Different browsers implement stack errors differently: on my machine, Chrome fires the exception after approximately 17,500 iterations, whereas Firefox will goes much longer, to about 213,000 iterations. Don’t use these numbers as upper bounds below which to write your functions! These are superfluous numbers meant to show you that there are limits you can’t exceed. Your code should be far below these thresholds, or you likely have a bug somewhere in your recursion.
If you happen to deal with an unusually large amount of data using recursion, you may cause the stack to grow proportionally to the size of the array. Consider this exam- ple to find the longest string in an array:
<pre>function longest(str, arr) {
if(R.isEmpty(arr)) {
return str;
else {
let currentStr = R.head(arr).length >= str.length
? R.head(arr): str;
return longest(currentStr, R.tail(arr));
}
}</pre>
<p className="pag">Page 187</p>
Running longest against all 192 countries in the world isn’t a problem, but using it to find the longest city name out of 2.5 million can cause the application to fail; see fig- ure 7.5. (Actually, this particular algorithm won’t fail with large arrays in ES6 Java- Script; more on this later.)
Figure 7.5 The longest function, in order to find the longest string in an array of size n, grows proportionally to the size of the input, inserting n frames into the context stack.
An alternative to keep in mind when traversing lists this way, especially with unusually large arrays, is to resort to using higher-order functions you learned about in chap- ter 3, such as map, filter, and reduce. Using these functions doesn’t generate nested function calls, and the stack size is recycled at each iteration.
Although currying and recursion lead to functions that take up more memory than their otherwise imperative counterparts, think of what you gain in terms of the flexibility and reuse that come with currying, as well as the correctness inherent in recursive solutions. These definitely make the extra memory requirements worth it.
On the bright side, functional programming provides optimizations that other par- adigms don’t. Placing lots of functions on the stack can increase your program’s mem- ory footprint, so why not avoid making some calls altogether?
 
<p className="pag">Page 188</p>
7.2	Deferring execution using lazy evaluation
You can experience many performance benefits when avoiding unnecessary function calls and large inputs when only a subset is sufficient. Functional languages like Haskell have lazy function evaluation built into every function expression. There are dif- ferent types of lazy-evaluation schemes, all with the same goal of delaying the execu- tion of a function as much as possible, or until a dependent expression is called.
But the more mainstream function-evaluation strategy, as used in JavaScript, is eager evaluation. In eager evaluation, an expression is evaluated as soon as it’s bound to a variable, regardless of whether the result of this function is needed; this is also known as greedy evaluation. Consider the sample case of taking a subset of elements from an array, shown in figure 7.6.
Figure 7.6 The composition of the function range (returns a list of numbers from beginning to end) with take (reads the first n elements). In eager evaluation, the range function executes completely, feeding its result to take. With lazy evaluation, the result of range never executes until the dependent operation, take, is called.
As you can see, in the eager-evaluation scheme, the range function is executed first; its result is passed to take, which only requires a subset of the output, discarding the rest. Think of how wasteful this would be if you were generating a larger number of ele- ments. With lazy evaluation, on the other hand, the execution of range is deferred until the dependent operation, take, demands it. Now, with more knowledge about the function’s purpose, the range function only produces the required number of ele- ments. Consider another example involving the Maybe monad:
<pre>Maybe.of(student).getOrElse(createNewStudent());</pre>
 
<p className="pag">Page 189</p>
At a glance, using Maybe may lead you to think this expression behaves like this:
<pre>if(!student) {
return createNewStudent();
}
else {
return student;
}</pre>
But due to JavaScript’s eager-evaluation scheme, this code will execute the create- NewStudent function regardless of whether the student object is null. Under lazy evaluation, the expression would have behaved like the earlier snippet and never called createNewStudent if the student object were invalid. So how can you take advantage of lazy evaluation? This section looks at a couple of tips and tricks:
<li className="litag">	Avoiding needless computations</li>
<li className="litag">	Using shortcut fusion in functional libraries</li>
7.2.1	Avoiding computations with the alternation functional combinator
Not surprisingly, you can do certain things to emulate lazy evaluation and still reap some of the benefits of pure functional languages. In the simplest case, you can avoid a needless computation by passing functions by reference (or by name) and condi- tionally invoking one or the other. In chapter 4, you saw the alt functional combina- tor that takes advantage of the || (OR) operator to evaluate func1 first and only call func2 in the event func1 produces a value of false, null, or undefined. Here it is again, with an example:
Because the functional combinator takes care of orchestrating the calls, this code is equivalent to the imperative conditional logic:
<pre>
var student = findStudent('444-44-4444'); if(student !== nuli) {
append('#student-info', student);
}
else {
append('#student-info', createNewStudent('444-44-4444'));
}</pre>
 
<p className="pag">Page 190</p>
This is a very simple way of avoiding computing functions unnecessarily with far less duplication; I’ll show you a more powerful strategy later in this chapter when we get to memoization. Alternatively, defining the entire program ahead of time, before it’s run, can allow functional libraries to perform an optimization called shortcut fusion.
7.2.2	Taking advantage of shortcut fusion
In chapter 3, you learned about Lodash’s _.chain function, which is used to wrap and execute an entire sequence of functions that you can trigger via the terminating value() function. This not only allows you to separate a program’s description from its execution, but also lets Lodash infer places for optimizations such as consolidating the execution of some functions for more-efficient storage use. Here’s an example that produces a sorted list of people’s country by count:
<pre>_.chain([p1, p2, p3, p4, p5, p6, p7])
.filter(isValid)
.map(_.property('address.country')) .reduce(gatherStats, {})
.values()
.sortBy('count')
.reverse()
.first()
.value()</pre>
This declarative mode of programming means you don’t have to worry about how the functions work, just what needs to be done, by defining what it is you want to accom- plish ahead of time. On some occasions, this allows Lodash to internally optimize the execution of your program using shortcut fusion. It’s a function-level optimization that can merge the execution of some functions into one and condense the number of internal data structures used to compute intermediate results. Creating fewer data structures lowers the excess memory needed when processing large collections.
This is possible due to functional programming’s strict rules about referential transparency, which give it this unique mathematical or algebraic correctness. For instance, the execution compose(map(f), map(g)) can be replaced by the expression map(compose(f, g)) without altering the meaning. Similarly, compose(filter(p1), filter(p2)) equates to filter((x) => p1(x) && p2(x)). This is exactly what happens in the filter and map pair beginning the previous chain. Again, manipulating the sequence of operations in this mathematical way is only possible with pure functions. Let’s go over another example in the following listing to see this clearly.
Listing 7.1 Lodash’s lazy evaluation and shortcut fusion
 
<p className="pag">Page 191</p>
Listing 7.1 has a couple of optimizations: First, the cali to take(3) advises Lodash to only worry about the first three values that pass the mapping and filtering criteria instead of wasting precious cycles on the remaining 195 elements. Second, shortcut fUsion allows the subsequent calls to map and filter to fuse into compose(filter(isEven), map(square)). You can easily proof this by augmenting the square and isEven func- tions with trace logs (using Ramda to effectively compose the tap combinator for log- ging purposes):
<pre>square = R.compose(R.tap(() => trace('Mapping')), square);
isEven= R.compose(R.tap(() => trace('then filtering')), isEven);</pre>
The console will show the following pair of messages repeated five times:
Mapping
then filtering
which confirms the merging of map and filter. Using functional libraries not only simplifies your tests but also improves the runtime of your code. Other functions in Lodash that benefit from shortcut-fusion are _.drop, _.dropRight, _.dropRightWhile, _.dropWhile, _.first, _.initial, _.last, _.pluck, _.reject, _.rest, _.reverse, _.slice, _.takeRight, _.takeRightWhile, _.takeWhile, and _.where.
Along the same lines of avoiding computations until they’re needed is another powerful optimization feature of functional programs called memoization.
7.3 Implementing a call-when-needed strategy
One way to speed up the execution of applications is to avoid computing repetitive values, especially when these computations are expensive. In traditional object-ori- ented systems, this is accomplished by placing a cache or proxy layer that’s checked before a function is called. Upon return, the result of the function is given a key that references it uniquely, and this key-value pair is persisted in the cache. A cache is an intermediary repository, or memory, that’s queried before an expensive operation. In web applications, it’s used for images, documents, compiled code, HTML pages, query results, and so on. Consider this code snippet that implements a simple caching layer for any function:
 

 
<p className="pag">Page 192</p>
var cache = {};
cachedFn(cache, findStudent, '444-44-4444'); cachedFn(cache, findStudent, '444-44-4444');
This cachedFn function acts as a proxy between the function execution and its result to ensure that the same function isn’t invoked twice. But writing code with this wrap- per to serve every function cali in your code is tedious and makes it hard to read. What’s even worse is that this function has a side effect because it depends on a glob- ally shared cache object. What we need is a ubiquitous solution that lets us enjoy the benefits of caching while keeping our code and tests agnostic to this mechanism. In functional languages, this mechanism is called memoization.
7.3.1	Understanding memoization
The caching scheme behind memoization, similar to the previous code, makes use of the function’s arguments to create a unique key with which to store the function’s result, so that on subsequent invocations of the function with the same arguments, the stored result can be returned immediately. Relating the function’s result with its input, or shall we say, equating the computation of a function’s input to a value, is achieved due to a certain functional principle. You guessed it: referential transpar- ency. First, let’s study the benefits of memoization with a simple function call.
7.3.2	Memoizing computationally intensive functions
Pure functional languages implement memoization automatically; others, like Java- Script and Python, give you the option to choose when to memoize a function. Natu- rally, functions that are computationally intensive can benefit from interlacing a caching layer. Consider the example of computing a rot13 function, which encodes strings into ROT13 format (rotation of the 26 ASCII characters of the alphabet by 13 positions). Although this is a weak algorithm, it’s practical in web applications for hid- ing puzzle solutions and discount codes, muddling offensive material, and so on:
<pre>var discountCode = 'functional_js_50_off';
rot13(discountCode); //-> shapgvbany_wf_50_bss</pre>
 
<p className="pag">Page 193</p>
Here are the details of the ROT13 algorithm:
<pre>var rot13 = s =>
s.replace(/[a-zA-Z]/g, c =>
String.fromCharCode((c <= 'Z'	? 90 : 122)
>= (c = c.charCodeAt(0) + 13)	? c : c - 26));
(c = c.charCodeAt(0) + 13)	? c : c - 26);
});
};</pre>
Understanding it isn’t relevant to this discussion; the important thing to know is that the computed message is always the same for the same input string (a referentially transparent function), which means you can gain extraordinary performance benefits by memoizing it. Before I show you the code for the memoize function, I want to show that you can apply it in two ways:
<li className="litag">	By invoking a method on a function object:</li>
<pre>var rot13 = rot13.memoize();</pre>
<li className="litag">	By wrapping the function definition shown earlier:</li>
<pre>var rot13 = (s =>
s.replace(/[a-zA-Z]/g, c =>
String.fromCharCode((c <= 'Z'	? 90 : 122)
>= (c = c.charCodeAt(0) + 13) ? c : c - 26))).memoize();</pre>
With memoization, you expect a subsequent call of a function with the same input to trigger the internal cache hit and return immediately. To illustrate this, let’s use JavaScript’s High Resolution Time API (also known as Performance API) to produce more-accurate timestamps than traditional JavaScript functions like Date.now() and console.time(), and measure the elapsed time of a function call. You’ll use the IO monad to inject time-capturing statements before and after the function under test. The entire program involves creating simple start and end functions that wrap the side effects in performance.now(), and tapping a simple function used to run the function under test. The following listing shows the time-measuring code; I’ll omit it in later examples to make the programs shorter.
Listing 7.2 Using tap to add performance timing calls
 
<p className="pag">Page 194</p>
As you can see, the second cali to rot13 on the same string returns in a blink of an eye. Although JavaScript has no built-in automatic memoization, you can add it to the language by augmenting the Function object as shown next.
Listing 7.3 Adding memoization to function calls
By extending the Function object, this implementation makes memoization ubiqui- tous and also removes any observable side effects of accessing a globally shared cache. In addition, abstracting the function’s internal caching mechanism makes it com- pletely test-agnostic, which means you aren’t responsible for sprinkling caching state- ments all over your code or for testing the caching functionality; you only worry about what the function is supposed to do.
 

 
<p className="pag">Page 195</p>
To get a clearer picture, look at the detailed sequence diagram of the memoization of rot13 in figure 7.7. The first call to the memoized function results in a cache miss and the ROT13 message being computed. On completion, the result of the computa- tion is stored with a key generated from the input arguments so that the result can be reused and skip all computations on the next invocation.
Figure 7.7 A detailed view of two calls to the rot13 function with the message “functionaljs_50_off.” The first time around, with an empty cache, the ROT13 code of the provided discount code is computed. This result is stored in the internal cache with a key generated from this input. The second call results in a cache hit: the value is directly returned without the hash being computed again.
NOTE The examples in this book memoize functions of one argument. But how would you handle functions of multiple arguments? I won’t cover this, and instead leave it to you as an exercise to research, but there are two strate- gies you can follow: you can create a multidimensional cache (an array of arrays), or you can create a unique key by combining the string representa- tion of the arguments.
If you closer at the code in listing 7.3, you’ll notice that memoization is limited to unary functions. I did it this way to simplify the key-generation step in the caching logic. If you need to memoize functions that take multiple arguments, the logic for formulating a proper cache key can get complicated and expensive. In some cases, though, currying can help you work around this issue.
 
<p className="pag">Page 196</p>
7.3.3	Taking advantage of currying and memoization
More-complex functions, or functions involving multiple arguments, are harder to cache, even if they’re pure. This is due to the increased complexity in generating a proper key value—an operation that needs to be simple and quick in order to avoid incurring additional overhead in the caching layer. One way to mitigate this is through currying. Recall from chapter 4 that currying is used to transform a multivar- iate function into a unary function. Currying allows you to memoize a function like safeFindObject through findStudent:
This works because the DB object is used only for data access and doesn’t contribute to uniquely distinguishing the purpose of findStudent, which is to find a student by a unique ID. The emphasis on making functions unary is not only to make them easier to work with and compose, but also so that memoization can take advantage of finer- grained decomposition and implement caching across the components that make up the entire program. Let’s discuss this next.
7.3.4	Decomposing to maximize memoization
The relationship of memoization and decomposition can be understood with a simple chemical analogy that will take you on a stroll down memory lane (bear with me!). You may have learned in high school chemistry, when studying the principles of solu- bilità that a solution is composed of a solute and a solvent. A solute is the substance that dissolves in the solvent. The rate of solution, which is how quickly a solute dis- solves, is determined by many factors, one of which is surface area. For instance, if you prepare two solutions of sugar and water, one with powdered sugar and the other with chunks of sugar, which one dissolves faster? When sugar dissolves, only its surface comes in contact with the water. Therefore, the greater the surface area of the solute, the faster it dissolves.
This same analogy can be applied to breaking up problems into tiny, memoizable functions. The more fine-grained your code is, the greater the benefits obtained via memoization will be. Each and every function’s internal caching mechanism is playing a role in speeding up evaluation of your programs—there’s more surface contact, if you will.
In the case of showStudent, for example, if you’ve previously validated certain inputs, why bother to validate them again? Similarly, if you’ve fetched student objects by SSN from a local store, with cookies, or even via a server-side call, and you don’t
 
<p className="pag">Page 197</p>
expect them to have changed, why waste precious time doing the lookup again? What’s remarkable is that in the case of findStudent, memoization can serve as a small query cache, retaining already-fetched objects for quick access. Memoization puts the icing on the cake in terms of reasoning about functions as just values—lazily computed values. To illustrate, let’s replace some of the functions in showStudent with their memoized counterparts (just for illustration purposes, the memoized func- tions are prefixed with m_—this isn’t a general convention):
<pre>const m_cleanInput = cleanInput.memoize();
const m_checkLengthSsn = checkLengthSsn.memoize();
const m_findStudent = findStudent.memoize();
const showStudent = R.compose(
map(append('#student-info')),
liftIO,
chain(csv),
map(R.props(['ssn', 'firstname', 'lastname'])),
map(m_findStudent),
map(m_checkLengthSsn),
lift(m_cleanInput));
showStudent('444-44-4444').run(); //-> 9.2 ms on average (no memoization)
showStudent('444-44-4444').run(); //-> 2.5 ms on average (with memoization)</pre>
Because this function is decomposed into smaller tasks, the speed improvements are compounded, creating a program that runs 75% faster the second time around!
Recursion is another type of decomposition, where a program is split into self- similar smaller tasks—memoizable, self-similar subtasks. Likewise, memoization can turn a slow-performing recursive algorithm into a really fast one.
7.3.5	Applying memoization to recursive calls
Recursion can cause a browser to grind to a halt or throw nasty exceptions. This tends to happen when the stack grows out of control, such as when processing very large input. In some cases, memoization can help mitigate the issue. As you learned in chapter 3, recursion is a mechanism of decomposing a task into smaller versions of itself. Typically, a recursive call solves “the same problem,” or a subset of the big- ger problem, many times until it reaches the base case, which finally causes the stack to unwind and the result to be returned. If you could cache the results of the subtasks, you could improve the performance of invoking this same function on bigger input.
To illustrate, you’ll use a simple function that computes the factorial of a number n. The factorial of n (denoted n!) is the product of all positive integers less than or equal to n:
<pre>n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1</pre>
<p className="pag">Page 198</p>
For example:
The program for this task can be nicely expressed as a memoized recursive solution:
Because memoization uses the mathematical principles of factorials, you obtain remarkable throughput in the second iteration of the function. In the second run, the function “remembers” to use the formula 101! = 101 x 100! and can reuse the value of factorial(100), causing the entire algorithm to short-circuit and return instantly. This has other benefits in terms of stack frame management and avoiding stack pollu- tion; see figure 7.8.
Figure 7.8 Running the memoized factorial(100) the first time creates 100 stack frames because it needs to compute 100! by multiplying every single number. On the second call to factorial with 101, via memoization it’s able to reuse the result of factorial(100) and create only 2 stack frames.
 

 

 
<p className="pag">Page 199</p>
As you can see, the first run of factorial(100) runs through the entire algorithm, creating 100 frames on the function stack. This is the downfall of some recursive Solu- tions: they tend to be careless with stack space, especially in cases such as factorial that use frames proportional to the input received. But with memoization, you can sig- nificanti reduce the number of stack frames required to compute the next number.
Memoization isn’t the only method to optimize recursive calls. There are other ways to benefit performance by using compiler-level instrumentation.
7.4	Recursion and tail-call optimization (TCO)
All along, you’ve seen that programs with recursion use the stack much more heavily than ones that don’t. Some functional languages don’t even have built-in looping mechanisms and rely on recursion and memoization to implement efficient iteration. But there are cases where even memoization won’t help much, such as when the nature of the input to the functions is always changing; then, nothing is gained from having an internal caching layer. Can recursion be optimized to run as efficienti as standard loops? It turns out that you can write recursive algorithms in such a way that compilers help you achieve this with tail-call optimization (TCO). In this section, you’ll learn that this recursive factorial function
which is slightly different than the previous one because it places the recursive step in tail position, runs as fast as the imperative version:
<pre>var factorial = function (n)	{
let result = 1; for(let x = n; x > 1; x--)	{
result * = x;
}
return result;
}</pre>
TCO, also known as tail-call elimination, is a compiler enhancement added to ES6 that flattens the execution of a recursive call into a single frame. But this can only occur when the last act of the recursive solution is to invoke another function (typically itself); this last invocation is said to be in tail position (hence the name).
Why is this an optimization? Having a function call as the last thing to run in a recursive function allows the JavaScript runtime to realize it doesn’t need to hold on to the current stack frame any longer, because it doesn’t have any more work to do; so it discards the stack frame. In most cases, you achieve this by transferring all the neces- sary state from one function context to the next as part of the function’s arguments (as you saw in the recursive factorial function). This way, the recursive iteration tends to happen with a new frame every time, recycled from the previous one, instead of
 
<p className="pag">Page 200</p>
frames stacked one after the other. Because factorial is in tail form, the execution of factorial(4) goes from the typical recursive pyramid of calls
<pre>factorial(4)
4 * factorial(3)
4 * 3 * factorial(2)
4 * 3 * 2 * factorial(l)
4 * 3 * 2 * 1 * factorial(0)
4 * 3 * 2 * 1 * 1
4 * 3 * 2 * 1
4 * 3 * 2
4 * 6
return 24</pre>
to the following flat structure, as shown in figure 7.9, with respect to the context stack:
<pre>factorial(4)
factorial(3, 4)
factorial(2, 12)
factorial(1, 24)
factorial(0, 24)
return 24
return 24</pre>
As you can see, this flatter structure makes more efficient use of the stack, which no longer needs to unwind n frames. Let’s step through the process of converting the non-tail factorial function into the tail-recursive function.
Figure 7.9 A detailed view of tail-recursive factorial(4) evaluation. As you can see, the function uses a single frame. TCO is in charge of throwing the current function frame to give way for a new one, as if factorial was being evaluated in a loop.
 
<p className="pag">Page 201</p>
7.4.1	Converting non-tail calls to tail calls
Let’s optimize factorial to take advantage of JavaScript’s TCO mechanism. The recursive implementation of factorial that you started with
<pre>const factorial = (n) =>
(n === 1) ? 1
:  (n * factorial(n - 1));</pre>
wasn’t in tail position because the last return expression multiplies a number times the value of the recursive step: n * factorial(n - 1). Remember that for TCO to occur, the last step needs to be the recursive step, which is what allows the runtime to convert factorial into a loop. You’ll do this in two steps:
1	Move the multiplication as an additional parameter to the function, to keep track of the current multiplication.
2	Use ES6 default parameters to preset a default value for this argument (you could also partially apply them, but with default arguments it will look much cleaner):
<pre>const factorial = (n, current = 1) =>
(n === 1) ? current :
factorial(n - 1, n * current);</pre>
Now this factorial function will run as if it were implemented with standard looping, with no additional stack frames created, while still preserving some of the declara- tive and mathematical feel it originally had. This transformation takes place because a tail-recursive function shares common features with a standard loop, as shown in figure 7.10.
Figure 7.10 The similarities between a standard loop (left) and its equivalent tail-recursive function. In both code samples, you can easily see the base case, the afterthought or accumulated parameter, and the result.
 
<p className="pag">Page 202</p>
Let’s examine another example. In chapter 3, you saw a small recursive solution to sum up all the elements in an array:
<pre>function sum(arr) {
if(_.isEmpty(arr)) { return 0;
}
return _.first(arr) + sum(_.rest(arr));
}</pre>
Again, you can see that the last action this function performs, _.first(arr) + sum(_.rest(arr)), isn’t in tail form. Let’s refactor this code and optimize it for mem- ory consumption. Again, any data that needs to be shared with subsequent invocations is now added as part of the function arguments:
<pre>function sum(arr, acc = 0)	{
if(_.isEmpty(arr)) { return 0;
}
return sum(_.rest(arr), acc + _.first(arr));
}</pre>
Tail recursion brings the performance of a recursive loop closer to that of a manual loop. So in languages that have it, as ES6 JavaScript does, it can be used as a replace- ment for manual loops when performance is of upmost priority, while keeping the correctness of the algorithm and controlling mutations. But tail calls aren’t limited to recursion. They can be used with any function whose last action is to invoke another function, which tends to happen quite a bit in JavaScript applications. The caveat when using TCO, however, is that this new JavaScript standard, which began to be drafted with ES4, is not yet widely adopted by browsers. In fact, as of this writing, none of the browsers have TCO natively implemented, which is why I’ve been using the Babel transpiler.
Emulating tail-recursive calls in ES5
The current mainstream JavaScript implementation, ES5, doesn't have support for tail-call optimization. This was added to the language with the ES6 proposal known as proper tail calls (section 14.6 of the ECMA-262 specification). Recall from chapter 2 that the examples work due to the use of the Babel transpiler, a source-to-source compiler, which is an excellent way to test out the future features of the language.
But you can work around this through a process called trampolining. Trampolining is a way to simulate tail recursion in an iterative way, which is ideal for controlling func- tion stack growth in stack-based languages like JavaScript.
A trampoline is a function combinator that takes another function as input and invokes it repeatedly (or bounces a function, if you will) until a certain condition occurs. The function that bounces or repeats is encapsulated in a structure called a
<p className="pag">Page 203</p>
thunk. A thunk is nothing more than a function wrapper used to assist a cali to another function. In the context of functional JavaScript, thunks lazily wrap an argu- ment expression in an anonymous function that has no parameters of its own, delay- ing its evaluation until a receiving function invokes the anonymous function.
The topics of trampolining and thunks are outside of the scope of this book, so if you're desperately seeking to optimize your recursive functions now, I recommend you begin your research here.
To check for the compatibility of TCO and other ES6 features, you can check out the following website: https://kangax.github.io/compat-table/es6/.
If you’re writing a tight graphics-rendering loop or you need to process large datasets in a short time, then performance becomes a key requirement. In these cases, you’re ready to make the necessary trade-offs, and you aren’t looking to write elegant, exten- sible code—you need to get the job done fast. For this, I recommend sticking to stan- dard loops. But for most application needs, functional programming remains a very performant way to write code. Always optimize last; and, in certain edge cases that require extra milliseconds of performance, you can always use any of the performance enhancements provided in this chapter.
Every software decision has an equal opposing force; but for most applications, sac- rificing efficiency in favor of maintainability is a valid trade-off, in my opinion. I’d much rather write code that is easy to read and debug, even if it’s not the fastest. As Knuth said, “In 97% of the code you write, a few extra milliseconds make no differ- ence, especially compared to the value of writing maintainable code.”
Functional programming is a complete paradigm. It provides a rich level of abstraction and redirection while crafting interesting ways to make it efficient. Until now, you’ve learned how to create functional programs with linear data flows through chaining or composition. But as you’re well aware, JavaScript programs mix in lots of nonlinear or asynchronous behavior, such as when handling user input or making remote HTTP requests. In chapter 8, you’ll take on these challenges and learn about reactive programming, a paradigm built on the principles of functional programming.
7.5	Summary
<li className="litag">	In certain cases, functional code can be slower or consume more memory than its equivalent imperative counterpart.</li>
<li className="litag">	You can implement a deferred strategy using lazy evaluation by taking advan- tage of the alternation combinator and the support provided in functional libraries like Lodash.</li>
<li className="litag">	Memoization, an internal function-level caching strategy, can be used to avoid duplicating the evaluation of potentially expensive functions.</li>
<p className="pag">Page 204</p>
<li className="litag">	Decomposing programs into simple functions can not only create extensible code, but also make it more efficient via memoization.</li>
<li className="litag">	Decomposition also extends into recursion as a method to solve a problem in terms of self-similar simpler problems, fully utilizing memoization to optimize the use of the context stack.</li>
<li className="litag">	Converting functions to tail-recursive form allows you to take advantage of a compiler enhancement known as tail-call elimination.</li>



