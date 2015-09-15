'use strict';

//module.exports = function (puzzle) {

//var puzzle = (function(win, $) {


  var puzzle = {};

  var solution = "";
  var currentAnswer = "";

  var count = 1;

  var _random = function (n) {
    return Math.floor(Math.random() * n);
  };

  var _pickWord = function () {
    var index = _random(words.length);
    var currentWord = words[index];

    return currentWord;
  };

  var _initCurrent = function () {
    var solutionLength = solution.length,
        str = "";

    for (var i = 0; i < solutionLength; i++) {
      if (solution.charAt(i) >= "A" && solution.charAt(i) <= "Z") {
        str += "_";
      } else {
        str += solution.charAt(i);
      }
    }

    return str;
  };

  puzzle.removeCurrentWord = function() {
    for (var i = 0; i < words.length; i++) {
      if (solution === words[i]) {
        words.splice(i, 1);
      }
    }
  };

  puzzle.inSolution = function (ltr) {
    if (solution.indexOf(ltr) > -1) {
      return true;
    }
    else {
      return false;
    }
  };

  puzzle.setCurrent = function (ltr) {
    var solutionLength = solution.length;
    var isCharNotInWord = true;
    for (var i = 0; i < solutionLength; i++) {
      if (ltr === solution.charAt(i)) {
        currentAnswer = currentAnswer.substring(0,i) + ltr + currentAnswer.substring(i + 1);
        isCharNotInWord = false;
      }
    }
    if (isCharNotInWord == true) {
        count = count + 1;
    }
  };

  puzzle.isLost = function(){
    return count >= 10;
  }

  puzzle.getAttempts = function(){
    return count;
  }

  puzzle.newPuzzle = function () {
    solution = _pickWord();
    currentAnswer = _initCurrent();
  };

  puzzle.isWon = function () {
    return solution === currentAnswer;
  };

  puzzle.getSolution = function () {
    return solution;
  };

  puzzle.getCurrent = function () {
    return currentAnswer;
  };

  puzzle.getRemainingWords = function () {
    return words.length;
  };




  var words = [
    "a chain is only as strong as its weakest link",
    "a change is as good as a rest",
    "a drop in the bucket",
    "a finger in many pies",
    "a friend in need is a friend indeed",
    "a good head on his shoulders",
    "a good man is hard to find",
    "a head for heights",
    "a healthy mind in a healthy body",
    "a heart of gold",
    "a horse a horse my kingdom for a horse",
    "a house divided against itself cannot stand",
    "a kick in the teeth",
    "a leopard cannot change its spots",
    "a little knowledge is a dangerous thing",
    "a little bit of what you fancy does you good",
    "a penny saved is a penny earned",
    "a person is known by the company he keeps",
    "a picture paints a thousand words",
    "a place for everything and everything in its place",
    "a problem shared is a problem halved",
    "a rose by any other name would smell as sweet",
    "a stitch in time saves nine",
    "a thing of beauty is a joy forever",
    "a watched pot never boils",
    "absence makes the heart grow fonder",
    "actions speak louder than words",
    "all work and no play makes Jack a dull boy",
    "all is well that ends well",
    "an apple a day keeps the doctor away",
    "an army marches on its stomach",
    "an Englishman is home is his castle",
    "april is the cruellest month",
    "as dead as a dodo",
    "as plain as the nose on your face",
    "as pleased as punch",
    "ask no questions and hear no lies",
    "attack is the best form of defence",
    "banging your head against a brick wall",
    "barking dogs seldom bite",
    "beauty is in the eye of the beholder",
    "beauty is only skin deep",
    "beggars cannot be choosers",
    "behind every great man there is a great woman",
    "better late than never",
    "better safe than sorry",
    "better the devil you know than the devil you do not",
    "better to have loved and lost than never to have loved at all",
    "beware the ides of march",
    "birds of a feather flock together",
    "bite the hand that feeds you",
    "blessed are the peacemakers",
    "blood is thicker than water",
    "born with a silver spoon in his mouth",
    "bury your head in the sand",
    "by the skin of your teeth",
    "by the sweat of his brow",
    "can not make head nor tail of it",
    "cannot see beyond the end of your nose",
    "caught with your hand in the till",
    "charity begins at home",
    "cleanliness is next to godliness",
    "countenance more in sorrow than in anger",
    "cross my palm with silver",
    "cut off your nose to spite your face",
    "cut your coat to suit your cloth",
    "discretion is the better part of valour",
    "do as you would be done by",
    "do not bite the hand that feeds you",
    "do not count your chickens before they are hatched",
    "do not look a gift horse in the mouth",
    "do not put all your eggs in one basket",
    "doubt is the beginning not the end of wisdom",
    "easy come easy go",
    "eat drink and be merry",
    "enough is as good as a feast",
    "every cloud has a silver lining",
    "every dog has his day",
    "everybody wants to go to heaven but nobody wants to die",
    "fail to plan then plan to fail",
    "faint heart never won fair lady",
    "faith will move mountains",
    "familiarity breeds contempt",
    "fifteen men on a dead mans chest",
    "finders keepers losers weepers",
    "fish and guests smell after three days",
    "fools rush in where angels fear to tread",
    "for everything there is a season",
    "forewarned is forearmed",
    "fortune favours the brave",
    "get off on the right foot",
    "get out of the wrong side of the bed",
    "get the bit between your teeth",
    "god helps those who help themselves",
    "good fences make good neighbours",
    "good things come to those who wait",
    "great minds think alike",
    "handsome is as handsome does",
    "hard work never did anyone any harm",
    "he wears his heart on his sleeve",
    "he who can does he who cannot teaches",
    "he who laughs last laughs longest",
    "he who lives by the sword shall die by the sword",
    "he who pays the piper calls the tune",
    "hell has no fury like a woman scorned",
    "hoist by your own petard",
    "holding your cards close to your chest",
    "home is where the heart is",
    "if a job is worth doing it is worth doing well",
    "if at first you do not succeed try try and try again",
    "if music be the food of love play on",
    "if wishes were horses beggars would ride",
    "if you cannot beat them join them",
    "if you cannot stand the heat get out of the kitchen",
    "imitation is the sincerest form of flattery",
    "in the kingdom of the blind the oneeyed man is king",
    "it is better to give than to receive",
    "it is better to light a candle than curse the darkness",
    "it is better to travel hopefully than to arrive",
    "jokers laugh today for you will not laugh tomorrow",
    "keep your ear to the ground",
    "keep your eye on the ball",
    "keep your finger on the pulse",
    "keep your head above water",
    "keep your nose to the grindstone",
    "keep your shoulder to the wheel",
    "laugh and the world laughs with you weep and you weep alone",
    "laughter is the best medicine",
    "let bygones be bygones",
    "let not the sun go down on your wrath",
    "let sleeping dogs lie",
    "let the punishment fit the crime",
    "life begins at forty",
    "life is what you make it",
    "lightening never strikes twice in the same place",
    "live for today for tomorrow never comes",
    "love is blind",
    "love of money is the root of all evil",
    "love thy neighbour as thyself",
    "make love not war",
    "man does not live by bread alone",
    "many are called but few are chosen",
    "marry in haste repent at leisure",
    "mighty oaks from little acorns grow",
    "misery loves company",
    "money does not grow on trees",
    "money makes the world go round",
    "more haste less speed",
    "more honoured in the breach than in the observance",
    "more power to your elbow",
    "more than meets the eye",
    "nail your colours to the mast",
    "nature abhors a vacuum",
    "necessity is the mother of invention",
    "never judge a book by its cover",
    "never put off until tomorrow what you can do today",
    "no man is an island",
    "no rest for the wicked",
    "nothing is certain but death and taxes",
    "old soldiers never die they just fade away",
    "once more unto the breach dear friends once more",
    "one foot in the grave",
    "one good turn deserves another",
    "only fools and horses work",
    "opportunity only knocks once",
    "out of sight out of mind",
    "out of the mouths of babes and sucklings",
    "people who live in glass houses should not throw stones",
    "physician heal thyself",
    "possession is nine tenths of the law",
    "power corrupts absolute power corrupts absolutely",
    "practise makes perfect",
    "pride comes before a fall",
    "procrastination is the thief of time",
    "put your best foot forward",
    "put your head on the block",
    "put your money where your mouth is",
    "quick quick quick today makes slow slow slow tomorrow",
    "red sky at night shepherds delight",
    "red sky in the morning shepherds warning",
    "religion is the opium of the people",
    "revenge is a dish best served cold",
    "rome was not built in a day",
    "set your heart on something",
    "shaken not stirred",
    "shoot yourself in the foot",
    "shuffle off this mortal coil",
    "sick to the stomach",
    "smiling from ear to ear",
    "smiling like a cheshire cat",
    "smooth runs the water where the brook is deep",
    "spare the rod and spoil the child",
    "speak softly and carry a big stick",
    "stick your neck out",
    "still waters run deep",
    "stupid is as stupid does",
    "take the bit between your teeth",
    "talk is cheap",
    "tear your hair out",
    "that which does not kill us makes us stronger",
    "the black sheep of the family",
    "the blind leading the blind",
    "the boot is on the other foot",
    "the boy is father to the man",
    "the course of true love never did run smooth",
    "the darkest hour is just before the dawn",
    "the devil finds work for idle hands to do",
    "the die has been cast",
    "the early bird catches the worm",
    "the hand is quicker than the eye",
    "the hand that rocks the cradle rules the world",
    "the longest journey starts with a single step",
    "the more things change the more they stay the same",
    "the pen is mightier than sword",
    "the proof of the pudding is in the eating",
    "the salt of the earth",
    "the writing is on the wall",
    "there are none so blind as those that will not see",
    "there is always more fish in the sea",
    "there is method in my madness",
    "there is more than one way to skin a cat",
    "there is no fool like an old fool",
    "there is no smoke without fire",
    "there is no such thing as a free lunch",
    "those who do not learn from history are doomed to repeat it",
    "time and tide wait for no man",
    "to err is human to forgive divine",
    "too many cooks spoil the broth",
    "two heads are better then one",
    "uneasy lies the head that wears a crown",
    "very little is achieved by he who risks nothing",
    "wash your mouth out with soap and water",
    "waste not want not",
    "wear your heart on your sleeve",
    "when the cat is away the mice will play",
    "where there is a will there is a way",
    "you can it make an omelette without breaking eggs",
    "you can it teach an old dog new tricks",
    "you can it judge a book by its cover",
    "youth is wasted on the young",
    "transmission control protocol",
    "file transfer protocol",
    "hypertext markup language",
    "extensible markup language",
    "cascading style sheets",
    "hypertext transfer protocol",
    "document object model",
    "javascript object notation",
    "scalable vector graphics",
    "uniform resource locator",
    "secure sockets layer",
    "domain name system",
    "representational state transfer",
    "simple object access protocol",
    "simple mail transfer protocol",
    "structured query language",
    "world wide web",
    "secure shell"
  ]


  //return puzzle;
//}

exports.puzzle = puzzle