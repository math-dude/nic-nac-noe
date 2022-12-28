

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
        "board_i" : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "" :[]
        
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
    window.location.href = "home.html";
}

function openGame()
{
    window.location.href = "game.html";
}

function openMobile()
{
    window.location.href = "mobile_game.html";
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

const player_colors = ["black", "rgb(176, 13, 13)", "rgb(37, 90, 223)"];

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

    //change grid color
    const player_colors_highlight = ["rgb(11, 96, 5)", "rgb(250, 108, 82)", "rgb(73, 192, 242)"]
    document.getElementById("small_board").style.backgroundColor = player_colors_highlight[boardstate.big_board[board_map[boardstate.current_board]]];
}
//

//start of game functions & variables

//waits for the first player to select which sub_board they would like to start on
function selectBoard(board_name)
{
    matchBoards(board_name);
    
    //stops hover highlighting
    let all_boards = document.getElementsByClassName("grid_box");
    for (i in all_boards)
    {
        all_boards[i].className = "grid_box";
        all_boards[i].style.pointerEvents = "none";
    }
}

// Clears board and starts game
function startGame()
{
    boardstate.reset();
    
    //enables hover highlighting
    let all_boards = document.getElementsByClassName("grid_box");
    for (i in all_boards)
    {
        all_boards[i].className = "grid_box selecting";
        all_boards[i].style.pointerEvents = "auto";
    }
}
//

//gameplay functions & variables
let player_turn = 1;

let turn_count = 0;

let full_boards = [];

//hovering over box shows player character in box
function showChar(box)
{
    if (boardstate.full_board[boardstate.current_board][box] == 0)
    {
        document.getElementsByClassName("side_board")[box].innerHTML = players_map[player_turn];
        document.getElementsByClassName("side_board")[box].style.color = player_colors[player_turn];
    }
}

function hideChar(box)
{
    if (boardstate.full_board[boardstate.current_board][box] == 0)
    {
        document.getElementsByClassName("side_board")[box].innerHTML = "";
        document.getElementsByClassName("side_board")[box].style.color = "black";
    }
}

//Allows users to take turn with X/O with colors red/blue
function play_turn(box)
{
    if (boardstate.full_board[boardstate.current_board][box] == 0)
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
        
        if (boardstate.full_board[board_map[box]].includes(0))
        {
            //switch boxes
            //setTimeout(matchBoards, 500, board_map[box]);
            matchBoards(board_map[box]);
        }
        else
        {
            //add board to full_boards
            full_boards.push(box);

            //turn hover highlighting back on
            for (let i = 0; i < 9; i ++)
            {
                if (!full_boards.includes(i))
                {
                    document.getElementById("grid_box_" + i).className = "grid_box selecting";
                    document.getElementById("grid_box_" + i).style.pointerEvents = "auto";
                }
            }
        }

        //change player turn
        player_turn = (player_turn % 2) + 1;
        turn_count ++;

        //change game info
        document.getElementById("player_turn").innerHTML = players_map[player_turn];
        document.getElementById("game_info").style.color = player_colors[player_turn];
        
        checkWin();
    }
}

//check if any of the sub_boards have been won
function checkSubWin()
{
    let board_name = boardstate.current_board;
    let sub_board = boardstate.full_board[board_name];
    if(boardstate.big_board[board_map[board_name]] == 0)
    {
        for (let player = 1; player <= 2; player ++)
        {
            if
            (
                (player == sub_board[0] && player == sub_board[3] && player == sub_board[6]) ||
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

//check if full board has been won
function checkWin()
{
    let big_board = boardstate.big_board;
    for (let player = 1; player <= 2; player ++)
    {
        if
        (
        (player == big_board[0] && player == big_board[3] && player == big_board[6]) ||
        (player == big_board[1] && player == big_board[4] && player == big_board[7]) ||
        (player == big_board[2] && player == big_board[5] && player == big_board[8]) ||
        (player == big_board[0] && player == big_board[1] && player == big_board[2]) ||
        (player == big_board[3] && player == big_board[4] && player == big_board[5]) ||
        (player == big_board[6] && player == big_board[7] && player == big_board[8]) ||
        (player == big_board[0] && player == big_board[4] && player == big_board[8]) ||
        (player == big_board[2] && player == big_board[4] && player == big_board[6])
        )
        {
            endGame(player);
        }
        else if (turn_count == 81)
        {
            endGame(0);
        }
    }
}

//resign/new game button type
//0 - resign, 1 - new game
let button_type = 0;

//end game function
// winning_player : 0 - draw, 1 - player 1 (X), 2 - player 2 (O)
function endGame(winning_player)
{
    if (winning_player == 0)
    {
        document.getElementById("game_info_title").innerHTML = "Draw";
        document.getElementById("game_info_title").style.color = "rbg(110, 110, 110)";

        document.getElementById("player_turn").innerHTML = "-";
        document.getElementById("player_turn").style.color = "rgb(110, 110, 110)";

        
    }
    else
    {
        document.getElementById("game_info_title").innerHTML = "Player " + winning_player + " (" + players_map[winning_player] + ") Won";
        document.getElementById("game_info_title").style.color = player_colors[winning_player];

        document.getElementById("player_turn").innerHTML = players_map[winning_player];
        document.getElementById("player_turn").style.color = player_colors[winning_player];

    }

    //change resign button to new game button
    document.getElementById("resign/new_game").innerHTML = "New Game";
    document.getElementById("small_board").style.pointerEvents = "none";
    button_type = 1;
}

//Resign button to end game and give oppposition victory
function resign_newgame()
{
    if (button_type == 0)
    {
        if(confirm("Are you sure you want to resign?"))
        {
            let winner_map = [0, 2, 1];
            endGame(winner_map[player_turn]);
        }
    }
    else
    {
        window.location.reload();
    }
}
//