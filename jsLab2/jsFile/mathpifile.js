function PiMultiplier(n) {
    return function() {
        return Math.PI * n;
    };
}

console.log("PiMultiplier demonstration:");
const doublePi = PiMultiplier(2);
console.log("π × 2 =", doublePi());

const twoThirdsPi = PiMultiplier(2/3);
console.log("π × 2/3 =", twoThirdsPi());

const halfPi = PiMultiplier(1/2); 
console.log("π ÷ 2 =", halfPi());