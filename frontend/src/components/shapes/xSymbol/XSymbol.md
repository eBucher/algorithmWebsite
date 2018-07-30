XSymbol example:
```js
    const Square = require('components/shapes/square/Square.js').default;

    <svg height="100" width="300">
        <Square center={{x: 100, y: 50}}  topText={"This square is 50x50"}/>
        <XSymbol center={{x: 100, y: 50}}/>

        <XSymbol center={{x: 200, y: 50}} color={"red"}/>
        <XSymbol center={{x: 270, y: 50}} color={"green"} height="20"/>
    </svg>
```
