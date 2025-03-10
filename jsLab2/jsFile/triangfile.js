function Triangular({ a = 3, b = 4, c = 5 } = {}) {
    return {
        a,
        b,
        c
    };
}

console.log("Triangular objects demonstration:");
const myTriangle1 = Triangular(); 
console.log("Triangle 1 def:", myTriangle1);

const triangle2 = Triangular({ a: 6, b: 16, c: 17 });
console.log("Triangle 2:", myTriangle2);

const triangle3 = Triangular({ a: 7, b: 24, c: 25 });
console.log("Triangle 3:", myTriangle3);
console.log("\n");