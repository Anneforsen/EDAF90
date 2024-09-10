'use strict';
import { v4 as uuidv4 } from 'uuid';
/**
 * Reflection question 1
 * your answer goes here
 * You do not need to store properties that are false beacuse the false is 
 * treated like undefined which also is falsy value. Therefore the code will
 * be shorter and cleaner
 */

import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);


names.forEach(name => console.log(name));
console.log('\n=== beginning of printout ================================')
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * The two cases will give different outputs when the inventory object has inherited enumerable properties 
 * from its prototype. 
 * 
 * Inherited functions like forEach() are not printed in for...in loops or Object.keys() because they 
 * are non-enumerable by default.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  const names = Object.keys(inv);
  return names
    .filter(name => inventory[name][prop])
    .map(name => `<option value="${name}" key="${name}">${name}, ${inventory[name].price} kr</option>`);
}


console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static instanceCounter = 0;
  
  constructor(salad) {
    this.id = 'salad_' + Salad.instanceCounter++; //id for HTML

    

    if (salad && salad.ingredients) {
      this.ingredients = { ...salad.ingredients };
      this.uuid = uuidv4(); // Copy ingredients from the provided salad
    } else {
      this.ingredients = {};
      this.uuid = uuidv4(); // Initialize as an empty object if no salad is passed
    }
  }
  static parse(json) {
    let parsedData;

    
    if (typeof json === "string") {
      parsedData = JSON.parse(json);
    } else {
      parsedData = json;
    }

    
    if (Array.isArray(parsedData)) {
      return parsedData.map(saladObj => new Salad(saladObj));
    } 
    
    else {
      return new Salad(parsedData);
    }
  }
   
  
  add(name, properties) { 
    this.ingredients[name] = properties;
    return this;
  }
  remove(name) {
    delete this.ingredients[name];
    return this;
   }
}

Salad.prototype.getPrice = function(){
  const initialPrice = 0;
  const sumWithInitial = Object.values(this.ingredients) 
    .reduce((accumulator, currentValue) => accumulator + currentValue.price,
    initialPrice);

  return sumWithInitial;
}

Salad.prototype.count = function(property){
  const prop = Object.values(this.ingredients);
  return prop
    .filter(ingredient => ingredient[property])
    .length;
}
/*
let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');
*/

console.log('\n--- Assignment 3 ---------------------------------------')
/*
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör
*/

/*
console.log('\n--- reflection question 3 ---------------------------------------')
Properties and methods defined in the parent class are available to the child class unless 
they are private. Otherwise, they are inherited and accessible.

console.log('typeof Salad: ' + typeof Salad); = function
console.log('typeof Salad.prototype: ' + typeof Salad.prototype); = object
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype); = undefined
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad); = object
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype); = undefined
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad))); = false 
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad))); = true 
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype))); = true
*/
console.log('\n--- Assignment 4 ---------------------------------------')
/*
const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');
*/
console.log('\n--- Assignment 5 ---------------------------------------')
class GourmetSalad extends Salad {
  constructor(salad){
    super(salad);
  }
  static parse(json) {
    let parsedData;

    
    if (typeof json === "string") {
      parsedData = JSON.parse(json);
    } else {
      parsedData = json;
    }

    
    if (Array.isArray(parsedData)) {
      return parsedData.map(saladObj => new Salad(saladObj));
    } 
    
    else {
      return new Salad(parsedData);
    }
  }

  add(name, properties, size = 1) { 
    if (this.ingredients[name]) {
      
      this.ingredients[name].size += size;
    } else {
      // creating shallow copy with Object.assign
      const ingredientCopy = Object.assign({}, properties);
      ingredientCopy.size = size; 
      this.ingredients[name] = ingredientCopy; 
    }
    return this;
  }
  remove(name) {
    delete this.ingredients[name];
    return this;
   }
  


}
GourmetSalad.prototype.getPrice = function() {
  const initialPrice = 0;
  
  const sumWithInitial = Object.values(this.ingredients)
    .reduce((accumulator, ingredient) => {
      // Use size if present, otherwise default to 1
      const size = ingredient.size || 1;
      return accumulator + (ingredient.price * size);
    }, initialPrice);

  return sumWithInitial;
}

function order(...salads) {
  console.log('Processing order...');
  salads.forEach((salad) => {
    console.log(`Salad ID: ${salad.id}`);
    console.log(`Salad UUID: ${salad.uuid}`);
    console.log('Ingredients:');
    Object.entries(salad.ingredients).forEach(([name, properties]) => {
      console.log(`- ${name}: ${JSON.stringify(properties)}`);
    });
    console.log(`Price: ${salad.getPrice()} kr`);
    console.log('-----------------------');
  });
}
/*
let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
*/
console.log('\n--- Assignment 6 ---------------------------------------')

//console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
//console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

//Case 1
const salad1 = new Salad();
// add ingredients to salad 1
salad1
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Parmesan', inventory['Parmesan'], 2);
const salad2 = new Salad(salad1)
// salad1.uuid !== salad2.uuid, they are different salads
salad2.add('Bacon', inventory['Bacon']);
order(salad1, salad2);

//Case 2
/*
const salad1 = new Salad(); // add ingredients to salad 1
storeInDatabase(salad1);
// app is reloaded, all JavaScript objects are lost
const text = fetchFromDatabase();
const salad2 = Salad.parse(text);
// salad1.uuid === salad2.uuid, they are the same salad
salad2.add('Bacon', inventory['Bacon']);
storeSaladInDatabase(salad2); // update the existing salad
*/


/**
 * Reflection question 4
 * They are store in the constructor and not in the instances of it. 
 */
/**
 * Reflection question 5
 * Yes, by using "Object.defineProperty" and using "writable: false". 
 */
/**
 * Reflection question 6
 * Yes, by using "#" it will be private. 
 */
