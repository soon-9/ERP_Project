sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zc303.sd.photo.zc303rsphoto.controller.RentalView", {
        onInit: function () {
            this._oDialog = this.byId("statusDialog");
            this._sSelectedCustno = ""; // 선택된 고객번호 저장
            this._sSelectedVbeln = "";  // 선택된 주문번호 저장
        },

        onCustnoPress: function (oEvent) {
            let sCustno = oEvent.getSource().getText(); // 클릭된 고객번호
            let oContext = oEvent.getSource().getBindingContext(); // 현재 행의 컨텍스트
            let sVbeln = oContext.getProperty("Vbeln"); // 현재 행의 주문번호

            this._sSelectedCustno = sCustno; // 저장
            this._sSelectedVbeln = sVbeln;

            console.log("클릭된 고객번호:", sCustno, "주문번호:", sVbeln);

            // 팝업 기본값 초기화
            this.byId("ProcessingStatus").setSelectedIndex(0); // 폐기로 기본값 설정
            this._oDialog.open();
        },

        onStatusChangeConfirm: function () {
            let oProcessingGroup = this.byId("ProcessingStatus");
            let iProcessingIndex = oProcessingGroup.getSelectedIndex();
            let sProcessingText = oProcessingGroup.getButtons()[iProcessingIndex].getText();

            console.log("선택된 상태 처리:", sProcessingText);

            // 상태 업데이트
            this._updateStatusInDB(sProcessingText);
        },

        _updateStatusInDB: function (sNewStatus) {
            let oModel = this.getView().getModel();
            let sPath = `/RPhotoSet(Custno='${this._sSelectedCustno}',Vbeln='${this._sSelectedVbeln}')`;

            let oUpdate = {
                Status: sNewStatus // 업데이트할 상태 처리 값
            };

            console.log("업데이트 경로:", sPath, "업데이트 데이터:", oUpdate);

            oModel.update(
                sPath,
                oUpdate,
                {
                    method: 'MERGE',
                    success: function () {
                        console.log("업데이트 성공");
                        MessageToast.show(`상태가 '${sNewStatus}'로 저장되었습니다.`);
                        this.getView().getModel().refresh(); // 데이터 새로고침
                        this._oDialog.close();
                    }.bind(this),
                    error: function (oError) {
                        console.error("업데이트 실패:", oError);
                        MessageToast.show("상태 업데이트 중 오류가 발생했습니다.");
                    }
                }
            );
        },

        onStatusChangeCancel: function () {
            this._oDialog.close();
        }
    });
});
