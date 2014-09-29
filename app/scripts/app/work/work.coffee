angular
  .module("app.work", ["app", "app.enums", "services.utils", "services.log", "filters.accessor", "filters.sanitize", "directives.youtubeEmbed"])
  .controller 'WorkCtrl', ['$scope', '$http', 'log', '$route', 'enums', 'utils', '$timeout', '$location', '$filter', '$rootScope'
, ($scope, $http, $log, $route, enums, utils, $timeout, $location, $filter, $rootScope) ->

  $log.info 'work controller init.'
  #console.dir appData

  markdownConverter = new Showdown.converter()

  techData = appData.icons.tech
  workData = appData.work.projects
  humansData = appData.humans

  # SCOPE
  angular.extend $scope, {
    STATE_DETAIL: 'detail'
    STATE_IDLE: 'idle'
    state: 'idle'
    workCur: undefined
    curPath: ''
  }

  #==============================================
  # STARTUP
  #==============================================
  startup = ->
    adjustWorkData()
    render()

  #==============================================
  # DATA
  #==============================================
  adjustWorkData = ->
    i = 0
    angular.forEach workData, (value, key) ->
      value["_index"] = i
      i++

      #parse desc
      desc = value["desc"]
      if $.isArray(desc)
        desc = desc.join('\n')
      # markdown desc
      if desc != undefined
        desc = markdownConverter.makeHtml(desc)

      value["desc"] = desc

  #==============================================
  # ROUTES
  #==============================================
  $scope.$on '$routeChangeSuccess', ($currentRoute, $previousRoute) ->

    if $scope.curPath != $location.path()
      #$log.info "$routeChangeSuccess $currentRoute: #{$currentRoute} path:" + $location.path()
      $scope.curPath = $location.path()
      $scope.state = $scope.STATE_IDLE
      $scope.state = $scope.STATE_DETAIL if $route.current?.event == enums.EventType.WorkLoad
      $log.info 'work state:' + $scope.state
      render()


  #==============================================
  # RENDER
  # ==============================================
  render = ->
    $scope.workCur = undefined
    $log.info 'render ' + $route.current?.params?.project
    if $route.current?.params?.project

      $scope.workCur = getProject $route.current.params.project
      $log.info "$scope.projectCur: #{$scope.workCur} #{$route.current.params.project} #{$route.current.params.project}"

      #SCROLL TO TOP of work section
      utils.scrollAnimateTo "#work"


  #==============================================
  # GET PROJECT
  #==============================================
  getProject = (id) ->
    $log.info 'getProject' + id
    work = {}
    work = $filter('getById')(workData, id)
    work.teamProcessedArr = getTeamProcessedArr(work)
    work.techProcessedArr = getTechProcessedArr(work)
    work.descProcessed = getDescProcessed(work)
    return work

  #==============================================
  # TEAM OUTPUT
  #==============================================
  getTeamProcessedArr = (work) ->
    outArr = []

    angular.forEach work.teamArr, (value, key) =>
      rolesArr = value[0]
      humansArr = value[1]

      #swap role keys for role values
      angular.forEach rolesArr, (value, key) =>
        item = $filter("getById")(humansData.roles, value)
        if item
          rolesArr[key] = item.name

      #swap human keys for human values
      angular.forEach humansArr, (value, key) =>

        item = $filter("getById")(humansData.humans, value)
        if item
          if item.url
            humansArr[key] = "<a href='" + item.url + "' target='_blank'>" + item.name + "</a>"
          else
            humansArr[key] = item.name

      outArr.push {role:rolesArr.join(", "), humans: humansArr.join(", ")}
    return outArr

  #==============================================
  # TECH OUTPUT
  #==============================================
  getTechProcessedArr = (work) ->
    outArr = []
    angular.forEach work.techArr, (value, key) =>
      item = $filter("getById")(techData, value)
      if item
        outArr.push item
    return outArr

  #==============================================
  # DESC OUTPUT
  #==============================================
  getDescProcessed = (work) ->
    desc = work.desc
    if $.isArray(desc)
      desc = desc.join('\n')
    # markdown desc
    if desc != undefined
      desc = markdownConverter.makeHtml(desc)


      #force set link targets to be _blank
      $desc = $(desc)

      #collapse shortahnd json to paragraphs
      ###
      desc = $desc.map( () ->
        return $(this)[0].outerHTML
      ).get().join("")
      ###

    return desc

  #==============================================
  # PROJECT INCREMENT
  #==============================================
  $scope.projectIncrement = (delta = 1) ->
    link = ''
    if $scope.workCur == undefined

      link = getProjectLink workData[0].id
    else
      nextIndex = $scope.workCur._index + delta
      if nextIndex >= workData.length
        nextIndex -= workData.length
      else if nextIndex < 0
        nextIndex += workData.length
      link = getProjectLink workData[nextIndex].id
    $location.path link


  $rootScope.$on enums.EventType.VideoStart, (scope, videoData) ->
    $log.info "VideoStart caught" + videoData.id
    vidId = videoData.id
    if videoData.id = $scope.workCur.id
      utils.scrollAnimateTo '#work'
      $rootScope.$broadcast enums.EventType.TrackEvent, 'video', 'start', $scope.workCur.id + " : " + vidId

  $rootScope.$on enums.EventType.VideoEnd, (scope, videoData) ->
    vidId = videoData.id
    $rootScope.$broadcast enums.EventType.TrackEvent, 'video', 'end', $scope.workCur.id + " : " + vidId


  #==============================================
  # GET PROJECT LINK
  #==============================================
  getProjectLink = (id) ->
    return "/work/" + id

  # STARTUP
  startup()

]


###
 transformTeamRoles = (rolesArr) ->
   angualar.forEach rolesArr, (value, key) =>
     outArr.push value.label
   return outArr.join(", ")
 transformTeamHumans = (humansArr) ->
   angualar.forEach humansArr, (value, key) =>
     if value.url
         outArr[key] = "<a href='" + value.url + "' target='_blank'>" + value.label + "</a>"
       else
         outArr[key] = value.label
   return outArr.join(", ")
 ###
