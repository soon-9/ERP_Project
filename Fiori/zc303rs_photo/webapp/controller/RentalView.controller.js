sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("zc303.sd.photo.zc303rsphoto.controller.RentalView", {
        onInit: function () {
           
        },


        onSearch : function () {

            let oTable = this.getView().byId("tableList"),
                oBinding = oTable.getBinding("rows"),
                aFilter = [],
                oFilter = null;

            var vCustno = this.getView().byId("ICustno").getValue(),
                vVbeln = this.getView().byId("IVbeln").getValue();

            console.log("vcust", vCustno, vCustno);

           if(vCustno != '') {

            oFilter = new Filter({
                path: "Custno",
                operator: FilterOperator.Contains,
                value1: vCustno  
            });

            aFilter.push(oFilter);
            oFilter = null;

           };
           if(vVbeln != '') {

            oFilter = new Filter({
                path: "Vbeln",
                operator: FilterOperator.EQ,
                value1: vVbeln 
            });

            aFilter.push(oFilter);
            oFilter = null;
            
           };

           oBinding.filter(aFilter);


        },

        onClear: function () {

            this.getView().byId("Custno").setValue('');
            this.getView().byId("Vbeln").setValue('');
            this.getView().byId("Srnum").setValue('');
            this.getView().byId("Rsdate").setValue('');
            this.getView().byId("Redate").setValue('');
            this.getView().byId("Status").setValue('');
            this.getView().byId("Photo").setValue('');
         

        },

        onDisplay: function() {

            let oModel   = this.getView().getModel(),           // Gateway Service를 실행할 객체 (DB에 Data를 날리기 위한 객체)
                oTable   = this.getView().byId("tableList"),      // EntitySet data
                aIndex   = oTable.getSelectedIndices(),         // 선택한 행의 위치를 가져온다. (go_grid->get_selected_rows)
                oContext = oTable.getContextByIndex(aIndex[0]), // 그 위치에 대한 행을 가져온다. (READ TABLE lt_row INTO ls_row INDEX 1)
                oData    = oContext.getObject();                // 선택한 행의 데이터를 이 변수에 넣는다. (READ TABLE gt_body INTO gs_body INDEX ls_row_id)

            // ABAP Class의 get_entity 메소드 호출
            oModel.read("/RPhotoSet(Custno='"   + oData.Custno + 
                                   "',Vbeln='" + oData.Vbeln + 
                                   "')",
            {
                success: function(oData2) {
                    this.getView().byId("Custno").setValue(oData2.Custno);
                    this.getView().byId("Vbeln").setValue(oData2.Vbeln);
                    this.getView().byId("Srnum").setValue(oData2.Srnum);
                    this.getView().byId("Rsdate").setValue(oData2.Rsdate);
                    this.getView().byId("Redate").setValue(oData2.Redate);
                    this.getView().byId("Status").setValue(oData2.Status);
                    this.getView().byId("Photo").setValue(oData2.Photo);
                }.bind(this),
                error: function() {
                    MessageToast.show("Get entity error!!");
                }
            });

        },

        onUpdate: function() {

            let oModel = this.getView().getModel();

            // gs_update-Bukrs = '1000'
            // gs_update-Belnr = '00120000120'
            // ...
            let oUpdate = {

                Custno: this.getView().byId("Custno").getValue(),
                Vbeln: this.getView().byId("Vbeln").getValue(),
                Srnum: this.getView().byId("Srnum").getValue(),
                Rsdate: this.getView().byId("Rsdate").getValue(),
                // Budat: this.getView().byId("Budat").getValue(),
                Redate: this.getView().byId("Redate").getValue(),
                Status: this.getView().byId("Status").getValue(),
                Photo: this.getView().byId("Photo").getValue(),

            };

            // UPDATE <DB> SET <~~> WHERE <~~>.
            oModel.update("/RPhotoSet(Custno='"   + oUpdate.Custno +        // Path (WHERE 조건)
                                     "',Vbeln='" + oUpdate.Vbeln + 
                                     "')",
                          oUpdate,                                          // oData (SET)
                          {                                                 // mParameters
                            method: 'MERGE',
                            success: function() {
                                oModel.refresh();
                                MessageToast.show("Update successfully!!");
                            },
                            error: function() {
                                MessageToast.show("Update error!!!");
                            }
                          });

        }
    });
});

