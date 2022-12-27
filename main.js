// 0 => empty square, 1 => X, 2 => O

let boardstate = 
{
    big_board : [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        "board_i" : [0, 0, 0, 0, 0, 0, 0, 0, 0]
        
    },
    current_board : "",


    reset : function()
    {
        for (board in this.full_board) {
            this.full_board[board] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
const players_map =
{
    0 : "",
    "" : 0,
    1 : "X",
    "X" : 1,
    2 : "O",
    "O" : 2
}

const board_map =
{
    "board_a" : 0,
    "board_b" : 1,
    "board_c" : 2,
    "board_d" : 3,
    "board_e" : 4,
    "board_f" : 5,
    "board_g" : 6,
    "board_h" : 7,
    "board_i" : 8,
    0 : "board_a",
    1 : "board_b",
    2 : "board_c",
    3 : "board_d",
    4 : "board_e",
    5 : "board_f",
    6 : "board_g",
    7 : "board_h",
    8 : "board_i"
}

const player_colors = ["black", "red", "blue"];

//changes color of one of the sub_boards in the left grid
function colorBoard(board_name, color)
{
    for (let box = 0; box < 9; box ++)
    {
        document.getElementsByClassName(board_name)[box].style.backgroundColor = color;
    }
}

//switches the rightside board to match one of the sub_boards in the left grid
//also highlights which board is shown on the right side
function matchBoards(board_name)
{

    //remove previous highlighting
    if (boardstate.current_board != "")
    {
        colorBoard(boardstate.current_board, "rgb(110, 209, 143)");
    }

    //set current board to board_name
    boardstate.current_board = board_name;

    //open new board
    for (box in boardstate.full_board[boardstate.current_board])
    {
        document.getElementsByClassName("side_board")[box].innerHTML = players_map[boardstate.full_board[boardstate.current_board][box]];
        document.getElementsByClassName("side_board")[box].style.color = player_colors[boardstate.full_board[boardstate.current_board][box]];
    }

    //Add Highlighting 
    for (let box = 0; box < 9; box++)
    {
        colorBoard(board_name, "rgb(123, 219, 68)");
    }
}
//

//start of game functions & variables

//waits for the first player to select which sub_board they would like to start on
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

// Clears board and starts game
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

//Empty function to delay output
function empty() {}

//Allows users to take turn with X/O with colors red/blue
function play_turn(box)
{    
    if (document.getElementsByClassName("side_board")[box].innerHTML=="")
    {
        //inserts X/O
        document.getElementsByClassName("side_board")[box].innerHTML = players_map[player_turn];
        document.getElementsByClassName("side_board")[box].style.color = player_colors[player_turn];

        //map to boardstate
        boardstate.full_board[boardstate.current_board][box] = player_turn;

        //map to full board
        document.getElementsByClassName(boardstate.current_board)[box].innerHTML = players_map[player_turn];
        document.getElementsByClassName(boardstate.current_board)[box].style.color = player_colors[player_turn];

        //check for win in sub_board
        checkSubWin();
        
        //switch boxes
        //setTimeout(matchBoards, 500, board_map[box]);
        matchBoards(board_map[box]);

        //change player turn
        player_turn = (player_turn % 2) + 1;
    }
}

//check if any of the sub_boards have been won
function checkSubWin()
{
    board_name = boardstate.current_board;
    sub_board = boardstate.full_board[board_name];
    if(boardstate.big_board[board_map[board_name]] == 0)
    {
        for (let player = 1; player <= 2; player ++)
        {
            if ((player == sub_board[0] && player == sub_board[3] && player == sub_board[6]) ||
                (player == sub_board[1] && player == sub_board[4] && player == sub_board[7]) ||
                (player == sub_board[2] && player == sub_board[5] && player == sub_board[8]) ||
                (player == sub_board[0] && player == sub_board[1] && player == sub_board[2]) ||
                (player == sub_board[3] && player == sub_board[4] && player == sub_board[5]) ||
                (player == sub_board[6] && player == sub_board[7] && player == sub_board[8]) ||
                (player == sub_board[0] && player == sub_board[4] && player == sub_board[8]) ||
                (player == sub_board[2] && player == sub_board[4] && player == sub_board[6])
            )
            {

                const player_colors_highlight = ["", "rgb(250, 108, 82)", "rgb(73, 192, 242)"]
                boardstate.big_board[board_map[board_name]] = player;
                document.getElementsByClassName("grid_box")[board_map[board_name]].style.backgroundColor = player_colors_highlight[player];
            }
        }
    }
}

//Resign button to end game and give oppposition victory
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
