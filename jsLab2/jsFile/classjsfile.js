class Square {
    constructor(a) {
      
        if (!Number.isInteger(a) || a <= 0) {
            throw new Error("Square side length must be a positive integer");
        }
        this.a = a;
    }

    static help() {
        console.log("Square is a four-sided polygon with:");
        console.log("All sides equal in length");
        console.log("All angles being right angles (90 degrees)");
        console.log("Opposite sides parallel");
    }

    length() {
        console.log(`Perimeter: ${this.a * 4}`);
    }

    square() {
        console.log(`Area: ${this.a * this.a}`);
    }

    info() {
        console.log("Square characteristics:");
        console.log(`Side lengths: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log("Angles: 90°, 90°, 90°, 90°");
        console.log(`Perimeter: ${this.a * 4}`);
        console.log(`Area: ${this.a * this.a}`);
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
       
        if (!Number.isInteger(b) || b <= 0) {
            throw new Error("Rectangle width must be a positive integer");
        }
        this.b = b;
    }

    static help() {
        console.log("Rectangle is a four-sided polygon with:");
        console.log("Opposite sides equal in length");
        console.log("All angles being right angles (90 degrees)");
        console.log("Opposite sides parallel");
    }

    length() {
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
    }

    square() {
        console.log(`Area: ${this.a * this.b}`);
    }

    info() {
        console.log("Rectangle characteristics:");
        console.log(`Side lengths: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log("Angles: 90°, 90°, 90°, 90°");
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
        console.log(`Area: ${this.a * this.b}`);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        // Validate angles
        if (!Number.isInteger(alpha) || !Number.isInteger(beta)) {
            throw new Error("Rhombus angles must be integers");
        }
        if (alpha <= 0 || beta <= 0 || alpha >= 180 || beta >= 180) {
            throw new Error("Rhombus angles must be between 0 and 180 degrees");
        }
        if (alpha + beta !== 180) {
            throw new Error("Rhombus adjacent angles must sum to 180 degrees");
        }
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus is a four-sided polygon with:");
        console.log("All sides equal in length");
        console.log("Opposite angles equal");
        console.log("Opposite sides parallel");
        console.log("Adjacent angles supplementary (sum to 180°)");
    }

    length() {
        console.log(`Perimeter: ${this.a * 4}`);
    }

    square() {
        const area = this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
        console.log(`Area: ${area.toFixed(2)}`);
    }

    info() {
        console.log("Rhombus characteristics:");
        console.log(`Side lengths: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Angles: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        console.log(`Perimeter: ${this.a * 4}`);
        const area = this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
        console.log(`Area: ${area.toFixed(2)}`);
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        // Validate angles
        if (!Number.isInteger(alpha) || !Number.isInteger(beta)) {
            throw new Error("Parallelogram angles must be integers");
        }
        if (alpha <= 0 || beta <= 0 || alpha >= 180 || beta >= 180) {
            throw new Error("Parallelogram angles must be between 0 and 180 degrees");
        }
        if (alpha + beta !== 180) {
            throw new Error("Parallelogram adjacent angles must sum to 180 degrees");
        }
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram is a four-sided polygon with:");
        console.log("Opposite sides equal and parallel");
        console.log("Opposite angles equal");
        console.log("Adjacent angles supplementary (sum to 180°)");
    }

    length() {
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
    }

    square() {
        const area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log(`Area: ${area.toFixed(2)}`);
    }

    info() {
        console.log("Parallelogram characteristics:");
        console.log(`Side lengths: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
        const area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log(`Area: ${area.toFixed(2)}`);
    }
}


try {
    console.log("Square:");
    const square = new Square(8);
    Square.help();
    square.length();
    square.square();
    square.info();

    console.log("\nRectangle:");
    const rectangle = new Rectangle(8, 4);
    Rectangle.help();
    rectangle.length();
    rectangle.square();
    rectangle.info();

    console.log("\nRhombus:");
    const rhombus = new Rhombus(7, 100, 80); 
    Rhombus.help();
    rhombus.length();
    rhombus.square();
    rhombus.info();

    console.log("\nHelp methods demonstration:");
    Square.help();
    console.log("\n");
    Rectangle.help();
    console.log("\n");
    Rhombus.help();
    console.log("\n");
    Parallelogram.help();
    console.log("\n");

    console.log("Objects demonstration:");
    const mySquare = new Square(8);
    console.log("Square:");
    mySquare.info();
    console.log("\n");

    const myRectangle = new Rectangle(8, 4);
    console.log("Rectangle:");
    myRectangle.info();
    console.log("\n");

    const myRhombus = new Rhombus(7, 100, 80); 
    console.log("Rhombus:");
    myRhombus.info();
    console.log("\n");

    const myParallelogram = new Parallelogram(8, 5, 110, 70); 
    console.log("Parallelogram:");
    myParallelogram.info();

  
} catch (error) {
    console.error("Error:", error.message);
}