const margin = 10; // Margin for collision detection

function TablePhysicsEngine(rectangles, time) {
    const moveStep = 1; // Increase move step for more noticeable adjustments

    for (let i = 0; i < time; i++) {
        for (let j = 0; j < rectangles.length; j++) {
            var sumMoveX = 0;
            var sumMoveY = 0;
            const centerPointI = CenterPoint(rectangles[j]);
            
            // find referenced table
            const referenced_table = rectangles[j].referenced_tables[0];

            console.log("referenced_table", referenced_table);
            // for (let k = 0; k < rectangles.length; k++) {
            //     if (k === j) continue; // Skip self
            //     const centerPointK = CenterPoint(rectangles[k]);

            //     // Calculate direction of movement based on position difference
            //     const xDirection = centerPointI.x < centerPointK.x ? -1 : 1;
            //     const yDirection = centerPointI.y < centerPointK.y ? -1 : 1;

            //     const NearForce = 5 * force(rectangles[j], rectangles[k], Distance(rectangles[j], rectangles[k]), 11);
            //     const FarForce = 4 * force(rectangles[j], rectangles[k], Distance(rectangles[j], rectangles[k]), 10);

            //     sumMoveX += xDirection * (FarForce + NearForce);
            //     sumMoveY += yDirection * (FarForce + NearForce);

            // }

            // rectangles[j].x += sumMoveX * moveStep;
            // rectangles[j].y += sumMoveY * moveStep;

            rectangles[j].x += -1;

        }
    }
    return rectangles;
}

function CenterPoint(rect) {
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

function force(distance, exp) {
    return 1 / Math.pow(distance, exp);
}


export default TablePhysicsEngine;