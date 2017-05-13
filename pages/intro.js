 
Functional Programming in JavaScript
LUIS ATENCIO
To my wonderful wife, Ana.
Thank you for your unconditional support and for being the source of passion and inspiration in my life.
brief contents
3	■ Few data structures, many operations 57
4	■ Toward modular, reusable code 84
5	■ Design patterns against complexity 117
PART 3 ENHANCING YOUR FUNCTIONAL SKILLS	151
6	■ Bulletproofing your code 153
7	■ Functional optimizations 180
8	■ Managing asynchronous events and data 205
vii

contents
preface xv
acknowledgments xvii
about this book xix
PART 1 1 - THINK FUNCTIONALLY	1
Becoming functional 3
1.1	Can functional programming help? 5
1.2	What is functional programming? 5
Functional programming is declarative 7 ■ Pure functions and the problem with side effects 9 ■ Referential transparency and substitutability 13 ■ Preserving immutable data 15
1.3	Benefits of functional programming 16
Encouraging the decomposition of complex tasks 16 Processing data using fluent chains 18 ■ Reacting to the complexity of asynchronous applications 19
1.4	Summary 22
ix
x
CONTENTS
2
Higher-order JavaScript 23
2.1	WhyJavaScript? 24
2.2	Functional vs. object-oriented programming 24
Managing the state of JavaScript objects 31 ■ Treating objects as values 32 ■ Deep-freezing moving parts 34 ■ Navigating and modifying object graphs with lenses 37
2.3	Functions 38
Functions as first-class citizens 39 ■ Higher-order functions 40 Types of function invocation 43 ■ Function methods 44
2.4	Closures and scopes 45
Problems with the global scope 47 ■ JavaScript’s function scope 48 ■ A pseudo-block scope 49 ■ Practical applications of closures 50
2.5	Summary 53
PART 2 - GET FUNCTIONAL 55

3
Few data structures, many operations 57
3.1	Understanding your application’s control flow 58
3.2	Method chaining 59
3.3	Function chaining 60
Understanding lambda expressions 61 ■ Transforming data with _.map 62 ■ Gathering results with_.reduce 65 Removing unwanted elements with _.filter 68
3.4 Reasoning about your code 70
Declarative and lazy function chains 71 ■ SQL-like data: functions as data 75
3.5 Learning to think recursively 77
What is recursion? 77 ■ Learning to think recursively 77 Recursively defined data structures 79
3.6 Summary 83
4
Toward modular, reusable code 84
4.1 Method chains vs. function pipelines 85
Chaining methods together 86 ■ Arranging functions in a pipeline 87

CONTENTS
xi
4.2	Requirements for compatible functions 88
Type-compatible functions 88 ■ Functions and arity: the case for tuples 89
4.3	Curried function evaluation 92
Emulating function factories 95 ■ Implementing reusable function templates 97
4.4	Partial application and parameter binding 98
Extending the core language 100 ■ Binding into delayed functions 101
4.5	Composing function pipelines 102
Understanding composition with HTML widgets 102 Functional composition: separating description from evaluation 104 ■ Composition with functional libraries 107 Coping with pure and impure code 109 ■ Introducing point-free programming 111
4.6	Managing control flow with functional combinators 112
Identity (I-combinator) 112 ■ Tap (K-combinator) 113 Alternation (OR-combinator) 113 ■ Sequence (S-combinator) 114 Fork (join) combinator 115
4.7	Summary 116
5
Design patterns against complexity 117
5.1	Shortfalls of imperative error handling 118
Error handling with try-catch 118 ■ Reasons not to throw exceptions in functional programs 119 ■ Problems with null-checking 121
5.2	Building a better solution: functors 121
Wrapping unsafe values 122 ■ Functors explained 124
5.3	Functional error handling using monads 127
Monads: from control flow to data flow 128 ■ Error handling with Maybe and Either monads 132 ■ Interacting with external resources using the IO monad 141
5.4	Monadic chains and compositions 144
5.5	Summary 150
xii
CONTENTS
PART 3 ENHANCING YOUR FUNCTIONAL SKILLS	151
6
Bulletproofing your code 153
6.1	Functional programming’s influence on unit tests 154
6.2	Challenges of testing imperative programs 155
Difficulty identifying and decomposing tasks 155 Dependency on shared resources leads to inconsistent results 157 Predefined order of execution 158
6.3	Testing functional code 159
Treating a function as a black box 159 ■ Focusing on business logic instead of controlflow 160 ■ Separating the pure from the impure with monadic isolation 161 ■ Mocking external dependencies 164
6.4	Capturing specifications with property-based testing 166
6.5	Measuring effectiveness through code coverage 172
Measuring the effectiveness of testing functional code 173 Measuring the complexity of functional code 177
6.6	Summary 179
7
Functional optimizations	180
7.1	Under the hood of function execution 181
Currying and the function context stack 183 ■ Challenges of recursive code 186
7.2	Deferring execution using lazy evaluation 188
Avoiding computations with the alternation functional combinator 189 ■ Taking advantage of shortcut fusion 190
7.3	Implementing a call-when-needed strategy 191
Understanding memoization 192 ■ Memoizing computationally intensive functions 192 ■ Taking advantage of currying and memoization 196 ■ Decomposing to maximize memoization 196 Applying memoization to recursive calls 197
7.4	Recursion and tail-call optimization (TCO) 199
Converting non-tail calls to tail calls 201
7.5	Summary 203

