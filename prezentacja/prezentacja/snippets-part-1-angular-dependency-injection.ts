//      Bez Dependency Injection
//      W takim przypadku Car samodzielnie tworzy instancję silnika: 


class Engine {
    start() {
      console.log("Engine started");
    }
  }
  
  class Car {
    constructor() {
      this.engine = new Engine(); // Car sam tworzy silnik
    }
  
    start() {
      this.engine.start();
      console.log("Car is running");
    }
  }
  
  const myCar = new Car();
  myCar.start();
  




//       Z Dependency Injection
//      Tutaj przekazujemy Engine do Car z zewnątrz:
  
// class Engine {
//     start() {
//       console.log("Engine started");
//     }
//   }
  
//   class Car {
//     constructor(engine) {
//       this.engine = engine; // Silnik jest wstrzykiwany z zewnątrz
//     }
  
//     start() {
//       this.engine.start();
//       console.log("Car is running");
//     }
//   }
  
//   // Tworzymy instancję Engine i przekazujemy ją do Car
//   const myEngine = new Engine();
//   const myCar = new Car(myEngine);
//   myCar.start();
  