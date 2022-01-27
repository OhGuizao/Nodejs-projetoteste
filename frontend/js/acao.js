function carregarDadosAPI() {


    fetch("http://localhost:5000/produtos/listar")
        .then((response) => response.json())
        .then((resultado) => {

            var linha = `<div class="row justify-content-md-center">`;

            resultado.msg.map((itens, ix) => {


                linha += `<div class="card col-2 text-center">
                        <img src="${itens.foto}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${itens.nomeproduto}</h5>
                            <p class="card-text">${itens.descricao}.</p>
                            <p class="card-text">${itens.preco}R$</p>
                        </div>
                        <div class="card-footer">
                            <a href="atualizar.html?id=${itens.idproduto}">Atualizar</a>
                            <a href="apagar.html?id=${itens.idproduto}">Apagar</a>
                        </div>
                    </div>`


            });

            linha += "</div>";

            document.getElementById("conteudo").innerHTML = linha;
        })
        .catch((erro) => console.error(`Erro ai carregar a API -> ${erro}`))
}

function cadastrar() {
    var nome = document.getElementById("txtNomeProduto").value;
    var descricao = document.getElementById("txtDescricao").value;
    var preco = document.getElementById("txtPreco").value;
    var foto = document.getElementById("txtFoto").value;


    fetch("http://localhost:5000/produtos/cadastro", {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nomeproduto: nome,
            descricao: descricao,
            preco: preco,
            foto: foto
        })
    })
        .then((response) => response.json())
        .then((dados) => {
            alert(`Dados cadastrados com sucesso!\n Id gerado:${dados.msg.insertId}`);
            document.getElementById("txtNomeProduto").value = "";
            document.getElementById("txtDescricao").value = "";
            document.getElementById("txtPreco").value = "";
            document.getElementById("txtFoto").value = "";

        })
        .catch((erro) => console.error(`Erro ao cadastrar -> ${erro}`));
}

function atualizar() {
    //Obter o endereço passado na url
    var id = window.location.search;
    alert(id);
}

window.document.body.onload = () => {
    carregarDadosAPI();
}