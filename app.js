var Fulcrum = require('fulcrum-app');
var csvWriter = require('csv-write-stream')

var writer = csvWriter()
var fs = require('fs');

var uuid,file,extras = {}


var recordsFound = function (error, records) {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  
  //records.records.forEach(function(record) {
  //  console.log('Location is: ', record.latitude, record.longitude);
  //});
  //var out = JSON.stringify(records)
  //fs.writeFile("output.json", out, function(err) {
  //	 if(err) {
  //     	return console.log(err);
  // 	}
  // 	console.log("The JSON file was saved!");
  // }); 

   var writer = csvWriter()
   writer.pipe(fs.createWriteStream(file))
   records.records.forEach(function(record) {
     writer.write(record)
   });
   writer.end()

};


process.argv.forEach(function (val, index, array) {
	if(index == 2){
		uuid = val
		file = uuid+'.csv'		
	} else if(index == 3 && val.replace('=','') == val){
		file = val+'.csv'
	} else if(index != 0 && index != 1){
		extra[index] = val	
	}

});

var key = fs.readFileSync('apikey', 'utf8');

var fulcrum = new Fulcrum({
	api_key : key
});

if(uuid == null){
	console.log('Error: You must have an App UUID')
} else {
	fulcrum.records.search({form_id: uuid}, recordsFound);
}
//fulcrum.forms.find('898f3806-5d2a-4813-80c9-1fe505128a29', formFound);
