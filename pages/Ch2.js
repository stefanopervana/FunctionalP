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
<h1>Chapter 2 Higher-order JavaScript</h1>
<h2>This chapter covers</h2>
<li classname="littag">	¿Por JavaScript es un lenguaje funcional adecuado</li>
<li className="litag">	Why JavaScript is a suitable functional language</li>
<li classname="littag">	JavaScript como un lenguaje que permite el desarrollo multiparadigma</li>
<li className="litag">	JavaScript as a language that enables multiparadigm development</li>
<li classname="littag">	Inmutabilidad y las políticas para el cambio</li>
<li className="litag">	Immutability and policies for change</li>
<li classname="littag">	La comprensión de las funciones de primera clase de orden superior y</li>
<li className="litag">	Understanding higher-order and first-class functions</li>
<li classname="littag">	La exploración de los conceptos de cierres y alcances</li>
<li className="litag">	Exploring the concepts of closures and scopes</li>
<li classname="littag">	El uso práctico de los cierres</li>
<li className="litag">	Practical use of closures</li>
<p classname="pit">El lenguaje natural tiene ningún paradigma dominante, y tampoco lo hace JavaScript. Los desarrolladores pueden elegir entre una caja de sorpresas de approachesprocedimental, funcional y orientada a objetos, y se mezclan según sea apropiado.</p>
<p className="p">Natural language has no dominant paradigm, and neither does JavaScript. Developers can select from a grab bag of approaches— procedural, functional, and object-oriented—and blend them as appropriate.</p>
<p classname="pit">-Angus Croll, Si Hemingway escribió JavaScript</p>
<p className="p">—Angus Croll, If Hemingway Wrote JavaScript</p>
<p className="pag">Page 24</p>
<p classname="pit">A medida que las aplicaciones se hacen más grandes, también lo hace su complejidad. No importa lo bien que se cree que es, la confusión es inevitable si usted no tiene los modelos de programación adecuados en su lugar. En el capítulo 1, he explicado la programación funcional es un paradigma razones ling compeladoptar. Pero por sí mismos paradigmas son sólo modelos de programación que necesitan la lengua de acogida derecho de venir a la vida.</p>
<p className="p">As applications get bigger, so does their complexity. No matter how good you think you are, turmoil is unavoidable if you don’t have the proper programming models in place. In chapter 1, I explained the reasons functional programming is a compelling paradigm to adopt. But paradigms by themselves are just programming models that need the right host language to come to life.</p>
<p classname="pit">En este capítulo, se lo llevará en un recorrido de paso rápido de un lenguaje híbrido que mezcla tanto la programación funcional, así como orientado a objetos: JavaScript. Por supuesto, esto no es en absoluto un extenso estudio de la lengua; más bien, me centraré en lo que permite JavaScript para utilizar funcionalmente, así como donde se queda corto. Un ejemplo de esto es la falta de apoyo a la inmutabilidad. Además, este capítulo trata sobre las funciones de orden superior y cierres, que en conjunto forman la columna vertebral que le permite escribir JavaScript en un estilo funcional. Sin más preámbulos, vamos a bucear en.</p>
<p className="p">In this chapter, I take you on a fast-pass tour of a hybrid language that mixes both object-oriented as well as functional programming: JavaScript. Of course, this is by no means an extensive study of the language; rather, I’ll focus on what allows JavaScript to be used functionally as well as where it falls short. One example of this is the lack of support for immutability. In addition, this chapter covers higher-order functions and closures, which together form the backbone that allows you to write JavaScript in a functional style. Without further ado, let’s dive in.</p>
<h2>2.1	Why JavaScript?</h2>
<p classname="pit">Empecé por responder a la pregunta: “¿Por funcional?” Otra pregunta que viene a la mente es: “¿Por JavaScript?” La respuesta a esta pregunta es simple: la omnipresencia. JavaScript es un lenguaje de propósito general orientado a objetos de tipos dinámicos con una sintaxis expresiva inmensamente. Es uno de los idiomas más ubicuos que se han creado y se puede ver en el desarrollo de aplicaciones móviles, sitios web, servidores web, de escritorio y aplicaciones embebidas, e incluso las bases de datos. Dada su extraordinaria adopción como el idioma de la web, se ruega a la razón de que JavaScript es, con mucho, el idioma más utilizado FP jamás creado.</p>
<p className="p">I began by answering the question, “Why functional?” Another question that comes to mind is, “Why JavaScript?” The answer to this question is simple: omnipresence. JavaScript is a dynamically typed, object-oriented, general-purpose language with an immensely expressive syntax. It’s one of the most ubiquitous languages ever created and can be seen in the development of mobile applications, websites, web servers, desktop and embedded applications, and even databases. Given its extraordinary adoption as the language of the web, it begs to reason that JavaScript is by far the most widely used FP language ever created.</p>
<p classname="pit">A pesar de su sintaxis similar a C, JavaScript atrae un montón de inspiración de lenguajes funcionales como Lisp y Scheme. Sus puntos en común se encuentran en su apoyo a las funciones de mayor orden, cierres, literales de matriz, y otras características que hacen de JavaScript una plataforma excelente para la aplicación de técnicas de FP. De hecho, las funciones son las principales unidades de trabajo en JavaScript, lo que significa que son utilizados no sólo para conducir el comportamiento de sus aplicaciones, sino también para definir objetos, crear módulos y controlar los eventos.</p>
<p className="p">Despite its C-like syntax, JavaScript draws lots of inspiration from functional languages like Lisp and Scheme. Their commonalities lie in their support for higherorder functions, closures, array literals, and other features that make JavaScript a superb platform for applying FP techniques. In fact, functions are the main units of work in JavaScript, which means they’re used not only to drive the behavior of your applications, but also to define objects, create modules, and handle events.</p>
<p classname="pit">JavaScript está evolucionando y mejorando activamente. Con el respaldo de la ECMAScript (ES) Standard, su próximo gran lanzamiento, ES6, añade muchas más funciones para el idioma: flecha funciones, constantes, iteradores, promesas y otras características que se adapten a programación funcional muy bien.</p>
<p className="p">JavaScript is actively evolving and improving. Backed by the ECMAScript (ES) standard, its next major release, ES6, adds many more features to the language: arrow functions, constants, iterators, promises, and other features that suit functional programming very well.</p>
<p classname="pit">A pesar del hecho de que tiene un montón de características funcionales de gran alcance, es importante saber thatJavaScript es tan como es funcional orientada a objetos. Por desgracia, este último se ve raramente; la mayoría de los desarrolladores utilizan operaciones mutables, estructuras de control imperativo, y cambios de estado instancia de los objetos, los cuales están virtualmente eliminados cuando de adoptar un estilo de estilo funcional. Sin embargo, creo que es importante pasar algún tiempo hablando de JavaScript como un lenguaje orientado a objetos primero para que pueda apreciar mejor las diferencias clave entre los dos paradigmas. Esto le permitirá dar el salto en la programación funcional con mayor facilidad.</p>
<p className="p">Despite the fact that it has lots of powerful functional features, it’s important to know thatJavaScript is as object-oriented as it is functional. Unfortunately, the latter is rarely seen; most developers use mutable operations, imperative control structures, and instance state changes on objects, which are all virtually eliminated when adopting a functional style. Nevertheless, I feel it’s important to spend some time talking about JavaScript as an object-oriented language first so that you can better appreciate the key differences between the two paradigms. This will allow you to leap into functional programming more easily.</p>
<h2>2.2	Functional vs. object-oriented programming</h2>
<p classname="pit">Tanto la programación funcional y orientado a objetos (POO) se puede utilizar para desarrollar de tamaño mediano a grandes sistemas. lenguajes híbridos como Scala y F #, por ejemplo, se mezclan ambos paradigmas en un solo idioma. JavaScript tiene una capacidad similar, y el dominio se trata de aprender a utilizar una combinación de ambos; decidir dónde trazar la línea depende de la preferencia personal y las exigencias del problema que abordar. Entender dónde funcional y orientado a objetos se aproxima a interceptar y difieren puede ayudar a la transición de una a la otra, o pensar en términos de cualquiera de ellos.</p>
<p className="p">Both functional and object-oriented programming (OOP) can be used to develop midsize-to-large systems. Hybrid languages like Scala and F#, for instance, blend both paradigms into a single language. JavaScript has a similar capability, and mastering it involves learning to use a combination of both; deciding where to draw the line depends on personal preference and the demands of the problem you’re tackling. Understanding where functional and object-oriented approaches intercept and differ can help you transition from one to the other, or think in terms of either one.</p>
<p className="pag">Page 25</p>
<p classname="pit">Considere un modelo simple para un sistema de gestión de aprendizaje que implica un objeto Student. A partir de una clase o tipo de punto de vista de jerarquía, es natural pensar estudiante como un subtipo de persona, que abarca los atributos básicos como nombre, apellido, dirección, y así sucesivamente.</p>
<p className="p">Consider a simple model for a learning-management system involving a Student object. From a class or type hierarchy point of view, it’s natural to think of Student as a subtype of Person, which encompasses basic attributes like first name, last name, address, and so on.</p>
<h2>Object-oriented JavaScript</h2>
<p classname="pit">Cuando defino una relación entre un objeto y otro diciendo que es un subtipo o tipo derivado, l'm en referencia a la relación de prototipos que existe entre los objetos. Es importante aclarar que, si bien está orientado orientado a JavaScript, que no tiene herencia clásica ya que puede haber visto en otros lenguajes como Java.</p>
<p className="p">When I define a relationship between one object and another by saying it's a subtype or derived type, l'm referring to the prototypal relationship that exists between the objects. It's important to clarify that although JavaScript is oriented-oriented, it doesn't have classical inheritance as you may have seen in other languages like Java.</p>
<p classname="pit">En ES6, este mecanismo para la creación de enlaces entre los objetos prototipo ha sido (ERROneamente, según muchos) recubiertos de azúcar con palabras clave tales como la clase y se extiende. Esto hace objeto a codificar la herencia más sencillo, pero oculta el verdadero trabajo y el poder del mecanismo de prototipo de JavaScript. No voy a cubrir JavaScript enteder oria objetos en este libro (hacia el final de este capítulo, proporciono una referencia a un libro que trata sobre este y otros temas en profundidad).</p>
<p className="p">In ES6, this mechanism for setting up prototype links between objects has been (erroneously, according to many) sugar-coated with keywords such as class and extends. This makes coding object inheritance more straightforward but hides the real work and power of JavaScript's prototype mechanism. I won't cover object-oriented JavaScript in this book (toward the end of this chapter, I provide a reference to a book that discusses this and other topics in depth).</p>
<p classname="pit">funcionalidad adicional se puede añadir mediante la derivación de Student adicionalmente con un tipo más específico, como CollegeStudent. En su esencia, programas orientados a objetos favorecen la creación de nuevos objetos derivados como el principal medio para obtener la reutilización de código. En este caso, CollegeStudent volverá a utilizar todos los datos y el comportamiento de sus tipos de padres. Sin embargo, la adición de más funcionalidad a los objetos existentes puede ser complicado cuando no se aplica necesariamente a todos sus descendientes. Aunque nombre y apellido se aplican a persona y todos sus hijos, workAddress es posiblemente más relevante como parte de un objeto Employee (derivado de la Persona) de un objeto Student. La razón para el pintado de este modelo es que la principal diferencia entre las aplicaciones orientadas a objetos y funcional es cómo se organizan estos datos (propiedades del objeto) y el comportamiento (funciones).</p>
<p className="p">Extra functionality can be added by deriving Student further with a more specific type, such as CollegeStudent. At their core, object-oriented programs favor the creation of new derived objects as the principal means to gain code reuse. In this case, CollegeStudent will reuse all the data and behavior from its parent types. But adding more functionality to existing objects can be tricky when it doesn’t necessarily apply to all of its descendants. Although firstname and lastname apply to Person and all of its children, workAddress is arguably more relevant as part of an Employee object (derived from Person) than a Student object. The reason for painting this model is that the main difference between object-oriented and functional applications is how this data (the object’s properties) and behavior (functions) are organized.</p>
<p classname="pit">aplicaciones orientadas a objetos, que son en su mayoría imperativo, dependen en gran medida a objetos basado encapsulación para proteger la integridad de su estado mutable, tanto directos como hereditaria, a fin de exponer o manipular ese estado a través de los métodos de instancia. Como resultado, hay un estrecho acoplamiento entre los datos de un objeto y su comportamiento de grano fino, formando un paquete cohesivo; este es el objetivo de los programas orientados a objetos y por qué la forma central de la abstracción es el objeto.</p>
<p className="p">Object-oriented applications, which are mostly imperative, rely heavily on objectbased encapsulation to protect the integrity of their mutable state, both direct and inherited, in order to expose or manipulate that state via instance methods. As a result, there’s a tight coupling between an object’s data and its fine-grained behavior, forming a cohesive package; this is the goal in object-oriented programs and why the central form of abstraction is the object.</p>
<p classname="pit">Como alternativa, la programación funcional elimina la necesidad de ocultar los datos de las personas que llaman y por lo general trabaja con un conjunto más pequeño de tipos de datos muy simples. Debido a que todo esté inmutable, usted es libre de trabajar con objetos directamente, pero esta vez a través de funciones generalizadas que viven fuera del alcance de un objeto. En otras palabras, los datos se acopla libremente con el comportamiento. Como se puede ver en la figura 2.1, en lugar de los métodos de instancia FME grano, código funcional se basa en más operaciones de grano grueso que puede CrossCut o el trabajo a través de muchos tipos de datos. En este paradigma, las funciones se convierten en la principal forma de abstracción.</p>
<p className="p">Alternatively, functional programming removes the need to hide data from the callers and typically works with a smaller set of very simple data types. Because everything is immutable, you’re free to work with objects directly, but this time through generalized functions that live outside of an object’s scope. In other words, data is loosely coupled to behavior. As you can see in figure 2.1, instead of fme-grained instance methods, functional code relies on more coarse-grained operations that can crosscut or work across many data types. In this paradigm, functions become the main form of abstraction.</p>
<p className="pag">Page 26</p> 

