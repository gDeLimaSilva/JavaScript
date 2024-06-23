document.querySelector('#alterarForm').addEventListener('submit', async function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const data = Object.fromEntries(formData.entries())

    if (data.senhaAtual === data.novaSenha) {
        alert('A senha precisa ser diferente da anterior')
        return
    }
    if (data.novaSenha.length < 8) {
        alert('A senha deve conter pelo menos 8 caracteres')
        return
    }

    try {
    const response = await fetch('/user/alterar', {
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
    console.error('Erro ao processar alteração de senha: ', err)
    alert('Erro ao alterar senha')
}
})