const boxes = document.querySelectorAll(".btn");
//document.querySelector();
//document.querySelectorAll();
//document.getElementById();

var player = true;

const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function disablebtn(){
    for(var b of boxes){
        b.innerHTML = "";
        b.disabled = false;
    }
}

function displaywinner(){
    for(let a of winner){
        var btn1 = boxes[a[0]].innerHTML;
        var btn2 = boxes[a[1]].innerHTML;
        var btn3 = boxes[a[2]].innerHTML;
        if(btn1!="" && btn2!="" && btn3!=""){
            if(btn1 === btn2 && btn2 === btn3){
                // console.log("The Winner is " + btn1);
                if(btn1 === "O"){
                    console.log("the winner is playerO");
                }
                else{
                    console.log("the winner is player1");
                } 
                disablebtn();
            }
        }
    }
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(player){
            box.innerHTML = "O";
            player = false;
        }
        else{
            box.innerHTML = "X";
            player = true;
        }
        box.disabled = true;
        displaywinner();
    });
});

var a=[1, 2, 3, 4, 5, 6, 10, 38];

// a.forEach((i)=>{
//     console.log(i);
// });

// for(var b of a){
//     console.log(b);
// }

// for(var b in a){                  //in loop return only index(0 to 7)
//     console.log(b);
// }