CONTENTS
xiii
8
Managing asynchronous events and data 205
8.1	Challenges of asynchronous code 206
Creating temporal dependencies among functions 207 Falling into a callback pyramid 208 ■ Using continuation - passing style 210
8.2	First-class asynchronous behavior with promises 214
Future method chains 216 ■ Composing synchronous and asynchronous behavior 221
8.3	Lazy data generation 224
Generators and recursion 226 ■ The Iterator protocol 228
8.4	Functional and reactive programming with RxJS 229
Data as observable sequences 229 ■ Functional and reactive programming 230 ■ RxJS and promises 233
8.5	Summary 234
appendix JavaScript libraries used in this book 235 index 239
preface
When I was in college and graduate school, my class schedule was focused on object-oriented design as the sole methodology for planning and architecting software systems. And, like many developers, I began my career writing object-oriented code and building entire systems based on this paradigm.
Throughout my development career, I’ve learned and followed programming languages closely, not only because I want to learn something cool, but also because I’m intrigued by the design decisions and philosophy that each language fosters. Just as a new language provides a different perspective on how to approach software problems, a new paradigm can achieve the same effect. Although the object-oriented approach continues to be the modus operandi of software design, learning about functional programming will open your eyes to new techniques that you can use on their own or in parallel with any other design paradigm that fits your application.
Functional programming has been around for years, but to me it was only a minor distraction. I had heard and read about the benefits of Haskell, Lisp, Scheme, and, more recently, Scala, Clojure, and F# in terms of expressiveness and being highly productive platforms; even Java, which has traditionally been known as a verbose language, has functional artifacts that make code more succinct. Eventually, the minor distraction became impossible to avoid. And guess what? JavaScript, that object-oriented language everyone uses, can be turned around 180 degrees and used functionally. It turns out that this is the most powerful and effective way to use JavaScript. It took me a long time to discover this, and in this book I want to make you aware of it so you don’t have go on wondering why your JavaScript code is becoming so complex.
Page xv
Page xvi
Throughout my journey as a developer, I’ve learned how to use functional programming principles to create code that is modular, expressive, robust, easy to reason about, and simple to test. Without a doubt, this has changed me as a software engineer, so I wanted to capture and jot down my experiences somehow—perhaps in a book. Naturally, I approached Manning, with the idea of writing a functional programming book using the Dart programming language. I was playing around with Dart at the time and thought that combining it with my functional background would be a fun, unexplored, uncharted territory. I wrote a proposal, and a week later I had an interview. During the interview, I learned that Manning was seeking a person to write a book about functional programming in JavaScript. Because JavaScript is a language I’m very much obsessed with, to say the least, I was thrilled to jump into this opportunity. By writing this book, I hope to help you develop the same skills and take your development in a new direction.
acknowledgments
Writing a book is not a trivial undertaking, and the tireless collaboration of many people with a variety of talents brought to life the manuscript you’re holding (or reading onscreen).
The staff at Manning were incredible and instrumental in obtaining the level of quality we all hoped for, and I thank all of them from the bottom of my heart. Without them, this book would not have been possible. Special thanks to Marjan Bace and Mike Stephens for believing in the idea of this book and in me as an author; to Marina Michaels, for giving me a map and a flashlight to navigate this maze of book-writing challenges; to Susan Conant, for bringing me up to speed and teaching me my first lessons about what it means to write a technical book; to Bert Bates, for giving me my initial sparks of creativity and for his amazing insights on how to teach programming; and to everyone on the editorial and production teams, including Mary Piergies, Janet Vail, Kevin Sullivan, Tiffany Taylor, Katie Tennant, Dennis Dalinnik, and many others who worked behind the scenes.
I can’t thank enough the amazing group of technical peer reviewers led by Aleksandar Dragosavljevic—Amy Teng, Andrew Meredith, Becky Huett, Daniel Lamb, David Barkol, Ed Griebel, Efran Cobisi, Ezra Simeloff, John Shea, Ken Fukuyama, Peter Edwards, Subhasis Ghosh, Tanner Slayton, Thorsten Szutzkus, Wilfredo Manrique, William E. Wheeler, and Yiling Lu—and the talented forum contributors. Their contributions included catching technical mistakes, errors in terminology, and typos, and making topic suggestions. Each pass through the review process and each piece of feedback implemented through the forum topics shaped and molded the manuscript.
Page xvii
Page xviii
On the technical side, special thanks to Dean Iverson, who served as the book’s technical editor; Daniel Lamb, who served as the book’s technical proofreader; and Brian Hanafee, for his thorough and in-depth evaluation of the entire book. They are the best technical editors I could have hoped for.
Last but not least, I thank my wife for always supporting me, and my family for pushing me to become better every day and not asking why I didn’t call as often to check in while I was writing this book. Also, thanks go to my colleagues at work for purchasing early releases of the chapters. I am grateful to have the pleasure of working alongside such wonderful people.
about this book
Complexity is a huge beast to tame, and we’ll never get rid of it entirely; it will always be an aspect of software development. I’ve spent countless hours and immeasurable brainpower trying to understand what a particular piece of code does. The secret is to control the complexity so it doesn’t grow in proportion to the size of your code base— and functional programming can help. We’re writing more JavaScript than ever before. We’ve gone from building small client-side event-handling routines, to heavy clientside architectures, to complete isomorphic (server + client) JavaScript applications. Functional programming isn’t a tool—it’s a way of thinking that can apply equally to any of these environments.
This book is designed to teach you how to apply functional programming techniques to your code using ECMAScript 6 JavaScript. The material is presented at a gradual, steady pace and covers both theoretical and practical aspects of functional programming. I provide additional information for advanced readers, to help you get deeper into some of the harder concepts.
Roadmap
This book has eight chapters and is divided into three parts that guide you from fundamental building blocks to more-advanced and practical applications of functional programming.
Page xix
Page xx
Part 1, “Think functionally,” paints a high-level landscape of functional JavaScript. It also discusses core aspects of using JavaScript functionally and thinking like a functional programmer:
■	Chapter 1 introduces some of the core functional concepts that are explained in later chapters and prepares you to make the functional leap. It introduces the main pillars of functional programming, including pure functions, side effects, and declarative programming.
■	Chapter 2 establishes a level playing field for beginning and intermediate JavaScript developers and acts as a refresher for more-advanced readers. In addition, it’s sprinkled with basic functional programming concepts to prepare you for the techniques discussed in part 2.
Part 2, “Get functional,” focuses on core functional programming techniques, including function chains, currying, composition, monads, and more:
■	Chapter 3 introduces function chains and explores writing programs as combinations of recursion and high-order functions like map, filter, and reduce. It teaches these concepts using the Lodash.js framework.
■	Chapter 4 covers the popular techniques of currying and composition, which increase the modulari ty of your code. Using a functional framework such as Ramdajs, composition is the glue that orchestrates your entire JavaScript solution.
■	Chapter 5 provides a deep dive into more-theoretical areas of functional programming, with a comprehensive and gradual discussion of functors and monads in the context of error handling.
Part 3, “Enhancing your functional skills,” discusses the practical benefits of using functional programming to tackle real-world challenges:
■	Chapter 6 reveals the inherent ease with which functional programs can be unit tested. In addition, it introduces a rigorous, automated testing mode called property-based testing.
■	Chapter 7 takes a look at JavaScript’s memory model, which is used to support the evaluation of functions. This chapter also discusses techniques that help optimize the execution time of functional JavaScript applications.
■	Chapter 8 introduces some of the main challenges JavaScript developers face on a day-to-day basis when dealing with event-driven and asynchronous behavior. It discusses how functional programming can provide elegant solutions to reduce the complexity of existing imperative solutions with a related paradigm known as reactiveprogramming, implemented using RxJS.
Who should read this book
Functional Programming in JavaScript is written for JavaScript developers with at least a basic understanding of object-oriented software and a general awareness of the challenges of modern web applications. Because JavaScript is such a ubiquitous language,
Page xxi
if you want an introduction to functional programming and prefer a familiar syntax, you can take full advantage of this book instead of learning Haskell. (If you want to ease your way into Haskell, this book isn’t the best resource, because each language has its own idiosyncrasies that are best understood by learning it directly.)
The book will help beginning and intermediate programmers heighten their JavaScript skills with higher-order functions, closures, function currying, composition, as well as new JavaScript ES6 features like lambda expressions, iterators, generators, and promises. Advanced developers will enjoy the comprehensive coverage of monads and reactive programming as well, which can help you implement innovative ways of tackling the arduous task of dealing with event-driven and asynchronous code, taking full advantage of the JavaScript platform.
How to use this book
If you’re a beginner or intermediate JavaScript developer and functional programming is new to you, begin with chapter 1. If you’re a strong JavaScript programmer, you can skim through chapter 2 and move quickly into chapter 3, which begins with function chains and overall functional design.
More-advanced users of functional JavaScript typically understand pure functions, currying, and composition, so you may skim chapter 4 and move into functors and monads in chapter 5.
Examples and source code
The code examples in this book use ECMAScript 6 JavaScript, which can run equally well on either the server (Node.js) or the client. Some examples show I/O and browser DOM APIs, but without regard for browser incompatibilities. I assume you have experience interacting at a basic level with HTML pages and the console. No specific browser-based JavaScript is used.
The book makes heavy use of functional JavaScript libraries like Lodashjs, Ramdajs, and others. You can find documentation and installation information in the appendix.
This book contains extensive code listings that showcase functional techniques and, where appropriate, compare imperative versus functional designs. You can find all the code samples at the publisher’s website, https://www.manning.com/books/ functional-programming-in-javascript, and on GitHub at https://github.com/luijar/ functional-programming-js.
Typographical conventions
The following conventions are used throughout the book:
■	Italie typeface is used to reference important terms.
■	Courier typeface is used to denote code listings, as well as elements and attributes, methods names, classes, functions, and other programming artifacts.
■	Code annotations accompany some of the source code listings, highlighting important concepts.
Page xxii
About the author
Luis Atencio (@luijar) is a staff software engineer for Citrix Systems in Ft. Lauderdale, Florida. He has a B.S. and an M.S. in Computer Science and now works full-time developing and architecting applications using JavaScript, Java, and PHP platforms. Luis is very involved in the community and has presented frequently at local meetups and conferences. He blogs about software engineering at luisatencio.net, writes articles for magazines and DZone, and is also the coauthor of RxJS in Action (forthcoming from Manning in 2017).
Author Online
Purchase of Functional Programming in JavaScript includes free access to a private web forum run by Manning Publications where you can make comments about the book, ask technical questions, and receive help from the author and from other users. To access the forum and subscribe to it, point your web browser to https://www.manning .com/books/functional-programming-in-javascript. This page provides information on how to get on the forum once you are registered, what kind of help is available, and the rules of conduct on the forum.
Manning’s commitment to our readers is to provide a venue where a meaningful dialog between individual readers and between readers and the author can take place. It is not a commitment to any specific amount of participation on the part of the author, whose contribution to Author Online remains voluntary (and unpaid). We suggest you try asking the author some challenging questions lest his interest stray! The Author Online forum and the archives of previous discussions will be accessible from the publisher’s website as long as the book is in print.
Part 1
Think functionally
t’s highly probable that most of your experience building professional appli-
cations has been with an object-oriented language. You may have heard or read about functional programming in other books, blogs, forums, and magazine articles, but you’ve probably never written any functional code. Don’t worry; this is to be expected. I’ve done most of my development in an object-oriented environment as well. Writing functional code isn’t difficult, but learning to think functionally and letting go of old habits is. The primary goal of part 1 of this book is to lay the foundation for and prepare your mind to embrace the functional techniques discussed in parts 2 and 3.
Chapter 1 discusses what functional programming is and the mindset you need to embrace it; it also introduces some of the most important techniques based on pure functions, immutability, side effects, and referential transparency. These form the backbone of all functional code and will help you transition into functional more easily. Also, these will be the guiding principles that set the stage for many of the design decisions we make in the following chapters.
Chapter 2 provides a first view ofJavaScript as a functional language. Because it’s so ubiquitous and mainstream, it’s an ideal language with which to teach functional programming. If you aren’t a strong JavaScript developer, this chapter will bring you up to speed with everything you need to know to understand functional JavaScript, such as higher-order functions, closures, and scoping rules.





