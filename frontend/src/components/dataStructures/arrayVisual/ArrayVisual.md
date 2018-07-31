Basic ArrayVisual example:
```js
    var arrayModel = [
        {value: "123", color: "white"},
        {value: "456", color: "blue"},
        {value: "789", color: "green"},
        {value: "83", color: "red"}
    ];
    <svg height="200" width="300" >
        <ArrayVisual arrayModel={arrayModel} center={{x: 150, y: 100}}/>
    </svg>
```

ArrayVisual with pointers example:
```js
    var arrayModel = [
        {value: "10", color: "red"},
        {value: "20", color: "orange"},
        {value: "30", color: "yellow"},
        {value: "40", color: "green"},
        {value: "50", color: "blue"},
        {value: "60", color: "purple"},
    ];
    var pointers = [
        {index: 1, position: "TOP", text: "An orange box"},
        {index: 3, position: "BOTTOM", text: "A green box"}
    ];
    <svg height="300" width="500" >
        <ArrayVisual arrayModel={arrayModel} pointers={pointers} center={{x: 250, y: 150}}/>
    </svg>
```
