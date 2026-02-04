const fs = require('fs');
const filePath = 'e:/17기김서영/포폴/index.html';

try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const isCRLF = content.includes('\r\n');
    const separator = isCRLF ? '\r\n' : '\n';
    const lines = content.split(separator);

    console.log(`Total lines: ${lines.length}`);

    // Find Team Project section (has team-project-mode)
    let teamProjectStart = -1;
    let graphicDesignStart = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('team-project-mode')) {
            // Go back to find the <div class="section"> that contains this
            for (let j = i; j >= 0; j--) {
                if (lines[j].trim() === '<div class="section">') {
                    teamProjectStart = j;
                    console.log(`Found Team Project section start at line ${j + 1}`);
                    break;
                }
            }
        }
        if (lines[i].includes('graphics-mode')) {
            // Go back to find the <div class="section"> that contains this
            for (let j = i; j >= 0; j--) {
                if (lines[j].trim() === '<div class="section">') {
                    graphicDesignStart = j;
                    console.log(`Found Graphic Design section start at line ${j + 1}`);
                    break;
                }
            }
        }
    }

    if (teamProjectStart === -1 || graphicDesignStart === -1) {
        console.error('Could not find both sections');
        process.exit(1);
    }

    // Find the end of each section (next <div class="section"> or end of fullpage container)
    let teamProjectEnd = -1;
    let graphicDesignEnd = -1;

    // Find next section after Team Project
    for (let i = teamProjectStart + 1; i < lines.length; i++) {
        if (lines[i].trim() === '<div class="section">') {
            teamProjectEnd = i;
            console.log(`Team Project section ends at line ${i}`);
            break;
        }
    }

    // Find next section after Graphic Design
    for (let i = graphicDesignStart + 1; i < lines.length; i++) {
        if (lines[i].trim() === '<div class="section">') {
            graphicDesignEnd = i;
            console.log(`Graphic Design section ends at line ${i}`);
            break;
        }
    }

    if (teamProjectEnd === -1 || graphicDesignEnd === -1) {
        console.error('Could not find section boundaries');
        process.exit(1);
    }

    // Extract sections
    const teamProjectLines = lines.slice(teamProjectStart, teamProjectEnd);
    const graphicDesignLines = lines.slice(graphicDesignStart, graphicDesignEnd);

    console.log(`Team Project: ${teamProjectLines.length} lines`);
    console.log(`Graphic Design: ${graphicDesignLines.length} lines`);

    // Team Project comes first, Graphic Design comes second
    // We need to swap them

    // Remove both sections (remove the later one first to preserve indices)
    lines.splice(graphicDesignStart, graphicDesignLines.length);
    lines.splice(teamProjectStart, teamProjectLines.length);

    // Insert in swapped order
    // Insert Graphic Design where Team Project was
    lines.splice(teamProjectStart, 0, ...graphicDesignLines);
    // Insert Team Project where Graphic Design was (adjusted for the first insertion)
    lines.splice(teamProjectStart + graphicDesignLines.length, 0, ...teamProjectLines);

    console.log('Sections swapped successfully');

    // Write back
    fs.writeFileSync(filePath, lines.join(separator), 'utf-8');
    console.log('File written successfully');

} catch (e) {
    console.error('Error:', e);
}
