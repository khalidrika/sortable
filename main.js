let mydata = [];
let searchres = [];
let rowsperpage = 20;
let currentpage = 1;

const select = document.querySelector('#results-per-page'); // jbna select mn html
const currentPageDisplay = document.querySelector('#current-page'); // sfha db
const next = document.querySelector("#next"); // buton next
const previous = document.querySelector('#previous'); // buton li 9bal
const input = document.querySelector('#search-input'); // jdwal lbaht

const allHeaders = document.querySelectorAll('th'); // dakxi li kyban lfo9 f sfha mstar

let currentSortColumn = null; // colom db li mfroz
let currentSortOrder = 'asc'; //  trtib l7ali tasa3odi

// Adding event listeners to each column header
allHeaders.forEach(item => {
    item.addEventListener('click', (e) => {
        const column = e.target.id; // Get the column ID (e.g., 'Name', 'Full', 'Powerstats', etc.)

        // Toggle the sorting order (ascending/descending)
        if (currentSortColumn === column) {
            currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortColumn = column;
            currentSortOrder = 'asc'; // Reset to ascending if it's a new column
        }

        // Call the function to sort based on the column and order
        sortData(column, currentSortOrder);
    });
});

// Sorting function
function sortData(column, order) { // faraz data
    let sortedData;

    switch (column) {
        case 'Name':
            sortedData = sortByName(mydata, order);
            break;
        case 'Full':
            sortedData = sortByFullName(mydata, order);
            break;
        case 'Powerstats':
            sortedData = sortByPowerstats(mydata, order);
            break;
        case 'Race':
            sortedData = sortByRace(mydata, order);
            break;
        case 'Gender':
            sortedData = sortByGender(mydata, order);
            break;
        case 'Height':
            sortedData = sortByHeight(mydata, order);
            break;
        case 'Weight':
            sortedData = sortByWeight(mydata, order);
            break;
        case 'Place_Of_Birth':
            sortedData = sortByPlaceOfBirth(mydata, order);
            break;
        case 'Alignment':
            sortedData = sortByAlignment(mydata, order);
            break;
        default:
            sortedData = mydata; // If no valid column is found, return original data
            break;
    }

    loadData(sortedData);
    updatePaginationControls(sortedData.length);
}

function sortByName(data, order) {
    return data.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        if (nameA === '' && nameB !== '') return 1;
        if (nameB === '' && nameA !== '') return -1;
        return order === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
    });
}

function sortByFullName(data, order) {
    return data.sort((a, b) => {
        const fullNameA = a.biography.fullName || '';
        const fullNameB = b.biography.fullName || '';
        if (fullNameA === '' && fullNameB !== '') return 1;
        if (fullNameB === '' && fullNameA !== '') return -1;
        return order === 'asc'
            ? fullNameA.localeCompare(fullNameB)
            : fullNameB.localeCompare(fullNameA);
    });
}

function sortByPowerstats(data, order) {
    return data.sort((a, b) => {
        const statA = (a.powerstats.intelligence || 0) + (a.powerstats.strength || 0);
        const statB = (b.powerstats.intelligence || 0) + (b.powerstats.strength || 0);
        if (statA === 0 && statB !== 0) return 1;
        if (statB === 0 && statA !== 0) return -1;
        return order === 'asc'
            ? statA - statB
            : statB - statA;
    });
}

function sortByRace(data, order) {
    return data.sort((a, b) => {
        const raceA = a.appearance.race || '';
        const raceB = b.appearance.race || '';
        if (raceA === '' && raceB !== '') return 1;
        if (raceB === '' && raceA !== '') return -1;
        return order === 'asc'
            ? raceA.localeCompare(raceB)
            : raceB.localeCompare(raceA);
    });
}

function sortByGender(data, order) {
    return data.sort((a, b) => {
        const genderA = a.appearance.gender || '';
        const genderB = b.appearance.gender || '';
        const normalizedGenderA = genderA === '-' ? '' : genderA;
        const normalizedGenderB = genderB === '-' ? '' : genderB;
        if (normalizedGenderA === '' && normalizedGenderB !== '') return 1;
        if (normalizedGenderB === '' && normalizedGenderA !== '') return -1;
        return order === 'asc'
            ? normalizedGenderA.localeCompare(normalizedGenderB)
            : normalizedGenderB.localeCompare(normalizedGenderA);
    });
}

