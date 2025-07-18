function key_textarea() {
    let textarea1Element = document.getElementById("textarea1");
    let resultElement = document.getElementById("result");
    let text_length = textarea1Element.value.length;
     
    if(text_length < 50) {
        resultElement.classList.remove("text-danger");
        resultElement.innerText = text_length;
    }
    else {
        resultElement.classList.add("text-danger");
        resultElement.innerText ="maximum 50"
    }
}
function resetclick() {
    let textarea1Element = document.getElementById("textarea1");
    textarea1Element.value = "";
    key_textarea();

}