<p classname="pit">Figura 2.1 Programación orientada a objetos promueve lógicamente conectar muchos tipos de datos con el comportamiento especializado, mientras que la programación funcional se centra sobre la conexión de las operaciones en los tipos de datos a través de la composición. Hay una zona de acción, donde ambos paradigmas se pueden utilizar de manera productiva. lenguajes híbridos como Scala, F #, JavaScript y le permiten trabajar con ambos.</p>
<p className="p">Figure 2.1 Object-oriented programming promotes logically connecting many data types with specialized behavior, whereas functional programming focuses on connecting operations on those data types via composition. There’s a sweet spot where both paradigms can be used productively. Hybrid languages like Scala, F#, and JavaScript allow you to work with both.</p>
<p classname="pit">En cuanto a la figura 2.1, se ven los dos paradigmas difieren medida que se mueve hacia arriba y hacia la derecha. En la práctica, algunos de los mejores código orientado a objetos que he visto utiliza ambos paradigmas juntos, en su intersección. Para ello, es necesario tratar los objetos como entidades o valores inmutables y separar su funcionalidad en funciones que trabajan en estos objetos. Por lo tanto un método de persona que tiene este aspecto:</p>
<p className="p">Looking at figure 2.1, you see the two paradigms differ as you move up and to the right. In practice, some of the best object-oriented code I’ve seen uses both paradigms together—at their intersection. To do this, you need to treat objects as immutable entities or values and separate their functionality into functions that work on these objects. So a method on Person that looks like this:</p>
<p classname="pit">Como ya saben, JavaScript es un lenguaje de tipos dinámicos (lo que significa que nunca tendrá que escribir tipos explícitos junto a referencias a objetos), por lo nombre_completo () funciona con cualquier tipo derivado de persona (o cualquier objeto con propiedades nombre y apellido, para que materia), como se muestra en la figura 2.2. Dada su naturaleza dinámica, funciones de JavaScript apoyan el uso de las funciones polimórficas generalizadas. En otras palabras, las funciones que utilizan referencias basar tipos (como persona) trabajan en objetos de tipos derivados (tales como Student o CollegeStudent).</p>
<p className="p">As you know, JavaScript is a dynamically typed language (which means you never have to write explicit types next to object references), so fullname() will work with any type derived from Person (or any object with properties firstname and lastname, for that matter), as shown in figure 2.2. Given its dynamic nature, JavaScript functions support the use of generalized polymorphic functions. In other words, functions that use references to base types (such as Person) work on objects of derived types (such as Student or CollegeStudent).</p>
<p className="pag">Page 27</p>
<p classname="pit">Figura 2.2 El enfoque de programación orientada a objetos es crear jerarquías de herencia (como estudiante de Parent) con métodos y datos fuertemente ligados juntos. La programación funcional, por el contrario, favorece generaI funciones polimórficas que crosscut diferentes tipos de datos y evitar el uso de este.</p>
<p className="p">Figure 2.2 The focus of OOP is to create inheritance hierarchies (such as Student from Parent) with methods and data tightly bound together. Functional programming, on the other hand, favors generai polymorphic functions that crosscut different data types and avoid the use of this.</p>
<p classname="pit">Como se puede ver en la figura 2.2, separando nombre completo () en una función independiente le anima a evitar el uso de la esta referencia a acceder a los datos de objeto. Usando esto es problemático, ya que le da acceso a los datos a nivel de instancia fuera del ámbito de método, lo que provoca efectos secundarios. El uso de FP, datos de objeto no está acoplado íntimamente a espepartes especíde su código y es mucho más reutilizable y fácil de mantener.</p>
<p className="p">As you can see in figure 2.2, separating fullname() into a standalone function encourages you to avoid using the this reference to access object data. Using this is problematic because it gives you access to instance-level data outside of the method scope, which causes side effects. Using FP, object data is not intimately coupled to specific parts of your code and is far more reusable and maintainable.</p>
<p classname="pit">En lugar de crear un montón de tipos derivados, se puede ampliar el comportamiento de una función pasando otras funciones como argumentos. Para ilustrar esto, vamos a definir el modelo de datos simple en el listado siguiente, que contiene el estudiante clase que deriva de la persona. Yo uso este modelo en la mayoría de los ejemplos en este libro.</p>
<p className="p">Instead of creating lots of derived types, you can extend the behavior of a function by passing other functions as arguments. To illustrate, let’s define the simple data model in the following listing, which contains the class Student that derives from Person. I use this model in most of the examples throughout this book.</p>
 
<p className="pag">Page 28</p>
<p classname="pit">Listing 2.1 Definición de las clases y la persona del estudiante:</p>
<p className="p">Listing 2.1 Defining the Person and Student classes:</p>
<pre><code>{`class Person {
constructor(firstname, lastname, ssn) { this._firstname = firstname; this._lastname = lastname; this._ssn = ssn; this._address = null; this._birthYear = null;
}
get ssn() {
return this._ssn;
}
get firstname() {
return this._firstname;
}
get lastname() {
return this._lastname;
}
get address() {
return this._address;
}`}</code></pre>
 
<pre><code>{`toString() {
return 'Person(S{this._firstname}, S{this._lastname})';
}
}
class Student extends Person {
constructor(firstname, lastname, ssn, school) { super(firstname, lastname, ssn); this._school = school;
}`}</code></pre>
<p className="pag">Page 29</p>
<h2>Finding and running code examples</h2>
<p classname="pit">Los ejemplos de código de este libro se pueden encontrar en la programación-en-javascript www.manning.com/books/functionaly al https://github.com/luijar/functional-programming-js. Siéntase libre de revisar el proyecto y comenzar a practicar la programación funcional por su cuenta. Le recomiendo que ejecuta cualquiera de las pruebas unitarias y jugar con los diferentes programas. En el momento de escribir estas líneas, ya que no todas las funciones JavaScript ES6 se han implementado en todos los navegadores, yo uso el transpiler Babel (anteriormente conocido como 6to5) para convertir el código en código ES6 ES5 equivalente.</p>
<p className="p">The code samples for this book can be found at www.manning.com/books/functionalprogramming-in-javascript and at https://github.com/luijar/functional-programming-js. Feel free to check out the project and begin practicing functional programming on your own. I recommend that you run any of the unit tests and play with the different programs. At the time of this writing, because not all JavaScript ES6 features have been implemented across all browsers, I use the Babel transpiler (formerly known as 6to5) to convert ES6 code into equivalent ES5 code.</p>
<p classname="pit">Algunas características no necesitan transpilation y se pueden activar con una configuración de navegador como Habilitar JavaScript experimental de Chrome. Si se está ejecutando en modo experimental, que es importante para permitir el modo estricto mediante la adición de la afirmación 'use strict'; al comienzo de su archivo JavaScript.</p>
<p className="p">Some features don't need transpilation and can be turned on with a browser setting like Chrome's Enable Experimental JavaScript. If you're running in experimental mode, it's important to enable strict mode by adding the statement 'use strict'; at the beginning of your JavaScript file.</p>
<p classname="pit">Dada una persona, su tarea es encontrar todos sus amigos que viven en el mismo país que esta persona. Además, dado que un estudiante, su tarea es encontrar otros estudiantes que viven en el mismo país y que asisten a la misma escuela. La solución orientado a objetos herméticamente parejas operaciones, a través de este y super, al objeto y el padre objeto, respectivamente:</p>
<p className="p">Given a person, your task is to fìnd all of their friends that live in the same country as this person. Also, given a student, your task is to find other students living in the same country and attending the same school. The object-oriented solution tightly couples operations, via this and super, to the object and parent object, respectively:</p>
 
<p classname="pit">Por otra parte, debido a FP se basa en la pureza y la transparencia referencial, por iso lating el comportamiento del estado se pueden añadir más operaciones mediante la definición y Bining comnuevas funciones que trabajan en esos tipos. Al hacer esto, se termina con objetos simples de la carga de los datos anillo de sto, y funciones versátiles que pueden trabajar en esos objetos como argumentos, que pueden estar compuestos de lograr una funcionalidad especializada. No ha aprendido acerca de la composición todavía (que está cubierto en el capítulo 4), pero es importante destacar otra diferencia fundamental entre los paradigmas. En esencia, lo que hace la herencia de programación orientada a objetos, composición hace por FP en cuanto a la aplicación de un nuevo comportamiento a diferentes types.1 datos Para ejecutar este código, vamos a usar el siguiente conjunto de datos:</p>
<p className="p">On the other hand, because FP is based on purity and referential transparency, by isolating the behavior from the state you can add more operations by defining and combining new functions that work on those types. Doing this, you end up with simple objects in charge of sto ring data, and versatile functions that can work on those objects as arguments, which can be composed to achieve specialized functionality. You haven’t learned about composition yet (it’s covered in chapter 4), but it’s important to highlight another fundamental difference between the paradigms. In essence, what inheritance does for OOP, composition does for FP in terms of applying new behavior to different data types.1 To run this code, you’ll use the following dataset:</p>
<p className="pag">Page 30</p>
<pre><code>{`
var curry = new Student('Haskell', 'Curry',
'111-11-1111', 'Penn State'); curry.address = new Address('US');
var turing = new Student('Alan', 'Turing',
'222-22-2222', 'Princeton'); turing.address = new Address('England');
var church = new Student('Alonzo', 'Church',
'333-33-3333', 'Princeton'); church.address = new Address('US');
var kleene = new Student('Stephen', 'Kleene',
'444-44-4444', 'Princeton'); kleene.address = new Address('US');`}</code></pre>
<p classname="pit">El enfoque orientado a objetos utiliza el método en Estudiante para encontrar todos los demás estudiantes que asisten a la misma escuela:</p>
<p className="p">The object-oriented approach uses the method in Student to find all other students who attend the same school:</p>
<pre><code>{`church.studentsInSameCountryAndSchool([curry, turing, kleene]);
/ /-> [kleene]`}</code></pre>
<p classname="pit">La solución funcional, por el contrario, se rompe el problema en funciones más pequeñas:</p>
<p className="p">The functional solution, on the other hand, breaks the problem into smaller functions:</p>

<p className="ind">index 1 This reference applies more strongly to object-oriented practitioners than to the paradigm itself. Many authorities in the field, including the Gang of Four, prefer object composition over class inheritance, based on LSP.</p>
 
