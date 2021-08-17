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

    self.messagesDataprovider = ko.observableArray([]);

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
    //==================================================================================
    self.refreshAllData();

    //===================================================================================
    self.cancel = (event) => {
      document.getElementById("modalDialog1").close();
    }; //end cancel
    //====================================================================================
    self.open = (event) => {
      self.userName("");
      self.userPassword("");
      self.userDisplayName("");
      self.userType("USER");
      //self.userActive("");
      document.getElementById("modalDialog1").open();
    }; //end open
    //====================================================================================

    self.save = (event) => {
      document.getElementById("modalDialog1").close();
      if (
        self.userName() == "" ||
        self.userPassword() == "" ||
        this.userDisplayName() == ""
      ) {
        self.messagesDataprovider.push({
          severity: "error",
          summary: "Error",
          detail: "Error Add New User",
          //autoTimeout: 2000,
          autoTimeout: UTIL.message_timeout,
        });
      } //end if
      else {
        UsersModel.addUser(
          self.userName(),
          self.userPassword(),
          self.userDisplayName(),
          self.userType(),
          self.userActive(),
          (success, response) => {
            // alert(success,response);
            // console.log(response);

            if (success) {
              self.messagesDataprovider.push({
                severity: "confirmation",
                summary: "New User",
                detail: "New User Added Successfuly",
                //autoTimeout: 2000,
                autoTimeout: UTIL.message_timeout

              });
              self.refreshAllData();
            } //end if
            //self.refreshAllData();
          }
        );
      } //end else
    }; //end save;
    //====================================================================================

    self.openUpdate = (event) => {
      document.getElementById("updateUserDialogId").open();
    }
    //====================================================================================
    self.delete_User = (event) => {

      document.getElementById("deleteUserDialogId").open();

    }
    //===================================================================================

    self.cancelDelete = (event) => {
      document.getElementById("deleteUserDialogId").close();
    }//end cancelDelete
    //====================================================================================

    self.okDelete = (event) => {
      //console.log(self.serviceid());
      document.getElementById("deleteUserDialogId").close();
    }//end okDelete
    //=====================================================================================
    self.saveUpdate = (event) => {
      //console.log(self.serviceid());
      document.getElementById("updateUserDialogId").close();
    }//end saveUpdate
    //====================================================================================
    self.cancelUpdate = (event) => {
      document.getElementById("updateUserDialogId").close();
    }//end cancelUpdate
    //====================================================================================

    //###################################################################################
  } //end UsersViewModel

  return UsersViewModel;
});
