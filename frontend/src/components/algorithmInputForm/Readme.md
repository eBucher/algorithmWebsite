AlgorithmInputForm example:
```js
function handleSubmit(userInput){
    document.getElementById("summary").innerHTML = "Valid input was entered.";
}

function nameValidator(text){
    if(/^[A-z]+$/.test(text)){
        return true;
    }
    return false;
}

model={
    validInputHandler: handleSubmit,
    urlParams: {name: "George Washington"},
    inputs: [
        {   key: "firstName",
            displayText: "First name",
            tooltipText: "Your legal first name",
            verifyHandler: nameValidator,
            errorMsg: "Must only contain letters"
        },
        {
            key: "middleName",
            displayText: "Middle name",
            tooltipText: "You may enter a single letter or an entire middle name.",
            verifyHandler: nameValidator,
            errorMsg: "Must only contain letters"
        },
        {
            key: "lastName",
            displayText: "Last name",
            tooltipText: "Your legal last name",
            verifyHandler: nameValidator,
            errorMsg: "Must only contain letters"
        },
        {
            key: "nickName",
            displayText: "Nickname",
            tooltipText: "If you do not have a nickname, make one up.",
            verifyHandler: nameValidator,
            errorMsg: "Must only contain letters"
        }
    ]
};

<div>
    <div id="summary">Valid input has not been entered.</div>
    <AlgorithmInputForm model={model} />

</div>
```
