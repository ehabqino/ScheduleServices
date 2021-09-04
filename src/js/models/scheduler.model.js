define(['ojs/ojModel'],
    function (oj) {
        class ScheduleModel {
            constructor() {
                this.serverUrl = "http://127.0.0.1:2480/";
            }//end of constructor
            //======================================================================
            initializeModelCollection(endpoint) {
                this.ScheduleModelDef = oj.Model.extend({
                    url: endpoint,
                    keyAttributes: "@rid"
                });
                this.scheduleCollDef = oj.Model.extend({
                    url: endpoint,
                    comparator: "@rid",
                    model: this.ScheduleModelDef
                });

                this.schedule = new this.scheduleCollDef;

            }//initializeModelCollection
            //======================================================================
            getScheduleList(notify) {
                //api url for all service
                let api_url = this.serverUrl + "query/services/sql/SELECT FROM jet_services";
                this.initializeModelCollection(api_url);

                // Make Row definition and connect it with Collection Definition
                this.scheduleRow = new this.ScheduleModelDef({}, this.schedule);

                //Operating on the Database "I use orientDB"
                this.scheduleRow.fetch({
                    success: (coll, data) => {
                        console.log("All services", data.result);
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

            }//end getScheduleList
            //======================================================================

            addSchedule(name, description, notify) {

                // Collection = Table(Rows)
                // Model = Row
                // Collection is a group of Rows
                let url_api = this.serverUrl + "document/" + "services/";
                //let url_api = this.serverUrl +"/"+ id + ".json";
                this.initializeModelCollection(url_api);
                let scheduleRow = new this.ScheduleModelDef({
                    "@class": "jet_services",
                    "service_name": name,
                    "service_description": description
                }, this.schedule);

                //AJAX (Take Time)
                scheduleRow.save(null, {
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
            }//end addSchedule
            //==================================================================================================================//
            updateSchedule(id, description, name, notify) {
                let url_api = this.serverUrl + "document/" + "services/" + id;
                this.initializeModelCollection(url_api);
                let scheduleRow = new this.ScheduleModelDef({
                    "@class": "jet_services",
                    "@rid": id,
                    "service_name": name,
                    "service_description": description
                }, this.schedule);

                scheduleRow.save(null, {
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

            }//end updateSchedule
            //==================================================================================================================//
            deleteSchedule(id, notify) {
                //let url_api = this.serverUrl +"/"+ id + ".json";
                let url_api = this.serverUrl + "document/" + "services/" + id
                this.initializeModelCollection(url_api);
                let scheduleRow = new this.ScheduleModelDef({
                    "@rid": id,
                }, this.schedule);
                // console.log(id);
                //AJAX (Take Time)
                scheduleRow.save(null, {
                    type: "DELETE",
                    success: function (model, response, options) {
                        //notify(response.name);
                        notify(true, "Service with ID :" + id + " is Deleted Sucessfully");
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
            }//end deleteSchedule
            //=====================================================================================


            //######################################################################################
        }//end class
        return new ScheduleModel;
    });