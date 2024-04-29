function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}



console.log("foo1 returns: ", foo1())
console.log("foo2 returns: ", foo2())




// location of curly bracket. in foo2 the object is not being returned as it's on the next line
// foo1 returns:  { bar: 'hello' }
// foo2 returns:  undefined