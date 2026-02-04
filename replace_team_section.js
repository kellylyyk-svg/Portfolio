const fs = require('fs');
const indexPath = 'e:/17기김서영/포폴/index.html';
const workspacePath = 'e:/17기김서영/포폴/team_workspace.html';

try {
    // Read both files
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    let workspaceContent = fs.readFileSync(workspacePath, 'utf-8');

    const isCRLF = indexContent.includes('\r\n');
    const separator = isCRLF ? '\r\n' : '\n';
    const indexLines = indexContent.split(separator);
    const workspaceLines = workspaceContent.split(separator);

    console.log(`Index file: ${indexLines.length} lines`);
    console.log(`Workspace file: ${workspaceLines.length} lines`);

    // Team Project section: lines 2108-2650 (1-indexed)
    // In 0-indexed: 2107-2649
    const teamStart = 2107;
    const teamEnd = 2649;

    console.log(`Removing Team Project section: lines ${teamStart + 1} to ${teamEnd + 1}`);
    console.log(`Section length: ${teamEnd - teamStart + 1} lines`);

    // Remove old section
    indexLines.splice(teamStart, teamEnd - teamStart + 1);

    console.log(`After removal: ${indexLines.length} lines`);

    // Insert new workspace content (without leading/trailing empty lines)
    const cleanWorkspaceLines = workspaceLines.filter((line, index) => {
        if (index === 0 || index === workspaceLines.length - 1) {
            return line.trim() !== '';
        }
        return true;
    });

    indexLines.splice(teamStart, 0, ...cleanWorkspaceLines);

    console.log(`After insertion: ${indexLines.length} lines`);
    console.log(`Inserted ${cleanWorkspaceLines.length} lines of workspace code`);

    // Write back
    fs.writeFileSync(indexPath, indexLines.join(separator), 'utf-8');
    console.log('✓ Successfully replaced Team Project section with Realtime Workspace');

} catch (e) {
    console.error('Error:', e);
    process.exit(1);
}
