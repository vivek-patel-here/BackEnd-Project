document.querySelector(".delete").addEventListener("click",(e)=>{
    let decision=confirm("Are you Sure to delete this Post ? ");
    console.log(decision);
    if(!decision){
        e.preventDefault();
    }
    else{
        alert("Post deleted successfully!")
    }
})