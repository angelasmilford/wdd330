export function levenschteinDistance(string1, string2) {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();
    
    let distanceMatrix = []
    for (let x = 0; x < string1.length + 1; x++) {
        distanceMatrix[x] = [];

        for (let y = 0; y < string2.length + 1; y++) {
            distanceMatrix[x][y] = 0;

            distanceMatrix[0][y] = y;
        };

        distanceMatrix[x][0] = x;
    };

    for (let x = 1; x < string2.length + 1; x++) {
        for (let y = 1; y < string1.length + 1; y++) {
            let substitutionCost = 0;
            if (string1[y - 1] != string2[x - 1]) substitutionCost = 1;

            distanceMatrix[y][x] = Math.min(
                distanceMatrix[y - 1][x] + 1, 
                distanceMatrix[y][x - 1] + 1, 
                distanceMatrix[y - 1][x - 1] + substitutionCost
            )
        }
    }

    return distanceMatrix[string1.length][string2.length]
}