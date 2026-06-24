import { UmbControllerBase as i } from "@umbraco-cms/backoffice/class-api";
const t = {
  id: "5d8d6480-40a0-4e1f-8125-e23af6f6b4f1",
  name: "Bundled pizza image",
  description: "tests/images/test-pizza.jpg",
  icon: "icon-picture"
};
class r extends i {
  constructor(e) {
    super(e);
  }
  async getEntities() {
    return [t];
  }
  async getEntity(e) {
    return e === t.id ? t : void 0;
  }
}
export {
  r as PizzaTestTargetRepository,
  r as api
};
//# sourceMappingURL=pizza-test-target.repository-VKxrW87u.js.map
