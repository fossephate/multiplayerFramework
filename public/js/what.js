var snack = 'Meow Mix';

function getFood(food) {
  if (food) {
    console.log("what");
    var snack = 'Friskies';
    return snack;
  }
  console.log(snack);
  return snack;
}

getFood(false);