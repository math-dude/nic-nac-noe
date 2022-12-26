// 0 => empty square, 1 => X, 2 => O

let boardstate = 
{
    board_normal : [0, 0, 0, 0, 0, 0, 0, 0, 0],
    full_board :
    {
        "board_a" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_b" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_c" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_d" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_e" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_f" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_g" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_h" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "board_i" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "dud" : [0, 0, 0, 0, 0, 0, 0, 0, 0]
        
    },
    big_board : ["dud",[0, 0, 0, 0, 0, 0, 0, 0, 0]],

    reset : function()
    {
        for (board in this.full_board) {
            this.full_board[board] = this.board_normal
        }
    }
}

//menu functions & variables
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
//

//important overall game functions
let players_map =
{
    0 : "",
    "" : 0,
    1 : "X",
    "X" : 1,
    2 : "O",
    "O" : 2
}

let player_colors = ["black", "red", "blue"];


function matchBoards(board_name)
{
    
    //reset board color
    if (boardstate.big_board[0] != "dud")
    {
        for (let box = 0; box < 9; box++)
        {
            document.getElementsByClassName(boardstate.big_board[0])[box].style.backgroundColor = "rgb(110, 209, 143)";
        }
    }

    //reset previous board values
    current_board = boardstate.big_board;
    boardstate.full_board[current_board[0]] = current_board[1];
    

    //pull from new board
    boardstate.big_board[0] = board_name;
    boardstate.big_board[1] = boardstate.full_board[board_name];

    //highlight new board
    for (let box = 0; box < 9; box++)
    {
        document.getElementsByClassName(board_name)[box].style.backgroundColor = "rgb(123, 219, 68)";
    }
    
    //update side board
    for (box in boardstate.big_board[1])
    {
        box_value = boardstate.big_board[1][box];
        document.getElementsByClassName("side_board")[box].innerHTML = players_map[box_value];
        document.getElementsByClassName("side_board")[box].style.color = player_colors[box_value]
    }
}
//

//start of game functions & variables
function startSelect(board_name)
{
    matchBoards(board_name);
    
    let all_boards = document.getElementsByClassName("grid_box");
    for (i in all_boards)
    {
        all_boards[i].className = "grid_box";
        all_boards[i].style.pointerEvents = 'none';

    }
}

function startGame()
{
    boardstate.reset();
    
    let all_boards = document.getElementsByClassName("grid_box");
    for (i in all_boards)
    {
        all_boards[i].className = "grid_box selecting";
        all_boards[i].style.pointerEvents = 'auto';
    }
}
//

//gameplay functions & variables
let player_turn = 1;

function play_turn(box)
{    
    if (document.getElementsByClassName("side_board")[box].innerHTML=="")
    {
        document.getElementsByClassName("side_board")[box].innerHTML = players_map[player_turn];
        document.getElementsByClassName("side_board")[box].style.color = player_colors[player_turn];  
        player_turn = (player_turn % 2) + 1;
    }
    else
    {
        play_turn(box);
    }

}
 
function resign()
{
 if(confirm("Are you sure you want to resign?" == true))
 {
    //Indicate player wins
    home()
 }
 else
 {
    play_turn(box);
 }
}
//