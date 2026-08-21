import { validate, typedef } from "bycontract";

const PI = 3.141592653;

export function areaQuadrado(lado) {
    validate(lado, "number");
    return lado * lado;
}

export function areaRetangulo(base, altura){
    validate(arguments, ["number", "number"]);
    return base * altura;
}

export function areaCirculo(raio) {
    validate(raio, "number");
    return PI * raio * raio;
}

export function areaTriangulo(base, altura) {
    validate(arguments, ["number", "number"]);
    return (base * altura) / 2;
}