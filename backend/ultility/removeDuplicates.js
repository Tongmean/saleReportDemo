// This function removes duplicates from an array of objects based on a specific key (e.g., 'matid')
const removeDuplicates = (dataArray, key) => {
    const uniqueData = [];
    const seen = new Set();

    dataArray.forEach(item => {
        const keyValue = item[key];  // Use the key value to check for duplicates
        if (!seen.has(keyValue)) {
            uniqueData.push(item);  // Add the object if not already seen
            seen.add(keyValue);     // Mark the key as seen
        }
    });

    return uniqueData;
}

module.exports = {
    removeDuplicates
}
