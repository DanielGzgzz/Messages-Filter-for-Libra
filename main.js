{//Start of block of all code

 class filter {
	/*
	The filter class , Contains:
	        constructor , Is using :
									- npm install nude 
									- npm install sentiment
									
						has fields :
						    
							containers of modules 
						has methods:
						    callback handling to use the modules
							- analyze() function, description on analyze down.
	
	*/
	constructor(){
		this.text_analyzer= null;
        this.attachment_analyzer= null;
        this.sentiment_analyzer= null;
        this.initialized= false;
	}
  
   initialize(){
 
	    this.attachment_analyzer=require('nude');
	    this.Sentiment=require('sentiment');
	    this.sentiment_analyzer= new this.Sentiment();
	    this.initialized=true;
		this.output="";
	
	  }catch (error){
	  console.log("[-] initializing failed "+error);
	  }

//Functon to contain and handle the sentiment callback
 process_sentiment(textt, callback)
{
	
  var res=  this.sentiment_analyzer.analyze(textt);// This actually works 'synchronously' like.

	callback(["Sentiment:[ score , words]",[res.score,res.words]]);
}

//Function to handle callback of image processing
 process_image(fpath, callback)
{
    this.attachment_analyzer.scan(fpath, function(res) 
    {
        callback(res)
    },function(err){console.log("Error occured")});
}	

   //The Filtering function , gets [Text , Attached file full path , if no attached file it should be null]
   // Specified methods and fields: 
   //                      - textt : String, must be null if there no text. Look Demo.
   //                      - pathh : String,  full path to the file , must simulate a file [for now] or use hard drive memory file
   //                      - do_after_with_array : Function, The function that recieves the array of special format to do the filtering
   //                      - do_with_failure : Function, Specify what to do on failure
 
 analyze(textt,pathh,do_after_with_array,do_with_failure){	
	try {
 

	   

		
		    let arr = new Array();
			
			arr.push("Analysis");
			
			

		if (pathh != null){
		this.process_image(pathh,(res)=>{
				arr.push(["Contains nude content: ", res]); //The Array push method is synchronous. [A]
				
				if (textt != ""){
						this.process_sentiment(textt,(res)=>{
							
							arr.push(res); //The Array push method is synchronous. [A]
							do_after_with_array(arr);
				});}else{
					do_after_with_array(arr);
				}
				
		});}
		else if (textt!=""){
			this.process_sentiment(textt,(res)=>{
							
							arr.push(res); //The Array push method is synchronous. [A]
							do_after_with_array(arr);
						
					});
		}
		} catch (e) {do_with_failure(e);}

  }
  
   } // End of class 'filter'



function do_after_with_array(arr){
	
	console.log(arr);
	
}
function do_with_failure(arr){
	
	console.log(arr);
	
}
 function main(){
	
	path1='C:\---\\---\Desktop\\Node Js Task\\nudes.jpg';
	text1="Testing this pure piece of garbage "
	filter_obj=new filter();
	
	filter_obj.initialize();
	
	
	
	
	console.log("Demo \n\n\n");
	
	filter_obj.analyze(text1,path1,do_after_with_array,do_with_failure);
	
	filter_obj.analyze(text1,null,do_after_with_array,do_with_failure);
	
	filter_obj.analyze("",path1,do_after_with_array,do_with_failure);
	
	filter_obj.analyze("",null,do_after_with_array,do_with_failure);
	//clean
}

main()


}