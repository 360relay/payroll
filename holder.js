function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Get the active sheet (the sheet this script is bound to)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if first row is empty
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 11)
        .setValues([
          [
            "Timestamp",
            "Full Name",
            "Address",
            "City",
            "State",
            "ZIP Code",
            "Email",
            "Phone",
            "Supply Timeline",
            "Comments",
            "Source",
          ],
        ]);
    }

    // Append the data
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.address,
      data.city,
      data.state,
      data.zipCode,
      data.email,
      data.phone,
      data.supplyTimeline,
      data.comments,
      data.source,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "active" })
  ).setMimeType(ContentService.MimeType.JSON);
}
