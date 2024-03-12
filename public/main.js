const deleteArr = document.querySelectorAll(".delete");
const likeArr = document.querySelectorAll(".like");
const disArr = document.querySelectorAll(".dislike");

deleteArr.forEach(e => {
    e.addEventListener('click', deleteRecord)
});

likeArr.forEach(e => {
    e.addEventListener('click', function() {incLikes(this, 1)})
});

disArr.forEach(e => {
    e.addEventListener('click', function() {incLikes(this, -1)})
});

async function deleteRecord(){
    const id = this.dataset.record;
    console.log(id);
    try{
        const response = await fetch('/api/records', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                '_id': id
            }),
        })

        //const data = response.json();
        //console.log(data);
        window.location.reload(true);
    } catch(err){
        console.log(err);
    }
}

async function incLikes(caller, value){
    const id = caller.dataset.record;
    console.log(id);
    try{
        const response = await fetch('/api/records', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                '_id': id,
                'value': value
            }),
        })

        const data = response.json();
        console.log(data);
        window.location.reload(true);
    } catch(err){
        console.log(err);
    }
}