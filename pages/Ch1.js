import Layout from '../components/layout'
import _JSXStyle from 'styled-jsx/style'
import Link from 'next/link'

export default () => (
  <Layout title='Ch1'>
     <div>
        
                <style jsx>{`

                    .col-md-6 {
                        border-radius: 4px;
                        overflow: hidden;
                        box-shadow: 0 9px 9px rgba(0, 0, 0, 0.9);
                        display: block;
                        min-height: 70%;
                        font-family: Verdana;
                        max-width: 900px;
                        background-color: #E8EDEE;
                        margin: auto;
                        margin-top: auto;
                        margin-right: auto;
                        margin-bottom: auto;
                        margin-left: auto;
                        white-space: pre-wrap;
                        border: none;
                        box-sizing: border-box;
                        color: #2D0D0D;
                        line-height: 1.1;
                        padding: 4.7em;

                    }

                    .home {
                        margin: 1.5em 0;
                        
                    }

                    h1 {
                        color: #867452;
                        font-size: 60px;
                    }

                    h2 {
                        color: #867452;
                        font-size: 40px;
                    }
                        h3 {
                        color: #867452;
                        font-size: 30px;
                    }


                    p, li, ol, ul{
                        color: brown;
                        font-size: 24px;
                        font-style: italic;
                        letter-spacing: 0.04em;
                    }
                    .p, .litag{
                        color: #75AFAD;
                        font-size: 22px;
                        font-style: italic;
                    }

                    pre {display: block;
                    font-family: monospace;
                    white-space: pre;
                    margin: 1em 0;
                    font-size: 16px


                    }

                    code
                    {margin: auto,
                        font-family:"Lucida Console";
                        "Andale Mono";
                        "Courier New";
                        Courier;
                        monospace;
                        font-style:normal;
                        color:#395C73;}
                    
                    code strong
                    {color:#000;
                        background:#F5FD11;
                        padding:1px;
                        font-weight:normal;
                    }
					
					.pag{
					font-family: verdana;
                    color: #000000;
                    font-size: 16px;
                    text-align: center;

					}
                    .interno {
                    font-family: verdana;
                    font-style: italic;
                    color: #395C73;
                    font-size: 24px;    
                    }

                `}</style>
    
    <div className='home'>
      
  <div className='col-md-3'></div>
<div className='col-md-6'>
<p className="pag">Page 3</p>
<h1 className="huno">Chapter 1 - Becoming functional</h1>
<h2 className="hdos">This chapter covers</h2>
<li className="littag"> Pensando en términos funcionales</li>
<li className="litag">	Thinking in functional terms</li>
<li className="littag"> Aprender el qué y el porqué de la programación funcional</li>
<li className="litag">	Learning the what and why of functional programming</li>
<li className="littag"> La comprensión de los principios de la inmutabilidad y funciones puras</li>
<li className="litag">	Understanding the principles of immutability and pure functions</li>
<li className="littag"> técnicas de programación funcionales y su impacto en el diseño global</li>
<li className="litag">	Functional programming techniques and their impact on overall design</li>
<p className="it">OO hace que el código comprensible mediante la encapsulación de las piezas móviles.</p>

<p className="p">OO makes code understandable by encapsulating moving parts.</p>
<p className="it">FP hace que el código entendible minimizando las piezas móviles.</p>

<p className="p">FP makes code understandable by minimizing moving parts.</p>
<p className="it">Plumas -Michael (Twitter)</p>

<p className="p">—Michael Feathers (Twitter)</p>
<p className="it">Si usted está leyendo este libro, es probable que usted es un desarrollador de JavaScript con un conocimiento traba- jando de diseño orientado a objetos o estructurado, y tiene curiosidad acerca de la programación funcional. Tal vez usted ha tratado de aprender antes y no ha sido capaz de aplicar con éxito en el trabajo o en sus proyectos personales. En cualquier caso, su principal objetivo es mejorar sus habilidades de desarrollo y mejorar la calidad de su código. Este libro puede ayudar a lograr eso.</p>

<p className="p">If you’re reading this book, chances are you’re a JavaScript developer with a work- ing knowledge of object-oriented or structured design, and you’re curious about functional programming. Perhaps you’ve tried to learn it before and haven’t been able to apply it successfully at work or on your personal projects. In either case, your main goal is to advance your development skills and improve the quality of your code. This book can help you accomplish that.</p>

<p className="pag">Page 4</p>

<p className="it">El rápido ritmo de plataformas web, la evolución de los navegadores, y, lo más impor- tantes: las demandas de los usuarios finales tienen todos tenían un efecto profundo en la forma en que diseñamos aplicaciones web hoy en día. Los usuarios exigen que las aplicaciones web se sienten más como una computadora de escritorio nativo o una aplicación móvil con widgets ricos y sensibles. Naturalmente, estas exigencias obligan a los desarrolladores de JavaScript pensar más ampliamente sobre el espacio de soluciones y adoptar paradigmas de programación adecuadas y las mejores prácticas que proporcionan las mejores soluciones posibles.</p>

<p className="p">The rapid pace of web platforms, the evolution of browsers, and—most impor- tant—the demands of end users have all had a profound effect on the way we design web applications today. Users demand that web applications feel more like a native desktop or a mobile app with rich and responsive widgets. Naturally, these demands force JavaScript developers to think more broadly about the solution space and to adopt adequate programming paradigms and best practices that provide the best pos- sible solutions.</p>
<p className="it">Como desarrolladores, que gravitan hacia los marcos que nos ayudan a crear arquitecturas de aplicaciones extensibles y limpias. Sin embargo, la complejidad de nuestra base de código todavía se sale de control, y estamos desafió a reexaminar los principios básicos de diseño de nuestro código. Además, la web de hoy es radicalmente diferente de lo que era hace años para ERS desarrollos de JavaScript, ya que podemos hacer muchas cosas ahora que no eran técnicamente viables antes. Podemos optar por escribir grandes aplicaciones del lado del servidor con Node.js o empujar la mayor parte de la lógica de negocio en el cliente, dejando un servidor delgado atrás. En cualquier caso, tenemos que interactuar con la tecnología de almacenamiento, generar procesos asíncronos, manejar eventos, y mucho más.</p>

<p className="p">As developers, we gravitate toward frameworks that help us create extensible and clean application architectures. Yet the complexity of our codebase still gets out of control, and we’re challenged to reexamine the basic design principles of our code. Also, the web of today is radically different than it was years ago for JavaScript develop- ers, because we can do many things now that weren’t technically feasible before. We can choose to write large server-side applications with Node.js or push the bulk of the business logic onto the client, leaving a thin server behind. In either case, we need to interact with storage technology, spawn asynchronous processes, handle events, and much more.</p>
<p className="it">diseño orientado a objetos ayuda a resolver parte del problema; sino porque JavaScript es un lenguaje dinámico con una gran cantidad de estado compartido, no pasa mucho tiempo antes de acumular suficiente complejidad para hacer nuestro código difícil de manejar y difícil de mantener. diseño orientado a objetos desde luego mueve la aguja en la dirección correcta, pero necesitamos más. Tal vez usted ha oído la programación reactiva plazo en los últimos años. Este para- digma de programación facilita el trabajo con los flujos de datos y la propagación del cambio. En JavaScript, esto es muy importante cuando se trata de un código asíncrono o basada en eventos. En general, lo que necesitamos es un paradigma de programación que nos anima a pensar cuidadosamente acerca de nuestros datos y las funciones que interactúan con él. Al pensar en el diseño de una aplicación, hágase las siguientes preguntas en términos de estos principios de diseño:</p>

<p className="p">Object-oriented design helps solve part of the problem; but because JavaScript is such a dynamic language with lots of shared state, it isn’t long before we accumulate enough complexity to make our code unwieldy and hard to maintain. Object-oriented design certainly moves the needle in the right direction, but we need more. Perhaps you’ve heard the term reactive programming in recent years. This programming para- digm facilitates working with data flows and propagation of change. In JavaScript, this is extremely important when dealing with asynchronous or event-based code. Overall, what we need is a programming paradigm that encourages us to think carefully about our data and the functions that interact with it. When thinking about an application’s design, ask yourself the following questions in terms of these design principles:</p>
<li className="littag"> Extensibilidad-Do I refactorizar constantemente mi código para soportar la funcionalidad adicional?</li>
<li className="litag">	Extensibility—Do I constantly refactor my code to support additional functionality?</li>
<li className="littag"> Fácil de modularizar-Si cambio de un archivo, se ve afectada otro archivo?</li>
<li className="litag">	Easy to modularize—If I change one file, is another file affected?</li>
<li className="littag"> Reutilización-¿Hay un alto grado de duplicación?</li>
<li className="litag">	Reusability—Is there a lot of duplication?</li>
<li className="littag"> La capacidad de prueba Do-Me esfuerzo por unidad de prueba mis funciones?</li>
<li className="litag">	Testability—Do I struggle to unit test my functions?</li>
<li className="littag">Fácil de razonar sobre-¿Es mi código desestructurado y difícil de seguir?</li>
<li className="litag">	Easy to reason about—Is my code unstructured and hard to follow?</li>

<p className="it">Si su respuesta es “Sí” o “No sé” a cualquiera de estas preguntas, entonces usted ha recogido el libro derecha como guía en el camino hacia la productividad. La programación funcional (FP) es el paradigma de programación que necesita. A pesar de que se basa en conceptos simples, FP requiere un cambio en la manera de pensar acerca de los problemas. FP no es una nueva herramienta o una API, pero un enfoque diferente para la resolución de problemas que se convertirá intuitivo una vez que Deben conocerse los principios básicos.</p>

<p className="p">If you answer “Yes” or “I don’t know” to any of these questions, then you’ve picked up the right book as a guide on the path to productivity. Functional programming (FP) is the programming paradigm you need. Although it’s based on simple concepts, FP requires a shift in the way you think about problems. FP isn’t a new tool or an API, but a different approach to problem solving that will become intuitive once you under- stand the basic principles.</p>
<p className="it">En este capítulo, defino lo que la programación funcional es y cómo y por qué digo que es útil e importante. Introduzco los principios básicos de fun- ciones inmutabilidad y puros y hablar acerca de las técnicas de planificación familiar y cómo esas técnicas afectan a su enfoque para el diseño de programas. Estas técnicas permiten elegir fácilmente la programación reactiva y lo utilizan para resolver tareas complejas de JavaScript. Pero antes de que podamos entrar en todo esto, es necesario saber por qué pensar funcionalmente es importante y cómo se puede ayudar a hacer frente a las complejidades ofJavaScript programas.</p>

<p className="p">In this chapter, I define what functional programming is and tell you how and why it’s useful and important. I introduce the core principles of immutability and pure func- tions and talk about FP techniques and how those techniques affect your approach to designing programs. These techniques allow you to easily pick up reactive programming and use it to solve complex JavaScript tasks. But before we can get into all this, you need to learn why thinking functionally is important and how it can help you tackle the complexities ofJavaScript programs.</p>
<h2 className="hdos">1.1	Can functional programming help?</h2>

<p className="pag">Page 5</p>

<p className="it">Elprendizaje de la programación funcional nunca ha sido tan importante como lo es hoy. La comunidad de desarrollo y de las principales compañías de software están empezando a darse cuenta de los beneficios del uso de técnicas de planificación familiar para hacer funcionar sus aplicaciones de negocio. Hoy en día, la mayoría de los principales lenguajes de programación (Scala, Java 8, F #, Python, JavaScript y muchos más) proporcionan apoyo funcional, ya sea nativo o basado en la API. Por lo tanto, las habilidades de PF están en alta demanda ahora y seguirán siendo en los años venideros.</p>

<p className="p">Learning functional programming has never been as important as it is today. The development community and major software companies are starting to realize the benefits of using FP techniques to power their business applications. Nowadays, most major programming languages (Scala, Java 8, F#, Python, JavaScript, and many more) provide either native or API-based functional support. Hence, FP skills are in high demand now and will continue to be in the years to come.</p>
<p className="it">En el contexto de JavaScript, una mentalidad FP puede ser utilizado para dar forma a la naturaleza muy expresiva de la lengua y ayudarle a escribir código que está limpio y modular, capaz de Exámenes y conciso para que pueda ser más productivo en el trabajo. Durante muchos años, hemos descuidado el hecho de que JavaScript se puede escribir de manera más eficaz con un estilo funcional. Este descuido se debe en parte a una mala interpretación general del lenguaje JavaScript, y también debido a la falta de construcciones nativas para gestionar adecuadamente el estado de JavaScript; se trata de una plataforma dinámica que sitúa la carga de administrar este estado sobre nosotros (los responsables de introducir errores en nuestras aplicaciones). Esto puede funcionar bien para pequeños scripts, pero se vuelve más difícil de controlar a medida que crece su base de código. En cierto modo, creo que lo protege de FP en sí JavaScript. Discuto esto más adelante en el capítulo 2.</p>

<p className="p">In the context of JavaScript, an FP mindset can be used to shape the incredibly expressive nature of the language and help you write code that is clean, modular, test- able, and succinct so that you can be more productive at work. For many years, we’ve neglected the fact that JavaScript can be written more effectively in a functional style. This neglect is partly due to an overall misunderstanding of the JavaScript language, and also due to JavaScript’s lack of native constructs to properly manage state; it’s a dynamic platform that places the burden of managing this state on us (the ones responsible for introducing bugs into our applications). This may work well for small scripts, but it becomes harder to control as your code base grows. In a way, I think FP protects you from JavaScript itself. I discuss this further in chapter 2.</p>
<p className="it">Escribir código JavaScript funcional se ocupa de la mayor parte de estas preocupaciones. El uso de un conjunto de técnicas y prácticas probadas en base a funciones puras, se puede escribir código que es fácil de razonar acerca de la vista de la creciente complejidad. Escribir JavaScript funcionalmente es un acuerdo de dos por uno, porque no sólo a mejorar la calidad de toda la aplicación, sino que también aumenta más el dominio de y una mejor comprensión del lenguaje JavaScript.</p>

<p className="p">Writing functional JavaScript code addresses most of these concerns. Using a set of proven techniques and practices based on pure functions, you can write code that is easy to reason about in the face of increasing complexity. Writing JavaScript function- ally is a two-for-one deal, because you not only improve the quality of your entire application, but also gain more proficiency in and a better understanding of the JavaScript language.</p>
<p className="it">Debido a la programación funcional no es un marco o una herramienta, sino una forma de escribir código, pensando funcionalmente es radicalmente diferente de pensar en términos de orientación a objetos. Pero, ¿cómo convertirse funcional? ¿Cómo comenzar a pensar funcionalmente? La programación funcional es intuitivo una vez que haya captado su esencia. Desaprender viejos hábitos es la parte más difícil y puede ser un gran cambio de paradigma para la mayoría de las personas que vienen de un entorno orientado a objetos. Antes de que pueda aprender a pensar funcionalmente, primero hay que aprender lo que es FP.</p>

<p className="p">Because functional programming isn’t a framework or a tool, but a way of writing code, thinking functionally is radically different from thinking in object-oriented terms. But how do you become functional? How do you begin to think functionally? Functional programming is intuitive once you’ve grasped its essence. Unlearning old habits is the hardest part and can be a huge paradigm shift for most people who come from an object-oriented background. Before you can learn to think functionally, first you must learn what FP is.</p>
<h2 className="hdos">1.2	What is functional programming?</h2>
<p className="it">En términos simples, la programación funcional es un estilo de desarrollo de software que pone un mayor énfasis en el uso de funciones. Se podría decir: “Bueno, yo ya utilizo funciones sobre una base del día a día en el trabajo; ¿cuál es la diferencia?”Como he mencionado anteriormente, FP se requiere pensar un poco diferente sobre la forma de abordar las tareas que está enfrentando. No es una cuestión ofjust la aplicación de funciones para llegar a un resultado; el objetivo, más bien, es a flujos de control abstractos y operaciones sobre los datos con las funciones con el fin de evitar los efectos secundarios y reducir la mutación del estado de la aplicación. Sé que esto suena como un bocado, pero I'il visitar cada uno de estos términos adicionales y construir sobre ellos durante todo el libro.</p>

<p className="p">In simple terms, functional programming is a software development style that places a major emphasis on the use of functions. You might say, “Well, I already use functions on a day-to-day basis at work; what’s the difference?” As I mentioned earlier, FP requires you to think a bit differently about how to approach the tasks you’re facing. It’s not a matter ofjust applying functions to come up with a result; the goal, rather, is to abstract control flows and operations on data with functions in order to avoid side effects and reduce mutation of state in your application. I know this sounds like a mouthful, but I’il visit each of these terms further and build on them throughout the book.</p>
<p className="it">Normalmente, los libros de PF comienzan con el cálculo de los números de Fibonacci, pero prefiero empezar con un simple programa JavaScript que muestra el texto en una página HTML. ¿Qué mejor texto para imprimir que el buen ol' ‘Hello World’:</p>

<p className="p">Normally, FP books start with computing Fibonacci numbers, but I’d rather start with a simple JavaScript program that displays text on an HTML page. What better text to print than the good ol’ “Hello World”:</p>
<p className="pag">Page 6</p>
<pre><code>{`
document.querySelector('#msg').innerHTML = '<h1>Hello World</hi>';`}</code></pre>
<p className="it">NOTA he mencionado anteriormente que, debido a la programación funcional no es una herramienta de información específi- ca, sino una manera de escribir código, se puede aplicar a escribir del lado del cliente (basado en el navegador), así como aplicaciones del lado del servidor (Node.js) . Abrir el navegador y escribiendo algo de código es probablemente la forma más fácil de conseguir JavaScript en marcha y funcionando, y eso es todo lo que necesita para este libro.</p>
<p className="p">NOTE I mentioned earlier that because functional programming isn’t a spe- cific tool, but a way of writing code, you can apply it to write client-side (browser-based) as well as server-side applications (Node.js). Opening the browser and typing in some code is probably the easiest way to get JavaScript up and running, and that’s all you’ll need for this book.</p>
<p className="it">Este programa es simple, sino porque todo está codificado, no puede usarlo para dis- mensajes reproducir de forma dinámica. Digamos que usted quiere cambiar el formato, el contenido, o tal vez el elemento de destino; que había necesidad de volver a escribir toda esta expresión. Tal vez usted decide envolver este código con una función y hacer el cambio apunta parámetros, por lo que se puede escribir una vez y utilizarlo con cualquier configuración:</p>
<p className="p">This program is simple, but because everything is hardcoded, you can’t use it to dis- play messages dynamically. Say you wanted to change the formatting, the content, or perhaps the target element; you’d need to rewrite this entire expression. Maybe you decide to wrap this code with a function and make the change points parameters, so you can write it once and use it with any configuration:</p>
<pre><code>{`
function printMessage(elementId, format, message) {
document.querySelector('#S{elementId}').innerHTML =
'<S{format}>S{message}</S{format}>';
}
printMessage('msg', 'h1','Hello World');`}</code></pre>
<p className="it">Una mejora, de hecho, pero todavía no es una pieza completamente reutilizable de código. Suponga que desea escribir en un archivo en lugar de una página HTML. Es necesario tomar el proceso de pensamiento simple de crear funciones parametrizadas a un nivel diferente, donde los pará- metros no son sólo valores escalares, pero también pueden ser ellas mismas funciones que proporcionan funcionalidad adi- cional. La programación funcional es un poco como el uso de funciones en los esteroides, ya que su único objetivo es evaluar y combinar una gran cantidad de funciones con otros para lograr un mayor comportamiento. Voy avance rápido un poco y le mostrará un adelanto de este mismo programa usando un enfoque funcional.</p>
<p className="p">An improvement, indeed, but still not a completely reusable piece of code. Suppose you want to write to a file instead of an HTML page. You need to take the simple thought process of creating parameterized functions to a different level, where param- eters aren’t just scalar values but can also be functions themselves that provide addi- tional functionality. Functional programming is a bit like using functions on steroids, because your sole objective is to evaluate and combine lots of functions with others to achieve greater behavior. I’ll fast-forward a bit and show you a sneak peek at this same program using a functional approach.</p>
<p className="it">Listado 1.1 printMessage Funcional:</p>
<p className="p">Listing 1.1 Functional printMessage:</p>
<pre><code>{`var printMessage = run(addToDom('msg'), hi, echo);
printMessage('Hello World');`}</code></pre>
<p className="it">Sin lugar a dudas, esto se ve radicalmente diferente a la original. Para empezar, no hi es un escalar más; que es una función igual addToDom y el eco. Visualmente, se siente como si usted está creando una función de funciones más pequeñas.</p>
<p className="p">Without a doubt, this looks radically different than the original. For starters, hi isn’t a scalar anymore; it’s a function just like addToDom and echo. Visually, it feels as though you’re creating a function from smaller functions.</p>
<p className="it">Hay una razón para esta locura. Listado 1.1 captura el proceso de descomposición de un programa en partes más pequeñas que son más reutilizables, más fiable y más fácil de entender, y luego combinarlas para formar un programa completo que es más fácil de reason acerca en su conjunto. Cada programa funcional sigue este principio fundamental. Por el momento, vamos a usar una función mágica, correr, 1 para activar una serie de funciones de forma secuencial, como addToDom, hola, y el eco. Voy a explicar en detalle más adelante plazo. Detrás de las escenas, que básicamente vincula cada función de una manera de tipo cadena haciendo pasar el valor de retorno de uno como entrada a la siguiente. En este caso, la cadena “Hello World” de regresar de eco se pasa a alta, y el resultado es finalmente pasó a addToDom.</p>
<p className="p">There’s a reason for this madness. Listing 1.1 captures the process of decomposing a program into smaller pieces that are more reusable, more reliable, and easier to understand, and then combining them to form an entire program that is easier to rea- son about as a whole. Every functional program follows this fundamental principle. For the time being, you’ll use a magical function, run,1 to invoke a series of functions sequentially, such as addToDom, hi, and echo. I’ll explain run in detail later. Behind the scenes, it basically links each function in a chain-like manner by passing the return value of one as input to the next. In this case, the string “Hello World” returned from echo is passed into hi, and the result is finally passed into addToDom.</p>
<p className="pag">Page 7</p>
<p className="it">¿Por qué la solución funcional mira de esta manera? Me gusta pensar que es básicamente la parametrización de su código para que pueda cambiar fácilmente en un manner- no invasiva como el ajuste de las condiciones iniciales de un algoritmo. Con este fundamento puesto, ahora se puede aumentar fácilmente printMessage para repetir el mensaje dos veces, utilizar un encabezado h2, y escribir en la consola, en lugar de la DOM, todo ello sin tener que volver a escribir cualquiera de la lógica interna.</p>
<p className="p">Why does the functional solution look this way? I like to think of it as basically parameterizing your code so that you can easily change it in a noninvasive manner— like adjusting an algorithm’s initial conditions. With this foundation laid, you can now easily augment printMessage to repeat the message twice, use an h2 header, and write to the console instead of the DOM, all without having to rewrite any of the internal logic.</p>
<p className="it">Listing 1.2 Extendiendo printMessage:</p>
<p className="p">Listing 1.2 Extending printMessage:</p>
<pre><code>{`var printMessage = run(console.log, repeat(3), h2, echo);
printMessage('Get Functional');`}</code></pre>

<p className="it">Este enfoque visualmente distinto no es accidental. Al comparar la funcionalidad de la solución no funcional, se habrán dado cuenta de que hay una diferencia radical en el estilo. Tanto imprimir la misma salida, sin embargo, tienen un aspecto muy diferente. Esto se debe al modo declarativo inherente de FP del desarrollo. Con el fin de entender completamente funcional programa- ming, primero debe aprender los conceptos fundamentales sobre los que se basa:</p>
<p className="p">This visually distinct approach isn’t accidental. When comparing the functional to the nonfunctional solution, you may have noticed that there’s a radical difference in style. Both print the same output, yet they look very different. This is due to FP’s inherent declarative mode of development. In order to fully understand functional program- ming, first you must learn the fundamental concepts on which it’s based:</p>
<li className="littag"> La programación declarativa</li>
<li className="litag">	Declarative programming</li>
<li className="littag"> funciones puras</li>
<li className="litag">	Pure functions</li>
<li className="littag"> transparencia referencial</li>
<li className="litag">	Referential transparency</li>
<li className="littag"> Inmutabilidad</li>
<li className="litag">	Immutability</li>
<h2 className="hdos">1.2.1	Functional programming is declarative</h2>
<p className="it"> La programación funcional cae bajo el paraguas de los paradigmas de programación declarativa: es un paradigma que expresa un conjunto de operaciones sin revelar cómo se implementan o cómo fluyen los datos a través de ellas. Sin embargo, los modelos más populares utilizados hoy en día son imperativos o procedimentales y están soportados en la mayoría de los lenguajes estructurados y orientados a objetos como Java, C #, C ++ y otros. La programación imperativa trata un programa de computadora como simplemente una secuencia de declaraciones de arriba a abajo que cambia el estado del sistema para computar un resultado. </p>
<p className="p">Functional programming falls under the umbrella of declarative programming para- digms: it’s a paradigm that expresses a set of operations without revealing how they’re implemented or how data flows through them. The more popular models used today, though, are imperative or procedural, and are supported in most structured and object- oriented languages like Java, C#, C++, and others. Imperative programming treats a computer program as merely a sequence of top-to-bottom statements that changes the state of the system in order to compute a result.</p>

<p class="ind">Índice 1. Para más detalles sobre esta función de ejecución provisional, visite http://mng.bz/nmax.</p>

<p className="ind">Index 1. For more details on this provisional run function, visit http://mng.bz/nmax.</p>
<p className="pag">Page 8</p>

<p className="it">Veamos un ejemplo sencillo imperativo. Supongamos que necesita para cuadrar todos los números en una matriz. Un programa imprescindible sigue estos pasos:</p>
<p className="p">Let’s look at a simple imperative example. Suppose you need to square all the numbers in an array. An imperative program follows these steps:</p>
<pre><code>{`var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; for(let i = 0; i < array.length; i++) { array[i] = Math.pow(array[i], 2);
}
array; //->	[0, 1, 4,	9, 16, 25, 36, 49, 64, 81]`}</code></pre>
<p className="it">programación imperativa indica a la computadora, con gran detalle, cómo realizar una tarea determinada (bucle a través de la aplicación de la fórmula y cuadrado para cada número, en este caso). Esta es la forma más común de escribir el código y lo más probable es que sea la primera forma de abordar este problema.</p>
<p className="p">Imperative programming tells the computer, in great detail, how to perform a certain task (looping through and applying the square formula to each number, in this case). This is the most common way of writing this code and will most likely be your first approach to tackling this problem.</p>
<p className="it">La programación declarativa, por otro lado, separa la descripción del programa de evaluación. Se centra en el uso de expresiones para describir lo que la lógica de un programa es sin precisar necesariamente su flujo o control cambia de estado. Un ejemplo de programación tivo declara- se encuentra en las instrucciones SQL. consultas SQL se componen de declaraciones que describen lo que el resultado de una consulta debe ser similar, haciendo abstracción del mecanismo interno para la recuperación de datos. En el capítulo 3, se muestra un ejemplo del uso de una superposición similar a SQL sobre su código funcional para dar un sentido a la vez su solicitud y los datos que se ejecuta a través de él.</p>
<p className="p">Declarative programming, on the other hand, separates program description from evaluation. It focuses on the use of expressions to describe what the logic of a program is without necessarily specifying its control flow or state changes. An example of declara- tive programming is found in SQL statements. SQL queries are composed of statements that describe what the outcome of a query should look like, abstracting the internal mechanism for data retrieval. In chapter 3, I show an example of using a SQL-like overlay over your functional code to give meaning to both your application and the data that runs through it.</p>
<p className="it">El cambio a un enfoque funcional para hacer frente a esta misma tarea, sólo tiene que ser con- cerned con aplicar el comportamiento correcto en cada elemento y ceder el control de bucle a otras partes del sistema. Puede dejar que Array.map () hacer la mayor parte del trabajo pesado:</p>
<p className="p">Shifting to a functional approach to tackle this same task, you only need to be con- cerned with applying the right behavior at each element and cede control of looping to other parts of the system. You can let Array.map() do most of the heavy lifting:</p>
<p className="it">En comparación con el ejemplo anterior, se ve que este código le libera de la responsa- bilidad de gestionar adecuadamente un contador de bucle y el acceso índice de la matriz; en pocas palabras, cuanto más código que tiene, más lugares hay para los insectos que se produzca. Además, los bucles estándar no son artefactos reutilizables a menos que estén resumieron con las funciones. Y eso es precisamente lo que vamos a hacer. En el capítulo 3, demuestro cómo eliminar bucles manuales completamente de su código en favor de la primera clase, funciones de orden superior, como un mapa, reducir y filtro, que acepta funciones como parámetros para que su código es más reutilizable, extensible y declarativo. Esto es lo que hice con la función de ejecución mágico en los listados 1.1 y 1.2.</p>
<p className="p">Compared with the previous example, you see that this code frees you from the respon- sibility of properly managing a loop counter and array index access; put simply, the more code you have, the more places there are for bugs to occur. Also, standard loops aren’t reusable artifacts unless they’re abstracted with functions. And that’s precisely what we’ll do. In chapter 3, I demonstrate how to remove manual loops completely from your code in favor of first-class, higher-order functions like map, reduce, and filter, which accept functions as parameters so that your code is more reusable, extensible, and declarative. This is what I did with the magical run function in listings 1.1 and 1.2.</p>
<p className="it">Haciendo abstracción bucles con funciones le permite tomar ventaja de las expresiones lambda o funciones de dirección, introducidos en ES6 JavaScript. Las expresiones lambda proporcionan una alternativa sucinta a funciones anónimas que se pueden pasar en un argumento de la función, en el espíritu de la escritura menos:</p>
<p className="p">Abstracting loops with functions lets you take advantage of lambda expressions or arrow functions, introduced in ES6 JavaScript. Lambda expressions provide a succinct alternative to anonymous functions that can be passed in as a function argument, in the spirit of writing less:</p>
<pre><code>{`
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => Math.pow(num, 2));
/ /->	[0, 1, 4,	9, 16, 25, 36, 49, 64, 81]`}</code></pre>
 

<p className="pag">Page 9</p>
<p className="it">Traduciendo la notación lambda a la notación normal de funciones</p>
<p className="p">Translating lambda notation to regular function notation</p>
<p className="it">Las expresiones lambda proporcionan una enorme ventaja sobre sintáctica notaciones función regular, ya que reducen la estructura de una función de llamar a las piezas más importantes. Esta expresión lambda ES6:</p>
<p className="p">Lambda expressions provide an enormous syntactical advantage over regular func- tion notations because they reduce the structure of a function call down to the most important pieces. This ES6 lambda expression:</p>
<pre><code>{`num => Math.pow(num, 2)`}</code></pre>
<p className="it">es equivalente a la siguiente función:</p>
<p className="p">is equivalent to the following function:</p>
<pre><code>{`function(num) {
return Math.pow(num, 2);
}`}</code></pre>
<p className="it">¿Por qué eliminar los bucles de su código? Un bucle es una estructura de control imperativo que es difícil de reutilizar y difíciles de conectar a otras operaciones. Además, implica código que está en constante cambio o mutación en respuesta a las nuevas iteraciones. Usted aprenderá que los programas funcionales objetivo de la apatridia y la inmutabilidad tanto como sea posible. código sin estado tiene ninguna posibilidad de cambiar o romper el estado global. Para lograr esto, vamos a usar funciones que evitan los efectos secundarios y los cambios de estado, conocidas como funciones puras.</p>
<p className="p">Why remove loops from your code? A loop is an imperative control structure that’s hard to reuse and difficult to plug in to other operations. In addition, it implies code that’s constantly changing or mutating in response to new iterations. You’ll learn that functional programs aim for statelessness and immutability as much as possible. Stateless code has zero chance of changing or breaking global state. To achieve this, you’ll use functions that avoid side effects and changes of state, known as pure functions.</p>
<h2 className="hdos">1.2.2	Pure functions and the problem with side effects</h2>
<p className="it">La programación funcional se basa en la premisa de que construir pro- gramas inmutables sobre la base de los componentes básicos de las funciones puras. Una función pura tiene las cualidades siguien- tes:</p>
<p className="p">Functional programming is based on the premise that you build immutable pro- grams based on the building blocks of pure functions. A pure function has the fol- lowing qualities:</p>
<li className="littag"> Sólo depende de las aportaciones y no en cualquier estado oculto o externos que pueden cambiar durante su evaluación o entre las llamadas.</li>
<li className="litag">	It depends only on the input provided and not on any hidden or external state that may change during its evaluation or between calls.</li>
<li className="littag"> No infligir cambios más allá de su alcance, tales como la modificación de un objeto global o un parámetro pasado por referencia.</li>
<li className="litag">	It doesn’t inflict changes beyond their scope, such as modifying a global object or a parameter passed by reference.</li>
<p className="p">Intuitively, any function that doesn’t meet these requirements is “impure.” Program- ming with immutability can feel strange at first. After all, the whole point of impera- tive design, which is what we’re accustomed to, is to declare that variables are to mutate from one statement to the next (they’re “variable,” after all). This is a natural thing for us to do. Consider the following function:</p>
<pre><code>{`var counter = 0; function incremento { return ++counter;
}`}</code></pre>
<p className="it">Esta función es impura porque lee / modifica una variable externa, contador, que no es local al ámbito de la función. En general, las funciones tienen efectos secundarios al leer o escribir en los recursos externos, como se muestra en la figura 1.1. Otro ejem- plo es la función populares Date.now (); su salida desde luego no es predecible y con- sistente, porque siempre depende de un factor constante cambio: el tiempo.</p>

<p className="p">This function is impure because it reads/modifies an external variable, counter, which isn’t local to the function’s scope. Generally, functions have side effects when reading from or writing to external resources, as shown in figure 1.1. Another exam- ple is the popular function Date.now() ; its output certainly isn’t predicable and con- sistent, because it always depends on a constantly changing factor: time.</p>
<p className="pag">Page 10</p>
<p className="it">En este caso, se accede a través de un contador variable global implícito (en JavaScript basado en navegador, que es el objeto de la ventana). Otro efecto secundario común se produce cuando se accede a datos de instancia a través de la palabra clave this. El comportamiento de este en JavaScript es diferente a lo es en cualquier otro lenguaje de programación, ya que determina el contexto de ejecución de una función. Esto a menudo conduce a código que es difícil razonar sobre, por lo que lo evito siempre que sea posible. Me gustaría volver a este tema en el siguiente capítulo. Los efectos secundarios pueden ocurrir en muchas situaciones, incluyendo los siguientes:</p>

<p className="p">In this case, counter is accessed via an implicit global variable (in browser-based JavaScript, it’s the window object). Another common side effect occurs when accessing instance data via the this keyword. The behavior of this in JavaScript is unlike it is in any other programming language because it determines the runtime context of a function. This often leads to code that’s hard to reason about, which is why I avoid it when possible. I revisit this topic in the next chapter. Side effects can occur in many situations, including these:</p>
<li className="littag"> Cambiar una estructura variable, propiedad, o datos de manera global</li>
<li className="litag">	Changing a variable, property, or data structure globally</li>
<li className="littag"> Cambio del valor original del argumento de una función</li>
<li className="litag">	Changing the original value of a function’s argument</li>
<li className="littag"> la entrada del usuario Procesamiento</li>
<li className="litag">	Processing user input</li>
<li className="littag"> Lanzar una excepción, a menos que sea atrapado dentro de la misma función</li>
<li className="litag">	Throwing an exception, unless it’s caught within the same function</li>
<li className="littag"> La impresión en la pantalla o la tala</li>
<li className="litag">	Printing to the screen or logging</li>
<li className="littag"> Consulta de los documentos HTML, las cookies del navegador, o bases de datos</li>
<li className="litag">	Querying the HTML documents, browser cookies, or databases</li>
<p className="it">Si no puede crear y modificar objetos o imprimir en la consola, ¿qué valor práctico obtendría de un programa como este? De hecho, las funciones puras pueden ser difíciles de usar en un mundo lleno de comportamiento dinámico y mutación. Pero la programación funcional práctica no restringe todos los cambios de estado; Sólo proporciona un marco para ayudarle a administrar y reducirlos, mientras que le permite separar lo puro de lo impuro. El código impuro produce efectos secundarios visibles externamente como los mencionados anteriormente, y en este libro examino formas de lidiar con esto.</p>
<p className="p">If you’re unable to create and modify objects or print to the console, what practical value would you get from a program like this? Indeed, pure functions can be hard to use in a world full of dynamic behavior and mutation. But practical functional pro- gramming doesn’t restrict all changes of state; it just provides a framework to help you manage and reduce them, while allowing you to separate the pure from the impure. Impure code produces externally visible side effects like those listed earlier, and in this book I examine ways to deal with this.</p>
<p className="it">Para hablar más concretamente sobre estos temas, supongamos que usted es un desarrollador en un equipo encargado de ejecutar una aplicación para gestionar datos de los estudiantes de la escuela. Listado 1.3 muestra un pequeño programa imperativo que encuentra un registro de alumnos según el número de la Seguridad Social y lo hace en el navegador (una vez más, el uso del navegador es inmaterial, sólo podría escribir tan fácilmente a la consola, una base de datos o un archivo) . Me refiero a este programa y se expanden por todo el libro como un típico escenario, en el mundo real que implica efectos secundarios por interactuando con un almacén de objetos locales externa (como una matriz de objetos) y haciendo un cierto nivel de IO.</p>

<p className="p">To talk more concretely about these issues, suppose you’re a developer on a team implementing an application to manage a school’s student data. Listing 1.3 shows a small imperative program that finds a student record by Social Security number and renders it in the browser (again, the use of the browser is immaterial; you could just as easily write to the console, a database, or a file). I refer to and expand this program throughout the book as a typical, real-world scenario that involves side effects by interacting with an external local object store (like an array of objects) and doing some level of IO.</p>
 
<p className="pag">Page 11</p>
<p className="it">Listing 1.3 función imperativo showStudent con efectos secundarios</p>
<p className="p">Listing 1.3 Imperative showStudent function with side effects</p>
<p className="it">Vamos a analizar este código adicional. Esta función expone claramente unos efectos secundarios que RIP-plo más allá de su alcance:</p>
<p className="p">Let’s analyze this code further. This function clearly exposes a few side effects that rip- ple beyond its scope:</p>
<li className="littag">También está relacionada con una variable externa (dB) para el acceso de datos debido a que la firma de la función no declara este parámetro. En cualquier punto en el tiempo, esta referencia podría llegar a ser nulo o cambiar de una llamada al siguiente, produciendo resultados completamente diferentes y poner en peligro la integridad del programa.</li>
<li className="litag">	It interacts with an external variable (db) for data access because the function signature doesn’t declare this parameter. At any point in time, this reference could become null or change from one call to the next, yielding completely different results and compromising the integrity of the program.</li>
<li className="littag"> El elementld variable global puede cambiar en cualquier momento, fuera de su control.</li>
<li className="litag">	The global variable elementld can change at any time, outside your control.</li>
<li className="littag">elementos HTML se modifican directamente. El documento HTML (DOM) es en sí mismo un recurso mutable, compartida y global.</li>
<li className="litag">	HTML elements are directly modified. The HTML document (DOM) is itself a mutable, shared, global resource.</li>
<li className="littag"> Que potencialmente puede lanzar una excepción si no se encuentra el estudiante, lo que hace que toda la pila del programa para descansar y terminar abruptamente.</li>
<li className="litag">	It can potentially throw an exception if the student isn’t found, which causes the entire program stack to unwind and end abruptly.</li>
<p className="it"> La función en el listado 1.3 depende de recursos externos, lo que hace que el código sea inflexible, difícil de trabajar y difícil de probar. Las funciones puras, por el contrario, tienen contratos claros como parte de sus firmas que describen claramente todos los parámetros formales de la función (conjunto de entradas), haciéndolos más fáciles de entender y usar.</p>
<p className="p">The function in listing 1.3 relies on external resources, which makes the code inflexible, hard to work with, and difficult to test. Pure functions, on the other hand, have clear contracts as part of their signatures that describe clearly all of the function’s for- mal parameters (set of inputs), making them simpler to understand and use.</p>

<p className="it">Vamos a poner nuestro sombrero funcional y utilizar lo que ha aprendido desde la simple programa de mensajería Imprimir- en contra de este escenario de la vida real. A medida que se sienten más cómodos con la programación funcional en este libro, usted continuará para mejorar esta aplicación con nuevas técnicas. Por el momento, se pueden hacer dos mejoras simples:</p>
<p className="p">Let’s put our functional hat on and use what you learned from the simple print- Message program against this real-life scenario. As you become more comfortable with functional programming in this book, you’ll continue to improve this implementation with new techniques. At the moment, you can make two simple enhancements:</p>
<li className="littag"> Separar esta función largo en funciones más cortos, cada uno con un único fin.</li>
<li className="litag">	Separate this long function into shorter functions, each with a single purpose.</li>
<li className="littag"> Reducir el número de efectos secundarios definiendo explícitamente todos los argumentos necesarios para las funciones para llevar a cabo su trabajo.</li>
<li className="litag">	Reduce the number of side effects by explicitly defining all arguments needed for the functions to carry out their job.</li>
<p className="it"> Comencemos separando las actividades de extraer el registro del estudiante de mostrarlo en la pantalla. Por supuesto, los efectos secundarios de la interacción con un almacenamiento externo </p>
<p className="p">Let’s begin by separating the activities of fetching the student record from displaying it on the screen. Granted, the side effects from interacting with an external storage</p>
 
<p className="pag">Page 12</p>
<h1 className="huno">CHARTER 1 </h1>
<p className="it">Convirtiéndose en el sistema funcional y el DOM son inevitables, pero al menos se puede hacer más manejable y hacen que destaquen por la lógica principal. Para ello, voy a introducir un popular técnica de FP llamada currificación. Con currificación, se puede establecer parcialmente algunos de los argumentos de una función con el fin de reducirlos a uno. Como se muestra en la siguiente tabla, se puede aplicar al curry para reducir hallazgo y añadir a las funciones unarios que puede fácilmente com- bine a través de ejecución.</p>

<p className="p">Becoming functional system and the DOM are unavoidable, but at least you can make them more manage- able and single them out from the main logic. To do this, I’ll introduce a popular FP technique called currying. With currying, you can partially set some of the arguments of a function in order to reduce them down to one. As shown in the next listing, you can apply curry to reduce find and append to unary functions that can easily com- bine via run.</p>
<p className="it">1.4 Descomposición de lista del programa showStudent</p>
<p className="p">Listing 1.4 Decomposing the showStudent program</p>
<p className="it">No es necesario entender currying ahora, pero es importante ver que la posibilidad de reducir la duración de estas funciones le permite escribir showStudent como la combinación de estas partes más pequeñas:</p>
<p className="p">You don’t need to understand currying now, but it’s important to see that being able to reduce the length of these functions lets you write showStudent as the combination of these smaller parts:</p>
<p className="it">Aunque este programa se ha mejorado sólo marginalmente, que está empezando a mostrar muchos beneficios:</p>

<p className="p">Although this program has been only marginally improved, it’s beginning to show many benefits:</p>
<li className="littag"> Es mucho más flexible, ya que ahora tiene tres componentes reutilizables.</li>
<li className="litag">	It’s a lot more flexible, because it now has three reusable components.</li>
<li className="littag"> Esta reutilización función de grano fino es una estrategia para aumentar su productividad, porque se puede reducir drásticamente la huella de código que debe ser gestionado de forma activa.</li>
<li className="litag">	This fine-grained function reuse is a strategy for increasing your productivity, because you can dramatically reduce the footprint of code that must be actively managed.</li>
<li className="littag"> A mejorar la legibilidad del código siguiendo un estilo declarativo que proporciona una visión clara de los pasos de alto nivel llevadas a cabo por este programa.</li>
<li className="litag">	You enhance the code’s readability by following a declarative style that provides a clear view of the high-level steps carried out by this program.</li>
<li className="littag">Más importante, la interacción con los objetos HTML se trasladó a su propia fun- ción, aislando el puro a partir del comportamiento no-pura (impuro). Me explico ing curry- y la gestión de partes puras e impuras en profundidad en el capítulo 4.</li>
<li className="litag">	More important, interaction with the HTML objects is moved into its own func- tion, isolating the pure from the non-pure (impure) behavior. I explain curry- ing and managing pure and impure parts in depth in chapter 4.</li>
 
<p className="pag">Page 13</p>
<p className="it"> Este programa tiene algunos extremos sueltos que necesitan ser ajustados, pero reducir los efectos secundarios hará que sea menos quebradizo a las cambiantes condiciones externas. Si miras más de cerca la función find, notarás que tiene una sentencia de ramificación null-check que puede producir una excepción. Por muchas razones, que estudiaremos más adelante, es beneficioso garantizar un valor de retorno consistente de una función, haciendo que su resultado sea consistente y previsible. Esta es una calidad de funciones puras llamadas transparencia referencial. </p>
<p className="p">This program stili has some loose ends that need to be tightened, but reducing side effects will make it less brittle to changing external conditions. If you look closer at the find function, you’ll notice it has a null-check branching statement that can produce an exception. For many reasons, which we’ll study later, it’s beneficial to guarantee a consistent return value from a function, making its result consistent and predicable. This is a quality of pure functions called referential transparency.</p>
<h2 className="hdos">1.2.3 Referential transparency and substitutability</h2>
<p className="it">transparencia referencial es una manera más formal de la definición de una función pura. Pureza en este sentido se refiere a la existencia de una correlación de puro entre los argumentos de una función y su valor de retorno. Por lo tanto, si una función produce consistentemente el mismo resultado en la misma entrada, se dice que ser referencialmente transparente. Por ejemplo, la función de incremento de estado mostrado anteriormente no es referencialmente transparente porque su valor de retorno es muy dependiente de la variable contador externo. Aquí está de nuevo:</p>
<p className="p">Referential transparency is a more formal way of defining a pure function. Purity in this sense refers to the existence of a pure mapping between a function’s arguments and its return value. Hence, if a function consistently yields the same result on the same input, it’s said to be referentially transparent. For instance, the stateful increment function shown earlier isn’t referentially transparent because its return value is heavily dependent on the external variable counter. Here it is again:</p>
<pre><code>{`var counter = 0;
function incremento { return ++counter;
}`}</code></pre>
<p className="it">Con el fin de hacer que sea referencialmente transparente, es necesario eliminar la variable de estado y el exterior depende que sea un parámetro formal explícito de la firma de la función. Se puede convertir a la forma lambda ES6:</p>
<p className="p">In order to make it referentially transparent, you need to remove its dependent state—the outer variable—and make it an explicit formal parameter of the function signature. You can convert it to ES6 lambda form:</p>
<pre><code>{`var increment = counter => counter + 1;`}</code></pre>
<p className="it">Ahora esta función es estable y siempre devuelve la misma salida cuando se proporciona con la misma entrada. De lo contrario, el valor devuelto por la función está siendo influenciado por algún factor exter- nos.</p>
<p className="p">Now this function is stable and always returns the same output when provided with the same input. Otherwise, the function’s return value is being influenced by some exter- nal factor.</p>
<p className="it">Buscamos esta calidad en funciones, ya que no sólo hace que el código más fácil de probar, sino que también nos permite razonar sobre programas enteros con mucha más facilidad. transparencia referencial o corrección ecuacional se heredan de matemáticas, sino que funciona en len- guaje de programación se comportan nada como funciones matemáticas; consiguiendo así perdería transparencia referencial es estrictamente en nosotros. Utilizando la función de ejecución mágica de nuevo, la figura 1.2 muestra cómo utilizar el imperativo frente a la versión funcional de incremento.</p>
<p className="p">We seek this quality in functions because it not only makes code easier to test, but also allows us to reason about entire programs much more easily. Referential transparency or equational correctness is inherited from math, but functions in programming lan- guages behave nothing like mathematical functions; so achieving referential transpar- ency is strictly on us. Using the magical run function again, figure 1.2 shows how to use the imperative versus the functional version of increment.</p>
<p className="it">Programas construidos de esta forma son mucho más fáciles de razonar acerca de porque se puede formar un modelo mental del estado del sistema y lograr el resultado deseado a través de la reescritura o sustitución. Veamos esto más concreta y asumen que cualquier programa puede definirse como un conjunto de funciones que procesa una entrada dada y produce una puesta OUT-. Aquí está en forma de pseudo:</p>
<p className="p">Programs built this way are much easier to reason about because you can form a mental model of the state of the system and achieve the desired outcome through rewriting or substitution. Let’s look at this more concretely and assume that any program can be defined as a set of functions that processes a given input and produces an out- put. Here it is in pseudo form:</p>
<pre><code>{`Program = [Input] + [func1, func2, func3, ...]	-> Output`}</code></pre>
<p className="pag">Page 14</p>
<p className="it">Figura 1.2 Comparación de trabajar con versiones imperativas y funcionales de incremento. El resultado de la versión imperativa es impredecible y puede ser inconsistente porque la variable de contador externa puede cambiar en cualquier momento, comprometiendo el resultado de invocaciones sucesivas de la función. La versión funcional transparentemente referencial es siempre equacionalmente correcta y no deja lugar a errores.</p>
<p className="p">Figure 1.2 Comparison of working with imperative and functional versions of increment. The result of the imperative version is unpredictable and can be inconsistent because the external counter variable may change at any time, compromising the result of successive invocations of the function. The referentially transparent functional version is always equationally correct and leaves no room for errors.</p>
<p className="it">Si las funciones [funcl, func2, func3, ...] son &#8203;&#8203;puros, se puede reescribir fácilmente este pro- grama por inlining los valores producidos por ellos- [vali, val2, val3, ...] - sin alterar el resultado. Consideremos un ejemplo sencillo de calcular el grado promedio de un estudiante:</p>
<p className="p">If the functions [funcl, func2, func3, ...] are pure, you can easily rewrite this pro- gram by inlining the values produced by them—[vali, val2, val3, ...]—without altering the result. Consider a simple example of computing a student’s average grade:</p>
<pre><code>{`
var input =	[80,	90, 100];
var average = (arr) => divide(sum(arr), size(arr)); average (input); //-> 90`}</code></pre>
<p className="it">Debido a que la suma de las funciones y el tamaño son referencialmente transparente, se puede volver a escribir fácilmente esta expresión para la entrada dada como:</p>
<p className="p">Because the functions sum and size are referentially transparent, you can easily rewrite this expression for the given input as:</p>
<pre><code>{`var average = divide(270, 3); //-> 90`}</code></pre>
<p className="it">Debido división es siempre pura, se puede volver a escribir aún más utilizando su notación matemática ción; por lo que para esta entrada, el promedio siempre es 270/3 = 90. Referencial transparencia hace posible razonar acerca de los programas en este sistemática casi matemática, forma,. El programa completo se puede realizar de la siguiente manera:</p>
<p className="p">Because divide is always pure, it can be rewritten further using its mathematical nota- tion; so for this input, the average is always 270/3 = 90. Referential transparency makes it possible to reason about programs in this systematic, almost mathematical, way. The entire program can be implemented as follows:</p>
<p className="it">Aunque no va a aplicar el razonamiento ecuacional a todos los programas en el libro, es importante entender que esto está implícito en cualquier programa puramente funcional, y que no sería posible si las funciones tuvieron efectos secundarios. En el capítulo 6, vuelvo a la importancia de este principio en el contexto de código de prueba de la unidad funcional. Defin- ing todos los argumentos de la función en la delantera evita los efectos secundarios en la mayoría de los casos, al igual que con valores escalares; pero cuando los objetos se pasan por referencia, se debe tener cuidado de no inadvertidamente mutar ellos.</p>
<p className="p">Although I don’t plan to apply equational reasoning to every program in the book, it’s important to understand that this is implicit in any purely functional program, and that it wouldn’t be possible if functions had side effects. In chapter 6, I come back to the importance of this principle in the context of unit testing functional code. Defin- ing all function arguments up front avoids side effects in most cases, as with scalar values; but when objects are passed by reference, you must be cautious not to inadver- tently mutate them.</p>
<h2 className="hdos">1.2.4	Preserving immutable data</h2>
<p className="it">inmutable datos son datos que no se puede cambiar después de haber sido creado. En JavaScript, como ocurre con muchos otros idiomas, todos los tipos primitivos (String, Número, y así sucesivamente) son inherentemente inmutable. Sin embargo, otros objetos, como matrices, no son inmutables; incluso si están pasados &#8203;&#8203;como entrada para una función, todavía puede causar un efecto secundario cambiando el contenido original. Considere este sencillo código de matriz de clasificación:</p>
<p className="p">Immutable data is data that can’t be changed after it’s been created. In JavaScript, as with many other languages, all primitive types (String, Number, and so on) are inher- ently immutable. But other objects, like arrays, aren’t immutable; even if they’re passed as input to a function, you can still cause a side effect by changing the original content. Consider this simple array-sorting code:</p>
<p className="pag">Page 15</p>

<pre><code>{`var sortDesc = function (arr) {
return arr.sort(function (a, b) { return b - a;
});
}`}</code></pre>
<p className="it">A primera vista, este código parece perfectamente bien y es partidario del libre efecto. Se hace lo que se espera que haga-usted proporciona una matriz y devuelve la misma matriz ordenada en orden descen- dientes ING:</p>
<p className="p">At a glance, this code seems perfectly fine and side effect-free. It does what you’d expect it to do—you provide an array, and it returns the same array sorted in descend- ing order:</p>
<pre><code>{`var arr =	[1,2,3,4,5,6,7,8,9];
sortDesc(arr); //->	[9,8,7,6,5,4,3,2,1]`}</code></pre>
<p className="it">Desafortunadamente, la función Array.sort es con estado y provoca el efecto secundario de la clasificación de la matriz en lugar-la referencia original se cambia. Este es un serio defecto en el len- guaje y que vamos a superar en los próximos capítulos.</p>
<p className="p">Unfortunately, the Array.sort function is stateful and causes the side effect of sorting the array in place—the original reference is changed. This is a serious flaw in the lan- guage and one that we’ll overcome in future chapters.</p>
<p className="it">Ahora que usted ha tenido una visión de los principios fundamentales de la programación funcional (declarativa, pura, e inmutable), puedo expresar lo que es más Suc cinctly: programación funcional se refiere a la evaluación de las funciones declarativa puros para crear programas inmutables por evitando los efectos secundarios observables externamente. No es un bocado después de todo. Sólo he arañado la superficie en términos de los beneficios prácticos de la escritura de aplicaciones funcio- nales, pero por ahora se está empezando a entender lo que significa pensar con esta mentalidad.</p>
<p className="p">Now that you’ve had a glimpse of the fundamental principles behind functional programming (declarative, pure, and immutable), I can express what it is more suc- cinctly: functional programming refers to the declarative evaluation of pure functions to create immutable programs by avoiding externally observable side effects. Not such a mouthful after all. I’ve only scratched the surface in terms of the practical benefits of writing func- tional applications, but by now you’re beginning to understand what it means to think with this mindset.</p>
<p className="it">La mayor parte de los problemas que enfrentan hoy en día los desarrolladores de JavaScript se deben al uso intensivo de las grandes funciones que dependen en gran medida de las variables compartidas externamente, hacer un montón de ING rama-y no tienen una estructura clara. Por desgracia, esta es la situación para muchas aplicaciones Java script que tienen éxito compone de muchos archivos que se ejecutan entre sí, formando una malla compartida de datos mundial mutable que puede ser difícil de rastrear y depurar aún hoy en día.</p>
<p className="p">Most of the issues JavaScript developers face nowadays are due to the heavy use of large functions that rely greatly on externally shared variables, do lots of branch- ing, and have no clear structure. Unfortunately, this is the situation for many Java- Script applications today—even successful ones made up of many files that execute together, forming a shared mesh of mutable, global data that can be hard to track and debug.</p>
<p className="it">Se ven obligados a pensar en términos de operaciones puras y mirando a funciones como unidades selladas de trabajo que nunca mutan datos definitivamente puede reducir la posibilidad de errores. La comprensión de estos principios básicos es importante con el fin de aprovechar los beneficios de la programación funcional aporta a su código, que le guiará en el camino hacia la superación de la complejidad.</p>
<p className="p">Being forced to think in terms of pure operations and looking at functions as sealed units of work that never mutate data can definitely reduce the potential for bugs. Understanding these core principles is important in order to reap the benefits functional programming brings to your code, which will guide you on the path to overcoming complexity.</p>
<p className="pag">Page 16</p>

<h2 className="hdos">1.3	Benefits of functional programming</h2>
<p className="it">Con el fin de beneficiarse de la programación funcional, debe aprender a pensar FunciÃ³n- aliado y tener las herramientas adecuadas. En esta sección, presento algunas técnicas básicas que son indispensables para su caja de herramientas con el fin de desarrollar su conciencia funcional, el instinto de ver los problemas como una combinación de funciones simples que en conjunto proporcionan una solución completa. Los temas presentados en esta sección también sirven como una breve introducción a algunos de los próximos capítulos en el libro. Si es un concepto difícil de entender ahora, no se preocupe; se hará más claro a medida que avanza por el resto de los capítulos.</p>
<p className="p">In order to benefit from functional programming, you must learn to think function- ally and have the proper tools. In this section, I introduce some core techniques that are indispensable for your toolbox in order to develop your functional awareness—the instinct of looking at problems as a combination of simple functions that together provide a complete solution. The topics introduced in this section also serve as a brief introduction to some of the upcoming chapters in the book. If a concept is hard to grasp now, don’t worry; it will become clearer as you progress through the rest of the chapters.</p>
<p className="it">Ahora vamos a explorar en un nivel alto los beneficios FP aporta a sus aplicaciones de JavaScript. Las siguientes subsecciones explicar cómo se puede</p>
<p className="p">Now let’s explore at a high level the benefits FP brings to your JavaScript applications. The following subsections explain how it can</p>
<li className="littag"> animarle para descomponer las tareas en funciones simples</li>
<li className="litag">	Encourage you to decompose tasks into simple functions</li>
<li className="littag"> Los datos de proceso utilizando cadenas fluidas</li>
<li className="litag">	Process data using fluent chains</li>
<li className="littag"> Disminuir la complejidad del código dirigido por eventos, permitiendo paradigmas reactivos</li>
<li className="litag">	Decrease the complexity of event-driven code by enabling reactive paradigms</li>
<h2 className="hdos">1.3.1	Encouraging the decomposition of complex tasks</h2>
<p className="it"> A un nivel alto, la programación funcional es efectivamente la interacción entre la descomposición (romper los programas en pequeños fragmentos) y la composición (uniendo las piezas de nuevo). Esta dualidad hace que los programas funcionales sean modulares y eficaces. Como mencioné anteriormente, la unidad de modularidad, o unidad de trabajo, es la función en sí. Pensar funcionalmente típicamente comienza con la descomposición aprendiendo a romper una tarea particular en subtareas lógicas (funciones), como se muestra en la descomposición de showStudent en la figura 1.3. </p>
<p className="p">At a high level, functional programming is effectively the interplay between decompo- sition (breaking programs into small pieces) and composition (joining the pieces back together). It’s this duality that makes functional programs modular and so effec- tive. As I mentioned previously, the unit of modularity, or unit of work, is the function itself. Thinking functionally typically begins with decomposition by learning to break a particular task into logical subtasks (functions), as shown in the decomposition of showStudent in figure 1.3.</p>
<p className="it">Si sea necesario, estas subtareas se pueden descomponer aún más hasta llegar a las funciones más simples, puras, cada una de las cuales es una unidad independiente del trabajo. Recuerde que este fue el proceso de pensamiento Seguí al refactorizar showStudent en el listado 1.4. ción Modulariza- en FP está estrechamente relacionado con el principio de singularidad, que establece que las funciones deben tener un solo propósito; Esto también fue evidente en el código para media, que se muestra anteriormente. La pureza y la transparencia referencial que animan a pensar de esta manera, porque a fin de pegar funciones simples juntos, deben ponerse de acuerdo sobre los tipos de entradas y salidas. Desde transparencia referencial, se aprende que la complejidad de una función es A VECES directamente relacionados con el número de argumentos que recibe (esto es simplemente una observación práctica y no un concepto formal que indica que cuanto menor sea el número de parámetros de la función, mientras más simple, función tiende a ser).</p>
<p className="p">If need be, these subtasks can be decomposed further until you arrive at simpler, pure functions, each of which is an independent unit of work. Remember that this was the thought process I followed when refactoring showStudent in listing 1.4. Modulariza- tion in FP is closely related to the singularity principle, which states that functions should have a single purpose; this was also evident in the code for average, shown earlier. Purity and referential transparency encourage you to think this way because in order to glue simple functions together, they must agree on the types of inputs and outputs. From referential transparency, you learn that a function’s complexity is some- times directly related to the number of arguments it receives (this is merely a practical observation and not a formal concept indicating that the lower the number of func- tion parameters, the simpler the function tends to be).</p>
<p className="pag">Page 17</p>
<p className="it"> Todo el tiempo, he estado usando run para combinar funciones para componer programas enteros. Es hora de descubrir esta magia oscura. En realidad, run es un alias para una de las técnicas más importantes: composición. La composición de dos funciones es otra función que resulta de tomar la salida de una y conectarlo a la siguiente. Suponga que tiene dos funciones fyg. Formalmente, esto se puede expresar como sigue: </p>
<p className="p">All along, I’ve been using run to combine functions to make up whole programs. It’s time to uncover this dark magic. In reality, run is an alias for one the most impor- tant techniques: composition. The composition of two functions is another function that results from taking the output of one and plugging it into the next. Assume that you have two functions f and g. Formally, this can be expressed as follows:</p>
<pre><code>{`
f • g = f(g(x))`}</code></pre>
<p className="it">Esta fórmula lee “f compone de g”, que crea una relación floja, de tipo seguro entre el valor de retorno de g y el argumento de f. El requisito de dos funciones sean compatibles es que deben estar de acuerdo en el número de argumentos, así como sus tipos. Vamos a ver esto de cerca en el capítulo 3. Por ahora, vamos a diagrama de la composición del Estudiante show-en la figura 1.4, esta vez utilizando la función correcta, componer:</p>

<p className="p">This formula reads “f composed of g,” which creates a loose, type-safe relationship between g’s return value and f’s argument. The requirement for two functions to be compatible is that they must agree in the number of arguments as well as their types. We’ll look at this closely in chapter 3. For now, let’s diagram the composition of show- Student in figure 1.4, this time using the correct function, compose:</p>
<pre><code>{`var showStudent = compose(append('#student-info'), csv, find(db));
 showStudent('444-44-4444');`}</code></pre>
<p className="it">Figura 1.4 El flujo de datos al componer dos funciones. El valor de retorno de find debe ser compatible en tipo y arity con los argumentos de csv, que a su vez devuelve la información que append puede utilizar. Tenga en cuenta que con el fin de hacer que el flujo de datos claro, volteé el orden de las llamadas de función.</p>
<p className="p">Figure 1.4 The flow of data when composing two functions. The return value from find must be compatible in type and arity with the arguments to csv, which in turn returns information that append can use. Note that in order to make the flow of data clear, I flipped the order of the function calls.</p>
<p className="it">Comprensión de composición es crucial para el aprendizaje de cómo implementar la modularidad y la reutilización en aplicaciones funcionales; Discuto esto en detalle en el capítulo 4. Composición funcional conduce al código en el que el significado de la expresión completa se puede entender desde el sentido de su persona piezas, una cualidad que se vuelve difícil de lograr en otros paradigmas.</p>

<p className="p">Understanding compose is crucial for learning how to implementing modularity and reusability in functional applications; I discuss this at length in chapter 4. Functional composition leads to code in which the meaning of the entire expression can be understood from the meaning of its individual pieces—a quality that becomes hard to achieve in other paradigms.</p>
<p className="it">Además, la composición funcional eleva el nivel de abstracción para que pueda definir claramente todos los pasos realizados en el código sin estar expuestos a cualquiera de sus datos subyacentes. Debido a que componga acepta otras funciones como argumentos, se le conoce como un nivel superior de orderfunction. Pero la composición no es la única manera de crear código de fluidez, modular; en este libro, también aprenderá cómo construir secuencias de operaciones por Connect-ing operaciones de una manera similar a la cadena.</p>

<p className="p">In addition, functional composition raises the level of abstraction so that you can clearly outline all the steps performed in this code without being exposed to any of its underlying details. Because compose accepts other functions as arguments, it’s known as a higher-orderfunction. But composition isn’t the only way to create fluent, modular code; in this book, you’ll also learn how to build sequences of operations by connect- ing operations in a chain-like manner.</p>
<p className="pag">Page 18</p>
<h2 className="hdos">1.3.2	Processing data using fluent chains</h2>
<p className="it">Además de mapa, puede importar un repertorio de muchas funciones de orden superior en cualquier proyecto de JavaScript a través de algunas bibliotecas funcionales potentes y optimizados. En los capítulos 3 y 4, me importa un recorrido por muchas de estas funciones de orden superior implementadas en kits de herramientas funcionales de JavaScript populares como Lodash.js y Ramda.js; se superponen en muchos aspectos, pero cada uno aporta características únicas que pueden facilitar el montaje de cadenas ción fun-.</p>

<p className="p">In addition to map, you can import a repertoire of many higher-order functions into any JavaScript project through some powerful and optimized functional libraries. In chapters 3 and 4, I give a tour of many of these higher-order functions implemented in popular JavaScript functional toolkits like Lodash.js and Ramda.js; they overlap in many aspects, but each brings unique features that can facilitate assembling func- tion chains.</p>
<p className="it">Si usted ha escrito algo de código jQuery antes, probablemente esté familiarizado con este idioma. Una cadena es una invocación secuencial de funciones que comparten un valor de retorno de objeto común (tal como el S o el objeto jQuery). Al igual composición, este idioma le permite escribir código escueta y concisa, y que por lo general se utiliza mucho en funcional, así como bibliotecas JavaScript programación tivo reac- (más sobre esto más adelante). Para demostrar esto, vamos a hacer frente a un problema diferente. Supongamos que usted está asignada a escribir un programa que calcula la nota media de studente que se han inscrito en más de una clase. Dado este conjunto de datos de inscripción:</p>

<p className="p">If you’ve written some JQuery code before, you’re probably familiar with this idiom. A chain is a sequential invocation of functions that share a common object return value (such as the S or jQuery object). Like composition, this idiom allows you to write terse and concise code, and it’s typically used a lot in functional as well as reac- tive programming JavaScript libraries (more on this later). To show this, let’s tackle a different problem. Suppose you’re tasked with writing a program that computes the average grade for studente who have enrolled in more than one class. Given this array of enrollment data:</p>

<pre><code>{`let enrollment = [
{enrolled: 2, grade: 100},
{enrolled: 2, grade: 80},
{enrolled: 1, grade: 89}
];`}</code></pre>
<p className="it">un enfoque imperativo podría tener este aspecto:</p>

<p className="p">an imperative approach might look like this:</p>
<pre><code>{`var totalGrades = 0;
var totalStudentsFound = 0;
for(let i = 0; i < enrollment.length; i++)	{
let student = enrollment [i]; if(student !== null) {
if(student.enrolled > 1)	{
totalGrades+= student.grade; totalStudentsFound++;
}
}
}
var average = totalGrades / totalStudentsFound; //-> 90`}</code></pre>
<p className="it">Al igual que antes, la descomposición de este problema con una mentalidad funcional, se pueden identificar tres pasos principales:</p>

<p className="p">Just as before, decomposing this problem with a functional mindset, you can identify three major steps:</p>
<li className="littag"> Selección del conjunto adecuado de los estudiantes (cuya inscripción es mayor que uno)</li>
<li className="litag">	Selecting the proper set of students (whose enrollment is greater than one)</li>
<li className="littag"> La extracción de sus calificaciones</li>
<li className="litag">	Extracting their grades</li>
<li className="littag"> Calculando su promedio de calificaciones</li>
<li className="litag">	Calculating their average grade</li>
<p className="pag">Page 19</p>
<p className="it">Ahora puede usar Lodash para unir funciones que representan estos pasos, formando una cadena funcional, como se muestra en el listado 1.5 (para una explicación completa de lo que cada una de estas funciones hace, puede visitar la Apéndice para instrucciones sobre dónde encontrar la documentación apropiada). Una cadena de funciones es un programa evaluado perezoso, lo que significa que difiere su ejecución hasta que sea necesario. Esto beneficia el rendimiento porque puede evitar ejecutar secuencias enteras de código que no se utilizarán en ningún otro lugar, lo que ahorrará preciosos ciclos de CPU. Esto simula de forma efectiva el comportamiento de llamada por necesidad construido en otros idiomas funcionales. </p>
<p className="p">Now you can use Lodash to stitch together functions representing these steps, form- ing a functional chain, as shown in listing 1.5 (for a full explanation of what each of these functions does, you can visit the appendix for directions on where to fmd the proper documentation). A function chain is a lazy evaluated program, which means it defers its execution until needed. This benefits performance because you can avoid executing entire sequences of code that won’t be used anywhere else, saving precious CPU cycles. This effectively simulates the call-by-need behavior built into other func- tional languages.</p>
<p className="it">Listing 1.5 Programación con cadenas de funciones</p>

<p className="p">Listing 1.5 Programming with function chains</p>
<p className="it">No se preocupe demasiado en este punto con todo lo que está sucediendo en este código. Por ahora, compararlo con la versión imperativa, y observe cómo se puede eliminar la necesidad de declarar y cambiar las variables, bucles, y las declaraciones if-else. Como veremos en el capítulo 7, muchos mecanismos de control de flujo imperativas como bucles y ramificaciones aumentan el nivel de complejidad de sus funciones, ya que ejecutan diferentes caminos Dependiendo de ciertas condiciones, haciéndolos muy difíciles de probar.</p>

<p className="p">Don’t be too concerned at this point with everything that’s happening in this code. For now, compare it to the imperative version, and notice how you can eliminate the need to declare and change variables, loops, and if-else statements. As you’ll learn in chapter 7, many imperative control-flow mechanisms like loops and branches increase the level of complexity of your functions because they execute different paths depend- ing on certain conditions, making them incredibly difficult to test.</p>
<p className="it">Para ser justos, sin embargo, este ejemplo se salta una gran cantidad de código de control de errores se encuentran en los típicos programas del mundo real. Anteriormente, he mencionado que lanzar excepciones era una causa de efectos secundarios. Las excepciones no existen en la programación funcional académica, pero en la vida real no serán capaces de escapar de ellos. Hay una distinción entre la gestión de errores puro y manejo de excepciones. El objetivo es implementar el manejo de errores pura tanto como sea posible y permitir excepciones a fuego en condiciones verdaderamente excepcionales, al igual que las descritas anteriormente.</p>
<p className="p">To be fair, though, this example skips a lot of error-handling code found in typical real-world programs. Earlier, I mentioned that throwing exceptions was a cause of side effects. Exceptions don’t exist in academic functional programming, but in real life you won’t be able to escape them. There’s a distinction between pure error handling and exception handling. The goal is to implement pure error handling as much as possible and allow exceptions to fire in truly exceptional conditions, just like the ones described earlier.</p>
<p className="it">Afortunadamente, mediante la aplicación de algunos patrones de diseño puramente funcionales, que no se necesita sacrificar a este nivel de expresividad para proporcionar robusta lógica de manejo de errores para su código. Este es el principal tema de discusión en el capítulo 5.</p>
<p className="p">Fortunately, by applying some purely functional design patterns, you won’t need to sacrifice this level of expressiveness to provide robust error-handling logic for your code. This is the main topic of discussion in chapter 5.</p>
<p className="it">Hasta ahora, usted ha visto cómo FP puede ayudar a crear aplicaciones modulares, comprobables, extensibles. ¿Qué tan bien funciona cuando se necesita para interactuar con los datos asíncronos o basadas en eventos procedentes de la entrada del usuario, las peticiones web remotos, sistemas de archivos, o el almacenamiento sistente per-?</p>
<p className="p">So far, you’ve seen how FP can help you create modular, testable, extensible applications. How well does it work when you need to interact with asynchronous or event-based data coming from user input, remote web requests, file systems, or per- sistent storage?</p>
<h2 className="hdos">1.3.3	Reacting to the complexity of asynchronous applications</h2>
<p className="it">Si recuerda la última vez que tuvo que obtener los datos remotas, manejar la entrada del usuario, o interactuar con el almacenamiento local, es probable que recuerdan la escritura secciones enteras de la lógica de negocio en secuencias anidadas de funciones de devolución de llamada. Este patrón de devolución de llamada rompe el flujo lineal de su código y se hace difícil de leer, porque está atestado de formas anidadas de la lógica éxito- y control de errores. Esto es todo a punto de cambiar.</p>
<p className="p">If you remember the last time you had to fetch remote data, handle user input, or interact with local storage, you probably recall writing entire sections of business logic into nested sequences of callback functions. This callback pattern breaks the linear flow of your code and becomes hard to read, because it’s cluttered with nested forms of success- and error-handling logic. This is all about to change.</p>
<p className="pag">Page 20</p>
<p className="it">Como he dicho antes, el aprendizaje de la programación funcional, especialmente para los Ircops desa- JavaScript, es muy importante hoy en día. Cuando la construcción de aplicaciones de gran tamaño, una gran parte de la atención se ha desplazado de los marcos orientados a objetos como Backbone.js a los marcos que favorezcan un paradigma de programación reactiva. marcos web como AngularJS siguen siendo ampliamente utilizados hoy en día; pero los nuevos jugadores en el campo, tales como RxJS, abrazan el poder de FP para hacer frente a tareas muy difíciles.</p>
<p className="p">As I said earlier, learning functional programming, especially for JavaScript devel- opers, is extremely important today. When building large applications, a lot of the focus has shifted from object-oriented frameworks like Backbone.js to frameworks that favor a reactive programming paradigm. Web frameworks like Angularjs are still widely used today; but new players in the field, such as RxJS, embrace the power of FP to tackle very challenging tasks.</p>
<p className="it">la programación reactiva es probablemente una de las más excitantes e interesantes aplica- ciones de programación funcional. Se puede utilizar para reducir drásticamente la complejidad de código asíncrono y orientada a eventos que, como desarrolladores de JavaScript, se ocupa de todos los días en el cliente, así como el servidor.</p>
<p className="p">Reactive programming is probably one of the most exciting and interesting appli- cations of functional programming. You can use it to dramatically reduce the com- plexity in asynchronous and event-driven code that you, as JavaScript developers, deal with on a daily basis on the client as well as the server.</p>
<p className="it">El principal beneficio de la adopción de un paradigma reactiva es que aumenta el nivel de abstracción de su código, lo que le permite centrarse en la lógica de negocio específico, mientras que olvidando sobre el código repetitivo ardua asociados con la apertura asincrónica y programas basados &#8203;&#8203;en eventos. Además, este paradigma emergente aprovecha al máximo dad abil- de FP a la cadena o componer funciones juntas.</p>
<p className="p">The main benefit of adopting a reactive paradigm is that it raises the level of abstraction of your code, allowing you to focus on specific business logic while forget- ting about the arduous boilerplate code associated with setting up asynchronous and event-based programs. Also, this emerging paradigm takes full advantage of FP’s abil- ity to chain or compose functions together.</p>
<p className="it">Eventos vienen en muchos sabores: clics del ratón, cambios en el campo de texto, se centran cambios, manipulan de dling peticiones HTTP, nuevas consultas de bases de datos, archivos, escribe, y así sucesivamente. Supongamos que necesita para leer y validar el SSN de un estudiante. Un enfoque típico imperativo podría ser como la siguiente lista.</p>
<p className="p">Events come in many flavors: mouse clicks, text field changes, focus changes, han- dling new HTTP requests, database queries, file writes, and so on. Suppose you need to read and validate a student’s SSN. A typical imperative approach might look like the next listing.</p>
<p className="it">Añadir 1,6 programa imperativo que lee y valida el SSN de un estudiante</p>
<p className="p">Listing 1.6 Imperative program that reads and validates a student’s SSN</p>
<p className="it">Para una tarea tan sencilla, esto está empezando a parecer compleja; y el código carece el nivel deseado de modularidad con toda la lógica de negocio en un solo lugar. Además, esta función no es reutilizable debido a su dependencia de estado externo. Debido a la programación reactiva se basa en la programación funcional, se beneficia de la utilización de funciones puras de datos pro- Cess con las mismas operaciones conocidas, como el mapa y la reducción y la concisión de las expresiones lambda. Así que aprender funcional es la mitad de la batalla cuando el aprendizaje reactiva!</p>
<p className="p">For such a simple task, this is beginning to look complex; and the code lacks the desired level of modularity with all business logic in a single place. Also, this function isn’t reusable due to its dependency on external state. Because reactive programming is based on functional programming, it benefits from the use of pure functions to pro- cess data with the same familiar operations like map and reduce and the terseness of lambda expressions. So learning functional is half the battle when learning reactive!</p>
 
<p className="pag">Page 21</p>
<p className="it">Este paradigma se activa a través de un artefacto muy importante que se llama un observable. ables observables permiten suscribe a una corriente de datos que se pueden procesar mediante la composición y las operaciones encadenando con elegancia. Vamos a verlo en acción y suscribirse a un campo de entrada simple para el SSN de un estudiante.</p>

<p className="p">This paradigm is enabled through a very important artifact called an observable. Observ- ables let you subscribe to a stream of data that you can process by composing and chaining operations together elegantly. Let’s see it in action and subscribe to a simple input field for a student’s SSN.</p>
<p className="it">Añadir 1,7 programa funcional que lee y valida el SSN de un estudiante:</p>

<p className="p">Listing 1.7 Functional program that reads and validates a student’s SSN:</p>
<pre><code>{`Rx.Observable.fromEvent(document.querySelector('#student-ssn'), 'keyup') .map(input => input.srcElement.value)
.filter(ssn => ssn !== null && ssn.length !== 0)
.map(ssn => ssn.replace(/^\s*|\s*S|\-/g,	''))
.skipWhile(ssn => ssn.length !== 9)
.subscribe(
validSsn => console.log('Valid SSN S{validSsn}')
);`}</code></pre>
<p className="it">¿Puede usted ver la similitud entre 1,7 y lista de programación con cadenas en el listado 1.5? Esto demuestra que si está procesando una colección de elementos o entradas de usuario, todo se abstrae y tratada de la misma manera exacta. Tengo mucho más que decir acerca de esto en el capítulo 8.  </p>

<p className="p">Can you see the similarity between listing 1.7 and programming with chains in list- ing 1.5? This shows that whether you’re processing a collection of elements or user input, it’s all abstracted out and treated in the exact same manner. I have much more to say about this in chapter 8.  </p>
<p className="it">Uno de los robos de balón más importantes es que todas las operaciones que se realizan en la lista- Ing 1.7 son completamente inmutable, y toda la lógica de negocio se segregan en funciones indi- viduo. Usted no tiene que usar funcional con reactivos, pero pensando funcionalmente te obliga a hacerlo, y cuando lo hace, se desbloquea una arquitectura realmente sorprendentes sobre la base de la programación funcional reactivo (FRP).</p>

<p className="p">One of the most important takeaways is that all the operations performed in list- ing 1.7 are completely immutable, and all the business logic is segregated into individ- ual functions. You don’t have to use functional with reactive, but thinking functionally forces you to do so—and when you do, you unlock a truly amazing architecture based on functional reactive programming (FRP).</p>
<p className="it">La programación funcional es un cambio de paradigma que puede transformar radicalmente la forma de hacer frente a las soluciones a los retos de programación. Así es FP un reemplazo para el diseño más populares orientado a objetos? Afortunadamente, la aplicación de programa-ming funcional a su código no es un enfoque de todo o nada, como se señala en las Michael Feathers citar al principio de este capítulo. De hecho, una gran cantidad de aplicaciones pueden beneficiarse del uso de FP junto a una arquitectura orientada a objetos. Debido al control rígido para bilidad immuta- y estado compartido, FP también es conocido por hacer la programación multihilo más sencillo. Debido a que JavaScript es una plataforma de un solo subproceso, esto no es algo que tenemos que preocuparse o cubrir en este libro. En el siguiente capítulo, me paso algún tiempo que destaca algunas de las principales diferencias entre el diseño funcional y orientada a objetos, que creo que le ayudará a asimilar la forma funcional de pensar con mayor facilidad.  </p>

<p className="p">Functional programming is a paradigm shift that can dramatically transform the way you tackle solutions to any programming challenges. So is FP a replacement for the more popular object-oriented design? Fortunately, applying functional program- ming to your code isn’t an all-or-nothing approach, as noted in the Michael Feathers quote at the beginning of this chapter. In fact, lots of applications can benefit from using FP alongside an object-oriented architecture. Due to rigid control for immuta- bility and shared state, FP is also known for making multithreaded programming more straightforward. Because JavaScript is a single-threaded platform, this isn’t something we need to worry about or cover in this book. In the next chapter, I spend some time highlighting some of the key differences between functional and object- oriented design, which I believe will help you grok the functional way of thinking more easily.  </p>
<p className="it">En este capítulo, he mencionado brevemente los temas que se tratarán en profundidad pasantes a cabo el libro a medida que se hunden más en un marco funcional de la mente. Si usted ha estado siguiente al de todos los conceptos hasta ahora, eso es genial, pero no se preocupe si se ha perdido algunas cosas: que sólo significa que ha recogido el libro adecuado. En programación orientada a objetos tradicionales, estás acostumbren a la programación en el estilo imperativo / de procedimiento; cambiando para ello será necesario hacer un cambio drástico en sus procesos de pensamiento a medida que comienza a abordar los problemas de la “forma funcional”.</p>

<p className="p">In this chapter, I briefly touched on topics that will be covered in depth through- out the book as you sink deeper into a functional frame of mind. If you’ve been fol- lowing all the concepts so far, that’s great, but don’t worry if you missed a few things— that just means you’ve picked up the right book. In traditional OOP, you’re accus- tomed to programming in the imperative/procedural style; changing this will require you to make a drastic shift in your thought processes as you begin to tackle problems the “functional way.”</p>
<p className="pag">Page 22</p>
<h2 className="hdos">1.4	Summary</h2>
<li className="littag"> Código que utiliza funciones puras tiene ninguna posibilidad de cambiar o romper el estado global, lo que ayuda a que el código sea más fácil de mantener y comprobable.</li>
<li className="litag">	Code that uses pure functions has zero chance of changing or breaking global state, which helps make your code more testable and maintainable.</li>
<li className="littag">La programación funcional se hace en un estilo declarativo que es fácil de razonar acerca. Esto mejora la legibilidad general de la aplicación y hace su código más delgado a través de una combinación de funciones y expresiones lambda.</li>
<li className="litag">	Functional programming is done in a declarative style that’s easy to reason about. This improves the overall readability of the application and makes your code leaner through a combination of functions and lambda expressions.</li>
<li className="littag"> Procesamiento de datos en un conjunto de elementos se realiza con fluidez a través de cadenas de funciones que enlazan las operaciones tales como el mapa y reducir.</li>
<li className="litag">	Data processing in a collection of elements is done fluently via function chains that link operations such as map and reduce.</li>
<li className="littag"> La programación funcional trata funciona como bloques de construcción, apoyándose en primera clase, funciones de orden superior para mejorar la modularidad y la reutilización del código.</li>
<li className="litag">	Functional programming treats functions as building blocks by relying on first-class, higher-order functions to improve the modularity and reusability of your code.</li>
<li className="littag"> Puede reducir la complejidad de los programas basados en eventos combinando funcionalidad con programación reactiva. </li>
<li className="litag">	You can reduce the complexity of event-based programs by combining func- tional with reactive programming.</li>
<p className="pag">Page 23 </p>

</div>            
<div className='col-md-3'></div>

    
    </div>
    </div>
   
   
  </Layout>
  
)
