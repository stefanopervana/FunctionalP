Page 235 - 

Chapter appendix
JavaScript libraries used in this book
Functional JavaScript libraries
Because JavaScript isn’t a pure functional language, you have to rely on the help of third-party libraries that you can load into your project to emulate features, such as currying, composition, memoization, lazy evaluation, immutability, and so on, that are core in purer functional languages like Haskell. The libraries eliminate the need for you to implement the features yourself, so that you can focus on writing your business logic functions and delegate the orchestration of this code to these libraries. This section lists the functional libraries used throughout this book. These libraries are designed to do the following:
■	Fill in any gaps of standard JavaScript environments by providing additional language constructs and high-level utility functions that encourage you to write code using simple functions
■	When using JavaScript on the client, ensure that the functionality is consis- tent across browser vendors
■	Abstract out the internals of functional programming techniques like curry- ing, composition, partial evaluation, lazy evaluation, and others in a consis- tent manner
For each library, I’ll include installation instructions for both browser and server (Node.js) environments.
Lodash
This utility library is a fork of Underscore.js (http://underscorejs.org/), which has been widely adopted by functional JavaScript programmers in the past, and it’s a

Page 236
dependency in important JavaScript frameworks like Backbone.js. Lodash continues to track the Underscore APIs closely, but it’s been completely rewritten under the hood to include additional performance enhancements. This book uses Lodash mainly to construct modular function chains.
■	Versioni 3.10.1
■	Home page: https://lodash.com/
■	Installation:
-	Browser: <script src="lodash.js"></script
-	Node: $npm i --save lodash
Ramda
This utility library is designed specifically for functional programming, which facili- tates the creation of function pipelines. All of Ramda’s functions are immutable and side effect-free. In addition, all the functions have automatic currying, and its param- eters are arranged to be convenient for currying and composition. Ramda also con- tains property lenses, which are used in this book to read/write the properties of objects in an immutable manner.
■	Version: 0.18.0
■	Home page: http://ramdajs.com/
■	Installation:
-	Browser: <script src="ramda.js"></script>
-	Node: $npm install ramda
RxJS
The Reactive Extensions for JavaScript implement a paradigm known as reactive pro- gramming, which combines the best ideas of the observer pattern, iterator pattern, and functional programming to yield a library that facilitates writing asynchronous and event-based programs.
■	Version: 4.0.7
■	Parent project home page: http://reactivex.io/
■	Home page: https://github.com/Reactive-Extensions/RxJS
■	Installation:
-	Browser: Download the needed packages from any JavaScript repository such as wwwjsdelivr.com/?query=rxjs. These are the necessary packages for this book: rx-async, rx-dom, and rx-binding.
-	Node: $npm install rx-node
Page 237
Other libraries used
This book also uses nonfunctional libraries to take care of some additional aspects of software development like logging, testing, and static code analysis.
Log4js
Log4JavaScript is a client-side logging framework that follows the same “Log4X” design of packages as other languages, such as Log4j (Java), log4php (PHP), and oth- ers. This library is commonly used for enterprise-level logging, which is much more powerful than the typical console.log.
■	Version: 1.0.0
■	Home page: http://stritti.github.io/log4js/
■	Installation:
-	Browser: <script src="log4.js"></script>
-	Node: $npm instali log4js
QUnit
QUnit is a powerful, slim, easy-to-use JavaScript unit testing framework. It’s used by popular projects such as jQuery and is capable of testing any generic JavaScript code.
■	Version: 1.20.0
■	Home page: https://qunitjs.com/
■	Installation:
-	Browser: <script src="qunit-1.20.0.js"></script>
-	Node: $npm install --save-dev qunitjs
Sinon
Sinon.JS is a stub and mocking framework for JavaScript. In this book, it’s used in conjunction with QUnit to augment the testing environment with a mocking context and API.
■	Version: 1.17.2
■	Home page: http://sinonjs.org/
■	Installation:
-	Browser: <script src="sinon-1.17.2.js"></script> <script src="sinon-qunit-1.0.0.js"></script>
-	Node: $npm install sinon $npm install sinon-qunit
Blanket
Blanket.js is a code-coverage tool for JavaScript. It’s designed to complement your existing JavaScript unit tests (QUnit tests) with additional code-coverage statistics.
Page 238
Code coverage measures the percentage of lines that execute through your code in a single pass of a unit test. It works in three phases:
1	Loads your source files
2	Instruments the code by adding tracking lines
3	Connects the hooks in the test runner to output coverage details
■	Version: 1.1.5
■	Home page: http://blanketjs.org/
■	Installation:
-	Browser: <script src="blanket.js"></script>
-	Node: $npm instali blanket
JSCheck
JSCheck is a specification-driven (property-based) testing library for JavaScript written by Douglas Crockford and inspired by Haskell’s QuickCheck project. From the descrip- tion of the properties of a function, it generates random test cases that attempt to prove those properties.
■	Home page: www.jscheck.org/
■	Installation:
-	Browser: <script src="jscheck.js"></script>
-	Node: $npm instali jscheck
Page 239 - Chapter index
Symbols
() operator 39
@@iterator property 229
+ (plus) operator 59
|| (OR) operator 189
A
abstracting loops 8
abstraction 26
acceptance tests 154
accumulator parameter 66
action function 41, 215
ad hoc types 90
additionalVars function 46-47
address property 127, 134
address variable 48
address.city property 67
address.zip property 38
addToDom function 6
AJAX request 213
alternation (OR-combinator) 113-114
alternation functional combinator 189-190
amount variable 46
append function 39, 82, 109
applyOperation function 40
arguments object 93, 182
arity 88-92
array comprehension 70
array extras 62
ArrayList class 60
Array.map() function 8
Array.prototype.map 82
Array.reverse() function 64
Array.sort() function 15, 40
arrow functions 8
arrows 105
ASCII characters 192
asterisk character 224
asynchronous applications, reacting to complexity of 19-21
asynchronous behavior 211
asynchronous events and data 205-234
challenges of asynchronous code 206-213
creating temporal depen- dencies among functions 207-208
falling into callback pyramid 208-210
using continuation-passing style 210-213
lazy data generation 224-229
generators and recursion 226-228
iterator protocol 228-229
promises and 214-224
composing synchronous and asynchronous behavior 221-224
future method chains 216-221
RxJS and 233
RxJS (Reactive Extensions for JavaScript) 229-234
data as observable sequences 229-230
functional and reactive programming 230-233
promises and 233
asynchronous server-side calls 52
automatic currying 236
B
base cases 77
base variable 46
bind function 101, 130
binding, into delayed functions 101-102
Blanket library 172-173, 237-238
blocked-scope variables, emulating 52-53
Boolean values 86
C
cache 191
cachedFn function 192
call-by-need behavior 19
call-when-needed strategy, implementing 191-199
call() method 39
callback hell 210
callback pyramid 208-210
callbacks 215
catch block 49, 119, 122
CC (cyclomatic complexity) 177-178
chain function 73, 146-147, 190

Page 240
chaining
functions 60-70
gathering resuits with _.reduce 65-68
lambda expressions 61-62
removing unwanted ele- menti with _.filter 68-70
transforming data with _.map 62-64
methods 59-60
change event 232
changeToStartCase function 143
checkLengthSsn function 107, 162, 169
checkType function 94
Christmas tree of doom 210
classical inheritance 25
cleanInput function 107, 162
closures, practical applications of 50-53
emulating blocked-scope variables 52-53
emulating private variables 50-52
making asynchronous server- side calls 52
code coverage, measuring effec- tiveness through 172-179
measuring complexity of functional code 177
measuring effectiveness of testing functional code 173-177
code examples 29
code-coverage tool 237
CollegeStudent object 25
commutative 158
comparator function 40
compatible functions 88-92
arity and 89-92
type-compatible functions 88-89
complex widgets 102
complexity of functional code, measuring 177
compose function 17, 160
composition 17
computeAverageGrade function 160, 168-169
conjunctive operation 107
connected black-box operations 59
console widget 102
consoleLog function 99
console.time() function 193
const keyword 32
context stack 181, 211
continuation-passing style. See CPS
control flow
managing with functional combinators 112-116
alternation (OR- combinator) 113-114
fork (join) combinator 115-116
identity (I-combinator) 112
sequence (S-combinator) 114-115
tap (K-combinator) 113
overview 58-59
coordinate object 34
coordinate.translate() function 36
copy-on-write strategy 37
CopyOnWriteArrayList class 60
count function 104
counter variable 9, 14, 157
countWords function 104
CPS (continuation-passing style) 210-213
createNewStudent function 189
csv function 162
current continuations 211
curried function evaluation 92-98
emulating function factories 95-97
implementing reusable func- tion templates 97-98
curry function 160 curry2 function 95 currying 12
function context stack and 183-186
memorization and 196
cyclomatic complexity. See CC
D
data
functions as 75-76
transforming 62-64
data structures, recursively defined 79
data-covered attribute 173
data-structure reuse 74
Date.now() function 9, 193
DB object 164, 196
db variable 11
declarative function chains 71-74
declarative, functional program- ming as 7-9
decodeURIComponent function 140
decomposition of complex tasks 16-18
Deferred object 217
delayed functions, binding into 101-102
dependencies, temporal 207-208
derived type 25
destructured assignment 92
done property 228
DoublyLinkedList class 60
doWork() function 48
_.drop function 191
_.dropRight function 191
_.dropRightWhile function 191
_.dropWhile function 191
duck typing 88 dummy methods 164
E
echo function 6
ECMAScript 24
effectiveness, measuring through code coverage 172-179
measuring complexity of func- tional code 177
measuring effectiveness of testing functional code 173-177
Either monad overview 162-164
recovering from failure using 137-141
Either.Left structure 140
Either.Left type 164
Either.Right type 164
elementId variable 11
elements, removing unwanted 68-70
Employee object 25
Empty container 129
empty frames 182
emulating
blocked-scope variables 52-53
private variables 50-52
Page 241
encapsulated types 112
equational correctness 13
error callbacks 209, 217
error-handling 118-121
problems with null- checking 121
reasons not to throw exceptions 119-120
with monads 132-141
consolidating null checks with Maybe 132-137
recovering from failure with Either 137-141
with try-catch 118-119
ES6 lambda expression 9
exception-handling blocks 120
explode function 104
expressions 8, 38
external dependencies, mocking 158, 164-166
externally visible side effects 10
extracting data 112
F
f function 89, 93
factorial function 200
factorial(4) function 200
factorial(100) function 199
factory method pattern 96
fadeIn function 127
failure, recovering from using Either monad 137-141
Fantasy Land 141
fat-arrow functions 61
filter function 86, 126, 231
_.filter functional style 68-70
filters pattern 88
final keyword 32
find function 13, 222
findObject function 119
findStudent function 109, 119, 127, 164, 196-197
findStudent(ssn) function 95
findStudentAsync 223
findStudentsBy function 31
_.first function 78, 191
first-class citizens, functions as 39-40
flags failures 171
flatMap function 130
flatMapLatest 233
fluent chains, processing data using 18-19
fmap function 124-125, 130
fn parameter 66
Folktale 141
for loops 60
forEach function 52
fork (join) combinator 115-116
fork function 161
for...of loop 225-226
FP (functional programming) as declarative 7-9
benefits of 16-22
encouraging decomposi- tion of complex tasks 16-18
processing data using fluent chains 18-19
reacting to complexity of asynchronous applications 19-21
importance of 5 overview of 5-7
preserving immutable data 15-16
pure functions and 9-13
referential transparency and substitutability 13-15
vs. object-oriented
programming 24-38
deep-freezing moving parts 34-37
managing state of JavaScript objects 31-32
navigating and modifying object graphs with lenses 37-38 treating objects as values 32-34
FRP (functional reactive programming) 21, 231
fulfilled promise 214 fullname() function 26-27
func1 parameter 66
func2 parameter 66
function context stack, currying and 183-186
function interfaces 95
function keyword 51
function lifting 136
Function object 194 function pipelines 87-88
composing 102-112
coping with pure and impure code 109-110
point-free programming and 111-112 separating description from evaluation 104-107 with functional libraries 107-109 with HTML widgets 102-104
vs. method chains 85-88 function scope 48-49 function stack 211 function templates 95 Function type 39 functional awareness 16 functional combinators
112-116
alternation (OR-combinator)
113-	114
fork (join) combinator
115-116
identity (I-combinator) 112
sequence (S-combinator)
114-	115
tap (K-combinator) 113 functional optimizations 181-203
call-when-needed strategy, implementing 191 -199
execution of functions 181 -187
challenges of recursive code 186-187 currying and function context stack 183-186 deferring using lazy evaluation 188-191
memorization
applying to recursive calls 197-199 currying and 196 decomposing to maximize 196-197 memoizing computation- ally intensive functions 192-195 overview 192
recursion and tail-call optimization 199-203
functional programming. See FP functional reactive program- ming. See FRP functional references 37
Page 242

functions
as data 75-76 as first-class citizens 39-40 chaining 60-70 gathering results with _.reduce 65-68 lambda expressions 61-62 removing unwanted ele- menti with _.filter 68-70 transforming data with _.map 62-64 compatible 88-92 arity and 89-92 type-compatible functions 88-89 creating temporal dependen- cies among 207-208 curried function
evaluation 92-98 emulating function factories 95-97 implementing reusable function templates 97-98
delayed, binding into 101-102
function methods 44 higher-order functions 40-42 types of function invocation 43 See also functional optimiza- tions
functions as data 76 functors 124-127 Future object 214
G
g function 89 generator function 224 Generator object 228 generators, recursion and 226-228
getAddress function 127 getCountry function 121, 135 getJSON function 52, 207, 212, 217, 233
$.getJSON operation 217 getOrElse function 135, 140 global context frame 182 global function 43 global scope, problems with 47 global variables 46-47 greedy evaluation 188 _.groupBy function 67
H
h1 function 6 half function 129 Haskell library 85, 167 head function 108 heterogeneous arrays 90 High Resolution Time API 193 higher-order function 18 HTML widgets, composing function pipelines using 102-104
I
I-combinator 112 identity (I-combinator) 112 identity function 123, 126, 131, 149
if-else blocks 175, 177 if-else conditions 19, 68, 114, 215
IIFE (immediately invoked func- tion expression) 51 immutability 3-4, 9, 21 immutable data, preserving 15-16
imperative code 72 imperative programming 7-8,
71
impure code
overview 109-110 separating pure from with monadic isolation 161-164
increment() function 10, 13, 124, 157, 159, 163 IndexedDB 221 _.initial function 191 inner function 48 innerVar variable 47 input type 86 integration tests 154-155 inversion of control 208 IO monad 142, 149, 162, 218-220
isEmpty function 86 isEven function 191 _.isNull function 68 isolation 155
_.isUndefined function 68 isValid function 90 isValidSsn function 107 iterator protocol 224, 228-229, 236
J
JavaScript
libraries 235-238 Blanket 237-238 JSCheck 238 Lodash 235-236 Log4js 237 QUnit 237 Ramda 236 RxJS 236 Sinon 237 reasons for using 24 join (fork) combinator
115-116
join function 115, 130-131 jQuery object 18 JSC.array 168 JSCheck library 167, 169, 238
JSCheck.check 168 JSCheck.test 168 JSC.integer 171 JSC.integer(20) 168 JSC.number(90, 100) 169 JSC.on_fail 171 JSC.on_pass 171 JSC.SSN 171 Just(value) function 132
K
K-combinator 113
L
lambda expressions 8, 20, 22, 61-62
_.last function 191 last-in first-out. See LIFO lastname() method 37 lazy data generation 224-229
generators and recursion 226-228
iterator protocol
228-229
lazy evaluated programs 19 lazy evaluation, deferring using 188-191 lazy function chains 71-74 lazy values 143 length property 39 let keyword 212 lexical scope 45, 94

Page 243
libraries, JavaScript 235-238 Blanket 237-238 JSCheck 238 Lodash 235-236 Log4js 237 QUnit 237 Ramda 236 RxJS 236 Sinon 237
LIFO (last-in first-out) 181 LinkedList class 60 list comprehension 70 List interface 60 list processing 62 local variables 182 location transparency 219 Lodash library 235-236 Lodash wrapper object 86 Lodashjs library 62 Log4js library 97, 237 logger function 97, 183-185 long-running operation 214 longest function 187 loop counter 50
M
map function 86, 126, 130, 147, 231
_.map functional style 62-64 map functor 215 Maybe function 214 Maybe monad
consolidating null checks using 132-137 overview 162 Maybe.fromNullable 135 Maybe.Nothing structure 140 memoize function 193 memorization 190-191 applying to recursive calls 197-199
currying and 196 decomposing to maximize 196-197
memoizing computationally intensive functions 192-195 overview 192 meta-functions 44 method cascading 59, 81 method chains chaining methods together 86-87 vs. function pipelines 85-88
method fusion 74 methods, chaining 59-60 mixins 75-76 mock objects 164 modularity 16-17, 20, 22 Module pattern 51 monadic chains and compositions 144 monadic type 130 monads 107, 126
error handling with 132-141 consolidating null checks with Maybe 132-137
recovering from failure with Either 137-141 interacting with external resources using IO monad 141-144 overview 127-132 separating pure from impure with monadic isolation 161-164
multiargument functions 98 MyModule object 51 myVar variable 49
N
name property 39 name-resolution order 48 negate function 44 nested functions 45 neutral functors 131 next() function 228 nodes 80
non-curried function 92 Nothing()function 132 null checks, consolidating using Maybe monad 132-137
null function 111, 118, 120, 126
null-checking overview 215 problems with 121 Number type 100
O
object literal interface 33 Object.freeze() function 34, 36 objects
managing state of 31-32 treating as values 32-34
observables 21 observer pattern 236 one-line expressions 62 OOP (object-oriented program- ming), vs. functional programming 24-38 deep-freezing moving parts 34-37
managing state of JavaScript objects 31-32 navigating and modifying object graphs with lenses 37-38 treating objects as values 32-34
operator function 40 OR (||) operator 189 OR-combinator 113-114 orElse function 140 output type 86
P
p parameter 61 parameter binding, binding into delayed functions 101-102
partial application 98-102 partial function 101 pending status 214 Performance API 193 performance.now() function 193
Person attribute 35, 60, 65-66, 69, 72, 227 pipe function 110 pipelines. See function pipelines pipelining 85 pipes pattern 88 pluck function 108, 191 plus (+) operator 59 point-free coding 110-112 polymorphic functions 27 predicate function 68-69 printMessage function 7 printPeople function 41 private variables, emulating 50-52
procedural programming 7 product type 140 programmable commas 147 programming to interfaces 105 Promise monad 214, 218 Promise.all() function 219,
221
Page 244
Promise.resolve() function 217 promises 214-224
composing synchronous and asynchronous behavior 221-224
future method chains and 216-221
RxJS (Reactive Extensions for JavaScript) and 233
Promises/A+ standard 215 promisifying 217 proper tail calls 202 property lenses 236 property-based testing 151, 154, 166-172, 179
prototypal relationship 25 prototype property 182 pseudo-block scope 49-50 pseudo-private variables 33 pure code
overview 109-110 separating from impure with monadic isolation 161-164
pure functions 9-13, 59,
70-71 purity 13
Q
QuickCheck project 167, 238
QUnit library 155, 173, 237
R
R variable 94 Ramda library 37, 94, 236 Range Error: Maximum Call Stack Exceeded 186 range function 188 range generator 225 R.compose function 106, 110, 126, 223
R.divide function 160 Reactive Extensions for JavaScript. See RxJS reactive programming 4, 230-233, 236 readDom 143 receiving function 88 recovering from failure, using Either monad 137-141
recursion 227
applying memorization to recursive calls 197-199 generators and 226-228 overview 77 recursively defined data structures 79 tail-call optimization and 199-203
thinking recursively 77-79 recursive addition 78 recursive algorithms 199 recursive cases 77 recursive code, challenges of 186-187
_.reduce function 65-68, 78 _.reduceRight function 67 referential transparency 13-15, 17
_.reject function 191 rejected promise 214 remembers function 198 _.rest function 78, 191 results, gathering 65-68 _.reverse function 191 rewriting 13 R.head function 107 R.identity function 125, 149, 161
R.length function 160 rot13 function 192, 195 R.pipe function 110 R.pluck function 107 R.prop function 107, 135 R.reverse function 107 R.set function 37 R.sortBy function 107 R.sum function 160 R.tap function 161 run function 7-8, 13 rx-async package 236 rx-binding package 236 rx-dom package 236 RxJS (Reactive Extensions for JavaScript)
229-234
data as observable
sequences 229-230 functional and reactive programming
230-233
promises and 233 RxJS library 184 Rx.Observable 230, 232 R.zip function 107
S
S-combinator 114-115 safeFindObject function 139, 164, 196
safeFindStudent function 135-136
Scheduler function 101 scope chain 182 scopes
function scope 48-49 global scope, problems with 47
pseudo-block scope 49-50 sequence (S-combinator) 114-115
setInterval function 101 setTimeout function 101 settled promise 215 shortcut fusion 190-191 showStudent function 11, 16, 109-110, 142, 146, 156, 162-163, 197 Sinon library 237 sinon object 164 SinonJS plug-in 164 size function 14 _.slice function 191 _.some function 68 sort() function 40 SQL-like data 75-76 square function 191 squares generator 228, 230 stack 181 statelessness 9 statements 38 static scope 45 strict mode 29 String type 100 StringPair type 92 stubs 164
student object 212-213, 221, 226
student variable 48 student-info panel 127 students object 207 substitutability 13-15 substitution 13 substring method 59 subtasks 16 subtypes 25 sum function 14 surface area 196 synchronous behavior 211 synchronous code 223

Page 245
T
tacit programming 111
tail position 79, 199
tail-call elimination 199
tail-call optimization. See TCO _.takeRight function 191
_.takeRightWhile function 191
_.takeWhile function 191
tap (K-combinator) 113
TCO (tail-call
optimization) 199-203
temporal cohesion 207
temporal coupling 207
temporal dependencies, among functions, creating 207-208
terminating condition 77, 79
testing 153-179
challenges of testing impera- tive programs 155-158
dependency on shared resources leads to inconsistent results 157
difficulty identifying and decomposing tasks 155-157
predefined order of execution 158 functional programming's influence on unit tests 154-155 measuring effectiveness through code coverage 172-179
measuring complexity of functional code 177
measuring effectiveness of testing functional code 173-177
of functional code 159-166
focusing on business logic instead of control flow 160-161
mocking external dependencies 164-166
separating pure from impure with monadic isolation 161-164
treating function as black box 159-160 property-based 166-172
then block 217
then method 216-217
thenable 217
this keyword 10
thisArg function 44
thunk 203
toLetterGrade function 160
toLowerCase method 59
too much recursion error 186
toString method 33, 41
trace statements 147
traits 76
trampolining 202-203
transforming data 62-64
transparency, referential 13-15
Tree.map function 82-83
trees 81
trim function 110 true verdict 169
try-catch structure 118-119
Tuple object 91
tuples 90-92, 103
type constructor 130
type systems 88
type-compatible functions 88-89, 105
TypeError 136, 144
U
unary functions 93, 98
undefined argument 100
Undesrscore.js project 62, 235
_.uniq function 72
unit function 130
unit tests, functional program- ming’s influence on 154-155
units of modularity 155
units of work 16, 24, 38
unresolved status 214
unsafe values, wrapping 122-124 usable result 38
V
Value Object pattern 33
value property 228
value() function 73, 190
values 41
treating objects as 32-34
unsafe, wrapping of 122-124
variableObject property 182
variables
blocked-scope 52-53
private 50-52
verdict function 169-170
void functions 38, 113
W
_.where 191 window object 10 with statement 49 Wrapper object 86, 130 Wrapper type 122 Wrapper(A) functor 124 Wrapper(B) functor 124 Wrapper.map 123 wrapping arrays 73 wrapping, unsafe values 122-124 writable property 34 writeDom 143
X
x variable 48
XMLHttpRequest 208
Y
yield keyword 224, 228
yielding 224
Z
zip function 108
zipCode function 33, 45
Functional Programming in JavaScript
Luis Atencio
In complex web applications, thè low-level details of your JavaScript code can obscure thè workings of thè System as a whole. As a coding style, functional programming (FP) promotes loosely coupled relationships among thè components of your application, makingthe big picture easierto design, communicate, and maintain.
Functional Programming in JavaScript teaches you techniques to improve your web applications—their extensibility, modularity, reusability, and testability, as well as their performance. This easy-to-read book uses concrete examples and clear explana- tions to show you how to use functional programming in reai life. If you’re new to functional programming, you’ll appreciate this guide’s many insightful comparisons to imperative or object- oriented programming that help you understand functional design. By thè end, you’ll think about application design in a fresh new way, and you may even grow to appreciate monads!
What’s Inside
■ High-value FP techniques for real-world uses ■ Using FP where it makes thè most sense ■ Separating thè logie of your System from implementation details
■ FP-style error handling, testing, and debugging ■ All code samples use JavaScript £S6 (£S 2015)
Written for developers with a solid grasp of JavaScript fundamentals and web application design.
Luis Atencio is a software engineer and architect building enterprise applications in Java, PHP, and JavaScript.
To download their free eBook in PDF, ePub, and Kindle formats, owners of this book should visit manning.com/books/functional-programming-in-javascript
"This book transformed thè way that I think about and write JavaScript.”
—Andrew Meredith Intrinsitech Corporation
"Easy to navigate, with reai-life examples.”
—AmyTeng, Dell
"Now, this is thè way to write JavaScript!”
—William £. Wheeler, West Corporation
"After readingthis book, I revisited how I approached coding and was able to retrain my mind using better methods and techniques.”
—Tanner Slayton Sr.
Microsoft Corporation