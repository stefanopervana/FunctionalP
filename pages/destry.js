
¿Puede usted ver la similitud entre 1,7 y lista de programación con cadenas en
¿el listado 1.5? Esto demuestra que si está procesando una colección de
¿elementos o entradas de usuario, todo se abstrae y tratada de la misma manera
¿exacta. Tengo mucho más que decir acerca de esto en el capítulo 8.

Can you see the similarity between listing 1.7 and programming with chains in
listing 1.5? This shows that whether you’re processing a collection of
elements or user input, it’s all abstracted out and treated in the exact same
manner. I have much more to say about this in chapter 8.   Uno de los robos de
balón más importantes es que todas las operaciones que se realizan en la
listaIng 1.7 son completamente inmutable, y toda la lógica de negocio se
segregan en funciones individuo. Usted no tiene que usar funcional con
reactivos, pero pensando funcionalmente te obliga a hacerlo, y cuando lo hace,
se desbloquea una arquitectura realmente sorprendentes sobre la base de la
programación funcional reactivo (FRP).

One of the most important takeaways is that all the operations performed in
listing 1.7 are completely immutable, and all the business logic is
segregated into individual functions. You don’t have to use functional with
reactive, but thinking functionally forces you to do so—and when you do, you
unlock a truly amazing architecture based on functional reactive programming
(FRP). La programación funcional es un cambio de paradigma que puede
transformar radicalmente la forma de hacer frente a las soluciones a los retos
de programación. Así es FP un reemplazo para el diseño más populares orientado
a objetos? Afortunadamente, la aplicación de programa-ming funcional a su
código no es un enfoque de todo o nada, como se señala en las Michael Feathers
citar al principio de este capítulo. De hecho, una gran cantidad de
aplicaciones pueden beneficiarse del uso de FP junto a una arquitectura
orientada a objetos. Debido al control rígido para bilidad immutay estado
compartido, FP también es conocido por hacer la programación multihilo más
sencillo. Debido a que JavaScript es una plataforma de un solo subproceso,
esto no es algo que tenemos que preocuparse o cubrir en este libro. En el
siguiente capítulo, me paso algún tiempo que destaca algunas de las
principales diferencias entre el diseño funcional y orientada a objetos, que
creo que le ayudará a asimilar la forma funcional de pensar con mayor
facilidad.

Functional programming is a paradigm shift that can dramatically transform the
way you tackle solutions to any programming challenges. So is FP a replacement
for the more popular object-oriented design? Fortunately, applying functional
programming to your code isn’t an all-or-nothing approach, as noted in the
Michael Feathers quote at the beginning of this chapter. In fact, lots of
applications can benefit from using FP alongside an object-oriented
architecture. Due to rigid control for immutability and shared state, FP is
also known for making multithreaded programming more straightforward. Because
JavaScript is a single-threaded platform, this isn’t something we need to
worry about or cover in this book. In the next chapter, I spend some time
highlighting some of the key differences between functional and object-
oriented design, which I believe will help you grok the functional way of
thinking more easily.   En este capítulo, he mencionado brevemente los temas
que se tratarán en profundidad pasantes a cabo el libro a medida que se hunden
más en un framework funcional de la mente. Si usted ha estado siguiente al de
todos los conceptos hasta ahora, eso es genial, pero no se preocupe si se ha
perdido algunas cosas: que sólo significa que ha recogido el libro adecuado.
En programación orientada a objetos tradicionales, estás acostumbren a la
programación en el estilo imperativo / de procedimiento; cambiando para ello
será necesario hacer un cambio drástico en sus procesos de pensamiento a
medida que comienza a abordar los problemas de la “forma funcional”.

In this chapter, I briefly touched on topics that will be covered in depth
throughout the book as you sink deeper into a functional frame of mind. If
you’ve been following all the concepts so far, that’s great, but don’t worry
if you missed a few things— that just means you’ve picked up the right book.
In traditional OOP, you’re accustomed to programming in the
imperative/procedural style; changing this will require you to make a drastic
shift in your thought processes as you begin to tackle problems the
“functional way.”

<Código que utiliza funciones puras tiene ninguna posibilidad de cambiar o
romper el estado global, lo que ayuda a que el código sea más fácil de
mantener y comprobable. Code that uses pure functions has zero chance of
changing or breaking global state, which helps make your code more testable
and maintainable. La programación funcional se hace en un estilo declarativo
que es fácil de razonar acerca. Esto mejora la legibilidad general de la
aplicación y hace su código más delgado a través de una combinación de
funciones y expresiones lambda. Functional programming is done in a
declarative style that’s easy to reason about. This improves the overall
readability of the application and makes your code leaner through a
combination of functions and lambda expressions. Procesamiento de datos en un
conjunto de elementos se realiza con fluidez a través de cadenas de funciones
que enlazan las operaciones tales como el mapa y reducir. Data processing in a
collection of elements is done fluently via function chains that link
operations such as map and reduce. La programación funcional trata funciona
como bloques de construcción, apoyándose en primera clase, funciones de orden
superior para mejorar la modularidad y la reutilización del código. Functional
programming treats functions as building blocks by relying on first-class,
higher-order functions to improve the modularity and reusability of your code.
Puede reducir la complejidad de los programas basados en eventos combinando
funcionalidad con programación reactiva.  You can reduce the complexity of
event-based programs by combining functional with reactive programming.



