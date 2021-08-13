
define(["require","jquery", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider","models/services.model",
          "ojs/ojtable", "ojs/ojknockout","ojs/ojbutton", "ojs/ojdialog","ojs/ojmessages","ojs/ojinputtext","JETUtils"],
  function(require,$, exports, ko, ojbootstrap_1, ArrayDataProvider,ServicesModel) {
    function ServicesViewModel() {
      var self = this;
      this.serviceArray=ko.observableArray([]);
      this.messagesDataprovider = ko.observableArray([]);
      self.serviceName = ko.observable();
      self.serviceDescription = ko.observable();
    
      this.dataprovider = new ArrayDataProvider(this.serviceArray, {
          keyAttributes: "service_name",
          implicitSort: [{ attribute: "service_name", direction: "ascending" }],
      });
      
      self.refreshAllData = ()=>{
        ServicesModel.getServicesList((success,data)=>{
          if(success)
          {
            console.log("All Services : " + data);
            this.serviceArray(data);
            this.serviceArray.valueHasMutated();
          }
        });
    
      }// end refreshAllData

      self.refreshAllData();

      this.save= (event)=> {
        document.getElementById("modalDialog1").close();
        ServicesModel.addService(self.serviceName(),self.serviceDescription(),(success,response)=>{
          // alert(success,response);
          // console.log(response);
          if(success){
            self.messagesDataprovider.push({
              severity: "confirmation",
              summary: "New Services",
              detail: "New Services Added Successfuly",
              //autoTimeout: 2000,
              autoTimeout: UTIL.message_timeout
    
            });
          }//else alert(success);
          self.refreshAllData();
        })
        
      }
      this.cancel=(event)=> {
        document.getElementById("modalDialog1").close();
      }
      
      this.open=(event)=> {
          document.getElementById("modalDialog1").open();
      }
      
    }
      return ServicesViewModel;
  }
);
