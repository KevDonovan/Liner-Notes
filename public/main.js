const deleteArr = document.querySelectorAll(".delete");


deleteArr.forEach(e => {
    e.addEventListener('click', deleteRecord)
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
        //location.reload();
    } catch(err){
        console.log(err);
    }
}