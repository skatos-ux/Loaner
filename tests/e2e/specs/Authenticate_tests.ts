import { faDiceOne } from "@fortawesome/free-solid-svg-icons";

describe("Tests on authenticate",function(){

    it("To connect with valid admins credentials should bring to main page", function(){
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("lilianb@mail.fr").should('have.value','lilianb@mail.fr');
        cy.get('.input[type="password"]').type("fromage").should('have.value','fromage');
        cy.contains('Se connecter').click();
        cy.url().should('eq', 'http://localhost:8080/mainpage/dashboard');
    })

    it("To connect with valid user credentials should bring to main page", function(){
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("mpsqr@mail.fr").should('have.value','mpsqr@mail.fr');
        cy.get('.input[type="password"]').type("bourbe").should('have.value','bourbe');
        cy.contains('Se connecter').click();
        cy.url().should('eq', 'http://localhost:8080/mainpage/dashboard');
    })

    it("To connect with valid user credentials should bring to main page", function(){
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("test@mail.fr").should('have.value','test@mail.fr');
        cy.get('.input[type="password"]').type("test").should('have.value','test');
        cy.contains('Se connecter').click(); 
        //The click is expected to not work so the URL will stay the same 
        cy.url().should('eq', 'http://localhost:8080/');
    })

    it("To connect with valid admin credentials should bring to main page", function(){
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("emptyempty").should('have.value','emptyempty');
        cy.get('.input[type="password"]').type("     ").should('have.value','     ');
        cy.contains('Se connecter').click(); 
        //The click is expected to not work so the URL will stay the same 
        cy.url().should('eq', 'http://localhost:8080/');
    })

    it("To connect with valid user credentials should bring to main page", (done) =>{
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("@@@@@").should('have.value','@@@@@');
        cy.get('.input[type="password"]').type("arobase").should('have.value','arobase');
        cy.contains('Se connecter').click();
        //The click is expected to not work so the URL will stay the same 
        cy.url().should('eq', 'http://localhost:8080/');
    })
});