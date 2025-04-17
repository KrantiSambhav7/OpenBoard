let flag = true;
let pencilFlag = false;
let eraserFlag = false;
let optionsCont = document.querySelector('.options-ctn');
let toolsCont = document.querySelector('.tools-ctn');
let pencilTool = document.querySelector('.pencil-tool');
let eraserTool = document.querySelector('.eraser-tool');
let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let note = document.querySelector('.note');
let upload = document.querySelector('.upload');

optionsCont.addEventListener('click', function (e) {
    flag = !flag;
    if (flag) {
        openTools();
    } else {
        closeTools();
    }
})

function openTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("ri-menu-line");
    iconElem.classList.add("ri-close-large-line");
    toolsCont.style.display = "flex";
}
function closeTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("ri-close-large-line");
    iconElem.classList.add("ri-menu-line");
    toolsCont.style.display = "none";
    pencilTool.style.display = "none";
    eraserTool.style.display = "none";
}
pencil.addEventListener('click', function (e) {
    pencilFlag = !pencilFlag;
    if(pencilFlag){
        pencilTool.style.display = "block";
    }else{
        pencilTool.style.display = "none";
    }
})
eraser.addEventListener('click', function (e) {
    eraserFlag = !eraserFlag;
    if(eraserFlag){
        eraserTool.style.display = "block";
    }else{
        eraserTool.style.display = "none";
    }
})

upload.addEventListener('click', function (e) {
    let input = document.createElement("input");
    input.setAttribute("type" , "file");
    input.click();

    input.addEventListener('change' , function(e){
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyCtn = document.createElement("div");
        stickyCtn.setAttribute("class" , "sticky-ctn");
        stickyCtn.innerHTML = `
            <div class="header-ctn">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-ctn">
                <img src="${url}"></img> 
            </div>
        `;
        document.body.appendChild(stickyCtn);
    
        let minimize = stickyCtn.querySelector('.minimize');
        let remove = stickyCtn.querySelector('.remove'); 
        noteActions(minimize , remove , stickyCtn);
    
        stickyCtn.onmousedown = function(event) {
            let shiftX = event.clientX - stickyCtn.getBoundingClientRect().left;
            let shiftY = event.clientY - stickyCtn.getBoundingClientRect().top; 
            stickyCtn.style.position = 'absolute';
            stickyCtn.style.zIndex = 1000;
            document.body.append(stickyCtn);
            moveAt(event.pageX, event.pageY);
            function moveAt(pageX, pageY) {
              stickyCtn.style.left = pageX - shiftX + 'px';
              stickyCtn.style.top = pageY - shiftY + 'px';
            }
            function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);
            }
            // move the stickyCtn on mousemove
            document.addEventListener('mousemove', onMouseMove);
            // drop the stickyCtn, remove unneeded handlers
            stickyCtn.onmouseup = function() {
              document.removeEventListener('mousemove', onMouseMove);
              stickyCtn.onmouseup = null;
            };
          };
          stickyCtn.ondragstart = function() {
            return false;
          };
    });
})


note.addEventListener('click', function (e) {
    let stickyCtn = document.createElement("div");
    stickyCtn.setAttribute("class" , "sticky-ctn");
    stickyCtn.innerHTML = `
        <div class="header-ctn">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-ctn">
            <textarea spellcheck="false"></textarea> 
        </div>
    `;
    document.body.appendChild(stickyCtn);

    let minimize = stickyCtn.querySelector('.minimize');
    let remove = stickyCtn.querySelector('.remove'); 
    noteActions(minimize , remove , stickyCtn);

    stickyCtn.onmousedown = function(event) {
        let shiftX = event.clientX - stickyCtn.getBoundingClientRect().left;
        let shiftY = event.clientY - stickyCtn.getBoundingClientRect().top; 
        stickyCtn.style.position = 'absolute';
        stickyCtn.style.zIndex = 1000;
        document.body.append(stickyCtn);
        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
          stickyCtn.style.left = pageX - shiftX + 'px';
          stickyCtn.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
        // move the stickyCtn on mousemove
        document.addEventListener('mousemove', onMouseMove);
        // drop the stickyCtn, remove unneeded handlers
        stickyCtn.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          stickyCtn.onmouseup = null;
        };
      };
      stickyCtn.ondragstart = function() {
        return false;
      };
})
function noteActions(minimize , remove , stickyCtn){
    remove.addEventListener('click' , function(e){
        stickyCtn.remove();
    });
    minimize.addEventListener('click' , function(e){
        let noteCtn = stickyCtn.querySelector('.note-ctn');
        let displayProp = getComputedStyle(noteCtn).getPropertyValue('display');
        if(displayProp === "none"){
            noteCtn.style.display = "block";
        }else{
            noteCtn.style.display = "none";
        } 
    });
}
