module.exports = function(app,puzzle) {
    'use strict';

  /* GET users listing. */
  app.get('/api/gameStats', function(req, res) {
    var stats = puzzle.getStats();
    console.log(stats);
    res.send([puzzle.getStats()]);
  });
};


