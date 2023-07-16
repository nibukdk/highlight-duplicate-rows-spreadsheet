/**
 * Function deletes duplicate rows from the active spreadsheet.
 */
function deleteDuplicateRows() {
  // get sheet and data
  const ss = SpreadsheetApp.getActiveSheet();
  let data = ss.getDataRange().getValues();

  // convert data rows to strings 
  data = data.map(row => row.join(";")); // using semi-colon makes easy to split lateron

  // find unique rows among rows
  const uniqueRows = [... new Set(data)].filter(String) // also remove empty strings;

  // convert only unique rows from strings to array again

  const newData = uniqueRows.map(row => row.split(";"));

  // find new last row and columns
  const newLastRow = newData.length;
  const newLastCol = newData[0].length;


  // reset color incase color highlight was used 
  colorReset();

  // clear previous contents of spreadsheets ot fill new value
  ss.clearContents();

  // set new values
  ss.getRange(1, 1, newLastRow, newLastCol).setValues(newData)
}