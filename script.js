const songData = [
    ["", "title", "artist", "top genre", "year", "Tempo", "Energy", "Danceability", "dB", "live", "val", "dur", "acous", "spch", "pop"],
    ["1", "Hey, Soul Sister", "Train", "neo mellow", 2010, 97, 89, 67, -4, 8, 80, 217, 19, 4, 83],
    ["2", "Love The Way You Lie", "Eminem", "detroit hip hop", 2010, 87, 93, 75, -5, 52, 64, 263, 24, 23, 82],
    ["3", "TiK ToK", "Kesha", "dance pop", 2010, 120, 84, 76, -3, 29, 71, 200, 10, 14, 80],
    ["4", "Bad Romance", "Lady Gaga", "dance pop", 2010, 119, 92, 70, -4, 8, 71, 295, 0, 4, 79],
    ["5", "Just the Way You Are", "Bruno Mars", "pop", 2010, 109, 84, 64, -5, 9, 43, 221, 2, 4, 78],
    ["6", "Baby", "Justin Bieber", "canadian pop", 2010, 65, 86, 73, -5, 11, 54, 214, 4, 14, 77],
    ["7", "Dynamite", "Taio Cruz", "dance pop", 2010, 120, 78, 75, -4, 4, 82, 203, 0, 9, 77],
    ["8", "Secrets", "OneRepublic", "dance pop", 2010, 148, 76, 52, -6, 12, 38, 225, 7, 4, 77],
    ["9", "Empire State of Mind (Part II) Broken Down", "Alicia Keys", "hip pop", 2010, 93, 37, 48, -8, 12, 14, 216, 74, 3, 76],
    ["10", "Only Girl (In The World)", "Rihanna", "barbadian pop", 2010, 126, 72, 79, -4, 7, 61, 235, 13, 4, 73],
    ["11", "Club Can't Handle Me (feat. David Guetta)", "Flo Rida", "dance pop", 2010, 128, 87, 62, -4, 6, 47, 235, 3, 3, 73],
    ["12", "Marry You", "Bruno Mars", "pop", 2010, 145, 83, 62, -5, 10, 48, 230, 33, 4, 73],
    ["13", "Cooler Than Me - Single Mix", "Mike Posner", "dance pop", 2010, 130, 82, 77, -5, 70, 63, 213, 18, 5, 73],
    ["14", "Telephone", "Lady Gaga", "dance pop", 2010, 122, 83, 83, -6, 11, 71, 221, 1, 4, 73],
    ["15", "Like A G6", "Far East Movement", "dance pop", 2010, 125, 84, 44, -8, 12, 78, 217, 1, 45, 72],
    ["16", "OMG (feat. will.i.am)", "Usher", "atl hip hop", 2010, 130, 75, 78, -6, 36, 33, 269, 20, 3, 72]
];


// Function to calculate Euclidean distance
function euclideanDistance(point1, point2) {
    // Calculate the distance between attributes
    const danceabilityDiff = Math.pow(point1[7] - point2[7], 2);
    const energyDiff = Math.pow(point1[6] - point2[6], 2);
    const tempoDiff = Math.pow(point1[5] - point2[5], 2);
    return Math.sqrt(danceabilityDiff + energyDiff + tempoDiff);
}

// Function to classify a song using KNN
function classifySongKNN(testPoint, k) {
    let nearestNeighbors = [];

    for (let i = 0; i < songData.length; i++) {
        const distance = euclideanDistance(testPoint, songData[i]);
        nearestNeighbors.push({ index: i, distance: distance });
    }
    nearestNeighbors.sort((a, b) => a.distance - b.distance);

    const kNearestNeighbors = nearestNeighbors.slice(0, k);
    const totalAttributes = [0, 0, 0]; // Initialize total attributes array

    for (let i = 0; i < kNearestNeighbors.length; i++) {
        const attributes = [
            parseFloat(songData[kNearestNeighbors[i].index][5]), // Tempo
            parseFloat(songData[kNearestNeighbors[i].index][6]), // Energy
            parseFloat(songData[kNearestNeighbors[i].index][7]), // Danceability
        ];

        totalAttributes[0] += attributes[0];
        totalAttributes[1] += attributes[1];
        totalAttributes[2] += attributes[2];
    }

    // Calculate average attributes
    const averageAttributes = totalAttributes.map(attr => attr / k);

    return averageAttributes;
}

function classifySong() {
    const songInput = document.getElementById('songInput').value.toLowerCase();

    const matchingSongs = songData.filter(song =>
        song[1].toLowerCase() === songInput
    );

    if (matchingSongs.length > 0) {

        const totalAttributes = [0, 0, 0];
        const genres = [];


        matchingSongs.forEach(song => {
            const attributes = [
                parseFloat(song[5]), // Tempo
                parseFloat(song[6]), // Energy
                parseFloat(song[7])  // Danceability
            ];


            totalAttributes[0] += attributes[0];
            totalAttributes[1] += attributes[1];
            totalAttributes[2] += attributes[2];

            // Collect genres
            genres.push(song[3]); // Genre
        });

        // Calculate average attributes
        const averageAttributes = totalAttributes.map(attr => attr / matchingSongs.length);


        const genreResult = genres.join(', '); // Join genres with a comma
        document.getElementById('tempoResult').textContent = averageAttributes[0];
        document.getElementById('energyResult').textContent = averageAttributes[1];
        document.getElementById('danceabilityResult').textContent = averageAttributes[2];
        document.getElementById('genreResult').textContent = genreResult;
    } else {

        document.getElementById('tempoResult').textContent = 'N/A';
        document.getElementById('energyResult').textContent = 'N/A';
        document.getElementById('danceabilityResult').textContent = 'N/A';
        document.getElementById('genreResult').textContent = 'N/A';
    }
}