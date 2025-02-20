/* class Sausage {
  public getNutrition() {
    return 200;
  }

  public getColor() {
    return "Negro";
  }

  public getExpiration() {
    return "Ni idea";
  }
}

class Cat {
  private energy: number;
  constructor() {
    this.energy = 0;
  }

  public eat(sausage: Sausage) {
    this.energy += sausage.getNutrition();
  }
} */

// De esta manera estoy acoplando fuertemente la clase nutricion a la clase gato de tal forma que extender la funcionalidad y agregar otro tipo de alimento voy a tener problemas
// Esto se soluciona con el principio de diseno programar a una inetrfaz y no a una implementacion

/* interface Food {
  getNutrition(): number;
}

class Sausage implements Food {
  public getNutrition(): number {
    return 200;
  }

  public getColor() {
    return "Negro";
  }

  public getExpiration() {
    return "Ni idea";
  }
}

class Cat {
  private energy: number;
  constructor() {
    this.energy = 0;
  }

  public eat(food: Food) {
    this.energy += food.getNutrition();
  }

  public getEnergy() {
    return this.energy;
  }
}

// De esta manera para agregar una nueva comida se crea una clase y se impementa la interfaz

class Tuna implements Food {
  public getNutrition(): number {
    return 100;
  }
}

// Ahora para usarla
const cat = new Cat();
const sausage = new Sausage();

cat.eat(sausage);
console.log(cat.getEnergy());

const tuna = new Tuna();
cat.eat(tuna);
console.log(cat.getEnergy()); */

// Construccion del ejemplo mostrado en el libro relacionado a un simulador de empresa de desarrollo de software

// En un primer diseno podemos tener las siguientes clases

/* class Tester {
  public testSoftware() {
    console.log("Testiang software...");
  }
}

class Programmer {
  public writeCode() {
    console.log("Writting code...");
  }
}

class Designer {
  public designArchitecture() {
    console.log("Designing architecture...");
  }
}

class Company {
  public createSoftware() {
    console.log("Software bluiding...");
  }
} */

// Al hacer la primera refactorizacion y dejar de que la clase empresa depende de las implementaciones concretas de los empleados se crea una interfaz

/* interface Employee {
  doWork(): void;
}

class Tester implements Employee {
  public testSoftware() {
    console.log("Testing software...");
  }

  public doWork() {
    this.testSoftware();
  }
}

class Programmer implements Employee {
  public writeCode() {
    console.log("Writting code...");
  }

  public doWork() {
    this.writeCode();
  }
}

class Designer {
  public designArchitecture() {
    console.log("Designing architecture...");
  }

  public doWork() {
    this.designArchitecture();
  }
}

class Company {
  private employees: Employee[];
  constructor() {
    this.employees = [new Designer(), new Programmer(), new Tester()];
  }
  public createSoftware() {
    console.log("Software bluiding...");
    this.employees.forEach((employee) => {
      employee.doWork();
    });
  }
}

const company = new Company();
company.createSoftware(); */

// Ahora, para terminar de solucionar el problema de acoplamiento que queda se puede declarar el metodo obtener empleado como abstracto y cada empresa concreta implemntaria ese
// metodo para devolver los empleados que necesita

interface Employee {
  doWork(): void;
}

class Tester implements Employee {
  public testSoftware() {
    console.log("Testing software...");
  }

  public doWork() {
    this.testSoftware();
  }
}

class Programmer implements Employee {
  public writeCode() {
    console.log("Writting code...");
  }

  public doWork() {
    this.writeCode();
  }
}

class Designer {
  public designArchitecture() {
    console.log("Designing architecture...");
  }

  public doWork() {
    this.designArchitecture();
  }
}

abstract class Company {
  abstract getEmployees(): Employee[];

  public createSoftware() {
    console.log("Software bluiding...");
    const employees = this.getEmployees();
    employees.forEach((employee) => {
      employee.doWork();
    });
  }
}

class GameDevCompany extends Company {
  getEmployees(): Employee[] {
    return [new Designer(), new Programmer(), new Tester()];
  }
}

class OutsourcingCompany extends Company {
  getEmployees(): Employee[] {
    return [new Tester()];
  }
}

const gameDevCompany = new GameDevCompany();
gameDevCompany.createSoftware();

const outsourcingCompany = new OutsourcingCompany();
outsourcingCompany.createSoftware();
