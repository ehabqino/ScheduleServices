
define(["models/customers.model",
  "models/services.model",
  "models/scheduler.model",
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojpagingdataproviderview",
  "ojs/ojarraydataprovider",
  "ojs/ojconverterutils-i18n",
  "ojs/ojknockout",
  "ojs/ojtable",
  "ojs/ojpagingcontrol",
  "ojs/ojbutton",
  "ojs/ojdialog",
  "ojs/ojmessages",
  "ojs/ojavatar",
  "JETUtils",
  "ojs/ojselectcombobox",
  "ojs/ojcheckboxset",
  "ojs/ojdatetimepicker",
  "ojs/ojavatar"],
  function (
    CustomersModel,
    ServicesModel,
    SchedulerModel,
    require,
    exports,
    ko,
    ojbootstrap_1,
    PagingDataProviderView,
    ArrayDataProvider,
    ojconverterutils_i18n_1) {
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
      self.serviceDataProvider = new ArrayDataProvider(self.services, { keyAttributes: "service_name" });

      //Date To and For
      self.tovalue = ko.observable(ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date().getTime() + (90 * 24 * 60 * 60 * 1000)));
      self.fromvalue = ko.observable(ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date()));

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
          self.services.push(ValueandLabel("All", "ALL"));
          data.forEach(element => {
            self.services.push(ValueandLabel(element.service_name, element.service_description));

          });
          self.services.valueHasMutated();
        }
      });

      function ValueandLabel(value, label) {
        return {
          value: value,
          label: label

        }
      }

      self.refresh = (event) => {
        console.log("Status : " + self.statusValue() + " - Customer :" + self.selectedCustomer() +
          " - Service : " + self.selectedService() + " - From :" + self.fromvalue().split('T')[0] + " - To :" + self.tovalue().split('T')[0]);
      }//end open
      //====================================================================================    


    }// end SchedulerViewModel
    return SchedulerViewModel;
  }
);
