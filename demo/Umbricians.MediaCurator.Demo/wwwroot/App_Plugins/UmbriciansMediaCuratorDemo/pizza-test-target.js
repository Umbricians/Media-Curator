import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";

// Lets Umbraco.AI's test runner offer the repository's pizza image as the target of the demo's recognition tests.
const pizzaTarget = {
  id: "5d8d6480-40a0-4e1f-8125-e23af6f6b4f1",
  name: "Bundled pizza image",
  description: "tests/images/test-pizza.jpg",
  icon: "icon-picture",
};

export class PizzaTestTargetRepository extends UmbControllerBase {
  async getEntities() {
    return [pizzaTarget];
  }

  async getEntity(id) {
    return id === pizzaTarget.id ? pizzaTarget : undefined;
  }
}

export { PizzaTestTargetRepository as api };
