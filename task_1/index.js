import {encoded, translations} from './data.js'

console.log("Let's rock")

// Decode function
const decodeFields = () => {
  const decoded = encoded.map(item => {
    const decodedItem = {};
    for (const key in item) {
      // Check if key ends with "Id" suffix and is not excluded
      if (key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
        const id = item[key];
        // Use translations dictionary for decoding
        decodedItem[key] = translations[id] || id;
      } else {
        // Keep excluded fields in their original state
        decodedItem[key] = item[key];
      }
    }
    return decodedItem;
  });

  // Extract unique ids
  const uniqueIds = [...new Set(encoded.map(item => Object.values(item)).flat())];

  return {decoded, uniqueIds};
};

// Execute function
const {decoded, uniqueIds} = decodeFields();

// Output decoded data and unique ids
console.log('Decoded Data:');
console.log(decoded);
console.log('Unique Ids:');
console.log(uniqueIds);

