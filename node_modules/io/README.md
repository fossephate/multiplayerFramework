## Install
```shell
npm install io
```

## io.write/io.volatile(text, color/options, background, style)

**text(String):** It is the text that will be printed.

**color(String):** It is the color name that will contain the text(Default white).

**options(Object):** It is an object that contains text styles
* **color(String):** It is the color name that will contain the text(Default white).
* **background(String):** It is the background color name that will contain the text(Default black).
* **style(String):** It is the style that will contain the text.

**background(String):** It is the background color name that will contain the text(Default black).

**style(String):** It is the style that will contain the text.

```js
var io = require('io');

/** io.write **/
io.write('This text is red', 'red');
io.write('This text is yellow, background white and italic', {
   color: 'yellow',
   background: 'white',
   style: 'italic'
});
//Or
io.write('This text is yellow, background white and italic', 'yellow', 'white', 'italic');

/** io.volatile **/
var count = 0,
    timer = setInterval(function(){
      if(count <= 100)
         io.volatile((count++)+'%', 'cyan');
      else
         clearInterval(timer);
    }, 100);

```

### Colors names
* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white
* gray
* grey

### Background colors name
* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white

### Styles names
* bold
* italic
* underline
* strikethrough

## io.read(question/Array question, callback)

**question(Object):** It is an object that has the parameters for the terminal Question.
* **question(String):** Question Text **(Is required)**.
* **default(String/Object):** Pre-defined text field response.
 * **default(String):** Text field.
 * **default(Object):** Text field response with styles.
   * **text(String):** Text field response.
    * **style(Object):** It is an object with the style of the text (like the styles of io.write).
* **format(RegExp):** Regular expression that validates the format of the response.
* **formatError(String):** Text format wonders if the input is wrong.
* **after(Function):** Function that runs after the entry of the answer, if you return to continue with the next question if you do not wait to return anything running "this.continue ()".
* **style(Object):** It is an object with the style of the text (like the styles of io.write).

```js
var io = require('io');
var question = {
        question: 'Age: ',
        defult: '18',
        format: /^[0-9]+$/,
        formatError: 'The format is incorrect, age:',
        after: function(answer, question){
            /*
              async: this.continue(); //Continue with the next question
                     this.error(); //Use formatError for ask again
                     this.again(); //Use question for ask again  
              or 
              sync: return true;
            */
        },
        style: {
           color: 'yellow',
           background: 'white',
           style: 'italic'
        }
};
io.read(question, function(answer){
    io.write('You answer is: '+answer); // => text of answer
});
```
