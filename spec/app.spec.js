var request = require("request");

var base_url = "http://localhost:8888/api/"

describe("Auditoria de Terreno Server", () => {

    describe("GET /employee", () => {
        
        const resource = "employee";

        it("returns status code 200", () => {
            request.get( base_url + resource, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });

    });
});