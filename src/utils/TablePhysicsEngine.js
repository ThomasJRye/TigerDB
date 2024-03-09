const margin = 10; // Margin for collision detection

function TablePhysicsEngine(rectangles, time) {
    const moveStep = 20; // Increase move step for more noticeable adjustments

    for (let i = 0; i < time; i++) {
        for (let j = 0; j < rectangles.length; j++) {
            var sumMoveX = 0;
            var sumMoveY = 0;
            const centerPointI = CenterPoint(rectangles[j]);
            let xDistance = 0;
            let yDistance = 0;
            
            // find referenced table
            const referenced_table = rectangles[j].referenced_tables[0];
            
            // find referenced table rectangle
            const referenced_table_rectangle = rectangles.find(r => r.name === referenced_table);

            // if (referenced_table_rectangle) {
            //     // if referenced table rectangle is found, calculate the force

            //     const centerpointReferenced = CenterPoint(referenced_table_rectangle);
            //     xDistance = centerPointI.x - centerpointReferenced.x;
            //     yDistance = centerPointI.y - centerpointReferenced.y;

            //     if (Math.abs(xDistance) > 4) {
            //         sumMoveX -= attractionForce(xDistance, 1.02);
            //         sumMoveY -= attractionForce(yDistance, 1.02);
            //     }    
            // } else {
            //     xDistance = centerPointI.x; // Assuming a default value for xDistance when referenced_table_rectangle is not found
            //     yDistance = centerPointI.y; // Assuming a default value for yDistance when referenced_table_rectangle is not found

                
            //     // Make sure the rectangles are not too far apart
            //     const universal_attraction_exponent =  10;
            //     if (Math.abs(xDistance) > 6) {
            //         sumMoveX += 0.02 * attractionForce(xDistance, universal_attraction_exponent);
            //         sumMoveY += 0.02 * attractionForce(yDistance, universal_attraction_exponent);
            //     } 
            //     // move everything to the center
            //     rectangles[j].x += - 5 * attractionForce(centerPointI.x, 3);
            //     rectangles[j].y += - 5 * attractionForce(centerPointI.y, 3);

            // }

            // // repulsion force
            // for (let k = 0; k < rectangles.length; k++) {
            //     if (k !== j) {
            //         const centerPointK = CenterPoint(rectangles[k]);
            //         xDistance = centerPointI.x - centerPointK.x;
            //         yDistance = centerPointI.y - centerPointK.y;
            //         if (Math.abs(xDistance) < 3) {
            //             sumMoveX += - 0.02 * repulsionForce(xDistance, 1.02);
            //         }
                    
            //         if (Math.abs(yDistance) < 3) {
            //             sumMoveY += - 0.02 * repulsionForce(yDistance, 1.02);
            //         }
            //     }
            // }

            // // prevent overlap
            // for (let k = 0; k < rectangles.length; k++) {
            //     if (k !== j) {
            //         if (isColliding(rectangles[j], rectangles[k])) {
            //             const centerPointK = CenterPoint(rectangles[k]);
            //             xDistance = centerPointI.x - centerPointK.x;
            //             yDistance = centerPointI.y - centerPointK.y;
            //             // move away from the colliding rectangle

            //             console.log("colliding", rectangles[j].name, rectangles[k].name);
            //         }
            //     }
            // }

            // rectangles[j].x += sumMoveX * moveStep;
            // rectangles[j].y += sumMoveY * moveStep;

            
        }
    }
    return rectangles;
}

function CenterPoint(rect) {
    if (!rect) return;
    return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
    };
}

// Collision detection function
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width + margin &&
        rect1.x + rect1.width + margin > rect2.x &&
        rect1.y < rect2.y + rect2.height + margin &&
        rect1.y + rect1.height + margin > rect2.y;
}

function Distance(rect1, rect2) {
    return Math.sqrt(Math.pow(rect1.x - rect2.x, 2) + Math.pow(rect1.y - rect2.y, 2));
}

function repulsionForce(distance, exp) {
    return 100 / distance ** 2;
}

function attractionForce(distance, exp) {
    return Math.pow(2, exp) / Math.pow(distance, 2);
}


export default TablePhysicsEngine;