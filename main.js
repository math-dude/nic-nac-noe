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
    big_board :
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    player_turn : 1,
    reset : function()
    {
        for (board in this.full_board) {
            this.full_board[board] = this.board_normal
        }
    }
}

let players_map =
{
    1 : "X",
    "X" : 1,
    2 : "O",
    "O" : 2
}

let player_colors = ["black", "red", "blue"];

let player_turn = 1;

function how_to_play()
{
    window.location.href = "help.html";
}
function home()
{
    window.location.href = "start.html";
}
function openGame()
{
    window.location.href = "game.html";
    
}
function startGame()
{
    boardstate.reset();
}
function play_turn(box)
{
    if(document.getElementsByClassName("side_board")[box] != "" )
    {
        play_turn(box);
    }
    else
    {
        document.getElementsByClassName("side_board")[box].innerHTML = players_map[player_turn];
        document.getElementsByClassName("side_board")[box].style.color = player_colors[player_turn];  
        player_turn = (player_turn % 2) + 1;
        }

}