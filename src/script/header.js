import Sketch from "./three";

const header = document.getElementById("header");
console.log(header);

new Sketch({
    dom: document.getElementById('header')
});