<p className="pag">Page 31</p>
<p classname="pit">Mediante la aplicación de la programación funcional, se crea una función completamente nueva, hallazgo StudentsBy, eso es mucho más fácil trabajar con ellos. Tenga en cuenta que esta nueva función se puede utilizar con cualquier objeto que se refieren a la persona, así como cualquier combinación de escuela y país.</p>
<p className="p">By applying functional programming, you create an entirely new function, findStudentsBy, that’s much easier to work with. Keep in mind that this new function works with any objects that relate to Person, as well as any school and country combination.</p>
<p classname="pit">Esto demuestra claramente las diferencias entre los dos paradigmas. diseño orientado a objetos se centra en la naturaleza de los datos y las relaciones de datos, mientras que la programación funcional se centra en las operaciones realizadas en el comportamiento. Tabla 2.1 SUMmarizes otras diferencias clave que vale la pena notar que hablo de ellos en este capítulo y en otros a venir.</p>
<p className="p">This clearly demonstrates the differences between the two paradigms. Objectoriented design focuses on the nature of data and data relationships, whereas functional programming focuses on the operations performed—behavior. Table 2.1 summarizes other key differences that are worth noticing as I talk about them in this chapter and others to come.</p>
<p classname="pit">Tabla 2.1 Comparación de algunas cualidades importantes de la programación orientada a objetos y funcional. Estas cualidades son temas que se discuten en este libro.</p>
<p className="p">Table 2.1 Comparing some important qualities of object-oriented and functional programming. These qualities are themes that are discussed throughout this book.</p>
<p classname="pit">A pesar de sus diferencias, la creación de aplicaciones mediante la mezcla de estos paradigmas pueden ser un poderoso enfoque. Por un lado, se obtiene un modelo de dominio rico en relaciones naturales entre sus tipos de constituyentes; y por el otro, tiene un conjunto de funciones puras que pueden trabajar en estos tipos. ¿Dónde se traza la línea dependerá de qué tan cómodo se siente usando paradigma. Debido a que es tan JavaScript orientado a objetos como es funcional, utilizando funcionalmente requerirá una atención especial en términos de controlar los cambios de estado.</p>
<p className="p">Despite their differences, building applications by blending these paradigms can be a powerful approach. On the one hand, you get a rich domain model with natural relationships among its constituent types; and on the other, you have a set of pure functions that can work on these types. Where you draw the line will depend on how comfortable you feel using either paradigm. Because JavaScript is as object-oriented as it is functional, using it functionally will require some special attention in terms of controlling state changes.</p>
<h2>2.2.1	Managing the state of JavaScript objects</h2>
<p classname="pit">El estado de un programa se puede definir como una instantánea de los datos almacenados en todos sus objetos en cualquier momento en el tiempo. Lamentablemente, JavaScript es uno de los peores idiomas cuando se trata de proteger el estado de un objeto. Un objeto JavaScript es muy dinámico, y se puede modificar, añadir o eliminar sus propiedades en cualquier punto en el tiempo. En la enumeración de 2,1, si espera _address a encapsular (el uso del subrayado es puramente sintáctica) dentro de persona, estás equivocado. Usted tiene acceso completo a esta propiedad fuera de la clase para hacer lo que le plazca o incluso eliminarlo.</p>
<p className="p">The state of a program can be defined as a snapshot of the data stored in all of its objects at any moment in time. Sadly, JavaScript is one of the worst languages when it comes to securing an object’s state. A JavaScript object is highly dynamic, and you can modify, add, or delete its properties at any point in time. In listing 2.1, if you expect _address to be encapsulated (the use of the underscore is purely syntactic) within Person, you’re wrong. You have complete access to this property outside of the class to do whatever you please or even to delete it.</p>
 
<p className="pag">Page 32</p>
<p classname="pit">Con la libertad viene una gran responsabilidad. Aunque esto puede darle la libertad de hacer muchas cosas resbaladizas como la creación de propiedad dinámica, sino que también puede dar lugar a código que es extremadamente difícil de mantener en los programas de medianas a grandes.</p>
<p className="p">With freedom comes great responsibility. Although this may give you the liberty to do many slick things like dynamic property creation, it can also lead to code that’s extremely difficult to maintain in midsize-to-large programs.</p>
<p classname="pit">He mencionado en el capítulo 1 que el trabajo con funciones puras hace que su código sea más fácil de mantener y razonar acerca. ¿Existe tal cosa como un objeto puro? Un objeto inmutable que contiene funcionalidad inmutable puede considerarse puro. El mismo nivel de razonamiento que se aplica a las funciones del mismo modo que se traduce a objetos simples. Managing estado en JavaScript es crucial en nuestra búsqueda para utilizarlo como un lenguaje funcional. Hay algunas prácticas y patrones que se pueden utilizar para administrar la inmutabilidad, que vamos a visitar en las siguientes secciones, pero encapsulación completa y protección de datos serán un gran peso en su disciplina para hacerlo cumplir.</p>
<p className="p">I mentioned in chapter 1 that working with pure functions makes your code easier to maintain and reason about. Is there such a thing as a pure object? An immutable object that contains immutable functionality can be considered pure. The same level of reasoning that applies to functions translates just as well to simple objects. Managing state in JavaScript is crucial in our quest to use it as a functional language. There are some practices and patterns you can use to manage immutability, which we’ll visit in the next sections, but complete encapsulation and protection of data will weigh heavily in your discipline to enforce it.</p>
<h2>2.2.2	Treating objects as values</h2>
<p classname="pit">Cadenas y números son probablemente los tipos de datos más fácil de trabajar en cualquier lenguaje de programaming. ¿Por qué crees que es? Parte de la razón es que, tradicionalmente, estos tipos primitivos son inherentemente inmutable, lo que nos da una cierta tranquilidad de que otros tipos definidos por el usuario no lo hacen. En la programación funcional, que llamamos tipos que se comportan de esta manera los valores. En el capítulo 1, que ha aprendido a pensar en la inmutabilidad, y esto requiere de manera efectiva el tratamiento de cualquier objeto como un valor; al hacerlo le permite trabajar con las funciones que pasan alrededor de los objetos y no preocuparse de su alteración.</p>
<p className="p">Strings and numbers are probably the easiest data types to work with in any programming language. Why do you think that is? Part of the reason is that, traditionally, these primitive types are inherently immutable, which gives us a certain peace of mind that other user-defined types don’t. In functional programming, we call types that behave this way values. In chapter 1, you learned to think about immutability, and this requires effectively treating any object as a value; doing so allows you to work with functions that pass objects around and not worry about them being altered.</p>
<p classname="pit">A pesar de que todo el azúcar sintáctica añadió alrededor de las clases en ES6, objetos de JavaScript no son más que las bolsas de atributos que se pueden añadir, eliminar y cambiar en cualquier momento. ¿Qué se puede hacer para remediar esto? Muchos lenguajes de programación SUPconstrucciones portuarias que conforman propiedades de un objeto inmutable. Un ejemplo es la palabra clave final de Java. Además, lenguajes como C # tienen las variables inmutables por defecto, a menos que se indique lo contrario. En la actualidad, no tiene este lujo en JavaScript. Aunque JavaScript tipos primitivos no se pueden cambiar, el estado de la variable que se refiere a un tipo de lata primitivo. Por lo tanto, tiene que ser capaz de proporcionar, o al menos emular, referencias inmutables a los datos para que sus objetos definidos por el usuario se comportan como si fueran inmutables.</p>
<p className="p">Despite all the syntactic sugar added around classes in ES6, JavaScript objects are nothing more than bags of attributes that can be added, removed, and changed at any time. What can you do to remedy this? Many programming languages support constructs that make an object’s properties immutable. One example is Java’s final keyword. Also, languages like F# have immutable variables by default, unless stated otherwise. At present, you don’t have this luxury in JavaScript. Although JavaScript primitive types can’t be changed, the state of the variable that refers to a primitive type can. Therefore, you need to be able to provide, or at least emulate, immutable references to data so that your user-defined objects behave as if they were immutable.</p>
<p classname="pit">ES6 utiliza la palabra clave const para crear referencias constantes. Esto mueve la aguja en la dirección correcta, porque las constantes no se pueden reasignar o re-declaran. En la programación funcional práccal, puede utilizar const como un medio para llevar los datos simples configuraciones ción (cadenas URL, nombres de bases de datos, etc.) en su programa funcional si es necesario. Aunque la lectura de una variable externa es un efecto secundario, la plataforma pro-porciona una semántica especial a constantes por lo que no va a cambiar de forma inesperada entre llamadas ción fun-. He aquí un ejemplo de declarar un valor constante:</p>
<p className="p">ES6 uses the const keyword to create constant references. This moves the needle in the right direction because constants can’t be reassigned or re-declared. In practical functional programming, you can use const as a means to bring simple configuration data (URL strings, database names, and so on) into your functional program if need be. Although reading from an external variable is a side effect, the platform provides special semantics to constants so they won’t change unexpectedly between function calls. Here’s an example of declaring a constant value:</p>

 
<p className="pag">Page 33</p>
<p classname="pit">Pero esto no resuelve los problemas de la mutabilidad al nivel que requiere FP. Puede impedir que una variable sea reasignado, pero ¿cómo se puede evitar que el estado interno de un objeto de cambiar? Este código sería perfectamente aceptable:</p>
<p className="p">But this doesn’t solve the problems of mutability to the level that FP requires. You can prevent a variable from being reassigned, but how can you prevent an object’s internal state from changing? This code would be perfectly acceptable:</p>
<p classname="pit">Lo que necesita es una política más estricta para la inmutabilidad; y la encapsulación es una buena estrategia para proteger contra las mutaciones. Para estructuras de objetos simples, una buena alternativa es adoptar el modelo de objetos de valor. Un objeto de valor es uno cuya igualdad no depende de identidad o de referencia, sólo en su valor; una vez declarada, su estado no puede cambiar. Además de los números y cadenas, algunos ejemplos de objetos de valor son tipos como tupla, par, punto, código postal, coordinar, el dinero, la fecha y otros. He aquí un ción ¡Ejecución de Código postal:</p>
<p className="p">What you need is a stricter policy for immutability; and encapsulation is a good strategy to protect against mutations. For simple object structures, a good alternative is to adopt the Value Object pattern. A value object is one whose equality doesn’t depend on identity or reference, just on its value; once declared, its state may not change. In addition to numbers and strings, some examples of value objects are types like tuple, pair, point, zipCode, coordinate, money, date, and others. Here’s an implementation for zipCode:</p>
<pre><code>{`
function zipCode(code, location) { let _code = code; let _location = location ||	'';
return {
code: function ()	{
return _code;
},
location: function ()	{
return _location;
},
fromString: function (str) { let parts = str.split('-'); return zipCode(parts[0], parts[1]);
},
toString: function ()	{
return _code + '-' + _location;
}
};
}
const princetonZip = zipCode('08544',	'3345');
princetonZip.toString(); / /-> '08544-3345'
`}</code></pre>
<p classname="pit">En JavaScript, puede utilizar las funciones y proteger el acceso al estado interno de un código postal mediante la devolución de una interfaz literal objeto que expone un pequeño conjunto de métodos a la persona que llama y trata _code y _location como variables seudo-privada. Estas variables son sólo accesible en el objeto literal a través de cierres, que se verá más adelante en este capítulo.</p>
<p className="p">In JavaScript, you can use functions and guard access to a ZIP code’s internal state by returning an object literal interface that exposes a small set of methods to the caller and treats _code and _location as pseudo-private variables. These variables are only accessible in the object literal via closures, which you’ll see later in this chapter.</p>
<p classname="pit">El objeto devuelto se comporta efectivamente como un primitivo que no tiene ods.2 met mutando Por lo tanto, el método toString, aunque no es una pura función, se comporta como tal y es una representación de cadena de este objeto puro. objetos de valor son ligeros y</p>
<p className="p">The returned object effectively behaves like a primitive that has no mutating methods.2 Hence, the toString method, although not a pure function, behaves like one and is a pure string representation of this object. Value objects are lightweight and</p>
<p className="ind">index 2 The object’s internal state may be protected, but its behavior is still subject to mutation because you can dynamically remove or replace any of its methods. easy to work with in both functional and OOP. In conjunction with const, you can create objects with semantics similar to those of a string or number. Let’s consider another example:</p>
<p className="pag">Page 34</p> 
<p classname="pit">El uso de métodos para devolver nuevas copias (como en translate) es otra forma de implementar la inmutabilidad. La aplicación de una operación de traducción sobre este objeto genera un nuevo objeto de coordenadas:</p>

<p className="p">Using methods to return new copies (as in translate) is another way to implement immutability. Applying a translation operation on this object yields a new coordinate object:</p>
<pre><code>{`
greenwich.translate(10, 10).toString(); //-> '(61.4778, 10.0015)'`}</code></pre>
<p classname="pit">Value Object es un patrón de diseño orientado a objetos que se inspiró en la programación funcional. Este es otro ejemplo de cómo los paradigmas se complementan elegantemente. Este patrón es ideal, pero no es suficiente para modelar dominios completos del problema del mundo real. En la práctica, es probable que el código se necesita para manejar los datos jerárquicos (como se vio con la Persona y Estudiantes antes), así como interactuar con los objetos heredados. Por suerte, JavaScript tiene un mecanismo para emularlo usando Object.freeze.</p>
<p className="p">Value Object is an object-oriented design pattern that was inspired by functional programming. This is another example of how the paradigms elegantly complement each other. This pattern is ideal, but it’s not enough for modeling entire real-world problem domains. In practice, it’s likely your code will need to handle hierarchical data (as you saw with Person and Student earlier) as well as interact with legacy objects. Luckily, JavaScript has a mechanism to emulate this using with Object.freeze.</p>
<h2>2.2.3 Deep-freezing moving parts</h2>
<p classname="pit">sintaxis nueva clase de JavaScript no define palabras clave para mark fields como inmutable, sino que es compatible con un mecanismo interno para hacerlo, mediante el control de algunas metapropiedades de objetos ocultos como escritura. Al establecer esta propiedad en false, la función de JavaScript Object.freeze () puede prevenir el estado de un objeto a partir de cambiar. Vamos a empezar por la congelación de la persona objeto del listado 2.1:</p>
<p className="p">JavaScript’s new class syntax doesn’t define keywords to mark fields as immutable, but it does support an internal mechanism for doing so by controlling some hidden object metaproperties like writable. By setting this property to false, JavaScript’s Object.freeze() function can prevent an object’s state from changing. Let’s begin by freezing the person object from listing 2.1:</p>
 
