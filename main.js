// 0 => empty square, 1 => X, 2 => O

let boardstate = 
{
    board_normal :
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    full_board :
    {
        board_a :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_b :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_c :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_d :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_e :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_f :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_g :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_h :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        board_i :
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        
    },
    reset : function()
    {
        for (board in this.full_board) {
            this.full_board[board] = this.board_normal
        }
    }
}

function how_to_play()
{
    window.location.href = "help.html"
}
function home()
{
    window.location.href = "start.html"
}
function openGame()
{
    window.location.href = "game.html";
    
}
function startGame()
{
    boardstate.reset();
}
function player_turn()
{

}
function player_move(box, symbol = "O", color = "#1c9dff")
{
    document.getElementsByClassName("side_board")[box].innerHTML = symbol;
    document.getElementsByClassName("side_board")[box].style.color = color;
}