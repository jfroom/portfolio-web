describe "Midway: Testing Modules", ->
  describe "App Module:", ->
    module = undefined
    beforeEach ->
      module = angular.module("app")

    it "should be registered", ->
      expect(module).toBeDefined()

    describe "Dependencies:", ->
      deps = undefined
      hasModule = (m) ->
        deps.indexOf(m) >= 0

      beforeEach ->
        deps = module.value("app").requires

      it "should have ngSanitize as a dependency", ->
        expect(hasModule("ngSanitize")).toBe true

      it "should have services.utils as a dependency", ->
        expect(hasModule("services.utils")).toBe true

      it "should have services.log as a dependency", ->
        expect(hasModule("services.log")).toBe true

      it "should have directives.utils as a dependency", ->
        expect(hasModule("directives.utils")).toBe true

      it "should have services.navigation as a dependency", ->
        expect(hasModule("services.navigation")).toBe true

      it "should have app.enums as a dependency", ->
        expect(hasModule("app.enums")).toBe true

      it "should have app.work as a dependency", ->
        expect(hasModule("app.work")).toBe true

      it "should have angularMoment as a dependency", ->
        expect(hasModule("angularMoment")).toBe true

