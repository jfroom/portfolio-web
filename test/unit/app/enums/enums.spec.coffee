describe 'Unit: Testing app.enums', ->

  describe 'validate enums', ->
    enums = 1
    beforeEach(module('app.enums'))
    beforeEach(inject ($injector) ->
      enums = $injector.get("enums")
    )
    it 'should be exist', ->
      expect(enums).toBeDefined()
