const margin = 10; // Margin for collision detection

// Gives coordinates for the rectangles
// Places referenced tables next to each other
function TablePlacer(rectangles, time) {
    const moveStep = 5;
    var clusters = findClusters(rectangles, [], rectangles);
    console.log(clusters);
    for (let i = 0; i < time; i++) {
        rectangles.forEach((rect, j) => {
            let sumMoveX = 0;
            let sumMoveY = 0;

            rectangles.forEach((otherRect, k) => {
                if (j !== k) {
                    if (isColliding(rect, otherRect)) {
                        // Calculate repulsion force for collision handling
                        const distance = Distance(rect, otherRect);
                        const force = repulsionForce(distance);
                        sumMoveX += (rect.x - otherRect.x) / distance * force;
                        sumMoveY += (rect.y - otherRect.y) / distance * force;
                    }

                    // Handle attraction to referenced tables
                    if (rect.referenced_tables.includes(otherRect.name)) {
                        const distance = Distance(rect, otherRect);
                        const force = attractionForce(distance);
                        sumMoveX -= (rect.x - otherRect.x) / distance * force;
                        sumMoveY -= (rect.y - otherRect.y) / distance * force;
                    }
                }
            });

            // Apply movements with a cap to the moveStep for smoother transitions
            rect.x += Math.sign(sumMoveX) * Math.min(Math.abs(sumMoveX), moveStep);
            rect.y += Math.sign(sumMoveY) * Math.min(Math.abs(sumMoveY), moveStep);
        });
    }

    return rectangles;
}
function findClusters(rectangles, clusters = [], rectangles_lookup) {
    if (!rectangles.length) return clusters;

    const head = rectangles[0];
    const tail = rectangles.slice(1);

    // Finding direct and mutual references
    const referencedTables = head.referenced_tables.map(table => rectangles_lookup.find(rect => rect.name === table));
    const mutualReferences = referencedTables.filter(table => table.referenced_tables.includes(head.name));

    const cluster = [head, ...mutualReferences, ...referencedTables];
    clusters.push([...new Set(cluster)]); // Ensure unique elements
    clusters = combineClusters(clusters);

    return findClusters(tail, clusters, rectangles_lookup);
}

function combineClusters(clusters) {
    let merged = false;
    do {
        merged = false;
        for (let i = 0; i < clusters.length; i++) {
            for (let j = i + 1; j < clusters.length; j++) {
                const setA = new Set(clusters[i]);
                const setB = new Set(clusters[j]);
                const intersection = new Set([...setA].filter(x => setB.has(x)));
                if (intersection.size > 0) { // If clusters have common elements, merge them
                    clusters[i] = [...new Set([...clusters[i], ...clusters[j]])];
                    clusters.splice(j, 1); // Remove the merged cluster
                    merged = true;
                    break; // Need to restart since we modified the array
                }
            }
            if (merged) break; // Restart if any merge happened
        }
    } while (merged);

    return clusters;
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


export { TablePlacer, findClusters, combineClusters };
