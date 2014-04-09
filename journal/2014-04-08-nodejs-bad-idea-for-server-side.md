node.js and javascript is a bad idea for server side programming

There is no doubt there is something really great about javascript. It is really amazing to see how fast you can write things and make them running using node. And it has a decent speed. I am pretty happy about that, somethings that would cost you months using java could be accomplished using node.js in a week.

Until you have a large code base and decide to do some refactoring.

Say you want to move a component **Shinny** to another server.

Originally, you have code like this.

```javascript
Shinny.prototype.setName = function(name){
    this.name = name;
}

myShinny.setName('i do not know how to naming staff');
myComponent.doSomething();
callbackSomeBody(null);

```

Now because you do not want to block on a remote procedure call (and you actually **cannot** block), so everything goes async style. Like this:

```javascript
Shinny.prototype.setName = function(name, callback){
    this.name = name;
    callback(null);
}

myShinny.setName('i do not know how to naming staff', function(err){
    if(err){
        return callbackSomeBody(err);
    }
    myComponent.doSomething();
    callbackSomeBody(null);
    
});


```

Remember in Java or some other language, you could preserve the most part of the old code. Here you should change the structure of the code. 

And error handling is painful too, now I suppose to add this everytime I refactor some method to asynchronize. 

```javascript
    if(err){
        return callbackSomeBody(err);
    }
```


This is only a very simple example, things can get way messier. Imagine if you need to change mulitple methods' signature from synchronize to async. 

It is just painful.

