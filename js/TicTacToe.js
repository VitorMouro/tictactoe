
function main() {

    unit = 300;
    gridWidth = 3;
    gridHeight = 3;
    offset = 50;
    width = 8;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = gridWidth * unit;
    canvas.height = gridHeight * unit;
    canvas.addEventListener("click", input);

    t1 = Date.now();
    t2 = Date.now();

    player = 1;
    board = new Array(gridWidth);
    for (i = 0; i < gridWidth; i++)
        board[i] = new Array(gridHeight);
    for (i = 0; i < gridWidth; i++)
        for (j = 0; j < gridHeight; j++)
            board[i][j] = 0;


    function draw() {

        ctx.clearRect(0, 0, gridHeight * unit, gridWidth * unit);
        for (x = 0; x < gridWidth; x++) {
            for (y = 0; y < gridHeight; y++) {
                if (board[x][y] == 1) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.strokeStyle = '#ffffff';
                    ctx.moveTo(x * unit + offset, y * unit + offset);
                    ctx.lineTo(x * unit + unit - offset, y * unit + unit - offset);
                    ctx.moveTo(x * unit + offset, y * unit + unit - offset);
                    ctx.lineTo(x * unit + unit - offset, y * unit + offset);
                    ctx.stroke();
                } else if (board[x][y] == 2) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.strokeStyle = '#ffffff';
                    ctx.arc(x * unit + unit / 2, y * unit + unit / 2, unit / 2 - offset, 0, 2 * Math.PI);
                    ctx.stroke();
                } else {
                    ctx.clearRect(x * unit, y * unit, unit, unit);
                }
            }
        }

        for (i = 1; i < gridWidth; i++) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.strokeStyle = '#ffffff';
            ctx.moveTo(unit * i, 0);
            ctx.lineTo(unit * i, gridWidth * unit);
            ctx.stroke();
        }
        for (i = 1; i < gridHeight; i++) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.strokeStyle = '#ffffff';
            ctx.moveTo(0, unit * i);
            ctx.lineTo(gridHeight * unit, unit * i);
            ctx.stroke();
        }


    }

    function checkBoard() {
        // Check vertically
        for(i = 0; i < gridWidth; i++)
            for(j = 0; j < gridHeight - 2; j++)
                if(board[i][j] != 0)
                    if(board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2])
                        return [
                            [i, j], 
                            [i, j+1], 
                            [i, j+2]
                        ];

        // Check horizontally
        for(j = 0; j < gridHeight; j++)
            for(i = 0; i < gridWidth - 2; i++)
                if(board[i][j] != 0)
                    if(board[i][j] == board[i+1][j] && board[i][j] == board[i+2][j])
                        return [
                            [i, j], 
                            [i+1, j], 
                            [i+2, j]
                        ];

        // Check diagonaly 
        for(i = 0; i < gridWidth - 2; i++)
            for(j = 0; j < gridHeight - 2; j++)
                if(board[i][j] != 0)
                    if(board[i][j] == board[i+1][j+1] && board[i][j] == board[i+2][j+2])
                        return [
                            [i, j], 
                            [i+1, j+1], 
                            [i+2, j+2]
                        ];
        for(i = gridWidth-1; i >= 2; i--)
            for(j = 0; j < gridHeight - 2; j++)
                if(board[i][j] != 0)
                    if(board[i][j] == board[i-1][j+1] && board[i][j] == board[i-2][j+2])
                        return [
                            [i, j], 
                            [i-1, j+1], 
                            [i-2, j+2]
                        ];

        // Return null if no sequence was found
        return null;
    }

    function check () {
        coords = checkBoard();
        if(coords != null){
            ctx.beginPath();
            ctx.lineWidth = width*2;
            ctx.strokeStyle = '#ff0000';
            ctx.moveTo(unit * coords[0][0] + unit/2, unit * coords[0][1] + unit/2);
            ctx.lineTo(unit * coords[2][0] + unit/2, unit * coords[2][1] + unit/2);
            ctx.stroke();
            return true;
        }
        return false;
    }

    function input(event) {

        mouseX = event.offsetX;
        mouseY = event.offsetY;
        if (board[Math.floor(mouseX / unit)][Math.floor(mouseY / unit)] == 0) {
            if (player == 1) {
                board[Math.floor(mouseX / unit)][Math.floor(mouseY / unit)] = 1;
                player = 2;
            }
            else {
                board[Math.floor(mouseX / unit)][Math.floor(mouseY / unit)] = 2;
                player = 1;
            }
        }
    }

    function loop(timestamp) {

        dt = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        draw();

        check();

        requestAnimationFrame(loop);
    }

    lastTimestamp = 0;
    requestAnimationFrame(loop);

}

