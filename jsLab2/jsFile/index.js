let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Pavlo";
car1.driver.category = "B";
car1.driver.personalLimitations = "No driving at night";
car1.upgrade = true;
car1.dtp = 0;

var car2 = {
    color: "red",
    maxSpeed: 200,
    driver: {
        name: "John Doe",
        category: "B",
        personalLimitations: null
    },
    upgrade: false,
    dtp: 2
};
car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();
car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
        this.trip = function() {
            if (!this.driver) {
                console.log("No driver assigned");
            } else {
                let message = "Driver " + this.driver.name;
                message += this.driver.nightDriving ? " drives at night" : " does not drive at night";
                message += " and has " + this.driver.experience + " years of experience";
                console.log(message);
            }
        };
};
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};
let truck1 = new Truck("black", 5000, 80.5, "Volvo", "FH16");
let truck2 = new Truck("white", 4500, 75.3, "MAN", "TGX");
truck1.AssignDriver("Pavlo", true, 8);
truck2.AssignDriver("Denis", false, 3);
truck1.trip();
truck2.trip();