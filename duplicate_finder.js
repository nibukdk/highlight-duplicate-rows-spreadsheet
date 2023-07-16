/**
 * Function finds and highlights duplicate rows with unique colors
 */
function colorDuplicateRows() {
  // get sheets and data
  const ss = SpreadsheetApp.getActiveSheet();
  let data = ss.getDataRange().getValues();

  // get last col
  const lastCol = data[0].length;

  // convert rows in data to strings for easy comparision
  data = data.map(row => row.join(""));

  // extract unique rows
  const uniqueRows = [... new Set(data)].filter(String);// also remove empty string if there were empty rows

  // unique color object to hold color for each unique row
  const uniqueColor = {};
  // fill the values;
  uniqueRows.forEach(row => uniqueColor[row] = getRandomUniqueColor());

  // find duplicate rows indexes in the data
  const duplicateRowsIndexes = data.map((row, ind) => isDuplicateRow(row, data) ? ind + 1 : "").filter(String);

  // reset color to default before applying new colors
  colorReset();

  // highlight duplicate rows
  duplicateRowsIndexes.forEach(rowInd => {
    const range = ss.getRange(rowInd, 1, 1, lastCol) // get range
    // highlight
    range.setBackground(uniqueColor[range.getValues().flat().join("")])
  })

}




/**
 * Function takes two items: row and arr.
 * The parameter "rowString" is a stringified rows to be compared to items in array "arr".
 * It compares first and last index of the given row item and returns true if the indexs are different and vice versa
 * Inspired from https://stackoverflow.com/a/68424642/6163929
 * @param {String} rowString
 * @param {Array<String>} arr
 * @returns {Boolean}
 */
function isDuplicateRow(rowString, arr) {
  return rowString === "" ? false : arr.indexOf(rowString) != arr.lastIndexOf(rowString);
}


/**
 * ColorReset is used to reset bg color of spreadsheet to its original color.
 */
function colorReset() {
  let sheet = SpreadsheetApp.getActiveSheet();
  sheet.getDataRange().setBackground("");
}

/**
 * Function creates a unique random color as hashcode.
 * @returns {String}
 */
function getRandomUniqueColor() {
  // thanks to function https://dev.to/rajnishkatharotiya/generate-unique-color-code-in-javascript-3h06
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}
