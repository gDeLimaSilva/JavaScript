document.querySelector('#logoutForm').addEventListener('submit', async function (e) {
    e.preventDefault()

    try {
        const response = await fetch('/user/logout', {
            method: 'POST',
        })
        if (response.ok) {
            window.location.href = '/'
        }
        else {
            alert('Falha ao realizar logout')
        }

    } catch (err) {
        console.error('Erro ao processar logout: ', err)
        alert('Erro ao tentar fazer logout')
    }

})
