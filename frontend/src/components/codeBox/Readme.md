```js
var lines = [
    "for(var i = 0; i < 10; i++){",
    "    if(i % 2 == 0){",
    "        console.log(\"i = \" + i)",
    "    }",
    "}"
];
<div>
    <p>The second line of code should be highlighted.</p>

    <CodeBox linesOfCode={lines} highlightedLine={1}/>

</div>
```
