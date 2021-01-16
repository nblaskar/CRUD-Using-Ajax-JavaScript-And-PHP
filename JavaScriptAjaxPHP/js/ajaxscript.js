//Ajax Request For View/Retriving data
let tbody=document.getElementById("tbody");
function showdata(){
    tbody.innerHTML="";
    const xhr= new XMLHttpRequest();
    xhr.open("GET","retrieve.php",true);
    xhr.responseType="json";//Parse into javascript object
    xhr.onload=()=>{
        if(xhr.status == 200){
            console.log(xhr.response);
            //display the data
            if(xhr.response){
                x=xhr.response;
            }else{
                x="";
            }
            for(i=0;i<x.length; i++){
                tbody.innerHTML +="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+
                "</td><td>"+x[i].password+"</td><td><button class='btn btn-warning btn-sm m-1 btn-edit' data-sid="
                +x[i].id+ ">Edit</button><button class='btn btn-danger btn-sm m-1 btn-del' data-sid="+x[i].id+
                ">Delete</button></td></tr>";
            }    

        }else{
            console.log("Problem Occured");
        }
        student_delete();
        student_edit();
    };
    xhr.send();
}
showdata();


//Ajax Request for Insert Data and Update Data

//Insert data by clicking Submit Button
document.getElementById("btnadd").addEventListener("click",add_student);
function add_student(e){
    e.preventDefault();
    console.log("Add Button Clicked");

    //Track the vaues of input fields
    let stid=document.getElementById("stuid").value;
    let nm=document.getElementById("nameid").value;
    let em=document.getElementById("emailid").value;
    let pw=document.getElementById("passwordid").value;
    // console.log(nm);
    // console.log(em);
    // console.log(pw);

    //Send the input values through Ajax to insert
    //Ajax Request
    //Create XHR Object
    const xhr=new XMLHttpRequest();

    //Initialize Request
    xhr.open("POST","insert.php",true);

    //Set Request Header
    xhr.setRequestHeader("Content-Type", "application/json");

    //Handle Response
    xhr.onload=()=>{
        if(xhr.status ===200){
            //Response Handling Code
            console.log(xhr.responseText);
            document.getElementById("msg").innerHTML="<div class='alert alert-dark mt-3' role='alert'>"+xhr.responseText+"</div>";
            document.getElementById("myform").reset();
            showdata();
        } else{
            console.log("Problem Occured");
        }
    };

    //Data as JavaScript Object
    const mydata={id:stid,name:nm, email:em, password:pw };
    // console.log(mydata);

    //Convert JavaScript Object to JSON String
    const data=JSON.stringify(mydata);
    console.log(data);

    //Now Send Request With Data
    xhr.send(data);

}


//Ajax Call To Delete records
function student_delete(){
    var x=document.getElementsByClassName("btn-del");
    // console.log(x);
    // console.log(x.length);
    for(let i=0;i<x.length;i++){
        console.log(x[i].getAttribute("data-sid"));
        x[i].addEventListener("click",function(){            
            //Send Clicked Button id to server to delete data
            id=x[i].getAttribute("data-sid");
            console.log("Delete Button Clicked",id);
            const xhr=new XMLHttpRequest();
            xhr.open("POST","delete.php",true);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.onload=()=>{
                if(xhr.status===200){
                    //Response Handling Code
                    console.log(xhr.responseText);
                    document.getElementById("msg").innerHTML="<div class='alert alert-dark mt-3' role='alert'>"+xhr.responseText+"</div>";
                    showdata();
                }
                else{
                    console.log("Problem Occured");
                }
            }
            //Send data
            const mydata={sid:id};
            const data=JSON.stringify(mydata);
            xhr.send(data);
        });
    }

}

//Ajax Call To Edit records
function student_edit(){
    var x=document.getElementsByClassName("btn-edit");
    let stid=document.getElementById("stuid");
    let nm=document.getElementById("nameid");
    let em=document.getElementById("emailid");
    let pw=document.getElementById("passwordid");
    for(let i=0;i<x.length;i++){
        console.log(x[i].getAttribute("data-sid"));
        x[i].addEventListener("click",function(){            
            //Send Clicked Button id to server to edit data
            id=x[i].getAttribute("data-sid");
            console.log("Edit Button Clicked",id);
            const xhr=new XMLHttpRequest();
            xhr.open("POST","edit.php",true);
            xhr.responseType="json";
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.onload=()=>{
                if(xhr.status===200){
                    //Response Handling Code
                    console.log(xhr.response);
                    a=xhr.response;
                    stid.value=a.id;
                    nm.value=a.name;
                    em.value=a.email;
                    pw.value=a.password;

                }
                else{
                    console.log("Problem Occured");
                }
            }
            //Send data
            const mydata={sid:id};
            const data=JSON.stringify(mydata);
            xhr.send(data);
        });
    }

}