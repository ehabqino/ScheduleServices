define(['ojs/ojModel'],
    function (oj) {
        class UsersModel {
            constructor() {
                this.serverUrl = "http://127.0.0.1:2480/";
            }//end of constructor
            //======================================================================
            initializeModelCollection(endpoint) {
                this.usersModelDef = oj.Model.extend({
                    url: endpoint,
                    keyAttributes: "@rid"
                });
                this.usersCollDef = oj.Model.extend({
                    url: endpoint,
                    comparator: "@rid",
                    model: this.usersModelDef
                });

                this.user = new this.usersCollDef;

            }//initializeModelCollection
            //======================================================================
            getUsersList(notify) {
                //api url for all service
                let api_url = this.serverUrl + "query/services/sql/SELECT FROM jet_users";
                this.initializeModelCollection(api_url);

                // Make Row definition and connect it with Collection Definition
                this.userRow = new this.usersModelDef({}, this.user);

                //Operating on the Database "I use orientDB"
                this.userRow.fetch({
                    success: (coll, data) => {
                        console.log("All Users", data.result);
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

            }//end getServicesList
            //======================================================================

            addUser(user_name, user_password, user_display_name, user_type, user_active, notify) {

                // Collection = Table(Rows)
                // Model = Row
                // Collection is a group of Rows
                //user_inputs = {user_name,user_password,user_type,user_display_name,user_active};
                let url_api = this.serverUrl + "document/" + "services/";
                //let url_api = this.serverUrl +"/"+ id + ".json";
                this.initializeModelCollection(url_api);
                let userRow = new this.usersModelDef({
                    "@class": "jet_users",
                    "user_name": user_name,
                    "user_password": user_password,
                    "user_display_name": user_display_name,
                    "user_type": user_type,
                    "user_active": user_active
                }, this.user);

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
            }//end addClass
            //==================================================================================================================//
            updateUser(id, user_name, user_password, user_type, user_display_name, user_active, notify) {
                let url_api = this.serverUrl + "document/" + "services/" + id;
                this.initializeModelCollection(url_api);
                let userRow = new this.usersModelDef({
                    "@class": "jet_users",
                    "@rid": id,
                    "user_name": user_name,
                    "user_password": user_password,
                    "user_type": user_type,
                    "user_display_name": user_display_name,
                    "user_active": user_active
                }, this.user);

                userRow.save(null, {
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

            }//end update Class
            //==================================================================================================================//
            deleteUser(id, notify) {
                //let url_api = this.serverUrl +"/"+ id + ".json";
                let url_api = this.serverUrl + "document/" + "services/" + id
                this.initializeModelCollection(url_api);
                let userRow = new this.usersModelDef({
                    "@rid": id,
                }, this.user);
                // console.log(id);
                //AJAX (Take Time)
                userRow.save(null, {
                    type: "DELETE",
                    success: function (model, response, options) {
                        //notify(response.name);
                        notify(true, "User with ID :" + id + " is Deleted Sucessfully");
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
            }//end deleteService
            //=====================================================================================


            //######################################################################################
        }//end class
        return new UsersModel;
    });