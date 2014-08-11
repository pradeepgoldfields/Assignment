//..............................Global declarations................................

noteList=new Array();
list=document.getElementsByClassName("list-wrapper")[0];
template="";
ttlLabel=document.getElementById("title-label");
descLabel=document.getElementById("desc-label");

function note(title,desc) //note class
{
    this.title=title;
    this.desc=desc;
}

//------------------adding edit method to note function---------------------------


function deleteNote(obj){
    var title=obj.name;
    var noteObject=localStorage[title];
    localStorage.removeItem(title);
    displayNoteList();
}

function editNote(obj){

        var activeElements=document.getElements
        var note=localStorage[obj.name];
        name=obj.name;
        ttlStrng=name+'-ttl';
        descStrng=name+'-desc';
        var title=document.getElementsByName(ttlStrng)[0];
        var desc=document.getElementsByName(descStrng)[0];
        document.getElementsByName(obj.name)[0].innerHTML="Save";
        document.getElementsByName(obj.name)[0].setAttribute("onclick","javascript:saveNote(this);");
        document.getElementsByName(obj.name)[0].className="sv-btn button";
        title.setAttribute("contenteditable","true");
        title.focus();
        desc.setAttribute("contenteditable","true");
}
function validate(obj){
    var title = document.getElementsByName(obj.name+'-ttl')[0];
    var desc=document.getElementsByName(obj.name+'-desc')[0];
    var erDiv=document.getElementsByClassName("error")[0];    
    if(title.innerHTML != "" && desc.innerHTML !="")
    {	
	return true;
	}
   else if(title.innerHTML=="" && desc.innerHTML=="")
   {
        erdiv.style.opacity="1";
        erDiv.innerHTML="Please Enter Something";
        erDiv.style.height="30px";
        title.focus();
        return false;
   }
   else if(title.innerHTML=="")
   {
        erDiv.style.opacity="1";
        erDiv.innerHTML="Please Enter  Title";
        erDiv.style.height="30px";
        title.focus();
        return false;
    }
    else if(desc.innerHTML=="")
    {
        erDiv.style.opacity="1";
        erDiv.innerHTML="Please Enter Description";
        erDiv.style.height="30px";
        desc.focus();
        return false;
    }
}
function saveNote(obj){
    var title=document.getElementsByName(obj.name+'-ttl')[0];
    var desc=document.getElementsByName(obj.name+'-desc')[0];
    var flag= validate(obj);
    if (flag == true)
    {
        localStorage.removeItem(obj.name);
        var newNote =new note(title.innerHTML,desc.innerHTML);
        updateNoteList(newNote,title.innerHTML);
        title.setAttribute("contenteditable","false");
        desc.setAttribute("contenteditable","false");
        document.getElementsByName(obj.name)[0].innerHTML="Edit";
        document.getElementsByName(obj.name)[0].setAttribute("onclick","javascript:editNote(this);");
        document.getElementsByName(obj.name)[0].className="edt-btn button";
        document.getElementById(obj.name+"-svIcon").className="show ntf-icon";
        var erdiv=document.getElementsByClassName("error")[0];
        erdiv.style.opacity="0";
        setTimeout(function(){
            erdiv.innerHTML="";
            document.getElementById(obj.name+"-svIcon").className="hide ntf-icon";
        },1000);
    }

}
//UPDATE NOTE IN LOCAL STORAGE

function updateNoteList(obj,key)
{	
    if(localStorage.length > 0)
    {	
        localStorage[key]=JSON.stringify(obj);	
    }
    else
    {	
        localStorage[key]=JSON.stringify(obj);
    }
}

//------------------display notes----------------

function displayNoteList(){
    if(localStorage.length > 0)
    {
        template="";
        list.innerHTML="<div class='error'></div>";
        for(i=0; i<localStorage.length; i++)
        {						
            key=localStorage.key(i);
            var item=JSON.parse(localStorage[key]);
            list.innerHTML+='<div class="note">' +
                                '<div class="avatar-container">' +
                                    '<img class="avatar" src="images/avatar.png" alt="avatar" />' +
                                '</div>' +
                                '<div class="note-ls-cntnt">' + 
                                    '<h3 name="'+item.title+'-ttl">'+item.title+'</h3>' +
                                    '<p name="'+item.title+'-desc">'+item.desc+'</p>' + 
                                '</div>' +
                                '<div class="note-ls-btns">' +
                                    '<img src="images/save.png" class="hide ntf-icon" id="'+item.title+'-svIcon"/>' +
                                    '<a name="'+item.title+'" class="button edt-btn" onclick="javascript:editNote(this);">Edit</a>' +
                                    '<a name="'+item.title+'" class="button dlt-btn" onclick="javascript:deleteNote(this);">Delete</a>' +
                                '</div>' + 
                            '</div>';
        list.style.display="block";
        }
    }
    else
    {
        list.style.display="none";
    }
}
//----------------function addNote----------------------
function addNote(){
    var title = document.getElementById("title-node").value;
    var desc = document.getElementById("desc-node").value;
    if(title !=="" && desc !=="")
    {
        if(localStorage[title])
        {
            ttlLabel.innerHTML="Title Already Exist";
        }
        else
        {
            console.log("not empty");
            var newNote= new note(title,desc);
            updateNoteList(newNote,title);
            displayNoteList();
            document.getElementById("title-node").value="";
            document.getElementById("desc-node").value="";
            ttlLabel.innerHTML="";
            descLabel.innerHTML="";
        }
    }
    else
    {

        if(title=="" && desc =="")
        {
            ttlLabel.innerHTML="Please Enter  Title";
            descLabel.innerHTML="Please Enter  Description";
        }
        if(title =="")
        {
            ttlLabel.innerHTML="Please Enter Title";
        }
        else if(desc =="")
        {
            descLabel.innerHTML="Please Enter Desc";
        }

    }

}

//-------------------event listener for page reload -----------------

window.addEventListener("load",displayNoteList,false);

