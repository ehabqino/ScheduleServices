define([
  "models/users.model",
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
  "ojs/ojcheckboxset",
], function (
  UsersModel,
  require,
  exports,
  ko,
  ojbootstrap_1,
  PagingDataProviderView,
  ArrayDataProvider
) {
  function UsersViewModel() {
    var self = this;
    self.usersArray = ko.observableArray([]);
    self.pagingDataProvider = new PagingDataProviderView(
      new ArrayDataProvider(self.usersArray, { idAttribute: "user_name" })
    );

    self.userName = ko.observable();
    self.userPassword = ko.observable();
    self.userDisplayName = ko.observable();
    self.userType = ko.observable("USER");
    self.userActive = ko.observable();
    //==========================================================
    self.refreshAllData = () => {
      UsersModel.getUsersList((sucess, data) => {
        if (sucess) {
          self.usersArray(data);
          self.usersArray.valueHasMutated();
          //console.log(self.usersArray());
        }
      });
    }; //end refreshAllData
    //==========================================================
    self.refreshAllData();

    //==========================================================

    self.save = (event) => {};
    //====================================================================================
    self.cancel = (event) => {
      document.getElementById("modalDialog1").close();
    }; //end cancel
    //====================================================================================
    self.open = (event) => {
      self.userName("");
      self.userPassword("");
      self.userDisplayName("");
      self.userType("USER");
      self.userActive("");
      document.getElementById("modalDialog1").open();
    }; //end open
    //====================================================================================

    //##########################################################
  } //end UsersViewModel

  return UsersViewModel;
});