<p className="pag">Page 35</p>
<p classname="pit">Ejecutar el código anterior hace que los atributos de la persona efectivamente de sólo lectura. Cualquier intento de cambiarlos (_firstname, en este caso) dará lugar a un error:</p>
<p className="p">Executing the preceding code makes the attributes of person effectively read-only. Any attempt to change them (_firstname, in this case) will result in an error:</p>

<pre><code>{`TypeError: Cannot assign to read only property '_firstname' of #`}</code></pre>
<p classname="pit">Object.freeze () también puede inmovilizar atributos heredados. Así que la congelación de una instancia de Student funciona exactamente de la misma manera y sigue la cadena de prototipo del objeto protecting todos los atributos heredados persona. Pero no se puede usar para congelar objeto anidado Butes atri-, como se muestra en la figura 2.3.</p>
<p className="p">Object.freeze() can also immobilize inherited attributes. So freezing an instance of Student works exactly the same way and follows the object’s prototype chain protecting every inherited Person attribute. But it can’t be used to freeze nested object attributes, as shown in figure 2.3.</p>
<p classname="pit">Figura 2.3 Aunque el tipo persona ha sido congelado, sus propiedades de objeto internai (como _address) no tienen. Así person.address.country es elegible para ser cambiado en cualquier momento. Debido a que sólo las variables de nivel superior se congelan, se trata de una congelación superficial.</p>
<p className="p">Figure 2.3 Although the Person type has been frozen, its internai object properties (like _address) haven’t. So person.address.country is eligible to be changed at any time. Because only the top-level variables are frozen, this is a shallow freeze.</p>
<p classname="pit">Aquí está la definición para el tipo de dirección:</p>
<p className="p">Here’s the definition for the Address type:</p>
<pre><code>{`
class Address {
constructor(country, state, city, zip, street) { this._country = country; this._state = state; this._city = city; this._zip = zip; this._street = street;
}
get street() {
return this._street;
}
 

get state() {
return this._state;
}
get zip() {
return this._zip;
}
get country() {
return this._country;
}
}
`}</code></pre>
<p classname="pit">Por desgracia, no se producirán errores en el código siguiente:</p>
<p className="p">Unfortunately, no errors will occur in the following code:</p>
<pre><code>{`var person = new Person('Haskell', 'Curry', '444-44-4444'); person.address = new Address(
'US',	'NJ', 'Princeton',
zipCode('08544','1234'), 'Alexander St.');
person = Object.freeze(person);
person.address._country = 'France'; / /-> allowed! person.address.country; / /-> 'France'`}</code></pre>
<p className="pag">Page 36</p>
<p classname="pit">Object.freeze () es una operación poco profunda. Para evitar esto, debe congelar manualmente la estructura anidada de un objeto, como se muestra en el siguiente listado.</p>
<p className="p">Object.freeze() is a shallow operation. To get around this, you need to manually freeze an object’s nested structure, as shown in the following listing.</p>
<h2>Listing 2.2 Recursive function to deep-freeze an object</h2>
<p classname="pit">Yo sólo he mostrado algunas técnicas que puede utilizar para hacer cumplir un nivel de inmutabilidad en su código, pero es poco realista esperar que se pueden crear aplicaciones completas sin tener que modificar ningún estado. Por lo tanto, las políticas estrictas cuando se crean nuevos objetos a partir de originales (como se</p>
<p className="p">I’ve just shown some techniques you can use to enforce a level of immutability in your code, but it’s unrealistic to expect that you can create entire applications without ever modifying any state. Thus, strict policies when creating new objects from originals (as</p>
with coordinate.translate() ) are extremely beneficial in your quest to reduce the complexities and intricacies ofJavaScript applications. Next, I discuss the best alternative to centrally managing object changes immutably using a functional approach called lenses.
<p className="pag">Page 37</p>
<h2>2.2.4	Navigating and modifying object graphs with lenses</h2>
<p classname="pit">En programación orientada a objetos, que está acostumbrado a llamar a los métodos que cambian el contente interna de un objeto con estado. Esto tiene la desventaja de no poder garantizar el resultado de recuperar el estado y puede romper la funcionalidad de una parte del sistema que espera que el objeto a permanecer intacta. Se puede optar por poner en práctica su propia estrategia de copia en escritura y volver nuevos objetos de cada llamada, un proceso tedioso y propenso a errores de método, por decir lo menos. Una función sencilla colocador en la clase de persona sería el siguiente:</p>
<p className="p">In OOP, you’re accustomed to calling methods that change the internal contente of a stateful object. This has the disadvantage of never being able to guarantee the outcome of retrieving the state and may break the functionality of part of the system that expects the object to stay intact. You could opt to implement your own copy-on-write strategy and return new objects from each method call—a tedious and error-prone process, to say the least. A simple setter function in the Person class would look like this:</p>
<p classname="pit">Ahora imagina tener que hacer esto para cada característica de cada tipo en su modelo de dominio. Necesita una solución para mutar objetos con estado, de una manera inmutable, eso es discreto y no requiere hardcoding código repetitivo en todas partes. Lentes, también conocidos como referencias funcionales, son la solución de programación funcional para acceder y manipular de manera inmutable atributos de tipos de datos con estado. Internamente, las lentes funcionan de manera similar a una estrategia de copia en escritura mediante el uso de un componente de almacenamiento interno que sabe cómo manejar adecuadamente y copiar estado. No es necesario poner en práctica esto por sí mismo; más bien, se puede utilizar una biblioteca de JavaScript llamada funcional Ramda.js (detalles sobre el uso de esta y otras bibliotecas se pueden encontrar en el apéndice). Por defecto, Ramda expone toda la funcionalidad ite a través del objeto global R. Usando R.lensProp, puede CRE comió una lente que se envuelve sobre la propiedad apellido de la persona:</p>
<p className="p">Now imagine having to do this for every single property of every type in your domain model. You need a solution for mutating stateful objects, in an immutable manner, that’s unobtrusive and doesn’t require hardcoding boilerplate code everywhere. Lenses, also known as functional references, are functional programming’s solution to accessing and immutably manipulating attributes of stateful data types. Internally, lenses work similarly to a copy-on-write strategy by using an internal storage component that knows how to properly manage and copy state. You don’t need to implement this yourself; rather, you can use a functional JavaScript library called Ramda.js (details about using this and other libraries can be found in the appendix). By default, Ramda exposes all of ite functionality via the global object R. Using R.lensProp, you can create a lens that wraps over the lastname property of Person:</p>
<pre><code>{`
var person = new Person('Alonzo', 'Church', '444-44-4444'); var lastnameLens = R.lenseProp('lastName');`}</code></pre>
<p classname="pit">Se puede utilizar para leer el R.view contente de la residencia:</p>
<p className="p">You can use R.view to read the contente of this property:</p>
<pre><code>{`R.view(lastnameLens, person); //-> 'Church'`}</code></pre>
<p classname="pit">Esto es, para todos los propósitos prácticos, similar a un método get apellido (). Nada impresionante hasta ahora. ¿Qué hay de la incubadora? Aquí es donde entra en juego la magia Ahora, Call-ing R.set crea y devuelve una copia de nueva del objeto que contiene el nuevo valor y conserva el estado instancia original (la semántica copia en escritura gratis!).:</p>
<p className="p">This is, for all practical purposes, similar to a get lastname() method. Nothing impressive so far. What about the setter? Here’s where the magic comes in. Now, calling R.set creates and returns a brand-new copy of the object containing the new value and preserves the original instance state (copy-on-write semantics for free!):</p>
<pre><code>{`var newPerson = R.set(lastnameLens, 'Mourning', person); newPerson.lastname;
 / /-> 'Mourning' person.lastname; //-> 'Church'`}</code></pre>
 
<p className="pag">Page 38</p>
<p classname="pit">Las lentes son valiosos porque le dan un mecanismo discreto de objetos ING manipulat-, incluso si estos son objetos heredados u objetos fuera de su control. Las lentes también son compatibles con propiedades anidadas, como la propiedad de dirección de la persona:</p>
<p className="p">Lenses are valuable because they give you an unobtrusive mechanism for manipulating objects, even if these are legacy objects or objects outside of your control. Lenses also support nested properties, like the address property of Person:</p>
<pre><code>{`
person.address = new Address(
'US',	'NJ', 'Princeton', zipCode('08544','1234'),
'Alexander St.');
`}</code></pre>
<p classname="pit">Vamos a crear una lente que se desplaza a la propiedad address.zip:</p>
<p className="p">Let’s create a lens that navigates to the address.zip property:</p>
<p classname="pit">Porque las lentes de poner en práctica los emisores inmutables, puede cambiar el objeto anidado y todavía devolver un nuevo objeto Persona:</p>
<p className="p">Because lenses implement immutable setters, you can change the nested object and still return a new Person object:</p>
<pre><code>{`
var newPerson = R.set(zipLens, person, zipCode('90210',	'5678'));
R.view(zipLens, newPerson); / /-> zipCode('90210',	'5678')
R.view(zipLens, person); / /-> zipCode('08544',	'1234')
newPerson !== person; / /-> true`}</code></pre>
<p classname="pit">Esto es muy bueno porque ahora tienes get y set la semántica de una manera funcional. Además de proporcionar una envoltura inmutable protectora, lentes también encajan muy bien con la filosofía de aislar la lógica de acceso a campos de distancia del objeto, eliminando la dependencia de esta, y que le da funciones de gran alcance que saben cómo llegar a entrar y manipular el contenido de la FP cualquier objeto.</p>
<p className="p">This is great because now you have getter and setter semantics in a functional way. In addition to providing a protective immutable wrapper, lenses also fit extremely well with FP’s philosophy of isolating field-access logic away from the object, eliminating the reliance on this, and giving you powerful functions that know how to reach into and manipulate the contents of any object.</p>
<p classname="pit">Ahora que ya sabe cómo trabajar con objetos adecuadamente, voy a cambiar de marcha y abordar el tema de las funciones. Funciones de accionamiento de las piezas móviles de su aplicación y son el corazón de la programación funcional.</p>
<p className="p">Now that you understand how to work with objects properly, I’ll shift gears and address the topic of functions. Functions drive the moving pieces of your application and are the heart of functional programming.</p>
<h2>2.3	Functions</h2>
<p classname="pit">En la programación funcional, las funciones son las unidades básicas de trabajo, lo que significa que los centros cosa everyalrededor de ellos. Una función es cualquier expresión exigible que puede ser evaluada aplicando el operador () a la misma. Las funciones pueden devolver ya sea un valor calculado o indefinido (función void) de nuevo a la persona que llama. Como FP funciona muy parecido a las matemáticas, funciones sólo son significativos cuando producen un resultado útil (no es nulo o no definido); de lo contrario, el supuesto es que modifican datos externos y causan efectos secundarios que se produzca. Para el propósito de este libro, podemos distinguir entre expresiones (funciones que producen un valor) y declaraciones (funciones que no lo hacen). programación imperativa y de procedimientos realizados en su mayoría por secuencias ordenadas de declaraciones; pero FP es totalmente expresivo, por lo que las funciones de vacío no sirven a un propósito en este paradigma.</p>
<p className="p">In functional programming, functions are the basic units of work, which means everything centers around them. A function is any callable expression that can be evaluated by applying the () operator to it. Functions can return either a computed value or undefined (void function) back to the caller. Because FP works a lot like math, functions are meaningful only when they produce a usable result (not null or undefined); otherwise, the assumption is that they modify external data and cause side effects to occur. For the purpose of this book, we can distinguish between expressions (functions that produce a value) and statements (functions that don’t). Imperative and procedural programming are mostly made up of ordered sequences of statements; but FP is entirely expressional, so void functions don’t serve a purpose in this paradigm.</p>
<p classname="pit">funciones de JavaScript tienen dos características importantes que son el pan y ter perode su estilo funcional: son de primera clase y de orden superior. Vamos a explorar tanto de estas ideas con detalle a continuación.</p>
<p className="p">JavaScript functions have two important characteristics that are the bread and butter of its functional style: they’re first-class and higher-order. We’ll explore both of these ideas in detail next.</p>
 
<p className="pag">Page 39</p>
<h2>2.3.1	Functions as first-dass citizens</h2>
<p classname="pit">En JavaScript, el término de primera clase viene de hacer las funciones de los objetos reales en el lenguaje también llamados ciudadanos de primera clase. Probablemente esté acostumbrado a ver funciones declaradas como esto:</p>
<p className="p">In JavaScript, the term first-class comes from making functions actual objects in the language—also called first-class citizens. You’re probably used to seeing functions declared like this:</p>
<pre><code>{`
function multiplier(a,b) { return a * b;
}
`}</code></pre>
<p classname="pit">Pero JavaScript ofrece más opciones. Al igual que los objetos, una función puede ser</p>
<p className="p">But JavaScript offers more options. Like objects, a function can be</p>
<li classname="littag"> Asignado a las variables como una función anónima o expresión lambda (explico el uso de lambdas es más detalle en el capítulo 3):</li>
<li className="litag"> Assigned to variables as an anonymous function or lambda expression (I explain the use of lambdas is more detail in chapter 3):</li>
<li classname="littag"> Asignados a propiedades de objetos como métodos:</li>
<li className="litag"> Assigned to object properties as methods:</li>
<pre><code>{`var obj = {
method: function (x)	{ return x * x; }
};`}</code></pre>
<p classname="pit">Mientras una llamada de función utiliza el operador (), como en cuadrado (2), el objeto de función se imprime como sigue:</p>
<p className="p">Whereas a function call uses the () operator, as in square(2), the function object is printed as follows:</p>
<pre><code>{`square;
/ / function (x)	{
/ / return x * x;
/ / }`}</code></pre>
<p classname="pit">Aunque la práctica no es común, las funciones también se pueden crear instancias a través de constructores, que es una prueba de su carácter de primera clase en JavaScript. El constructor toma el conjunto de parámetros formales, el cuerpo de la función, y la nueva palabra clave, así:</p>
<p className="p">Although not common practice, functions can also be instantiated via constructors, which is proof of their first-class nature in JavaScript. The constructor takes the set of formal parameters, the function body, and the new keyword, like so:</p>
<pre><code>{`var multiplier = new Function('a', 'b', 'return a * b');
multiplier(2, 3); / /-> 6`}</code></pre>
<p classname="pit">En JavaScript, cada función es una instancia del tipo de función. propiedad de longitud de una función se puede utilizar para recuperar el número de parámetros formales y los métodos de aplicación, tales como () y llame al () se puede utilizar para llamar a funciones con contextos (más sobre ellos en la siguiente sección).</p>
<p className="p">In JavaScript, every function is an instance of the Function type. A function’s length property can be used to retrieve the number of formal parameters, and methods such as apply() and call() can be used to call functions with contexts (more about them in the next section).</p>
<p classname="pit">El lado derecho de la expresión función anónima es un objeto de función con una propiedad de nombre vacío. Puede utilizar funciones anónimas para ampliar o especializar el comportamiento de una función pasando como argumentos. Considere nativa de JavaScript</p>
<p className="p">The right side of an anonymous function expression is a function object with an empty name property. You can use anonymous functions to extend or specialize a function’s behavior by passing them as arguments. Consider JavaScript’s native</p>
 
<p className="pag">Page 40</p>
<p classname="pit">Array.sort (comparador) como un ejemplo; se necesita un objeto de función de comparación. Por defecto, ordenar convierte los valores están ordenados en cuerdas y utiliza sus valores Unicode como criterios de clasificación natural. Esta es limitante y con frecuencia no lo que se propone. Veamos un par de ejemplos:</p>
<p className="p">Array.sort(comparator) as an example; it takes a comparator function object. By default, sort converts values being sorted into strings and uses their Unicode values as natural sorting criteria. This is limiting and often not what you intend. Let’s look at a couple of examples:</p>
<p classname="pit">Como resultado, sort () es una función cuyo comportamiento con frecuencia es impulsado por los criterios aplicados en la función comparador, que por sí mismo es casi inútil. Puede forzar comparaciones numéricas adecuadas y ordenar una lista de personas por edad utilizando un argumento de función personalizada:</p>
<p className="p">As a result, sort() is a function whose behavior is frequently driven by the criteria implemented in the comparator function, which by itself is almost useless. You can force proper numerical comparisons and sort a list of people by age using a custom function argument:</p>
<pre><code>{`people.sort((p1, p2) => p1.getAge() p2.getAge());`}</code></pre>
<p classname="pit">La función de comparación toma dos parámetros, P1 y P2, con el siguiente contrato:</p>
<p className="p">The comparator function takes two parameters, p1 and p2, with the following contract:</p>
<li classname="littag">	Si comparador retorne menos del 0, p1 p2 viene antes.</li>
<li className="litag">	If comparator return less than 0, p1 comes before p2.</li>
<li classname="littag">	Si comparador devuelve 0, deje p1 y p2 sin cambios.</li>
<li className="litag">	If comparator returns 0, leave p1 and p2 unchanged.</li>
<li classname="littag">	Si comparador vuelve mayor que 0, p1 p2 viene después.</li>
<li className="litag">	If comparator returns greater than 0, p1 comes after p2.</li>
<p classname="pit">Además de ser asignables, como funciones de JavaScript sort () aceptan otras funciones como argumentos y pertenecen a una categoría llamada funciones de orden superior.</p>
<p className="p">In addition to being assignable, JavaScript functions like sort() accept other functions as arguments and belong to a category called higher-order functions.</p>
<h2>2.3.2	Higher-order functions</h2>
<p classname="pit">Dado que las funciones se comportan como objetos normales, se puede esperar que intuitivamente se pueden pasar como argumentos de funciones y desistieron de otras funciones. Estos se llaman funciones de orden superior. Que viste la función de comparación para Array.sort (); vamos a ver rápidamente en algunos otros ejemplos.</p>
<p className="p">Because functions behave like regular objects, you can intuitively expect that they can be passed in as function arguments and returned from other functions. These are called higher-order functions. You saw the comparator function for Array.sort() ; let’s quickly look at some other examples.</p>
<p classname="pit">El siguiente fragmento de muestra que las funciones pueden ser pasados ​​a otras funciones. La función applyOperation toma dos argumentos y aplica cualquier función operador para ambos:</p>
<p className="p">The following snippet shows that functions can be passed in to other functions. The applyOperation function takes two arguments and applies any operator function to both of them:</p>
<pre><code>{`
function applyOperation(a, b, opt) { return opt(a,b);
}
var multiplier = (a, b) => a * b;`}</code></pre>
 

 
<p className="pag">Page 41</p>
<p classname="pit">En el siguiente ejemplo, la función de complemento toma un argumento y devuelve una función que, a su vez, recibe un segundo argumento y los suma:</p>
<p className="p">In the next example, the add function takes an argument and returns a function that, in turn, receives a second argument and adds them together:</p>
<p classname="pit">Dado que las funciones son de primera clase y de orden superior, las funciones de JavaScript pueden comportarse como valores, lo que implica que una función no es más que un valor todavía-a-ser ejecutado definidos inmutable en base a la entrada proporcionada a la función. Este principio está incorporado en todo lo que haces en la programación funcional, especialmente cuando se pone en cadenas de funciones, como se verá en el capítulo 3. Cuando la construcción de cadenas de funciones, siempre vas a confiar en los nombres de funciones para que apunte a un pedazo de una programa que se ejecuta como parte de toda una expresión.</p>
<p className="p">Because functions are first-class and higher-order, JavaScript functions can behave as values, which implies that a function is nothing more than a yet-to-be-executed value defined immutably based on the input provided to the function. This principle is embedded in everything that you do in functional programming, especially when you get into function chains, as you’ll see in chapter 3. When building function chains, you’ll always rely on function names to point to a piece of a program that will be executed as part of an entire expression.</p>
<p classname="pit">Se pueden combinar las funciones de orden superior para crear expresiones significativas de piezas más pequeñas y simplificar muchos programas que de otro modo sería tedioso de escribir. A modo de ejemplo, digamos que usted necesita para imprimir una lista de las personas que viven en los Estados Unidos. Su primer acercamiento probablemente se vería como el código imperativo:</p>
<p className="p">You can combine higher-order functions to create meaningful expressions from smaller pieces and simplify many programs that would otherwise be tedious to write. As an example, say you need to print a list of people who live in the United States. Your first approach would probably look like this imperative code:</p>
<p classname="pit">Ahora, supongamos que necesita para apoyar la impresión de las personas que viven en otros países, también. Con funciones de orden superior, que puede muy bien abstracta a cabo la acción realizada en cada persona: en este caso, la impresión a la consola. Se puede suministrar libremente cualquier función de acción que desea una función printPeople de orden superior:</p>
<p className="p">Now, suppose you need to support printing people living in other countries, as well. With higher-order functions, you can nicely abstract out the action performed on each person: in this case, printing to the console. You can freely supply any action function you want to a higher-order printPeople function:</p>
<pre><code>{`function printPeople(people, action) {
for (let i = 0; i < people.length; i++)	{
action (people[i]);
}
}
var action = function (person) {
if(person.address.country === 'US')	{
console.log(person);
}
}
printPeople(people,action);`}</code></pre>
 

 
<p className="pag">Page 42</p>
<p classname="pit">Un patrón notable que se produce en lenguajes como JavaScript es que los nombres de funciones pueden ser sustantivos pasivos como multiplicador, comparador, y la acción. Debido a que son de primera clase, las funciones se pueden asignar a las variables y se ejecutan en un momento posterior. Vamos a refactorizar printPeople a aprovechar al máximo las funciones de orden superior:</p>
<p className="p">A noticeable pattern that occurs in languages like JavaScript is that function names can be passive nouns like multiplier, comparator, and action. Because they’re firstclass, functions can be assigned to variables and executed at a later time. Let’s refactor printPeople to take full advantage of higher-order functions:</p>
<p classname="pit">Esta es la mentalidad que debe desarrollar para abrazar plenamente la programación funcional. Este ejercicio muestra que el código es mucho más flexible que lo que comenzó, porque se puede intercambiar rápidamente (o configurar) los criterios de selección, así como el cambio en el que desea imprimir. Los capítulos 3 y 4 se centran en este tema y el uso de bibliotecas especiales para encadenar operaciones fluidez juntos y construir programas complejos de partes simples.</p>
<p className="p">This is the mindset you must develop to fully embrace functional programming. This exercise shows that the code is a lot more flexible than what you started with, because you can quickly swap (or configure) the criteria for selection as well as change where you want to print. Chapters 3 and 4 focus on this topic and the use of special libraries to fluently chain operations together and build complex programs from simple parts.</p>
<h2>Looking ahead</h2>
<p classname="pit">Quiero hacer una breve pausa mi análisis de núcleo de material JavaScript para dar más detalles sobre el programa en esta sección y combinar algunos conceptos que he mencionado brevemente. Esto es un poco avanzada por ahora, pero pronto aprenderá cómo construir programas de esta manera el uso de técnicas de FP. Puede crear funciones de apoyo que utilizan lentes que se pueden utilizar para acceder a las propiedades de un objeto:</p>
<p className="p">I want to briefly pause my discussion of core JavaScript material to elaborate further on the program in this section and combine some concepts I've briefly touched on. This is a bit advanced for now, but soon you'll learn how to build programs this way using FP techniques. You can create supporting functions using lenses that you can use to access an object's properties:</p>
<pre><code>{`var countryPath = ['address', 'country'];
var countryL = R.lens(R.path(countryPath), R.assocPath(countryPath)); var inCountry = R.curry((country, person) =>
R.equals(R.view(countryL, person), country));`}</code></pre>
<p classname="pit">Esto es mucho más funcional que antes:</p>
<p className="p">This is much more functional than before:</p>
<pre><code>{`people.filter(inCountry('US')).map(console.log);`}</code></pre>
<p classname="pit">Como se puede ver, el nombre del país se convierte en otro parámetro que se puede cambiar a cualquier cosa que desee. Esto es algo que esperamos que en los siguientes capítulos.</p>
<p className="p">As you can see, the country name becomes another parameter that can be changed to anything you want. This is something to look forward to in the following chapters.</p>
<p classname="pit">En JavaScript, funciones no sólo se invocan, también están aplicados. Vamos a hablar de mecanismo de invocación-función de este ofJavaScript calidad única.</p>
<p className="p">In JavaScript, functions not only are invoked, they’re also applied. Let’s talk about this unique quality ofJavaScript’s function-invocation mechanism.</p>
 
<p className="pag">Page 43</p>
<h2>2.3.3	Types of function invocation</h2>
<p classname="pit">mecanismo de invocación-función de JavaScript es una parte interesante de la lengua y diferente de otros lenguajes de programación. JavaScript le da total libertad para dictar el contexto de ejecución en el que se invoca una función: el valor de esta función en el cuerpo. funciones de JavaScript pueden ser invocados de muchas maneras diferentes:</p>
<p className="p">JavaScript’s function-invocation mechanism is an interesting part of the language and different from other programming languages. JavaScript gives you complete freedom to dictate the runtime context in which a function is invoked: the value of this in the function body. JavaScript functions can be invoked in many different ways:</p>
<li classname="littag"> Como una función-El mundial referencia a la presente se establece ya sea al objeto global o indefinido (en modo estricto):</li>
<li className="litag"> As a global function—The reference to this is set either to the global object or to undefined (in strict mode):</li>
<p classname="pit">Como se puede ver en estos ejemplos, al contrario que en otros lenguajes de programación, el esta referencia se establece en función de cómo se utiliza la función (a nivel mundial, como un método de objeto, como constructor, y así el hijo) y no por su contexto léxica (su ubicación en el código). Esto puede conducir a código que es difícil de entender, porque es necesario prestar atención cerca del contexto en el que una función se está ejecutando.</p>
<p className="p">As you can see from these examples, unlike in other programming languages, the this reference is set based on how the function is used (globally, as an object method, as a constructor, and so son) and not by its lexical context (its location in the code). This can lead to code that’s hard to understand, because you need to pay close attention to the context in which a function is executing.</p>
<p classname="pit">He incluido esta sección porque es importante que usted sepa como oper desaJavaScript; pero, como he indicado varias veces, el uso de esta en el código funcional es rara vez visto (de hecho, ha evitado a toda costa). Es muy utilizada por biblioteca y implementherramienta ERS para casos especiales que exigen el contexto de flexión lenguaje para realizar hazañas increíbles. Estos implican a menudo la función se aplican métodos y llamada.</p>
<p className="p">I included this section because it’s important for you to know as a JavaScript developer; but as I’ve indicated several times, the use of this in functional code is rarely seen (in fact, it’s avoided at all costs). It’s heavily used by library and tool implementers for special cases that demand bending the language context to perform incredible feats. These often involve the function methods apply and call.</p>
 
<p className="pag">Page 44</p>
<h2>2.3.4	Function methods</h2>
<p classname="pit">JavaScript soporta la llamada a las funciones a través de los métodos de la función (como los meta-cali funciones) y aplicar, que pertenecen al prototipo de la función. Ambos métodos se utilizan ampliamente cuando el código de andamios esta construida de manera que los usuarios de la API pueden crear nuevas funciones de los ya existentes. Vamos a echar un vistazo rápido a escribir una función negate, por ejemplo:</p>
<p className="p">JavaScript supports calling functions via the function methods (like meta-functions) cali and apply, which belong to the function’s prototype. Both methods are used extensively when scaffolding code is built so that API users can create new functions from existing ones. Let’s take a quick look at writing a negate function, for example:</p>
<p classname="pit">La función negate crea una nueva función que invoca su argumento y luego loginiega camente ella. En este ejemplo se utiliza aplicar, pero se puede utilizar la llamada de la misma manera; la diferencia es que este último acepta una lista de argumentos, mientras que la primera tiene una matriz de argumentos. El primer argumento, thisArg, se puede utilizar para manipular el texto confunción según sea necesario. Aquí están las dos firmas:</p>
<p className="p">The negate function creates a new function that invokes its argument and then logically negates it. This example uses apply, but you could use call the same way; the difference is that the latter accepts an argument list, whereas the former takes an array of arguments. The first argument, thisArg, can be used to manipulate the function context as needed. Here are both signatures:</p>
<pre><code>{`Function.prototype.apply(thisArg, [argsArray])
Function.prototype.call(thisArg, arg1,arg2,...)`}</code></pre>
<p classname="pit">Si thisArg refiere a un objeto, se establece en el objeto se llama al método sobre. Si thisArg es nulo, el contexto función se ajusta al objeto global, y la función se comporta como una simple función global. Pero si el método es una función en modo estricto, el valor real de null se pasa.</p>
<p className="p">If thisArg refers to an object, it’s set to the object the method is called on. If thisArg is null, the function context is set to the global object, and the function behaves like a simple global function. But if the method is a function in strict mode, the actual value of null is passed in.</p>
<p classname="pit">Manipulando el contexto función a través de thisArg abre la puerta a muchas técnicas diferentes. Esto no se recomienda en la programación funcional, porque nunca se basa en el estado de contexto (recuérdese que todos los datos se proporciona a funciones como argumentos), por lo que no voy a pasar más tiempo en esta función.</p>
<p className="p">Manipulating the function context through thisArg opens the door to many different techniques. This is discouraged in functional programming, because it never relies on the context state (recall that all data is provided to functions as arguments), so I won’t spend any more time on this feature.</p>
<p classname="pit">Aunque la noción de un contexto global o un objeto compartido no es del todo útil en JavaScript funcional, hay un contexto específico que nos importa: el contexto función. Para entenderlo, hay que entender cierres y alcances.</p>
<p className="p">Although the notion of a shared global or object context isn’t all that useful in functional JavaScript, there’s one specific context we care about: the function context. To understand it, you must understand closures and scopes.</p>
 
<p className="pag">Page 45</p>
<h2>2.4 Closures and scopes</h2>
<p classname="pit">Antes de JavaScript, cierres sólo existía en idiomas FP utilizados en ciertas aplicaciones específicas. JavaScript es el primero en adoptar en el desarrollo de la corriente principal y signifiCanti cambiar la forma en que se escribe código. Vamos a revisar el tipo de Código postal:</p>
<p className="p">Prior to JavaScript, closures only existed in FP languages used in certain specific applications. JavaScript is the first to adopt it into mainstream development and significanti change the way in which we write code. Let’s revisit the zipCode type:</p>
<pre><code>{`
function zipCode(code, location) { let _code = code; let _location = location ||	'';
return {
code: function ()	{
return _code;
},
location: function ()	{
return _location;
},
};
}
`}</code></pre>
<p classname="pit">Si examina el código de cerca, se dará cuenta que la función devuelve un código postal literal objeto que parece tener acceso completo a las variables declaradas fuera de su alcance. En otras palabras, después de Código postal haya terminado de ejecutarse, el objeto resultante puede todavía ver la información declarada en esta función de cerramiento:</p>
<p className="p">If you examine this code closely, you’ll realize that the zipCode function returns an object literal that seems to have full access to variables declared outside of its scope. In other words, after zipCode has finished executing, the resulting object can still see information declared in this enclosing function:</p>
<pre><code>{`
const princetonZip = zipCode('08544',	'3345');
princetonZip.code(); //-> '08544'
`}</code></pre>
<p classname="pit">Esto es un poco endiablada, y todo gracias al cierre que se forma alrededor del objeto y función declaraciones en JavaScript. La posibilidad de acceder a los datos de esta manera tiene muchos usos prácticos; en esta sección, vamos a ver el uso de cierres de emular las variables privadas, obtener los datos desde el servidor, y forzar las variables del bloque de ámbito. </p>
<p className="p">This is a bit mind-bending, and it’s all thanks to the closure that forms around object and function declarations in JavaScript. Being able to access data this way has many practical uses; in this section, we’ll look at using closures to emulate private variables, fetch data from the server, and force block-scoped variables.</p>
<p classname="pit">Un cierre es una estructura de datos que se une a una función de su entorno en el momento en que se declaró. Se basa en la ubicación del texto de la declaración de la función; por lo tanto, un cierre también se llama un alcance estático o léxico que rodea a la definición de la función. Ya que da acceso a las funciones a su estado circundante, que hace que el código lectura clara y capaz. Como veremos en breve, los cierres son fundamentales no sólo en los programas funcionales cuando se trabaja con funciones de orden superior, sino también para la gestión de eventos y devoluciones de llamada, emulando las variables privadas, y la mitigación de las trampas de algunos ofJavaScript. </p>
<p className="p">A closure is a data structure that binds a function to its environment at the moment it’s declared. It’s based on the textual location of the function declaration; therefore, a closure is also called a static or lexical scope surrounding the function definition. Because it gives functions access to its surrounding state, it makes code clear and readable. As you’ll see shortly, closures are instrumental not only in functional programs when you’re working with higher-order functions, but also for event-handling and callbacks, emulating private variables, and mitigating some ofJavaScript’s pitfalls.</p>
<p classname="pit">Las reglas que rigen el comportamiento de cierre de una función están estrechamente relacionados con reglas de alcance de JavaScript. A grupos alcance un conjunto de enlaces variables y define una sección de código en el que se define una variable. En esencia, es un cierre herencia de una función de ámbitos afines a cómo el método de un objeto tiene acceso a su instancia heredadas variables ambos tienen referencias a sus padres. Los cierres se ven fácilmente en el caso de funciones anidadas. Aquí está un ejemplo rápido: </p>
<p className="p">The rules that govern the behavior of a function’s closure are closely related to JavaScript’s scoping rules. A scope groups a set of variable bindings and defines a section of code in which a variable is defined. In essence, a closure is a function’s inheritance of scopes akin to how an object’s method has access to its inherited instance variables—both have references to their parents. Closures are readily seen in the case of nested functions. Here’s a quick example:</p>
<p className="pag">Page 46</p>
<p classname="pit">Es importante notar en este ejemplo que a pesar de que las variables de cantidad y de bases en ambas funciones ya no están en el ámbito activo son, siguen siendo accesibles desde la función devuelta cuando se invoca. En esencia, se puede imaginar las funciones anidadas añadir y plantean como funciones que el paquete no sólo su cómputo sino también una instantánea de todas las variables que les rodea. En términos más generales, como se muestra en la figura 2.4, ClO de una función de seguro incluye lo siguiente: </p>
<p className="p">It’s important to notice in this example that even though the amount and base variables in both functions are no longer in the active scope, they’re still accessible from the returned function when invoked. Essentially, you can imagine the nested functions add and raise as functions that package not only their computation but also a snapshot of all variables surrounding them. More generally, as shown in figure 2.4, a function’s closure includes the following:</p>
<li classname="littag">	Todos los parámetros de la función (params y params2, en este caso)</li>
<li className="litag">	All function parameters (params and params2, in this case)</li>
<li classname="littag">	Todas las variables en el ámbito exterior (incluyendo todas las variables globales, por supuesto), así como los declarados después de las funciones additionalVars</li>
<li className="litag">	All variables in the outer scope (including all global variables, of course), as well as those declared after the function additionalVars</li>
<p classname="pit">Vamos a ver esto en acción en la siguiente lista. </p>
<p className="p">Let’s see this in action in the next listing.</p>
<h2>Listing 2.3 Closures at work</h2>
 
<p className="pag">Page 47</p>
<p classname="pit">Al ejecutar este código imprime el siguiente: </p>
<p className="p">Running this code prints out the following:</p>
<pre><code>{`'I can see: Outer, Inner, and Params'`}</code></pre>
<p classname="pit">A primera vista, esto puede parecer poco intuitivo y un tanto mística. Era de esperar que locai variables innervar en este caso, dejaría de existir o ser datos innecesarios después makeInner regresó, la impresión de ese modo indefinido. Detrás de las escenas, es de nuevo la magia de cierres que hace esto posible. La función de regresar de makeInner recuerda todas las variables en el ámbito de aplicación en el momento en que se declaró y también les impide ser eliminados. El alcance global es también parte de este cierre, que da acceso a outerVar así; Voy a revisito cierres y lo que está dentro de un contexto de funciones del capítulo 7. </p>
<p className="p">At first glance, this may seem unintuitive and somewhat mystical. You’d expect that locai variables—innervar in this case—would cease to exist or be garbage-collected after makeInner returned, thereby printing undefined. Behind the scenes, it’s again the magic of closures that makes this possible. The function returned from makeInner remembers all the variables in the scope at the time it was declared and also prevents them from being disposed of. The global scope is also part of this closure, giving access to outerVar as well; I’ll revisit closures and what’s inside a function context in chapter 7.</p>
<p classname="pit">Usted puede preguntarse cómo las variables (como additionalVars) declararon después de una función se declara también puede ser incluido como parte de su cierre. Para responder a esto, es necesario que Deben conocerse que JavaScript tiene tres formas de alcance: ámbito global, ámbito de la función, y un alcance de pseudo-bloque. </p>
<p className="p">You may wonder how variables (like additionalVars) declared after a function is declared can also be included as part of its closure. To answer this, you need to understand that JavaScript has three forms of scoping: global scope, function scope, and a pseudo-block scope.</p>
<h2>2.4.1 Problems with the global scope</h2>
<p classname="pit">ámbito global es la forma más simple de determinación del alcance, pero también lo peor. Todos los objetos y Ables variabilidad declaradas en el nivel más exterior de un script (no contenida en cualquier función) son parte del alcance global y accesible desde todo el código JavaScript. Recordemos que nuestro objetivo en la programación funcional es evitar que cualquier cambio observables a rizarse hacia fuera de funciones; pero en el ámbito mundial, cada línea que se ejecuta provoca cambios visibles que se produzca. </p>
<p className="p">Global scope is the simplest form of scoping, but also the worst. Any objects and variables declared in the outermost level of a script (not contained in any function) are part of the global scope and accessible from all JavaScript code. Recall that our goal in functional programming is to prevent any observable changes to ripple out from functions; but in the global scope, every line that executes causes visible changes to occur.</p>
<p classname="pit">Es tentador usar variables globales, pero están compartidos entre todos los scripts cargados en la página, que puede conducir fácilmente a las colisiones de espacio de nombres si el código JavaScript no está empacado en módulos. Contaminar el espacio de nombres global puede ser problemático porque se corre el riesgo de anular las variables y funciones declaradas en diferentes archivos. </p>
<p className="p">It’s tempting to use global variables, but they’re shared among all scripts loaded onto the page, which can easily lead to namespace collisions if your JavaScript code isn’t packaged into modules. Polluting the global namespace can be problematic because you run the chance of overriding variables and functions declared in different files.</p>
<p classname="pit">Los datos globales tiene el efecto perjudicial de hacer que los programas difícil de razonar acerca de porque usted está obligado a mantener una nota mental de la situación de todas las variables en cualquier punto en el tiempo. Esta es una de las principales razones de la complejidad del programa aumenta a medida que su código se hace más grande. Es también favorece a tener efectos secundarios en sus funciones, ya que, inevitablemente, crear dependencias externas al leer o escribir en él. Debería ser obvio en este punto que cuando se escribe en un estilo FP, evitará el uso de variables globales a toda costa. </p>
<p className="p">Global data has the detrimental effect of making programs hard to reason about because you’re obligated to keep a mental note of the state of all variables at any point in time. This is one of the main reasons program complexity increases as your code becomes larger. It’s also conducive to having side effects in your functions, because you inevitably create external dependencies when reading from or writing to it. It should be obvious at this point that when writing in an FP style, you’ll avoid using global variables at all cost.</p>
 
<p className="pag">Page 48</p>
<h2>2.4.2	JavaScript’s function scope</h2>
<p classname="pit">Este es el mecanismo de selección de JavaScript preferido. Las variables declaradas en una función son locales a esa función y no son visibles en ningún otro lugar. Además, cuando una función devuelve, cualquier variable local declarada en se elimina con ella. Así que en la función:</p>
<p className="p">This is JavaScript’s preferred scoping mechanism. Any variables declared in a function are local to that function and not visible anywhere else. Also, when a function returns, any local variables declared in are deleted with it. So in the function:</p>
<pre><code>{`
function doWork() {
let student = new Student(...); let address = new Address(...);
// do more work
};
`}</code></pre>
<p classname="pit">el estudiante las variables y dirección están obligados en DoWork () y son inaccesibles por el mundo exterior. Como se puede ver en la figura 2.5, la resolución de una variable por su nombre es similar a la cadena de resolución de nombres prototipo descrito anteriormente. Se comienza comprobando el alcance interno y se abre camino hacia el exterior. mecanismo de determinación del alcance de JavaScript funciona de la siguiente manera:</p>
<p className="p">the variables student and address are bound in doWork() and are inaccessible by the outside world. As you can see in figure 2.5, resolving a variable by name is similar to the prototype name-resolution chain described earlier. It begins by checking the innermost scope and works its way outward. JavaScript’s scoping mechanism works as follows:</p>
<li classname="littag">1 Se comprueba ámbito de la función de la variable.</li>
<li className="litag">1	It checks the variable’s function scope.</li>
<li classname="littag">2 Si no está en el ámbito local, se mueve hacia el exterior en el ámbito léxico rodea, buscando la referencia de variable hasta que llega al ámbito global.</li>
<li className="litag">2	If not in the local scope, it moves outward into the surrounding lexical scope, searching for the variable reference until it reaches the global scope.</li>
<li classname="littag">3 Si no se puede hacer referencia a la variable, JavaScript devuelve indefinido.</li>
<li className="litag">3	If the variable can’t be referenced, JavaScript returns undefined.</li>
Consider this code sample:
<pre><code>{`
var x = 'Some value'; function parentFunction() { function innerFunction() { console.log(x);
}
return innerFunction;
}
var inner = parentFunction(); inner();
`}</code></pre>
<p classname="pit">Cuando interior se llama, el tiempo de ejecución JavaScript desenrolla el proceso de búsqueda para x en la secuencia mostrada en la figura 2.5.</p>
<p className="p">When inner is called, the JavaScript runtime unwinds the lookup process for x in the sequence shown in figure 2.5.</p>
<p classname="pit">Figura 2.5 orden de resolución de nombres de JavaScript, que primero se ve en el nivel de ámbito más cercano que rodea una búsqueda variable y se mueve hacia afuera. En primer lugar comprueba el alcance de la función (local), a continuación, se mueve en el alcance de su padre (si lo hay), y, finalmente, se mueve en el ámbito global. Si no se encuentra la variable x, la función devuelve indefinido.</p>
<p className="p">Figure 2.5 JavaScript’s name-resolution order, which first looks into the closest scope level surrounding a variable lookup and moves outward. It first checks the function’s scope (local), then moves into its parent’s scope (if there is one), and finally moves into the global scope. If the variable x isn’t found, the function returns undefined.</p>
 
<p className="pag">Page 49</p>
<p classname="pit">Si usted tiene experiencia con cualquier otro lenguaje de programación, es probable que se utiliza para funcionar alcance. Sin embargo, dada la sintaxis de JavaScript parecido a C, se puede esperar alcances de bloque para un funcionamiento similar.</p>
<p className="p">If you have experience with any other programming language, you’re probably used to function scope. But given JavaScript’s C-like syntax, you may expect block scopes to work in similar ways.</p>
<h2>2.4.3	A pseudo-block scope</h2>
<p classname="pit">Por desgracia, el estándar ES5 JavaScript no soporta alcance a nivel de bloque, que se forma entre corchetes, {}, bajo estructuras de control como para, mientras que, si, y el interruptor declaraciones. La excepción es la variable de error pasado en un bloque catch. La sentencia with podemos hacer un cierto nivel de ámbito de bloque, pero su uso no se recomienda y se elimina en modo estricto. En otros idiomas como C, una variable declarada en una sentencia if (miVar, en este caso) como la siguiente:</p>
<p className="p">Unfortunately, standard ES5 JavaScript doesn’t support block-level scope, which is formed in brackets, {}, under control structures such as for, while, if, and switch statements. The exception is the error variable passed into a catch block. The with statement can do some level of block scope, but its use is discouraged and is removed in strict mode. In other C-like languages, a variable declared in an if statement (myVar, in this case) such as the following:</p>
<pre><code>{`if (someCondition) { var myVar = 10;
}`}</code></pre>
<p classname="pit">no es accesible desde fuera del bloque de código. Esto puede ser confuso para los desarrolladores que están acostumbrados a que el estilo y son nuevos en JavaScript. Debido Javascript ámbito de la función de forma exclusiva, las variables declaradas en un bloque se puede acceder en cualquier punto de la función. Esto también puede ser una pesadilla para los desarrolladores de JavaScript, pero hay maneras de superarlo. Veamos el problema que nos ocupa:</p>
<p className="p">isn’t accessible from outside the code block. This can be confusing for developers who are accustomed to that style and are new to JavaScript. Because JavaScript has function scope exclusively, any variables declared in a block are accessible at any point in the function. This can also be a nightmare for JavaScript developers, but there are ways to overcome it. Let’s look at the problem at hand:</p>
<pre><code>{`function doWork() { if (!myVar) { var myVar = 10;
}
console.log(myVar); //-> 10
}
doWork();`}</code></pre>
<p classname="pit">El miVar variable se declara en la sentencia if, pero es visible desde el exterior del bloque. Curiosamente, la ejecución de este código imprime el valor de 10. Esto puede ser bafaventura, especialmente para los desarrolladores que se utilizan para el alcance a nivel de bloque más común. Un mecanismo de JavaScript nal interiza declaraciones de variables y función a la parte superior del alcance-el ámbito de la función actual, en este caso. Esto puede hacer que la escritura bucles en malas condiciones; prestar atención a la siguiente lista.</p>
<p className="p">The variable myVar is declared in the if statement, but it’s visible from outside the block. Strangely enough, running this code prints out the value 10. This can be baffling, especially for developers used to the more common block-level scope. An internal JavaScript mechanism hoists variable and function declarations to the top of the current scope—the function scope, in this case. This can make writing loops unsafe; pay attention to the following listing.</p>
<p classname="pit">Añadir 2,4 problema loop-counter Ambiguous:</p>
<p className="p">Listing 2.4 Ambiguous loop-counter problem:</p>
<pre><code>{`var arr = [1, 2, 3, 4]; function processArr() {
function multipleBy10(val) { i = 10;
return val * i;
}
for(var i = 0; i < arr.length; i++)	{
arr[i] = multipleBy10(arr[i]);
}

return arr;
}
processArr(); / /->	[10, 2, 3, 4]`}</code></pre>
<p className="pag">Page 50</p>
<p classname="pit">El contador de bucles i se mueve a la parte superior de la función y se convierte en parte del cierre de la función multipleBy10. El olvido de utilizar la palabra clave var en la declaración de i no puede crear una variable de ámbito local en multiplyBy y accidentalmente modifica el contador del bucle a 10. La declaración de bucle de venta libre se iza, en undefined, y más tarde le asigna el valor 0 cuando el bucle es correr. En el capítulo 8, verá una recurrencia de este problema de la ambigüedad que se produce con el cálculo de operaciones de no bloqueo en bucles.</p>
<p className="p">The loop counter i is moved to the top of the function and becomes part of the multipleBy10 function’s closure. Forgetting to use the keyword var in i’s declaration fails to create a locally scoped variable in multiplyBy and accidentally modifies the loop counter to 10. The loop-counter declaration is hoisted, set to undefined, and then later assigned the value 0 when the loop is run. In chapter 8, you’ll see a recurrence of this ambiguity problem that occurs with computing nonblocking operations in loops.</p>
<p classname="pit">Buenos entornos de desarrollo y borra de puede ayudar a mitigar estos problemas, pero incluso ellos no son de mucha ayuda en la cara de cientos de líneas de código. En el siguiente capítulo, vamos a ver mejores soluciones que sean propensos a errores que los bucles estándar más elegante y menos: las técnicas que aprovechan al máximo las funciones de orden superior y ayuda a mitigar estos pit-caídas. Como hemos visto a lo largo de este capítulo, ES6 JavaScript proporciona la palabra clave let para ayudar a resolver esta ambigüedad bucle de venta libre por la unión adecuadamente el contador del bucle a su bloque que lo contiene:</p>
<p className="p">Good IDEs and linters can help mitigate these issues, but even they aren’t much help in the face of hundreds of lines of code. In the next chapter, we’ll look at better solutions that are both more elegant and less error-prone than standard loops: techniques that take full advantage of higher-order functions and help mitigate these pitfalls. As you’ve seen throughout this chapter, ES6 JavaScript provides the let keyword to help resolve this loop-counter ambiguity by properly binding the loop counter to its enclosing block:</p>
<p classname="pit">Este es un paso en la dirección correcta, y la razón por la que prefiero usar let de var en variables de ámbito acotado, pero bucles manuales tener otros defectos que vamos a REM Edy en el siguiente capítulo. Ahora que usted entiende lo que constituye el cierre de una función y su interacción con la mecánica de alcance, pasemos a algunos usos prácticos de los cierres.</p>
<p className="p">This is a step in the right direction, and the reason why I prefer using let than var in scope-bounded variables, but manual loops have other shortcomings that we’ll remedy in the next chapter. Now that you understand what makes up a function’s closure and its interplay with scope mechanics, let’s turn to some practical uses of closures.</p>
<h2>2.4.4	Practical applications of closures</h2>
<p classname="pit">Los cierres tienen muchas aplicaciones prácticas que son importantes para aplicar cuando impleMenting programas grandes de JavaScript. Estos no son específicos de la programación funcional, pero sí tomar ventaja mecanismo de la función de ofJavaScript:</p>
<p className="p">Closures have many practical applications that are important to apply when implementing large JavaScript programs. These aren’t specific to functional programming, but they do take advantage ofJavaScript’s function mechanism:</p>
<li classname="littag">	Emulando las variables privadas</li>
<li className="litag">	Emulating private variables</li>
<li classname="littag">	Realizar llamadas asincrónicas del lado del servidor</li>
<li className="litag">	Making asynchronous server-side calls</li>
<li classname="littag">	Creación de bloques de variables de ámbito artificiales</li>
<li className="litag">	Creating artificial block-scoped variables</li>
<p classname="pit">Emulando las variables privadas</p>
<p className="p">EMULATING PRIVATE VARIABLES</p>
<p classname="pit">A diferencia de JavaScript, muchos lenguajes proporcionan un mecanismo incorporado para definir las propiedades internas de un objeto mediante el establecimiento de modificadores de accesibilidad (como privada). JavaScript no tiene una palabra clave nativo para variables privadas y funciones que se accede sólo en el ámbito de un objeto. La encapsulación puede jugar a favor de la inmutabilidad porque no se puede cambiar lo que no se puede acceder.</p>
<p className="p">Unlike JavaScript, many languages provide a built-in mechanism to define internal properties of an object by setting accessibility modifiers (like private). JavaScript doesn’t have a native keyword for private variables and functions to be accessed only in the scope of an object. Encapsulation can play in favor of immutability because you can’t change what you can’t access.</p>
 
<p className="pag">Page 51</p>
<p classname="pit">El uso de cierres, sin embargo, es posible emular este comportamiento. Un ejemplo devuelve un objeto, al igual Código postal y coordinar en el ejemplo anterior. Estas funciones devuelven objetos literales con métodos que tienen acceso a ninguna de las variables locales de la función externa, pero que no exponen estas variables, por lo tanto haciendo efectivamente privado.</p>
<p className="p">Using closures, however, it’s possible to emulate this behavior. One example is returning an object, much like zipCode and coordinate in the earlier example. These functions return object literals with methods that have access to any of the outer function’s local variables, but don’t expose these variables, therefore effectively making them private.</p>
<p classname="pit">Los cierres también pueden proporcionar una forma de gestionar el espacio de nombres global para evitar que los datos compartidos a nivel mundial. autores biblioteca y módulos llevan cierres a un nivel superior al ocultar los métodos y los datos privados de un módulo entero. Esto se conoce como el patrón del módulo, ya que utiliza una única expresión de la función invocada inmediatamente (IIFE) para encapsular las variables internas mientras que le permite exportar el conjunto necesario de funcionalidad con el mundo exterior y reducir severamente el número de referencias globales.</p>
<p className="p">Closures can also provide a way to manage your global namespace to avoid globally shared data. Library and module authors take closures to the next level by hiding an entire module’s private methods and data. This is referred to as the Module pattern because it uses a single immediately invoked function expression (IIFE) to encapsulate internal variables while allowing you to export the necessary set of functionality to the outside world and severely reduce the number of global references.</p>
<p classname="pit">NOTA Como una mejor práctica general, recomiendo el envasado de todo su código funcional dentro de módulos bien encapsulado. Puede transferir todos los principios básicos de la programación funcional que ha aprendido en este libro con el nivel de los módulos.</p>
<p className="p">NOTE As a general best practice, I recommend packaging all of your functional code inside well-encapsulated modules. You can transfer all the core principles of functional programming you’ve learned in this book to the level of modules.</p>
<p classname="pit">He aquí una pequeña muestra de un esqueleto de un módulo: 3</p>
<p className="p">Here’s a short sample of a module skeleton:3</p>
<p classname="pit">El MyModule objeto se crea a nivel mundial y se pasa a una expresión de función, creada con la palabra clave function, e inmediatamente se ejecuta cuando se carga el guión. Debido al ámbito de la función de JavaScript, _myPrivateVar y cualesquiera otras variables privadas son locales de la función de envoltura. El cierre que rodea los dos métodos exportados es lo que permite que el objeto para acceder de forma segura todas las propiedades internas del módulo. Esta es convincente, ya que mantiene su baja huella mundial, mientras que la exposición de un objeto con</p>
<p className="p">The object MyModule is created globally and passed into a function expression, created with the function keyword, and immediately executed when the script is loaded. Due to JavaScript’s function scope, _myPrivateVar and any other private variables are local to the wrapping function. The closure surrounding the two exported methods is what allows the object to safely access all of the module’s internal properties. This is compelling because it keeps your global footprint low while exposing an object with</p>

<p className="ind">Index 3 For a more in-depth explanation of the different types of module patterns, see Ben Cherry’s “JavaScript Module Pattern: In-Depth,” Adequately Good, March 12, 2010, http://mng.bz/H9hk.</p>
 
<p className="pag">Page 52</p>
<p classname="pit">un montón de estado y el comportamiento encapsulado. Este patrón módulo ha sido adoptado en todas las bibliotecas funcionales que usaremos en este libro. </p>
<p className="p">lots of encapsulated state and behavior. This module pattern has been adopted in all the functional libraries we’ll use throughout this book.</p>
<p classname="pit">HACER LLAMADAS del lado del servidor ASÍNCRONOS </p>
<p className="p">MAKING ASYNCHRONOUS SERVER-SIDE CALLS</p>
<p classname="pit">de primera clase de JavaScript, funciones de orden superior se puede pasar a otras funciones como las devoluciones de llamada. Devoluciones de llamada son útiles como ganchos para controlar los eventos de una manera discreta. Supongamos que se necesita para hacer una petición al servidor y desea ser notificado una vez que los datos han sido recibidos. El lenguaje tradicional es el de proporcionar una función de devolución de llamada que se encargará de la respuesta: </p>
<p className="p">JavaScript’s first-class, higher-order functions can be passed into other functions as callbacks. Callbacks are useful as hooks to handle events in an unobtrusive manner. Suppose you need to make a request to the server and want to be notified once the data has been received. The traditional idiom is to provide a callback function that will handle the response:</p>
<p classname="pit">getJSON es una función de orden superior que toma dos argumentos: devoluciones de llamada como una función de éxito y una función de error. Un patrón común que se produce con un código asíncrono, así como el manejo de eventos es que se puede acaparar fácilmente a sí mismo en las llamadas a funciones anidadas; esta forma la desagradable “pirámide de devolución de llamada de la fatalidad” cuando es necesario hacer varias llamadas remotas posteriores al servidor. Como probablemente experimenté, cuando el código está profundamente anidado, se hace difícil de seguir. En el capítulo 8, aprenderá las mejores prácticas de cómo alisar básicamente este código en expresiones tivos más fluidos y declaraesa cadena juntos en lugar de anidamiento. </p>
<p className="p">getJSON is a higher-order function that takes two callbacks as arguments: a success function and an error function. A common pattern that occurs with asynchronous code as well as event handling is that you can easily corner yourself into deeply nested function calls; this forms the unpleasant “callback pyramid of doom” when you need to make several subsequent remote calls to the server. As you’ve probably experienced, when code is deeply nested, it becomes hard to follow. In chapter 8, you’ll learn best practices for how to basically flatten this code into more fluent and declarative expressions that chain together instead of nesting.</p>
<p classname="pit">Emulando VARIABLES-SCOPE BLOQUEADO </p>
<p className="p">EMULATING BLOCKED-SCOPE VARIABLES</p>
<p classname="pit">El uso de cierres puede proporcionar una solución alternativa a la ambigua variabilidad loop-counter ejemplo capaz en el listado 2.4. Como he mencionado anteriormente, la cuestión de fondo es la falta de semántica bloque de alcance de JavaScript, por lo que el objetivo es crear artificialmente este ámbito de bloque. ¿Qué se puede hacer al respecto? El uso de let mitiga muchos de los problemas con el mecanismo de bucle tradición cional, pero un enfoque funcional sería tomar ventaja de los cierres y el alcance de la función JavaScript y considerar el uso forEach. Ahora, en lugar de preocuparse por atar el contador de bucles y otras variables en su alcance, se puede envolver con eficacia el cuerpo del bucle dentro del bucle como si la emulación de un bloque de función alcance bajo la sentencia de bucle. Como veremos más adelante, esto ayuda a que llame comportamiento asincrónico, mientras que la iteración en las colecciones: </p>
<p className="p">Using closures can provide an alternative solution to the ambiguous loop-counter variable example in listing 2.4. As I mentioned earlier, the underlying issue is JavaScript’s lack of block-scope semantics, so the objective is to artificially create this block scope. What can you do about this? Using let mitigates many of the issues with the traditional looping mechanism, but a functional approach would be to take advantage of closures and JavaScript’s function scope and consider using forEach. Now, instead of worrying about tying the loop counter and other variables in scope, you can effectively wrap the loop body inside the loop as if emulating a function-scope block under the loop statement. As you’ll learn later, this helps you call asynchronous behavior while iterating over collections:</p>
<pre><code>{`
arr.forEach(function(elem, i) {
});
`}</code></pre>
<p className="pag">Page 53</p>
<p classname="pit">En este capítulo cubierta sólo los elementos básicos de JavaScript, para ayudar a entender algunas de sus limitaciones cuando se utiliza funcionalmente y se prepara para las técnicas funcionales tratados en capítulos posteriores. Si usted busca una comprensión mucho más profunda de la lengua, hay libros enteros dedicados a este tema que enseñan los conceptos de objetos, la herencia y los cierres mucho más a fondo. </p>
<p className="p">This chapter covered just the basics of JavaScript, to help you understand some of its limitations when it’s used functionally and prepare you for the functional techniques covered in later chapters. If you seek a much deeper understanding of the language, there are entire books dedicated to this subject that teach the concepts of objects, inheritance, and closures much more thoroughly.</p>
<p classname="pit">¿Desea convertirse en un ninja JavaScript? </p>
<p className="p">Want to become a JavaScript ninja?</p>
<p classname="pit">Los temas de los objetos, funciones de alcance, y los cierres se tratan en este capítulo son cruciai para convertirse en un experto en JavaScript. Pero sólo he arañado la superficie, para nivelar el campo de juego para que podamos enfocar estrictamente en la programación funcional para el resto del libro. Para obtener más información y tomar sus habilidades de JavaScript a un nivel ninja, le recomiendo que lea el código JavaScript Secretos de Ninja, segunda edición por John Resig, Bear Bibeault, y Josip Maras (Manning, 2016, libros www.manning.com/ / secretos-de-la-javascript-ninja-segunda edición). </p>
<p className="p">The topics of objects, functions, scoping, and closures covered in this chapter are cruciai to becoming a JavaScript expert. But I've only scratched the surface, to level the playing field so that we can focus strictly on functional programming for the remainder of the book. To obtain more information and take your JavaScript skills to a ninja level, I recommend that you read Secrets of the JavaScript Ninja, Second Edition by John Resig, Bear Bibeault, and Josip Maras (Manning, 2016, www.manning.com/ books/secrets-of-the-javascript-ninja-second-edition).</p>
<p classname="pit">Ahora que tiene una base sólida de JavaScript, en el siguiente capítulo vamos a ver en el procesamiento de datos mediante algunas operaciones populares, tales como mapa, reducir, filtrar y recursividad. </p>
<p className="p">Now that you have a solid JavaScript foundation, in the next chapter we’ll look at data processing using some popular operations such as map, reduce, filter, and recursion.</p>
<h2>2.5	Summary</h2>
<ul>
<li classname="littag">	JavaScript es un lenguaje versátil, con una poderosa inclinación a la programación orientada a objetos y la programación funcional.</li>
<li className="litag">	JavaScript is a versatile language with a powerful inclination toward OOP and functional programming.</li>
<li classname="littag"> La implementación de la inmutabilidad la POO permite que se mezcle bien con la programación funcional.</li>
<li className="litag"> Implementing immutability into OOP allows it to mix nicely with functional programming.</li>
<li classname="littag">	funciones de orden superior y de primera clase de JavaScript constituyen la columna vertebral que permite JavaScript para escribir funcionalmente.</li>
<li className="litag">	Higher-order and first-class JavaScript functions provide the backbone that allows JavaScript to be written functionally.</li>
<li classname="littag">	Los cierres tienen muchos usos prácticos para la ocultación de información, el módulo de Desación, y pasando el comportamiento parametrizado en funciones de grano grueso a través de múltiples tipos de datos.</li>
<li className="litag">	Closures have many practical uses for information hiding, module development, and passing parameterized behavior into coarse-grained functions across multiple data types.</li></ul>

</div>            
<div className='col-md-3'></div>

    
    </div>
    </div>
   
   
  </Layout>
  
)
