# Messages-Filter-for-Libra
9/13/2022
For the mean time it is a demo how to integrate such a feature in such a system. 
Requirements:
To change \ upgrade the following:

1: the filter class its very ambigious, as its the actual analyzer. A more appropriate name would be: PostClassifier 
2: make sure the indentation is correct
3: In the main function it is calling filter.init and then analyze 3 times. This is weird, but also it should be wrapped in a function in the filter class and return a result. 
4: you do not need to give the filter itself a property of the requires. You can just above the class do: var sentiment = require("..")


Theres a few things more you could do to make the code better, but for now, this seems the most important bro
do_after_with_array and the other function is not good either. On errors you need to just handle it in the function and return an object that states the error. 

In regards to the return result, you do not want an array. In JS you can create arbitrary objects, example: 

var friendship = 
{
       from : "Labbi",
       to      : "Daniel", 
       start : new Date(),
       interests : ["cs", "math", "god"]
}
You want to return an object with a status_code that tells if everything went well, and all the other properties. Then i can access it like result.sentiment and result.containsNude
 process_sentiment(textt, callback)
{
    
  var res=  this.sentiment_analyzer.analyze(textt);// This actually works 'synchronously' like.

    callback(["Sentiment:[ score , words]",[res.score,res.words]]);
}


If this works in sync mode, you just return res. No need for a callback
