const deleteArr = document.querySelectorAll(".delete");
const likeArr = document.querySelectorAll(".like");

deleteArr.forEach(e => {
    e.addEventListener('click', deleteRecord)
});

likeArr.forEach(e => {
    e.addEventListener('click', addLike)
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

        const data = response.json();
        console.log(data);
        location.reload();
    } catch(err){
        console.log(err);
    }
}

async function addLike(){
    const id = this.dataset.record;
    console.log(id);
    try{
        const response = await fetch('/api/records', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                '_id': id
            }),
        })

        const data = response.json();
        console.log(data);
        location.reload();
    } catch(err){
        console.log(err);
    }
}