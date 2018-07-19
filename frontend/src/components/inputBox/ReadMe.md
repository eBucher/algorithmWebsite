Basic InputBox example:
```js
initialState = {text: ""};

function changeHandler(e){
    setState({text: e.target.value});
}

<InputBox label="Basic example" text={state.text} onChangeHandler={changeHandler}/>
```

InputBox width a specific width example:
```js
initialState = {text: ""};

function changeHandler(e){
    setState({text: e.target.value});
}

<InputBox label="This box is 400px long" text={state.text}
    onChangeHandler={changeHandler} width="400"/>
```

InputBox with a tooltip example:
```js
initialState = {text: ""};

function changeHandler(e){
    setState({text: e.target.value});
}

<InputBox label="One with a tooltip" text={state.text}
    onChangeHandler={changeHandler}
    tooltip="See what I mean?"
/>
```

InputBox with an error example:
```js
initialState = {text: ""};

function changeHandler(e){
    setState({text: e.target.value});
}

<InputBox label="This one has an error message" text={"some invalid input"}
    errorMsg={"We only accept optimistic input."} onChangeHandler={changeHandler}
    hasError={true}
/>
```
