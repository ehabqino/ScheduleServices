
define(["require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider","models/services.model","ojs/ojtable", "ojs/ojknockout"],
  function(require, exports, ko, ojbootstrap_1, ArrayDataProvider,ServicesModel) {
    function ServicesViewModel() {
      this.serviceArray=ko.observableArray([]);
    
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

      
    }
      return ServicesViewModel;
  }
);
