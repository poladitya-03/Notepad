console.log("welcome to my Notepad");

function display(){
    let nav = document.getElementById("nav"); 
    nav.innerHTML =  '<input type="email" class="form-control col-md-12 my-3" id="inp"  placeholder="Enter search" style="background-color: rgb(243, 215, 165);">';
    
    let inp = document.getElementById("inp");
    inp.addEventListener("change",function(e){
        inp.style.display ="none";
        showList();
    });

    inp.addEventListener("input",function(e){
      let inputVal = inp.value;
      let noteCards = document.getElementsByClassName('noteCard');
      Array.from(noteCards).forEach(function(element){
        
          let cardTxt = element.getElementsByTagName("div")[0].innerText;
          if(cardTxt.includes(inputVal)){
              element.style.display = "block";
          }
          else{
              element.style.display = "none";
          }
      });

  });

    inp.addEventListener("focus",function(e){
        inp.style.borderColor=" rgb(243, 215, 165)";
        inp.style.boxShadow="none";
    });
    

}


function showList() {
    let list = localStorage.getItem("note");
    if (list == null) {
      NoteObj = [];
    } else {
      NoteObj = JSON.parse(list);
    }
    let html = "";
    NoteObj.forEach(function(element, index) {
      html += `
              <br>
              <div  onclick="test(${index})"  class=" border border-5 border-dark rounded-pill noteCard">
              <br>
                       <p class="ml-4">${element.date1} ${element.time} Note:${index} 
      </p><div class="ml-5" id="txt" style="width:20px; height:20px;overflow:hidden;display:inline-block;">${element.text}</div>......
      <img width="20" height="20"  src="images/trash-solid.svg" class="d-inline-block align-top ml-5 " id="${index}" onclick="deleteNote(this.id)" >
                       
                                              
                        
                       </div>`;
                      
    });
    
   

    let listElm = document.getElementById("notes");
    if (NoteObj.length != 0) {
      listElm.innerHTML = html;  
    } else {
      listElm.innerHTML = `Nothing to show Pls click add btn below (+) to add ones`;
    }
  };

  //re catching the code 
  function test(e){
    add();
    let text = document.getElementById("txt");
    
    let list = localStorage.getItem("note");
    if (list == null) {
      NoteObj = [];
    } else {
      NoteObj = JSON.parse(list);
    }
      
        text.innerHTML = NoteObj[e].text;

    
  }

  //add button function

function add(){
    let notes = document.getElementById("notes"); 
    notes.innerHTML =  '<div class="row" id="clear"><div class="col=md-12"><img src="images/save-solid.svg"  style="" width="30" height="30" class="d-inline-block align-top m-3"  id="save" alt=""><img id="close" src="images/circle-xmark-solid.svg" width="30" height="30" class="d-inline-block align-top m-3" alt=""></div><textarea id="txt" rows="50" cols="" class="col-md-12 mt-4 p-4"  placeholder="write your note here...." style="font-size:1.2rem;background-color: rgb(243, 215, 165);" ></textarea></div>';

    let text = document.getElementById("txt");
    text.addEventListener("focus",function(e){
        text.style.borderColor=" rgb(243, 215, 165)";
        text.style.boxShadow="none";
    });
    
    //close code
    let close = document.getElementById("close");
    close.addEventListener("click",function(){
        notes.innerHTML = " ";
        showList();
    });

    //save code
    let save = document.getElementById("save");

    save.addEventListener("click",function(e){
        
        const date = new Date();
        let notelist = localStorage.getItem("note");
        if(text.value=="")
            {
              swal("Pls enter a Note","","info");
              return false;
            }

        if (notelist == null) {
            NoteObj = [];
          } else {
            NoteObj = JSON.parse(notelist);
          }

        let obj = {
            text : text.value,
            date1 : date.toDateString(), 
            time : date.toLocaleString()
        }

        NoteObj.push(obj);

        localStorage.setItem("note", JSON.stringify(NoteObj));
        

        //disappear onclick of save button
        notes.innerHTML = "";
           
    
        
            swal("saved successfully","","success");
    

            showList();
       
    });
}


//delete
function deleteNote(index) {
  
  
    let list = localStorage.getItem("note");
    if (list == null) {
      NoteObj = [];
    } else {
      NoteObj = JSON.parse(list);
    }
  
    NoteObj.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(NoteObj));
  }




