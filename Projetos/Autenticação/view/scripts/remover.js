document.querySelector('#removerForm').addEventListener('submit', async function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const data = Object.fromEntries(formData.entries())

    try {
    const response = await fetch('/user/remover', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.success) {
        alert(result.message)
        window.location.href = '/'
    } else {
        alert(result.message)
    }
} catch (err) {
    console.error('Erro ao remover conta: ', err)
    alert('Erro ao remover conta')
}
})