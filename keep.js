const addbutton = document.querySelector('.btn');


//for write data on local storage
const updateLSdata = () =>{
    const txtareadata = document.querySelectorAll('textarea');
    const notes = [];

    txtareadata.forEach((newnote) =>{
        return notes.push(newnote.value);
    })

    //we can only store string value in local storage so convert to stringify
    localStorage.setItem('notes',JSON.stringify(notes));
}



const addnote = (text = '') => {

    //add div note with js dynamicaly
    const newnote = document.createElement('div');
    newnote.classList.add('note');                    //to add note class to div

    //add html code to div-note
    const htmldata = `
                
                <div class="op">
                    <span class="trashicon"><i class="fa-solid fa-trash" ></i></span>
                    <span class="editicon"><i class="fa-solid fa-pen-to-square"></i></span>
                </div>
                <div class="text ${text ? "" : "hidden"}" ></div>
                    <textarea autofocus class="textbox ${text ? "hidden" : ""}" ></textarea>
     `
    newnote.insertAdjacentHTML('afterbegin', htmldata);

    //add note to body
    document.body.appendChild(newnote);

    // getting references
    const editbtn = newnote.querySelector('.editicon');
    const delbtn = newnote.querySelector('.trashicon');
    const txt = newnote.querySelector('.text');
    const txtarea = newnote.querySelector('textarea');

    //deleting note
    delbtn.addEventListener('click', () => {
        newnote.remove();
        updateLSdata();
    })

    //toggle using edit
    
    //just for make content same of txtarea and txt
    txtarea.value=text;
    txt.innerHTML=text;
  
    txtarea.focus();                        //for default txtarea cursor
    editbtn.addEventListener('click',()=>{
        txt.classList.toggle('hidden');
        txtarea.classList.toggle('hidden');
        txtarea.focus();
    })

    //use change instead of input
    txtarea.addEventListener('change',(event)=>{
        const value=event.target.value;
        txt.innerHTML=value;

        updateLSdata();
    }
    )
}



//getting back data from localstorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((newnote) => addnote(newnote));
}


addbutton.addEventListener('click', () => addnote());