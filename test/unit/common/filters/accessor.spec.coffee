describe 'Unit: Testing filters.accessor', ->
  $scope = $filter = 0
  beforeEach(module('filters.accessor'))
  beforeEach(inject ($injector) ->
    $scope = $injector.get('$rootScope')
    $filter = $injector.get('$filter')

  )
  #
  # getById
  #
  describe 'getById', ->
    data = [
      {"id":"1", "val":"a"},
      {"id":"2", "val":"b"}
    ]

    it 'should filter a single item out based on id = \'2\'', ->
      item = $filter("getById")(data, "2")
      expect(item.val == "b").toBe(true)


    it 'should not break with undefined id', ->
      item = $filter("getById")(data)
      expect(item == null).toBe(true)
