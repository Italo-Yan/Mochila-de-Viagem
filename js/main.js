const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

        //BUSCA OS DADOS DO "localStorage" E CRIA OS ELEMENTOS.
itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

        //GERENCIA TODAS AS FUNÇÕES PARA O ENVIO DO ITEM.
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

        //SALVA AS VARIAVEIS DOS ELEMENTOS.
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

        //BUSCA OS ELEMENTOS QUE JÁ EXISTE.
    const existe = itens.find( elemento => elemento.nome === nome.value )

        //SALVA VÁRIOS ITENS EM UMA ÚNICA CONSTANTE.
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

        //VAI CHECAR SE O ELEMENTO EXISTE NA LISTA.
    if (existe) {
        itemAtual.id = existe.id

        //ATUALIZA O ELEMENTO.
        atualizaElemento(itemAtual)
        //TROCA O CONTEUDO QUE ESTA NO ARRAY E PASSA PARA O "Local Storage".
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

        //CASO O ELEMENTO NÃO EXISTA, ELE VAI ADICIONAR UM NOVO ELEMENTO.
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        //SALVA AS INFORMAÇÕES PARA A CRIAÇÃO DO ELEMENTO .
        criaElemento(itemAtual)

        //INSERE E SALVA OS ELEMENTOS EM UM ARRAY.
        itens.push(itemAtual)

    }

    //ARMAZENA OS DADOS NO SITE E CONVERTE O "arrayItens" EM UMA STRING.
    localStorage.setItem("itens", JSON.stringify(itens))

    //APAGA AS INFORMAÇÕES QUE FICA NO INPUT.
    nome.value = ""
    quantidade.value = ""

})

    //CRIA O ELEMENTO.
function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem)

}

    //VAI ATUALIZAR O ELEMENTO QUE EXISTE NA ARRAYLIST.
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

    //BOTÃO PARA DELETAR O ELEMENTO.
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "-"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

    //FUNÇÃO DO BOTÃO (REMOVER).
function deletaElemento(tag, id) {
    tag.remove()
    
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}