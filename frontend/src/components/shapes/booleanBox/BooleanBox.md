BooleanBox example:
```js
    <svg width="350" height="120">
        <BooleanBox center={{x: 60, y: 60}}/>
        <BooleanBox center={{x: 120, y: 60}} status={true}/>
        <BooleanBox center={{x: 180, y: 60}} status={false}/>
        <BooleanBox center={{x: 260, y: 60}} status={false} topText={"Was it true?"} size={80}/>
    </svg>
```
