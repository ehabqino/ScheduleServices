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

        }//end getCategoryList

    }//end class
    return new ServicesModel;
    
    
});