const request = require("supertest");
const app = require("./index")
describe("Aplicação Produto", () => {
    it("Teste da rota produtos/listar ", async () => {

        const res = await request(app).get("/produtos/listar");
        // console.log(res);
        expect(res.body).toHaveProperty("msg");
    });

    it("Teste da rota produtos/buscar/:id", async () => {

        const res_buscar = await request(app).get("/produtos/buscar/4");
        expect(res_buscar.body).toHaveProperty("msg");
    });

    it("Teste de rota de cadastro produtos/cadastro", async () => {
        const res_cadastro = await request(app)
            .post("/produtos/cadastro")
            .send({
                nomeproduto: "fone",
                descricao: "gamer rgb",
                preco: "80.90",
                foto: "fone.png"
            })
            .set("Accept", "application/json")
            .expect(201);
        console.log(res_cadastro.text);
    });

    it("Teste da rota para atualizar produtos/atualizar/:id", async () => {
        const res_atualizar = await request(app)
            .put("/produtos/atualizar/4")
            .send({
                nomeproduto: "Microfone",
                descricao: "Micrfone phillips",
                preco: 40,
                foto: "microfone.jpg"
            })
            .set("Accept", "application/json")
            .expect(200);
        console.log(res_atualizar.text);
    });

    it("Testando a rota do deletar produto/apagar", async () => {
        const res_apagar = await request(app).delete("/produtos/apagar/4")
            .set("accept", "application/json")
            .expect(204);
    });
});