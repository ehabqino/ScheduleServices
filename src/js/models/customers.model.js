define(['ojs/ojModel'],
    function (oj) {
        class CustomersModel {
            constructor() {
                this.serverUrl = "http://127.0.0.1:2480/";
            }//end of constructor
            //======================================================================
            initializeModelCollection(endpoint) {
                this.customersModelDef = oj.Model.extend({
                    url: endpoint,
                    keyAttributes: "@rid"
                });
                this.customersCollDef = oj.Model.extend({
                    url: endpoint,
                    comparator: "@rid",
                    model: this.customersModelDef
                });

                this.customer = new this.customersCollDef;

            }//initializeModelCollection
            //======================================================================
            getCustomersList(notify) {
                //api url for all service
                let api_url = this.serverUrl + "query/services/sql/SELECT FROM jet_customers";
                this.initializeModelCollection(api_url);

                // Make Row definition and connect it with Collection Definition
                this.customerRow = new this.customersModelDef({}, this.customer);

                //Operating on the Database "I use orientDB"
                this.customerRow.fetch({
                    success: (coll, data) => {
                        console.log("All Customers", data.result);
                        // var test = Object.entries(data.result).map(val => {
                        //     console.log("After format : " + val[1]);
                        //     //console.log("After format : " + val[1].category_name);
                        //     return val[1] ;

                        // });
                        // console.log(test);

                        // notify(true,test);
                        notify(true, data.result);
                    },
                    error: (model, xhr, options) => {
                        notify(false, "Error : " + xhr.textStatus);
                    },
                    headers: {
                        'Authorization': 'Basic YWRtaW5zZXJ2aWNlOmFkbWlucHdk',
                        //'Authorization' : 'Basic' + btoa('root:rootpwd'),
                        'Content-Type': 'application/json'
                    }
                });

            }//end getCustomersList
            //======================================================================
            /*
            customer_address	
            customer_description	
            customer_email	
            customer_id	
            customer_name
            customer_phone	
            customer_website 
             */
            addCustomer(customer_name, customer_email, customer_phone, customer_address, customer_website, customer_description,
                notify) {

                // Collection = Table(Rows)
                // Model = Row
                // Collection is a group of Rows
                //user_inputs = {user_name,user_password,user_type,user_display_name,user_active};
                let url_api = this.serverUrl + "document/" + "services/";
                //let url_api = this.serverUrl +"/"+ id + ".json";
                this.initializeModelCollection(url_api);
                let customerRow = new this.customersModelDef({
                    "@class": "jet_customers",
                    "customer_name": customer_name,
                    "customer_email": customer_email,
                    "customer_phone": customer_phone,
                    "customer_address": customer_address,
                    "customer_website": customer_website,
                    "customer_description": customer_description
                }, this.customer);

                //AJAX (Take Time)
                userRow.save(null, {
                    type: "POST",
                    success: function (model, response, options) {
                        //notify(response.name);
                        notify(true, response);
                    },
                    //xhr = xml http request , can be use any name for example x
                    error: function (modle, xhr, options) {

                        notify(false, `Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                    },
                    headers: {
                        'Authorization': 'Basic YWRtaW5zZXJ2aWNlOmFkbWlucHdk',
                        //'Authorization' : 'Basic' + btoa('root:rootpwd'),
                        'Content-Type': 'application/json'
                    }
                });
            }//end addCustomer
            //==================================================================================================================//
            updateCustomer(id, customer_name, customer_email, customer_phone, customer_address, customer_website, customer_description,
                notify) {
                let url_api = this.serverUrl + "document/" + "services/" + id;
                this.initializeModelCollection(url_api);
                let customerRow = new this.customersModelDef({
                    "@class": "jet_customers",
                    "@rid": id,
                    "customer_name": customer_name,
                    "customer_email": customer_email,
                    "customer_phone": customer_phone,
                    "customer_address": customer_address,
                    "customer_website": customer_website,
                    "customer_description": customer_description
                }, this.customer);

                customerRow.save(null, {
                    type: "PUT",
                    success: function (model, response, options) {
                        //notify(response.name);
                        notify(true, response);
                    },
                    //xhr = xml http request , can be use any name for example x
                    error: function (modle, xhr, options) {

                        notify(false, `Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                    },
                    headers: {
                        'Authorization': 'Basic YWRtaW5zZXJ2aWNlOmFkbWlucHdk',
                        'Content-Type': 'application/json'
                    }
                });

            }//end updateCustomer
            //==================================================================================================================//
            deleteCustomer(id, notify) {
                //let url_api = this.serverUrl +"/"+ id + ".json";
                let url_api = this.serverUrl + "document/" + "services/" + id
                this.initializeModelCollection(url_api);
                let customerRow = new this.customersModelDef({
                    "@rid": id,
                }, this.customer);
                // console.log(id);
                //AJAX (Take Time)
                customerRow.save(null, {
                    type: "DELETE",
                    success: function (model, response, options) {
                        //notify(response.name);
                        notify(true, "Customer with ID :" + id + " is Deleted Sucessfully");
                    },
                    //xhr = xml http request , can be use any name for example x
                    error: function (modle, xhr, options) {

                        notify(false, `Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                    },
                    headers: {
                        'Authorization': 'Basic YWRtaW5zZXJ2aWNlOmFkbWlucHdk',
                        //'Authorization' : 'Basic' + btoa('adminservice:adminpwd')
                        'Content-Type': 'application/json'
                    }
                });
            }//end deleteCustomer
            //=====================================================================================


            //######################################################################################
        }//end class
        return new CustomersModel;
    });