import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";

type PizzaTestTarget = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const pizzaTarget: PizzaTestTarget = {
  id: "5d8d6480-40a0-4e1f-8125-e23af6f6b4f1",
  name: "Bundled pizza image",
  description: "tests/images/test-pizza.jpg",
  icon: "icon-picture",
};

export class PizzaTestTargetRepository extends UmbControllerBase {
  constructor(host: UmbControllerHost) {
    super(host);
  }

  async getEntities(): Promise<PizzaTestTarget[]> {
    return [pizzaTarget];
  }

  async getEntity(id: string): Promise<PizzaTestTarget | undefined> {
    return id === pizzaTarget.id ? pizzaTarget : undefined;
  }
}

export { PizzaTestTargetRepository as api };
