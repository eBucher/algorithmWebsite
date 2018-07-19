StepManager example:

```js
const {StepManager} = require("components/stepManager/StepManager.js");

initialState = { stepNum: 0 };

function setStepNum(newNum) {
    setState({stepNum: newNum});
}

<div>
    <p>The current step is {state.stepNum}</p>
    <StepManager numSteps={10} stepNum={state.stepNum} enabled={true} setStepNum={setStepNum}/>
</div>

```
