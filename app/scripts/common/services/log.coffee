angular.module("services.log", []).factory "log", ["$rootScope", ($rootScope) ->
  logger = log4javascript.getLogger("my_logger")
  $rootScope.logger = logger
  consoleAppender = new log4javascript.BrowserConsoleAppender()
  logger.addAppender consoleAppender
  return logger
]