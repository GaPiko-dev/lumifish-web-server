var red = 0;
var green = 0;
var blue = 0;


function autoPost() {  
  var mylist = document.getElementById("myList");  

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/sendFCT", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      "fct": mylist.options[mylist.selectedIndex].value
  }));
    }  

function showVal(c, v)
{
    switch(c)
    {
        case "red":
            this.red = v;
            break;
            case "green":
                this.green = v;
                break;
                case "blue":
                    this.blue = v;
                    break;
    }
    
    document.getElementById("color_preview").style.backgroundColor = 'rgb(' + red.toString() + "," + green.toString() + "," + blue.toString() + ")"; 

    var xhr = new XMLHttpRequest();
  xhr.open("POST", "/sendRGB", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      "red": this.red,
      "green": this.green,
      "blue": this.blue
  }));

}