function sortByHeight(data, order) {
    return data.sort((a, b) => {
        const heightA = parseFloat(a.appearance.height[0]) || (order === 'asc' ? Infinity : -Infinity);
        const heightB = parseFloat(b.appearance.height[0]) || (order === 'asc' ? Infinity : -Infinity);
        if (isNaN(heightA) && !isNaN(heightB)) return 1;
        if (isNaN(heightB) && !isNaN(heightA)) return -1;
        return order === 'asc'
            ? heightA - heightB
            : heightB - heightA;
    });
}

function sortByWeight(data, order) {
    return data.sort((a, b) => {
        const weightA = parseFloat(a.appearance.weight) || (order === 'asc' ? Infinity : -Infinity);
        const weightB = parseFloat(b.appearance.weight) || (order === 'asc' ? Infinity : -Infinity);
        if (isNaN(weightA) && !isNaN(weightB)) return 1;
        if (isNaN(weightB) && !isNaN(weightA)) return -1;
        return order === 'asc'
            ? weightA - weightB
            : weightB - weightA;
    });
}

function sortByPlaceOfBirth(data, order) {
    return data.sort((a, b) => {
        const placeA = a.biography.placeOfBirth || '';
        const placeB = b.biography.placeOfBirth || '';
        const normalizedPlaceA = placeA === '-' ? '' : placeA;
        const normalizedPlaceB = placeB === '-' ? '' : placeB;
        if (normalizedPlaceA === '' && normalizedPlaceB !== '') return 1;
        if (normalizedPlaceB === '' && normalizedPlaceA !== '') return -1;
        return order === 'asc'
            ? normalizedPlaceA.localeCompare(normalizedPlaceB)
            : normalizedPlaceB.localeCompare(normalizedPlaceA);
    });
}

function sortByAlignment(data, order) {
    return data.sort((a, b) => {
        const alignmentA = a.biography.alignment || '';
        const alignmentB = b.biography.alignment || '';
        const normalizedAlignmentA = alignmentA === '-' ? '' : alignmentA;
        const normalizedAlignmentB = alignmentB === '-' ? '' : alignmentB;
        if (normalizedAlignmentA === '' && normalizedAlignmentB !== '') return 1;
        if (normalizedAlignmentB === '' && normalizedAlignmentA !== '') return -1;
        return order === 'asc'
            ? normalizedAlignmentA.localeCompare(normalizedAlignmentB)
            : normalizedAlignmentB.localeCompare(normalizedAlignmentA);
    });
}

function loadData(heroes) { // 3ard data
    const tablebody = document.querySelector('#tablebody');
    tablebody.innerHTML = '';
    heroes.forEach(hero => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
            <td>${hero.name}</td>
            <td>${hero.biography.fullName}</td>
            <td>${Object.entries(hero.powerstats)}</td>
            <td>${hero.appearance.race}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.appearance.height.join(', ')}</td>
            <td>${hero.appearance.weight}</td>
            <td>${hero.biography.placeOfBirth}</td>
            <td>${hero.biography.alignment}</td>
        `;
        tablebody.appendChild(tr);
    });
}

function updatePaginationControls(totalHeroes) { // next .. previes
    const totalPages = Math.ceil(totalHeroes / rowsperpage);
    currentPageDisplay.textContent = currentpage; // between buttons
    previous.disabled = currentpage === 1;
    next.disabled = currentpage === totalPages;
}

function updatePagination() {
    const data = searchres.length > 0 ? searchres : mydata;
    const start = (currentpage - 1) * rowsperpage;
    const end = start + rowsperpage;
    loadData(data.slice(start, end));
    updatePaginationControls(data.length);
}

select.addEventListener('change', () => {
    if (select.value === "all") {
        rowsperpage = mydata.length;
        loadData(mydata);
        return;
    }
    rowsperpage = parseInt(select.value);
    currentpage = 1;
    updatePagination();
});

next.addEventListener('click', () => {
    const totalPages = Math.ceil((searchres.length || mydata.length) / rowsperpage);
    if (currentpage < totalPages) {
        currentpage++;
        updatePagination();
    }
});

previous.addEventListener('click', () => {
    if (currentpage > 1) {
        currentpage--;
        updatePagination();
    }
});

input.addEventListener('keyup', () => { // serch
    const value = input.value.toLowerCase();
    console.log(value);
    searchres = mydata.filter(hero => hero.name.toLowerCase().includes(value));
    currentpage = 1;
    updatePagination();
});

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json") // fetch json
    .then(result => result.json())
    .then(data => {
        mydata = data;
        loadData(mydata); // Load the first page of data
        updatePagination();
    })
    .catch(error => console.log("Error fetching superhero data:", error));
