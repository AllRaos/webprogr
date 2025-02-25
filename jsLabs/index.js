function triangle(value1, type1, value2, type2) {
    let a, b, c, alpha, beta;

    const toRadians = (deg) => deg * (Math.PI / 180);
    const toDegrees = (rad) => rad * (180 / Math.PI);
    
    if (value1 <= 0 || value2 <= 0) {
        console.log("Zero or negative input");
        return;
    }
    
    const values = { leg: null, anothLeg:null, hypotenuse: null, oppositeangle: null, adjacentangle: null };
    if(type1=="leg" && type2=="leg"){
    values.leg = value1;
    values.anothLeg = value2;
       }
       else   {
        values[type1.split(" ").join("")] = value1;
        values[type2.split(" ").join("")] = value2; 
    }
    
    if ( values.oppositeangle >= 90 || (values.adjacentangle + values.oppositeangle)>=90 || values.adjacentangle >= 90) {
        console.log("Angle must be less than 90 degrees");
        return;
    }
    
    const calculations = [
        () => values.leg && values.anothLeg  && (a = values.leg, b = values.anothLeg,
             c = Math.sqrt(a ** 2 + b ** 2), 
             alpha = toDegrees(Math.atan(b / a)), 
             beta = 90 - alpha),

        () => values.leg && values.hypotenuse && (a = values.leg, c = values.hypotenuse, 
            alpha = toDegrees(Math.asin(a / c)), 
            b = Math.sqrt(c ** 2 - a ** 2), 
            beta = 90 - alpha),
        
        () => values.leg && values.oppositeangle && (a = values.leg, alpha = values.oppositeangle, 
            c = a / Math.sin(toRadians(alpha)), 
            b = Math.sqrt(c ** 2 - a ** 2), 
            beta = 90 - alpha),
        
        () => values.leg && values.adjacentangle && (a = values.leg, beta = values.adjacentangle, 
            alpha = 90 - beta, 
            c = a / Math.sin(toRadians(alpha)), 
            b = Math.sqrt(c ** 2 - a ** 2)),

        () => values.anothLeg && values.hypotenuse && (b = values.anothLeg, c = values.hypotenuse, 
            alpha = toDegrees(Math.asin(b / c)), 
            b = Math.sqrt(c ** 2 - a ** 2), 
            beta = 90 - alpha),
        
        () => values.anothLeg && values.oppositeangle && (b = values.anothLeg, alpha = values.oppositeangle, 
            c = b / Math.cos(toRadians(beta)), 
            a = Math.sqrt(c ** 2 - b ** 2), 
            beta = 90 - alpha),
        
        () => values.anothLeg && values.adjacentangle && (b = values.anothLeg, beta = values.beta, 
            alpha = 90 - beta, 
            c = b / Math.cos(toRadians(beta)), 
            a = Math.sqrt(c ** 2 - b ** 2)),
        
        () => values.hypotenuse && values.oppositeangle && (c = values.hypotenuse, alpha = values.oppositeangle, 
            a = c * Math.cos(toRadians(alpha)), 
            b = Math.sqrt(c ** 2 - a ** 2), 
            beta = 90 - alpha),
        
        () => values.hypotenuse && values.adjacentangle && (c = values.hypotenuse, beta = values.beta, 
            alpha = 90 - beta, 
            a = c * Math.cos(toRadians(alpha)), 
            b = Math.sqrt(c ** 2 - a ** 2))
    ];
    calculations.some(calc => calc());
    
    if (a + b <= c || a + c <= b || b + c <= a) {
        console.log("Invalid triangle: sum of two sides must be greater than the third side");
        return;
    }
    
    console.log(`a: ${a.toFixed(12)}`);
    console.log(`b: ${b.toFixed(12)}`);
    console.log(`c: ${c.toFixed(12)}`);
    console.log(`alpha: ${alpha.toFixed(14)}°`);
    console.log(`beta: ${beta.toFixed(14)}°`);
    console.log("Success");
}
triangle(7,"leg",18,"hypotenuse");
triangle(60,"opposite angle",5,"leg");
triangle(92,"opposite angle",10,"leg");