function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`${color} ${obj.type}`);
        } else {
            console.log(`No type!`);
        }
    };
}

const repaintBlack = Painter("Black");
const repaintRed = Painter("Red");
const repaintGreen = Painter("Green");

const myObject1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

const myObject2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

const myObject3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("Repainting myObject1:");
repaintBlack(myObject1);
repaintRed(myObject1);
repaintGreen(myObject1);
console.log("\n");

console.log("Repainting myObject2:");
repaintBlack(myObject2);
repaintRed(myObject2);
repaintGreen(myObject2);
console.log("\n");

console.log("Repainting myObject3:");
repaintBlack(myObject3);
repaintRed(myObject3);
repaintGreen(myObject3);