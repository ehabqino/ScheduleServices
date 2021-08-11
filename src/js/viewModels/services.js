
define(["require","jquery", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider","models/services.model",
          "ojs/ojtable", "ojs/ojknockout","ojs/ojbutton", "ojs/ojdialog","ojs/ojmessages"],
  function(require,$, exports, ko, ojbootstrap_1, ArrayDataProvider,ServicesModel) {
    function ServicesViewModel() {
      this.serviceArray=ko.observableArray([]);
      this.messagesDataprovider = ko.observableArray([]);
    
      this.dataprovider = new ArrayDataProvider(this.serviceArray, {
          keyAttributes: "service_name",
          implicitSort: [{ attribute: "service_name", direction: "ascending" }],
      });

      ServicesModel.getServicesList((success,data)=>{
        if(success)
        {
          console.log("All Services : " + data);
          this.serviceArray(data);
          this.serviceArray.valueHasMutated();
        }
      });

      this.save= ()=> {
        document.getElementById("modalDialog1").close();
        this.messagesDataprovider.push({
          severity: "confirmation",
          summary: "New Services",
          detail: "New Services Added Successfuly",
          autoTimeout: 4000,
        });
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
