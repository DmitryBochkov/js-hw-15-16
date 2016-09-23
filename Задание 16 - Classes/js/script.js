'use strict';

//HUMAN class
function Human(settings) {
  this.name = settings.name;
  this.age = settings.age;
  this.gender = settings.gender;
  this.height = settings.height;
  this.weight = settings.weight;
}
Human.prototype.sayHello = function() {
  var text = 'Hi, my name is ' + this.name + '!\n' +
  'I am ' + this.age + ', and I am ' + this.gender + ', thank God!\n' +
  'My height is ' + this.height + ' cm, and my weight is ' + this.weight +' kg.'
  return text;
}

//WORKER Class
function Worker(settings) {
  Human.apply(this, arguments);
  this.job = settings.job;
  this.wages = settings.wages;
}
Worker.prototype = Object.create(Human.prototype);
Worker.prototype.constructor = Human;

// A native Worker method 'work' uses native properties 'job' and 'wages'
// and calls an inherited Human method 'sayHello' with inherited properties 'name, age, gender, height and weight'.
Worker.prototype.work = function () {
  console.log(this.sayHello());
  var text = 'I work as a ' + this.job + ' and earn ' + this.wages + '.';
  return text;
}

// workers
var man = {
  name: 'Denis',
  age: 30,
  gender: 'male',
  height: 178,
  weight: 70,
  job: 'driver',
  wages: '5000 USD per month',
};
var woman = {
  name: 'Ann',
  age: 25,
  gender: 'female',
  height: 168,
  weight: 58,
  job: 'teacher',
  wages: '4000 USD per month',
};
var workerJohn = new Worker(man);
var workerAnn = new Worker(woman);

console.log(workerJohn.work());
console.log('');
console.log(workerAnn.work());

// STUDENT Class
function Student(settings) {
  Human.apply(this, arguments);
  this.university = settings.university;
  this.scholarship = settings.scholarship;
  this.tvSeries = settings.tvSeries;
}
Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Human;

// A native Sudent method 'study' uses native properties 'university' and 'scholarship'
// and inherited Human properties 'name' and 'age'.
Student.prototype.study = function () {
  var text = 'Hi, my name is ' + this.name + '! ' +
  'I am ' + this.age + ' years old.\n' +
  'I am a student of ' + this.university +
  ', my scholarship is ' + this.scholarship + '.';
  return text;
}

// A native Sudent method 'watchTV' uses a native property 'tvSeries'.
Student.prototype.watchTV = function () {
  var text = 'My favourite TV series is ' + this.tvSeries + '.';
  return text;
}

//students
var boy = {
  name: 'Mike',
  age: 19,
  gender: 'male',
  height: 170,
  weight: 70,
  university: 'Harvard',
  scholarship: '700 USD per month',
  tvSeries: 'Homicide'
};
var girl = {
  name: 'Kate',
  age: 18,
  gender: 'female',
  height: 171,
  weight: 50,
  university: 'Sorbonne',
  scholarship: '800 EUR per month',
  tvSeries: 'The Big Bang Theory'
};

var studentMike = new Student(boy);
var studentKate = new Student(girl);

console.log('');
console.log(studentMike.study() + '\n' + studentMike.watchTV());
console.log('');
console.log(studentKate.study() + '\n' + studentKate.watchTV());
