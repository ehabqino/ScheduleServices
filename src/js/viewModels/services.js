
define(["require","jquery", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider","models/services.model",
          "ojs/ojtable", "ojs/ojknockout","ojs/ojbutton", "ojs/ojdialog","ojs/ojmessages","ojs/ojinputtext","JETUtils"],
  function(require,$, exports, ko, ojbootstrap_1, ArrayDataProvider,ServicesModel) {
    function ServicesViewModel() {
      var self = this;
      self.serviceArray=ko.observableArray([]);
      this.messagesDataprovider = ko.observableArray([]);
      self.serviceName = ko.observable();
      self.serviceDescription = ko.observable();
    
      self.dataprovider = new ArrayDataProvider(self.serviceArray, {
          keyAttributes: "service_name",
          implicitSort: [{ attribute: "service_name", direction: "ascending" }],
      });

      self.sucessMsg ={
        severity: "confirmation",
        summary: "New Services",
        detail: "New Services Added Successfuly",
        //autoTimeout: 2000,
        autoTimeout: UTIL.message_timeout

      };
      
      self.refreshAllData = ()=>{
        ServicesModel.getServicesList((success,data)=>{
          if(success)
          {
            //console.log("All Services : " + data);
            this.serviceArray(data);
            this.serviceArray.valueHasMutated();
          }
        });
    
      }// end refreshAllData

      self.refreshAllData();

      self.save= (event)=> {
        document.getElementById("modalDialog1").close();
        ServicesModel.addService(self.serviceName(),self.serviceDescription(),(success,response)=>{
          // alert(success,response);
          // console.log(response);
          if(self.serviceName()==" " || self.serviceDescription()==" "){
            
              self.messagesDataprovider.push({
                severity: "error",
                summary: "error inserr value",
                detail: "Error Add New Service",
                //autoTimeout: 2000,
                autoTimeout: UTIL.message_timeout
      
              });
            
          }//end if
          else {
          if(success){
            self.messagesDataprovider.push(self.sucessMsg);
          }//end if
          self.refreshAllData();
        } //end else
        });
        
      }//end save

      this.cancel=(event)=> {
        document.getElementById("modalDialog1").close();
      }//end cancel
      
      this.open=(event)=> {
        self.serviceName(" ");
        self.serviceDescription(" ");
        document.getElementById("modalDialog1").open();
      }//end open
      

      self.selectedChangedListener = (event)=>{
        const row = event.detail.value.row;
        console.log(row);
        if (row.values().size > 0) {
          row.values().forEach((key)=> {
            console.log(key);
          var selectedRow = self.serviceArray().find(element => element.service_name == key);
          console.log(selectedRow.service_description); 
          });
          
        }

      }//end selectedChangedListener

    }//ServicesViewModel

      return ServicesViewModel;
  });

