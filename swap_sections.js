const fs = require('fs');
const filePath = 'e:/17기김서영/포폴/index.html';

try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const isCRLF = content.includes('\r\n');
    const separator = isCRLF ? '\r\n' : '\n';
    const lines = content.split(separator);

    console.log(`Total lines: ${lines.length}`);

    // Find section boundaries by searching for class="section"
    const sectionStarts = [];
    lines.forEach((line, index) => {
        if (line.trim().includes('<div class="section">')) {
            sectionStarts.push(index);
        }
    });

    console.log(`Found ${sectionStarts.length} sections at lines: ${sectionStarts.map(i => i + 1).join(', ')}`);

    // Based on previous knowledge:
    // Section 0: Main/Intro
    // Section 1: Web Design
    // Section 2: Team Project (currently)
    // Section 3: Graphic Design (currently)
    // Section 4: AI Project/Dev Log

    // We need to swap sections at index 2 and 3
    if (sectionStarts.length < 5) {
        console.error('Expected at least 5 sections, found:', sectionStarts.length);
        process.exit(1);
    }

    const teamProjectStart = sectionStarts[2];
    const graphicDesignStart = sectionStarts[3];
    const aiProjectStart = sectionStarts[4];

    console.log(`Team Project section: lines ${teamProjectStart + 1} to ${graphicDesignStart}`);
    console.log(`Graphic Design section: lines ${graphicDesignStart + 1} to ${aiProjectStart}`);

    // Extract sections
    const teamProjectLines = lines.slice(teamProjectStart, graphicDesignStart);
    const graphicDesignLines = lines.slice(graphicDesignStart, aiProjectStart);

    console.log(`Team Project: ${teamProjectLines.length} lines`);
    console.log(`Graphic Design: ${graphicDesignLines.length} lines`);

    // Swap: First remove both sections, then insert in reversed order
    // Remove Team Project section first
    lines.splice(teamProjectStart, teamProjectLines.length);

    // Now Graphic Design section has moved up, so insert it at teamProjectStart
    // Remove Graphic Design (which is now at teamProjectStart position)
    const removedGraphic = lines.splice(teamProjectStart, graphicDesignLines.length);

    // Insert in swapped order
    // First insert Team Project at teamProjectStart
    lines.splice(teamProjectStart, 0, ...teamProjectLines);

    // Then insert Graphic Design after Team Project
    lines.splice(teamProjectStart + teamProjectLines.length, 0, ...removedGraphic);

    console.log('Sections swapped successfully');

    // Write back
    fs.writeFileSync(filePath, lines.join(separator), 'utf-8');
    console.log('File written successfully');

} catch (e) {
    console.error('Error:', e);
}
