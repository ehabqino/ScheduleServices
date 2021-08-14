define(['ojs/ojModel'], 
function(oj) {
    class ServicesModel {
        constructor(){
            this.serverUrl = "http://127.0.0.1:2480/";
        }//end of constructor

        initializeModelCollection(endpoint){
            this.servicesModelDef = oj.Model.extend({
                url : endpoint,
                keyAttributes : "@rid" 
            });
            this.servicesCollDef = oj.Model.extend({
                url : endpoint,
                comparator : "@rid" ,
                model : this.servicesModelDef
            });

            this.service = new this.servicesCollDef;

        }//initializeModelCollection

        getServicesList(notify){
            //api url for all service
            let api_url = this.serverUrl + "query/services/sql/SELECT FROM jet_services";
            this.initializeModelCollection(api_url);

            // Make Row definition and connect it with Collection Definition
            this.serviceRow = new this.servicesModelDef({},this.service);

            //Operating on the Database "I use orientDB"
            this.serviceRow.fetch({
                success : (coll,data)=>{
                        console.log("All services",data.result);
                        // var test = Object.entries(data.result).map(val => {
                        //     console.log("After format : " + val[1]);
                        //     //console.log("After format : " + val[1].category_name);
                        //     return val[1] ;
                            
                        // });
                        // console.log(test);
                
                        // notify(true,test);
                        notify(true,data.result);
                },
                error : (model,xhr,options)=>{
                    notify(false,"Error : " + xhr.textStatus);
                },
                headers : {
                    'Authorization' : 'Basic cm9vdDpyb290cHdk',
                    //'Authorization' : 'Basic' + btoa('root:rootpwd'),
                    'Content-Type' : 'application/json'
                }
            });

        }//end getServicesList
        
        addService(name,description,notify){
            
           // Collection = Table(Rows)
           // Model = Row
           // Collection is a group of Rows
            let url_api = this.serverUrl+"document/"+"services/";
            //let url_api = this.serverUrl +"/"+ id + ".json";
            this.initializeModelCollection(url_api);
            let serviceRow = new this.servicesModelDef({
                "@class" : "jet_services",
                "service_name": name,
                "service_description":description
            },this.service);

           //AJAX (Take Time)
            serviceRow.save(null,{
                type: "POST",
                success : function(model,response,options){
                    //notify(response.name);
                    notify(true,response);
                },
                //xhr = xml http request , can be use any name for example x
                error : function(modle,xhr,options){
                    
                    notify(false,`Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                },
                headers : {
                    'Authorization' : 'Basic cm9vdDpyb290cHdk',
                    //'Authorization' : 'Basic' + btoa('root:rootpwd'),
                    'Content-Type' : 'application/json'
                }
            });
        }//end addClass
//==================================================================================================================//
        updateService(id,title,description){

        }//end update Class
//==================================================================================================================//
        deleteService(id,notify){
            //let url_api = this.serverUrl +"/"+ id + ".json";
            let url_api = this.serverUrl+"document/"+"services/"+id
            this.initializeModelCollection(url_api);
            let serviceRow = new this.servicesModelDef({
                "@rid":id,
            },this.service);

           //AJAX (Take Time)
            serviceRow.save(null,{
                type: "DELETE",
                success : function(model,response,options){
                    //notify(response.name);
                    notify(true,"Service with ID :" + id + " is Deleted Sucessfully");
                },
                //xhr = xml http request , can be use any name for example x
                error : function(modle,xhr,options){
                    
                    notify(false,`Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                },
                headers : {
                    'Authorization' : 'Basic ZWhhYnFpbm86cGFzcw==',
                    //'Authorization' : 'Basic' + btoa('root:rootpwd'),
                    'Content-Type' : 'application/json'
                }
            });
        }//end serviceClass
//==================================================================================================================//         

    }//end class
    return new ServicesModel;
    
    
});