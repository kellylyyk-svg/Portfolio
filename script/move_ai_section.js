const fs = require('fs');
const filePath = 'e:/17기김서영/포폴/index.html';

try {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Detect line ending
    const isCRLF = content.includes('\r\n');
    const separator = isCRLF ? '\r\n' : '\n';
    const lines = content.split(separator);

    // AI Section Range (1-based): 2104 to 2398
    // Indices: 2103 to 2397
    const aiStartIndex = 2103;
    const aiEndIndex = 2397;
    const aiLength = aiEndIndex - aiStartIndex + 1;

    console.log(`Original AI Section: Line ${aiStartIndex + 1} to ${aiEndIndex + 1} (${aiLength} lines)`);
    console.log(`Content Check (Start): ${lines[aiStartIndex].trim()}`);
    console.log(`Content Check (End): ${lines[aiEndIndex].trim()}`);

    if (!lines[aiStartIndex].includes('<div class="section">') ||
        !lines[aiEndIndex].trim().endsWith('</div>')) {
        console.error("Error: Line content mismatch. Aborting.");
        process.exit(1);
    }

    // Graphic Section End (1-based): 2609
    // Index: 2608
    const graphicEndIndex = 2608;
    console.log(`Original Graphic Section End: Line ${graphicEndIndex + 1}`);
    console.log(`Content Check (Graphic End): ${lines[graphicEndIndex].trim()}`);

    // Adjust target index for insertion after deletion
    // Since AI section is BEFORE Graphic section, removing it shifts Graphic section UP by aiLength.
    // New Graphic End Index = 2608 - aiLength
    const newGraphicEndIndex = graphicEndIndex - aiLength;
    console.log(`New Graphic Section End Index: ${newGraphicEndIndex}`);

    // We want to insert AFTER the Graphic Section End
    const insertionIndex = newGraphicEndIndex + 1;

    // Remove AI Section
    const removedLines = lines.splice(aiStartIndex, aiLength);
    console.log(`Removed ${removedLines.length} lines.`);

    // Insert AI Section
    lines.splice(insertionIndex, 0, ...removedLines);
    console.log(`Inserted at index ${insertionIndex} (Line ${insertionIndex + 1})`);

    // Write back
    fs.writeFileSync(filePath, lines.join(separator), 'utf-8');
    console.log("Successfully moved AI Project Section.");

} catch (e) {
    console.error("Error:", e);
}
