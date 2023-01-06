/* 
function plusify (entry)
takes in a string and replaces all spaces with +s. if the string contains no spaces, it should go unaffected.
*/
function plusify(entry) {
    let plusified = entry;
    if (plusified.includes(" ")) {
    plusified = entry.split(" ").join("+");
}
return plusified;
}

const current = document.querySelector(".current");
// console.log(current)
function unhideCurrentClass(pclass) {
    // removes the hidden attribute from article class "current"
    // if (pclass.attributes("hidden")) {
        pclass.removeAttribute("hidden")
    // }
//  console.log(pclass)


}