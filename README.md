1️⃣ What is the difference between var, let, and const?
  
  Answer: In JavaScript, var, let and const are used to declare variables, but they behave differently.
    1. var
      * var is the old way to declare variables (before ES6).
      * It is function-scoped.
      * It can be re-declared and re-assigned.
    2. let 
      * Introduced in ES6 (2015).
      * It is block-scoped.
      * It can be re-assigned, but cannot be re-declared in the same scope.
    3. const
      * Also introduced in ES6.
      * It is block-scoped like let.
      * It cannot be re-assigned and cannot be re-declared.
  
  2️⃣ What is the spread operator (...)?

    Answer: The spread operator (...) in JavaScript is used to expand or spread elements of an array, object, or iterable into individual elements.

    It was introduced in ES6.

    Spread Operator (...) expands arrays or objects into individual elements.

    3️⃣ What is the difference between map(), filter(), and forEach()?

      Answer: map(), filter() and forEach() are array methods in JavaScript used to process elements of an array. The main difference is what the return and how they are used.

      1. map()
        map() creates a new array by applying a function to every element of the original array. 
        * Returns a new array
        * Does not change the original array

      2. filter()

        filter() creates a new array with elements that pass a condition.
        * Returns a new array
        * Only keeps elements where the condition is true

      3. forEach()

        forEach() loops through the array and executes a function for each element.
        * Does not return a new array
        * Mainly used for side effects like printing or updating something.

    4️⃣ What is an arrow function?

      Answer: An arrow function is a shorter and modern way to write functions in JavaScript, introduced in ES6.
      It uses the => (arrow) symbol instead of the function keyword.

    5️⃣ What are template literals?

      Answer: Template literals are a modern way in JavaScript to create strings with embedded variables and expressions. 
      
      They were introduced in ES6.

      Template literals use backticks (`) instead of single ' ' or double "" quotes.