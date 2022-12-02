document.addEventListener("click", event => {
    if (event.target.dataset.type === "remove") {
        remove(event.target.dataset.id).then(() => {
            event.target.closest("li").remove()
        })
    }
    if (event.target.dataset.type === "update") {
        const newName = prompt("Введите новое название")
        const id = event.target.dataset.id
        if (newName) {
            update(id, newName)
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: "DELETE"})
}

async function update(id,title) {
    await fetch(`/${id}`, {method: "PUT", headers:{"Content-Type": "application/json"}, body: JSON.stringify({title})})
}