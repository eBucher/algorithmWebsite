ExpandableContainer example:

```js
initialState = { isOpen: false };
<div>
<button onClick={() => setState({isOpen: true})}>Click to expand</button>
<ExpandableContainer height="100px" width="200px" open={state.isOpen}>
    <div style={{backgroundColor: "#b3b3ff", width: "100%", height: "100%"}}>
        Here is the inner content
    </div>
</ExpandableContainer>
</div>

```
