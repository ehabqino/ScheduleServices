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

    self.userid = ko.observable();
    self.userName = ko.observable();
    self.userPassword = ko.observable();
    self.userDisplayName = ko.observable();
    self.userType = ko.observable("USER");
    self.userActive = ko.observable();


    self.deleteUserName = ko.observable();

    self.userNameUpdate = ko.observable();
    self.userPasswordUpdate = ko.observable();
    self.userDisplayUpdate = ko.observable();
    self.userActiveUpdate = ko.observable();
    self.userTypeUpdate = ko.observable();
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

    self.selectedChangedListener = (event) => {
      const row = event.detail.value.row;
      console.log(row);

      if (row.values().size > 0) {
        row.values().forEach((key) => {
          console.log(key);
          var selectedRow = self.usersArray().find(element => element.user_name == key);
          //console.log(selectedRow.user_display_name);
          //console.log(selectedRow["@rid"].slice(1));
          self.userid(selectedRow["@rid"].slice(1));
          //console.log(self.userid());

          self.userNameUpdate(key);
          self.userDisplayUpdate(selectedRow.user_display_name);
          self.userPasswordUpdate(selectedRow.user_password);
          // self.userActiveUpdate(selectedRow.user_active);
          self.userTypeUpdate(selectedRow.user_type);


          self.deleteUserName(key);

        });
      }
    }//end selectedChangedListener
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
      document.getElementById("deleteUserDialogId").close();
      UsersModel.deleteUser(self.userid(), (success, response) => {
        if (success) {
          self.messagesDataprovider.push({
            severity: "confirmation",
            summary: "Delete User",
            detail: "User Deleted Successfuly",
            //autoTimeout: 2000,
            autoTimeout: UTIL.message_timeout

          });
        }
        else {
          self.messagesDataprovider.push({
            severity: "error",
            summary: "Error",
            detail: "Error Delete User",
            //autoTimeout: 2000,
            autoTimeout: UTIL.message_timeout

          });
        }

        self.refreshAllData();

      });
    }//end okDelete
    //=====================================================================================
    self.saveUpdate = (event) => {
      //console.log(self.serviceid());
      document.getElementById("updateUserDialogId").close();
      if (self.userNameUpdate() == "" || self.userPasswordUpdate() == "" || self.userDisplayUpdate() == "") {

        self.messagesDataprovider.push({
          severity: "error",
          summary: "Error",
          detail: "Error Update Information of user",
          //autoTimeout: 2000,
          autoTimeout: UTIL.message_timeout

        });
      }//end if
      else {
        UsersModel.updateUser(self.userid(), self.userNameUpdate(), self.userPasswordUpdate(), self.userDisplayUpdate(),
          self.userTypeUpdate(), self.userActiveUpdate(), (success, response) => {
            // alert(success,response);
            // console.log(response);

            if (success) {
              self.messagesDataprovider.push({
                severity: "confirmation",
                summary: "Update User",
                detail: "User Updated Successfuly",
                //autoTimeout: 2000,
                autoTimeout: UTIL.message_timeout

              });
            }//end if
            self.refreshAllData();

          });

      }//end else
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
