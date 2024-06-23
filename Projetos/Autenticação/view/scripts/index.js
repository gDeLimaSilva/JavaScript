document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const data = Object.fromEntries(formData.entries())

    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.success) {
        window.location.href = result.redirectUrl
    } else {
        alert(result.message)
    }
})