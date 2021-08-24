
define(["models/customers.model",
  "models/services.model",
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojpagingdataproviderview",
  "ojs/ojarraydataprovider",
  "ojs/ojknockout",
  "ojs/ojtable",
  "ojs/ojpagingcontrol",
  "ojs/ojbutton",
  "ojs/ojdialog",
  "ojs/ojmessages",
  "ojs/ojavatar",
  "JETUtils",
  "ojs/ojselectcombobox",
  "ojs/ojcheckboxset",],
  function (
    CustomersModel,
    ServicesModel,
    require,
    exports,
    ko,
    ojbootstrap_1,
    PagingDataProviderView,
    ArrayDataProvider) {
    function SchedulerViewModel() {
      var self = this;
      //Status
      self.statusValue = ko.observable("ACTIVE");

      //Customers
      self.selectedCustomer = ko.observable("ALL");
      self.customers = ko.observableArray([]);
      self.customerDataProvider = new ArrayDataProvider(self.customers, { keyAttributes: "customer_id", });

      //Services
      self.selectedService = ko.observable("ALL");
      self.services = ko.observableArray([]);
      self.serviceDataProvider = new ArrayDataProvider(self.services, { keyAttributes: "value" });

      //Fill Combobox with Customers
      CustomersModel.getCustomersList((sucess, data) => {
        if (sucess) {
          //console.log(data);
          self.customers.push(ValueandLabel("All", "ALL"));
          data.forEach(element => {
            // console.log("Element : ", element.customer_id);
            // console.log("Element Name : ", element.customer_name);
            self.customers.push(ValueandLabel(element.customer_id, element.customer_name));
            console.log(self.customers());

          });
          self.customers.valueHasMutated();
        }
      });

      //Fill combobox with Services
      ServicesModel.getServicesList((success, data) => {
        if (success) {
          //console.log("All Services Scheduler: ", data);

          // this.serviceArray(data);
          // this.serviceArray.valueHasMutated();
          data.forEach(element => {

          });
        }
      });

      function ValueandLabel(value, label) {
        return {
          value: value,
          label: label

        }
      }


    }// end SchedulerViewModel
    return SchedulerViewModel;
  }
);
