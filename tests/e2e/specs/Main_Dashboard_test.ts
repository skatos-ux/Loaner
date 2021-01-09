
describe("Tests on the main page of the Loaner", function(){
    
    it("Connecting as a simple user should make appear the cart section, the search bar and the categories division", function(){
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("mpsqr@mail.fr");
        cy.get('.input[type="password"]').type("bourbe");
        cy.contains('Se connecter').click();

        //Checking if the searchBar is accessible
        cy.get('.mainpanel__searchbar');

        //Checking if the cart is accessible
        cy.get('.cart');

        //Checking if the categories are seen
        cy.get('.mainpanel__devicelist');

        cy.contains('Se déconnecter').click();
    })
   
    it("Connecting as a administator shoud make appear Users Dashboard button and Users button, in addition that the simple users sections", function() {
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("lilianb@mail.fr");
        cy.get('.input[type="password"]').type("fromage");
        cy.contains('Se connecter').click();

        //Checking if the cart is accessible
        cy.get('.cart');

        //Checking if the categories are seen
        cy.get('.mainpanel__devicelist');

        //Checking if the dashboards Button appears
        cy.contains('Dashboard').click();
        cy.url().should('eq', 'http://localhost:8080/mainpage/dashboard');

        //Checking if the Users Button exists
        cy.contains('Utilisateurs').click();
        cy.url().should('eq', 'http://localhost:8080/mainpage/users');

        cy.contains('Se déconnecter').click();
    })

    //Deletion doesn't work well and make the test fail
    //Can't get the deletion button (red-trash-icon) with cypress corrrectly
    /*
    it("Adding a category must be seen in the categories panel by its creator and later a random user", function(){
        //Connecting as administrator
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("lilianb@mail.fr");
        cy.get('.input[type="password"]').type("fromage");
        cy.contains('Se connecter').click();

        cy.contains('Ajouter categorie').click();
        cy.get('.modal[id=addCatModal]').get('.button[data-v-7f2f4c62][data-v-6eb29738]').should('be.disabled');
        cy.get('.modal[id=addCatModal]').get('.input[placeholder="Ordinateurs, téléphones..."]').type("TestCategory");
        cy.get('.modal[id=addCatModal]').get('.button[data-v-7f2f4c62][data-v-6eb29738]').eq(0).click();
        
        cy.url().should('eq', 'http://localhost:8080/mainpage/dashboard');
        
        //Checking the creator sees the added category
        cy.contains('TestCategory');
        //Disconnecting to check on a user account
        cy.contains('Se déconnecter').click();

        //Connecting as a user
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("mpsqr@mail.fr");
        cy.get('.input[type="password"]').type("bourbe");
        cy.contains('Se connecter').click();
        
        //Checking the user sees the added category
        cy.contains('TestCategory');
        //Disconnecting to later delete it on a user account
        cy.contains('Se déconnecter').click();

        //Connecting as administrator
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("lilianb@mail.fr");
        cy.get('.input[type="password"]').type("fromage");
        cy.contains('Se connecter').click();

        //Delete the Category added
        //Not Working
        cy.get('.deviceCategory__header').eq(3).trigger('mouseover').click(50,80);

    })
    */

    //Not Working 
    //Can't select date correctly by clicking with cypress
    /*
    it("Making an order with valid dates reservation should work", function(){
        cy.visit('localhost:8080');
        cy.get('.input[type="email"]').type("lilianb@mail.fr");
        cy.get('.input[type="password"]').type("fromage");
        cy.contains('Se connecter').click();

        //First device should be added to the cart now;
        cy.contains('Ajouter au panier').click();

        //Order button should be available now
        cy.get('.button[value="Commander"]').eq(0).click();

        //Setting days of booking
        cy.get('.modal[id=command]').get('.input[data-v-6dfcfbe0=""][data-v-10e12d6c=""][id="datepicker0"][placeholder="date de réservation"]').type("17 février 2021 - 18 février 2021");
    })*/
})