export function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // CONFIG
    const TILE_SIZE = 40;
    const GRID_ROWS = 15;
    const GRID_COLS = 9;
    canvas.width = TILE_SIZE * GRID_COLS;
    canvas.height = TILE_SIZE * GRID_ROWS;

    // Tile/decoration types
    const TILE = {
        GRASS: 0,
        PATH: 1,
        TREE: 2,
        BUSH: 3,
        ROCK: 4,
        STUMP: 5,
        SIGN: 6,
        BASE: 7
    };

    // 15 levels, map array: for now re-use, customize later per level
    function makeLevelMap(level) {
        // later: customize path/decor for higher levels, for now simple re-use
        return [
            [2,0,0,1,1,1,1,1,0],
            [1,1,0,0,0,0,0,1,0],
            [1,0,0,2,0,4,0,1,0],
            [1,0,2,0,0,0,0,1,0],
            [1,0,0,0,0,3,0,1,0],
            [1,0,0,1,1,1,1,1,1],
            [1,0,0,1,0,0,0,0,0],
            [1,0,5,1,0,2,0,0,0],
            [1,0,0,1,3,0,0,6,0],
            [1,1,1,1,1,1,0,0,0],
            [0,0,4,0,0,1,0,4,0],
            [0,3,0,0,0,1,0,2,0],
            [0,0,0,0,7,1,0,0,0],
            [0,0,0,0,0,1,0,0,0],
            [0,0,0,0,0,1,0,0,0],
        ];
    }
    let level = 1;
    let map = makeLevelMap(level);

    // UI State
    let hp = 100;
    let gold = 100;
    let maxLevels = 15;

    function drawTile(x, y, type) {
        let px = x * TILE_SIZE;
        let py = y * TILE_SIZE;
        switch(type) {
            case TILE.GRASS:
                ctx.fillStyle = '#82bb57';
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                break;
            case TILE.PATH:
                ctx.fillStyle = '#e4c57e';
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                break;
            case TILE.TREE:
                ctx.fillStyle = '#82bb57'; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.fillStyle = '#27731e'; ctx.beginPath(); ctx.arc(px+TILE_SIZE/2, py+TILE_SIZE/2, 13, 0, Math.PI*2); ctx.fill(); ctx.fillStyle='#51310f'; ctx.fillRect(px+15, py+24, 7, 11); break;
            case TILE.BUSH:
                ctx.fillStyle = '#82bb57'; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.fillStyle = '#549751'; ctx.beginPath(); ctx.arc(px+TILE_SIZE/2, py+TILE_SIZE/2, 8, 0, Math.PI*2); ctx.fill(); break;
            case TILE.ROCK:
                ctx.fillStyle = '#82bb57'; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.fillStyle = '#b0babb'; ctx.beginPath(); ctx.arc(px+TILE_SIZE/2, py+TILE_SIZE/2, 8, 0, Math.PI*2); ctx.fill(); break;
            case TILE.STUMP:
                ctx.fillStyle = '#82bb57'; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.fillStyle = '#aa742a'; ctx.beginPath(); ctx.arc(px+TILE_SIZE/2, py+TILE_SIZE/2, 7, 0, Math.PI*2); ctx.fill(); break;
            case TILE.SIGN:
                ctx.fillStyle = '#82bb57'; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.fillStyle = '#eac176'; ctx.fillRect(px+11, py+15, 14, 6);
                ctx.fillStyle = '#a6790a'; ctx.fillRect(px+17, py+21, 2, 10); break;
            case TILE.BASE:
                ctx.fillStyle = '#e4c57e'; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.fillStyle = '#d42b2d'; ctx.beginPath(); ctx.arc(px+TILE_SIZE/2, py+21, 15, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#f9d794'; ctx.fillRect(px+12, py+21, 15, 10); ctx.fillStyle = '#592b14'; ctx.fillRect(px+19, py+28, 4, 7); break;
        }
        ctx.strokeStyle = '#6e944a'; ctx.lineWidth = 1; ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
    }

    function drawMap() {
        for(let y=0; y<GRID_ROWS; y++) for(let x=0; x<GRID_COLS; x++) drawTile(x, y, map[y][x]||0);
    }

    function drawUI() {
        // Level
        ctx.font = 'bold 24px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff9d9'; ctx.strokeStyle = '#7a5d15'; ctx.lineWidth = 2; ctx.strokeText(`Level ${level}`, canvas.width/2, 38); ctx.fillText(`Level ${level}`, canvas.width/2, 38);
        // Gold (top left)
        ctx.font = '18px monospace'; ctx.textAlign = 'left'; ctx.fillStyle = '#ffe18a';
        ctx.fillText(`🪙${gold}`, 8, 25);
        // HP Bar (above base)
        let baseX = 4 * TILE_SIZE, baseY = 12 * TILE_SIZE;
        ctx.fillStyle = '#fff'; ctx.fillRect(baseX - 14, baseY - 14, 68, 9);
        ctx.fillStyle = '#e33'; ctx.fillRect(baseX - 14, baseY - 14, 68 * hp/100, 9);
        ctx.strokeStyle = '#444'; ctx.strokeRect(baseX - 14, baseY - 14, 68, 9);
        ctx.fillStyle = '#e33'; ctx.font = '14px monospace'; ctx.textAlign = 'center'; ctx.fillText('❤', baseX-22, baseY-5);
        ctx.fillStyle = '#363636'; ctx.fillText(`${hp}`, baseX+24, baseY-5);
        // Dutch buttons/labels ("verdedigen", "shop")
        ctx.font = '20px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#f9ecd2'; ctx.strokeStyle = '#b6892c'; ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width/2 - 68, 60, 135, 30); ctx.fillText('verdedigen', canvas.width/2, 82);
        ctx.strokeRect(canvas.width/2 - 68, 98, 135, 30); ctx.fillText('winkel', canvas.width/2, 120);
        // Sidebar Dutch pseudo-icons/buttons
        ctx.strokeRect(canvas.width-45, 140,30,30); ctx.fillText('🏠', canvas.width-29,162);
        ctx.strokeRect(canvas.width-45, 178,30,30); ctx.fillText('verk.',canvas.width-29,200);
        ctx.strokeRect(canvas.width-45, 216,30,30); ctx.fillText('kopen',canvas.width-29,238);
        ctx.strokeRect(canvas.width-45, 254,30,30); ctx.fillText('↑',canvas.width-29,276);
    }

    function render() { ctx.clearRect(0,0,canvas.width,canvas.height); drawMap(); drawUI(); }
    render();
}
