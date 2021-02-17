it ('Should check 5+2 equals 7', ()=>{
  cy.visit('http://127.0.0.1:5500/')

  cy.get('.btn').eq(9).click();
  cy.get('.btn').eq(15).click();
  cy.get('.btn').eq(13).click();
  cy.get('.btn').eq(19).click();

  cy.get('#result').should('contain','7');
  cy.get('#operation').should('contain','5 + 2 =');
  
});

it ('Should check 5+= equals 10', ()=>{
  cy.visit('http://127.0.0.1:5500/')

  cy.get('.btn').eq(9).click();
  cy.get('.btn').eq(15).click();
  cy.get('.btn').eq(19).click();

  cy.get('#result').should('contain','10');
  cy.get('#operation').should('contain','5 + 5 =');
  
})

it ('Should check 5..44= equals 5.44', ()=>{
  cy.visit('http://127.0.0.1:5500/')

  cy.get('.btn').eq(9).click();
  cy.get('.btn').eq(16).click();
  cy.get('.btn').eq(16).click();
  cy.get('.btn').eq(8).click();
  cy.get('.btn').eq(8).click();
  cy.get('.btn').eq(19).click();

  cy.get('#result').should('contain','5.44');
  cy.get('#operation').should('contain','5.44 =');
  
})

it ('Should check 5.44deldel= equals 5.', ()=>{
  cy.visit('http://127.0.0.1:5500/')

  cy.get('.btn').eq(9).click();
  cy.get('.btn').eq(16).click();
  cy.get('.btn').eq(8).click();
  cy.get('.btn').eq(8).click();
  cy.get('.btn').eq(18).click();
  cy.get('.btn').eq(18).click();

  cy.get('#result').should('contain','5.');
  
})

