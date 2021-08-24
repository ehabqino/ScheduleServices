
define(["models/customers.model", "require", "knockout", "ojs/ojarraydataprovider",
  "ojs/ojlistdataproviderview", "text!../departmentData.json", "ojs/ojdataprovider", "ojs/ojasyncvalidator-regexp", "ojs/ojknockout", "ojs/ojtable", "ojs/ojinputtext", "ojs/ojbutton",
  "ojs/ojdialog",
  "ojs/ojmessages",
  "ojs/ojavatar",
  "JETUtils",],
  function (CustomersModel, require, ko, ArrayDataProvider, ListDataProviderView, deptData, ojdataprovider_1, AsyncRegExpValidator) {
    function CustomerViewModel() {
      var self = this;

      ///=======================================================
      self.filter = ko.observable("");

      self.custArray = ko.observableArray([]);

      self.messagesDataprovider = ko.observableArray([]);

      self.id = ko.observable();
      self.customer_id = ko.observable();
      self.customer_name = ko.observable();
      self.customer_email = ko.observable();
      self.customer_phone = ko.observable();
      self.customer_address = ko.observable();
      self.customer_website = ko.observable();
      self.customer_description = ko.observable();

      self.customer_nameU = ko.observable();
      self.customer_emailU = ko.observable();
      self.customer_phoneU = ko.observable();
      self.customer_addressU = ko.observable();
      self.customer_websiteU = ko.observable();
      self.customer_descriptionU = ko.observable();

      self.deleteCustomerName = ko.observable();

      //======================================================

      self.refreshAllData = () => {
        CustomersModel.getCustomersList((sucess, data) => {
          if (sucess) {
            self.custArray(data);
            self.custArray.valueHasMutated();
            console.log(self.custArray());
            console.log(data);

          }
        });
      }; //end refreshAllData
      //==================================================================================
      self.refreshAllData();

      //===================================================================================

      self.dataprovider = ko.computed(function () {
        let filterCriterion = null;
        if (self.filter() && self.filter() != "") {
          filterCriterion = ojdataprovider_1.FilterFactory.getFilter({
            filterDef: { text: self.filter() },
          });
        }
        const arrayDataProvider = new ArrayDataProvider(self.custArray, { keyAttributes: "customer_name" });
        return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion });
      }, self);
      self.handleValueChanged = () => {
        self.filter(document.getElementById("filter").rawValue);
      };

      self.highlightingCellRenderer = (context) => {
        let field = null;
        if (context.columnIndex === 0) {
          field = "customer_id";
        }
        else if (context.columnIndex === 1) {
          field = "customer_name";
        }
        else if (context.columnIndex === 2) {
          field = "customer_email";
        }
        else if (context.columnIndex === 3) {
          field = "customer_phone";
        }
        else if (context.columnIndex === 4) {
          field = "customer_address";
        }
        else if (context.columnIndex === 5) {
          field = "customer_website";
        }
        else if (context.columnIndex === 6) {
          field = "customer_description";
        }
        let data = context.row[field].toString();
        const filterString = self.filter();
        let textNode;
        let spanNode = document.createElement("span");
        if (filterString && filterString.length > 0) {
          const index = data.toLowerCase().indexOf(filterString.toLowerCase());
          if (index > -1) {
            const highlightedSegment = data.substr(index, filterString.length);
            if (index !== 0) {
              textNode = document.createTextNode(data.substr(0, index));
              spanNode.appendChild(textNode);
            }
            let bold = document.createElement("b");
            textNode = document.createTextNode(highlightedSegment);
            bold.appendChild(textNode);
            spanNode.appendChild(bold);
            if (index + filterString.length !== data.length) {
              textNode = document.createTextNode(data.substr(index + filterString.length, data.length - 1));
              spanNode.appendChild(textNode);
            }
          }
          else {
            textNode = document.createTextNode(data);
            spanNode.appendChild(textNode);
          }
        }
        else {
          textNode = document.createTextNode(data);
          spanNode.appendChild(textNode);
        }
        context.parentElement.appendChild(spanNode);
      };

      /*"@class": "jet_customers",
                   "@rid": id,
                   "customer_id": customer_id,
                   "customer_name": customer_name,
                   "customer_email": customer_email,
                   "customer_phone": customer_phone,
                   "customer_address": customer_address,
                   "customer_website": customer_website,
                   "customer_description": customer_description */
      self.columnArray = [
        { headerText: "ID", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        { headerText: "Name", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        { headerText: "Email", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        { headerText: "Phone", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        { headerText: "Address", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        { headerText: "Website", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        { headerText: "Description", renderer: self.highlightingCellRenderer, headerClassName: "HeaderTable" },
        {
          headerText: "Action", headerClassName: "HeaderTable",
          resizable: "enabled",
          template: "cellTemplate"
        }
      ];

      //===========================================================================
      //
      //===================================================================================
      self.cancel = (event) => {
        document.getElementById("modalDialog1").close();
      }; //end cancel
      //====================================================================================
      self.open = (event) => {
        self.customer_id("");
        self.customer_name("");
        self.customer_email("");
        self.customer_phone("");
        self.customer_address("");
        self.customer_website("");
        self.customer_description("");

        document.getElementById("modalDialog1").open();
      }; //end open
      //====================================================================================

      self.selectedChangedListener = (event) => {
        const row = event.detail.value.row;
        console.log("Rows : ", row);

        if (row.values().size > 0) {
          row.values().forEach((key) => {
            console.log("Key : ", key);
            var selectedRow = self.custArray().find(element => element.customer_name == key);
            //console.log("Selecte Row :", selectedRow.customer_id);
            self.id(selectedRow["@rid"].slice(1));



            self.customer_id(selectedRow.customer_id);
            self.customer_nameU(key);
            self.customer_emailU(selectedRow.customer_email);
            self.customer_phoneU(selectedRow.customer_phone);
            self.customer_addressU(selectedRow.customer_address);
            self.customer_websiteU(selectedRow.customer_website);
            self.customer_descriptionU(selectedRow.customer_description);


            self.deleteCustomerName(key);

          });
        }
      }//end selectedChangedListener
      //====================================================================================

      self.save = (event) => {
        document.getElementById("modalDialog1").close();
        if (
          self.customer_id() == "" ||
          self.customer_name() == "" ||
          self.customer_email() == "" ||
          self.customer_phone() == ""
        ) {
          self.messagesDataprovider.push({
            severity: "error",
            summary: "Error",
            detail: "Error Add New Customer",
            //autoTimeout: 2000,
            autoTimeout: UTIL.message_timeout,
          });
        } //end if
        else {
          CustomersModel.addCustomer(
            self.customer_id(),
            self.customer_name(),
            self.customer_email(),
            self.customer_phone(),
            self.customer_address(),
            self.customer_website(),
            self.customer_description(),
            (success, response) => {
              // alert(success,response);
              // console.log(response);

              if (success) {
                self.messagesDataprovider.push({
                  severity: "confirmation",
                  summary: "New Customer",
                  detail: "New Customer Added Successfuly",
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
        document.getElementById("updateCustomerDialogId").open();
      }
      //====================================================================================
      self.delete_Customer = (event) => {

        document.getElementById("deleteCustomerDialogId").open();

      }
      //===================================================================================

      self.cancelDelete = (event) => {
        document.getElementById("deleteCustomerDialogId").close();
      }//end cancelDelete
      //====================================================================================

      self.okDelete = (event) => {
        document.getElementById("deleteCustomerDialogId").close();
        console.log("Deleted Customer with rid : ", self.id());
        CustomersModel.deleteCustomer(self.id(), (success, response) => {
          if (success) {
            self.messagesDataprovider.push({
              severity: "confirmation",
              summary: "Delete Customer",
              detail: "Customer Deleted Successfuly",
              //autoTimeout: 2000,
              autoTimeout: UTIL.message_timeout

            });
          }
          else {
            self.messagesDataprovider.push({
              severity: "error",
              summary: "Error",
              detail: "Error Delete Customer",
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
        document.getElementById("updateCustomerDialogId").close();
        if (self.customer_nameU() == "" || self.customer_emailU() == "" || self.customer_phoneU() == "") {

          self.messagesDataprovider.push({
            severity: "error",
            summary: "Error",
            detail: "Error Update Information of Customer",
            //autoTimeout: 2000,
            autoTimeout: UTIL.message_timeout

          });
        }//end if
        else {
          CustomersModel.updateCustomer(
            self.id(),
            self.customer_id(),
            self.customer_nameU(),
            self.customer_emailU(),
            self.customer_phoneU(),
            self.customer_addressU(),
            self.customer_websiteU(),
            self.customer_descriptionU(), (success, response) => {
              // alert(success,response);
              // console.log(response);

              if (success) {
                self.messagesDataprovider.push({
                  severity: "confirmation",
                  summary: "Update Customer",
                  detail: "Customer Updated Successfuly",
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
        document.getElementById("updateCustomerDialogId").close();
      }//end cancelUpdate
      //====================================================================================

      self.emailPatternValidator = ko.observableArray([
        new AsyncRegExpValidator({
          pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
          hint: "enter a valid email format",
          messageDetail: "Not a valid email format",
        }),
      ]);

    }//end CustomerViewModel
    //##################################################  
    return CustomerViewModel;
  }
);
