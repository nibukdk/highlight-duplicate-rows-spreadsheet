/**
 * Creates Menu to be loaded in active spreadsheet
 */
function createCustomMenu() {
  const menu = SpreadsheetApp.getUi().createMenu("Duplicate Row Finder");

  menu.addItem("Highlight Duplicate Rows", "colorDuplicateRows")
  menu.addItem("Delete Duplicate Rows", "deleteDuplicateRows")
  menu.addItem("Reset Colors", "colorReset")


  menu.addToUi();
}


/**
 * Runs its content upon spreadsheet loading.
 */
function onOpen(e) {
  createCustomMenu();
}

