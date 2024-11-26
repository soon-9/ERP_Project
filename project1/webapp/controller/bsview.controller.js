sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/IconTabFilter",
	"sap/m/Text",
	"sap/ui/core/Element",
	"sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Label",
	"sap/m/Input", 
	"sap/m/library",
	"sap/m/MessageToast",
	"sap/m/TextArea",
    "sap/m/plugins/CellSelector",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, IconTabFilter, Text, Element, HorizontalLayout, VerticalLayout, Dialog,
           Button, Label, Input, mobileLibrary, MessageToast, TextArea, CellSelector, Filter, FilterOperator )
 {
    "use strict";
// Waiting Apprv Reject
    var ButtonType = mobileLibrary.ButtonType;
    var DialogType = mobileLibrary.DialogType;


    return Controller.extend("sdfdsfds.project1.controller.bsview", {
        onInit: function () {
			
			const oIconTabBar = this.byId("iconTabBar");
			oIconTabBar.attachSelect((oEvent) => {
                this.handleIconTabSelect(oEvent);
            });
            
            // var oModel = this.getView().getModel();
            // var sEntitySet = "/SbmcdSet";
            // // this.getView().setModel(oViewModel, "viewModel");
            var oModel = this.getOwnerComponent().getModel(); // Component의 모델 가져오기

            // ValueHelp 다이얼로그의 데이터를 위한 모델 설정
            // 다이얼로그를 아직 생성하지 않았다면 생성합니다.
            if (!this._oValueHelpDialog) {
                this._oValueHelpDialog = sap.ui.xmlfragment(this.getView().getId(), "zc303.pp.sbmop.zc303ppsbmop.view.Sbmfrag", this);
                this.getView().addDependent(this._oValueHelpDialog);                  
            }

            // 데이터 바인딩
            var oTable = this.byId("valueHelpTable");

            // EmasterSet 엔터티에서 결재자 정보를 가져오기
            oModel.read("/EmasterSet", {
                success: (oData) => {
                    var oListBinding = oTable.getBinding("items");
                    oListBinding.setModel(new sap.ui.model.json.JSONModel(oData.results));
                },
                error: (oError) => {
                    MessageToast.show("결재자 데이터를 가져오는 데 실패했습니다.");
                }
            });
            // oModel.metadataLoaded().then(() => {
            //     // 컨텍스트를 유지하기 위해 this 저장
            //     const that = this;
            //     const sEntitySet = "/SbmcdSet";
            
            //     oModel.read(sEntitySet, {
            //         success(oData) {
            //             console.log("Data loaded successfully:", oData);
            
            //             const iRowCount1 = oData.results.length; // 행 개수 계산
            //             console.log("Row Count:", iRowCount1);
            
            //             console.log(that); // 저장된 컨텍스트 확인
            //             that.countStates(); // 컨텍스트를 유지한 상태에서 호출
            //         },
            //         error(oError) {
            //             console.error("Error loading data:", oError);
            //         }
            //     });
            // });
            

            // 테이블 초기화 후 이벤트 델리게이트 추가
            const oTable1 = this.byId("SbmWating");
            const oTable2 = this.byId("SbmAprv");
            const oTable3 = this.byId("Opsbmcd");
            const oTable4 = this.byId("OPheader");

            // EventDelegate 추가
            oTable1.addEventDelegate({
                onAfterRendering: function () {
                const aColumns = oTable1.getColumns(); // 테이블의 모든 컬럼 가져오기
                aColumns.forEach((oColumn) => {
                    const $headerCell = oColumn.getDomRef(); // 헤더 DOM 가져오기
                    if ($headerCell) {
                        $headerCell.classList.add("customHeader"); // 커스텀 클래스 추가
                        }
                    });
                }
            });

            oTable2.addEventDelegate({
                onAfterRendering: function () {
                const aColumns = oTable2.getColumns(); // 테이블의 모든 컬럼 가져오기
                aColumns.forEach((oColumn) => {
                    const $headerCell = oColumn.getDomRef(); // 헤더 DOM 가져오기
                    if ($headerCell) {
                        $headerCell.classList.add("customHeader"); // 커스텀 클래스 추가
                        }
                    });
                }
            });

            oTable3.addEventDelegate({
                onAfterRendering: function () {
                const aColumns = oTable3.getColumns(); // 테이블의 모든 컬럼 가져오기
                aColumns.forEach((oColumn) => {
                    const $headerCell = oColumn.getDomRef(); // 헤더 DOM 가져오기
                    if ($headerCell) {
                        $headerCell.classList.add("customHeader"); // 커스텀 클래스 추가
                        }
                    });
                }
            });

            oTable4.addEventDelegate({
                onAfterRendering: function () {
                const aColumns = oTable4.getColumns(); // 테이블의 모든 컬럼 가져오기
                aColumns.forEach((oColumn) => {
                    const $headerCell = oColumn.getDomRef(); // 헤더 DOM 가져오기
                    if ($headerCell) {
                        $headerCell.classList.add("customHeader"); // 커스텀 클래스 추가
                        }
                    });
                }
            });

            // oModel.read(sEntitySet, {
            //     success: function(oData) {
            //         console.log("Data loaded successfully:", oData);
        
            //         // 데이터 로드가 완료되면 handleCalendarSelect 호출
            //         var iRowCount1 = oData.results.length;
            //         console.log("첫번째", iRowCount1);
            //         oModel.setProperty("/WaitingCount", iRowCount1);

            //     }.bind(this),
            //     error: function(oError) {
            //         console.error("Error loading data:", oError);
            //     }.bind(this)
            // });
            // this.countStates(); // 초기화 시 카운트 계산
        },

        // IconTabBar 탭 선택 이벤트 핸들러
        handleIconTabSelect: function (oEvent) {

			console.log("Selected Key:", sKey);
			const sKey = oEvent.getParameter("key");
			const oTable1 = this.byId("SbmWating");
			const oBinding = oTable1.getBinding("rows");
		
			if (!oBinding) {
				console.error("Binding not found for the table.");
				return;
			}
		},


        onOPitem(){

        },

		// 승인 팝업 생성
        _createApprovalPopup: function (oSelectedData) {
            // 팝업 ID를 동적으로 생성하여 겹치지 않도록 처리
            const sUniqueId = this.createId("approvalPopup"); 
            if (this.byId(sUniqueId)) {
                this.byId(sUniqueId).destroy(); // 이미 존재하는 팝업이 있다면 제거
            }

            const oDialog = new Dialog({
                id: sUniqueId, // 고유한 ID 사용
                title: "결재 승인",
                content: [
                    new Label({ text: "결재자", labelFor: sUniqueId + "-inputApprover" }),
                    new Input({
                        id: sUniqueId + "-inputApprover", // 고유한 ID
                        placeholder: "결재자를 입력하세요",
                        value: oSelectedData.Approver || ""
                    }),
                    // new Label({ text: "결재 코드", labelFor: sUniqueId + "-approvalCode" }),
                    // new Input({ 
                    //     id: sUniqueId + "-approvalCode", // 고유한 ID
                    //     value: oSelectedData.ApprovalCode || "자동 생성된 코드", 
                    //     editable: false
                    // }),
                    new Label({ text: "결재 일자", labelFor: sUniqueId + "-approvalDate" }),
                    new Input({
                        id: sUniqueId + "-approvalDate", // 고유한 ID
                        value: new Date().toISOString().split('T')[0],
                        editable: false,
                        length: 10
                    })
                ],
                beginButton: new Button({
                    text: "승인",
                    press: function () {
                        const sApprover = sap.ui.getCore().byId(sUniqueId + "-inputApprover").getValue();

                        if (!sApprover) {
                            MessageToast.show("결재자를 입력하세요.");
                            return;
                        }

                        // 승인 처리 로직
                        oSelectedData.Apprst = "승인";
                        oSelectedData.Approver = sApprover;

                        // 서버에 데이터 저장 (예시)
                        oSelectedData.model.update("/SbmWating", oSelectedData, {
                            success: function () {
                                MessageToast.show("승인이 완료되었습니다.");
                            },
                            error: function () {
                                MessageToast.show("오류 발생");
                            }
                        });

                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "취소",
                    press: function () {
                        MessageToast.show("취소되었습니다.");
                        oDialog.close();
                    }
                })
            });

            oDialog.open();
        },

        // 반려 팝업 생성
        _createRejectPopup: function (oSelectedData) {
            // 팝업 ID를 동적으로 생성하여 겹치지 않도록 처리
            const sUniqueId = this.createId("rejectPopup");
            if (this.byId(sUniqueId)) {
                this.byId(sUniqueId).destroy(); // 이미 존재하는 팝업이 있다면 제거
            }

            const oDialog = new Dialog({
                id: sUniqueId, // 고유한 ID 사용
                title: "결재 반려",
                content: [
                    new Label({ text: "결재자", labelFor: sUniqueId + "-inputRejectApprover" }),
                    new Input({
                        id: sUniqueId + "-inputRejectApprover", // 고유한 ID
                        placeholder: "결재자를 입력하세요",
                        showValueHelp:"true",
                        valueHelpRequest:"onValueHelp",
                        value: oSelectedData.Approver || ""
                    }),
                    // new Label({ text: "결재 코드", labelFor: sUniqueId + "-rejectApprovalCode" }),
                    // new Input({
                    //     id: sUniqueId + "-rejectApprovalCode", // 고유한 ID
                    //     value: oSelectedData.ApprovalCode || "자동 생성된 코드",
                    //     editable: false
                    // }),
                    new Label({ text: "결재 일자", labelFor: sUniqueId + "-rejectApprovalDate" }),
                    new Input({
                        id: sUniqueId + "-rejectApprovalDate", // 고유한 ID
                        value: new Date().toISOString().split('T')[0],
                        editable: false,
                        length: 10
                    }),

                    // 반려 사유 입력
                    new Label({ text: "반려 사유", labelFor: sUniqueId + "-rejectionReason" }),
                    new TextArea({
                        id: sUniqueId + "-rejectionReason",
                        placeholder: "반려 사유를 입력하세요",
                        width: "100%",
                        height: "100px"
                    })
                ],
                beginButton: new Button({
                    text: "반려",
                    press: function () {
                        const sApprover = sap.ui.getCore().byId(sUniqueId + "-inputRejectApprover").getValue();
                        const sRejectionReason = sap.ui.getCore().byId(sUniqueId + "-rejectionReason").getValue();

                        if (!sApprover) {
                            MessageToast.show("결재자를 입력하세요.");
                            return;
                        }

                        if (!sRejectionReason) {
                            MessageToast.show("반려 사유를 입력하세요.");
                            return;
                        }

                        // 반려 처리 로직
                        oSelectedData.Apprst = "반려";
                        oSelectedData.Reason = sRejectionReason;
                        oSelectedData.Approver = sApprover;

                        // 서버에 데이터 저장 (예시)
                        oSelectedData.model.update("/SbmWating", oSelectedData, {
                            success: function () {
                                MessageToast.show("반려가 처리되었습니다.");
                            },
                            error: function () {
                                MessageToast.show("오류 발생");
                            }
                        });

                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "취소",
                    press: function () {
                        MessageToast.show("취소되었습니다.");
                        oDialog.close();
                    }
                })
            });

            oDialog.open();
        },

        // 승인 버튼 클릭 시
        onPressApprv: function () {
            const oTable1 = this.byId("SbmWating");
            const aSelectedIndices = oTable1.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("항목을 선택하세요.");
                return;
            }

            const oSelectedItem = oTable1.getContextByIndex(aSelectedIndices[0]);
            const oSelectedData = oSelectedItem.getObject();

            // 승인 팝업 열기
            this._createApprovalPopup(oSelectedData);
        },

        // 반려 버튼 클릭 시
        onPressReject: function () {
            const oTable1 = this.byId("SbmWating");
            const aSelectedIndices = oTable1.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("항목을 선택하세요.");
                return;
            }

            const oSelectedItem = oTable1.getContextByIndex(aSelectedIndices[0]);
            const oSelectedData = oSelectedItem.getObject();

            // 반려 팝업 열기
            this._createRejectPopup(oSelectedData);
        // },

        // countStates: function () {
        //     // 모델 가져오기
        //     var oModel = this.getView().getModel();
        //     if (!oModel) {
        //         console.error("Model is not defined!");
        //         return;
        //     }
        
        //     // 각 테이블의 ID로 컨트롤러에 연결된 테이블 가져오기
        //     const oWaitingTable = this.byId("SbmWating");
        //     if (!oWaitingTable) {
        //         console.error("Waiting table not found!");
        //         return;
        //     }
        //     const oApprovedTable = this.byId("SbmAprv");
        //     const oRejectedTable = this.byId("Opsbmcd");
        
        //     // 바인딩 가져오기
        //     const oWaitingBinding = oWaitingTable.getBinding("rows");
        //     if (!oWaitingBinding) {
        //         console.error("No binding found for Waiting Table!");
        //         return;
        //     }
        //     const oApprovedBinding = oApprovedTable.getBinding("rows");
        //     const oRejectedBinding = oRejectedTable.getBinding("rows");
        
        //     // 바인딩 상태 확인
        //     if (!oWaitingBinding || !oApprovedBinding || !oRejectedBinding) {
        //         console.error("One or more table bindings are undefined!");
        //         return;
        //     }
        
        //     // 각 상태의 개수를 계산
        //     const waitingCount = oWaitingBinding.getLength();
        //     const approvedCount = oApprovedBinding.getLength();
        //     const rejectedCount = oRejectedBinding.getLength();
        //     const totalCount = waitingCount + approvedCount + rejectedCount;
        
        //     // 콘솔 로그 출력 (디버깅 용도)
        //     console.log("Waiting Count:", waitingCount);
        //     console.log("Approved Count:", approvedCount);
        //     console.log("Rejected Count:", rejectedCount);
        //     console.log("Total Count:", totalCount);
        
        //     // 모델에 카운트 데이터 설정
        //     oModel.setProperty("/TotalCount", totalCount);
        //     oModel.setProperty("/iRowCount1", waitingCount);
        //     oModel.setProperty("/ApprvCount", approvedCount);
        //     oModel.setProperty("/RejectCount", rejectedCount);
        },

        _createValueHelp: function () {
            const sUniqueId = "Sbmframg";  // 팝업 ID 설정
        
            if (this.byId(sUniqueId)) {
                this.byId(sUniqueId).destroy(); // 이미 존재하는 팝업이 있다면 제거
            }
        
            const oDialog = new Dialog({
                id: sUniqueId, // 고유한 ID
                title: "결재자 선택",
                content: [
                    new Label({ text: "결재자", labelFor: sUniqueId + "-inputApprover" }),
                    new Input({
                        id: sUniqueId + "-inputApprover", // 고유 ID
                        placeholder: "결재자를 선택하세요",
                        value: "", // 기본값 비어있음
                        editable: false // 사용자가 입력하지 못하도록 설정
                    }),
                    new Button({
                        text: "찾기",
                        press: this._onValueHelpSearch.bind(this) // 검색 버튼 클릭 시 처리할 함수
                    }),
                    // 선택된 결재자 목록을 보여줄 리스트
                    new List({
                        id: sUniqueId + "-approverList",
                        items: {
                            path: "/Approvers", // 결재자 목록이 바인딩되는 경로
                            template: new StandardListItem({
                                title: "{Name}", // 결재자의 이름
                                description: "{Position}", // 결재자의 직위
                                type: "Active",
                                press: this._onApproverSelect.bind(this) // 결재자 선택 시 호출될 함수
                            })
                        }
                    })
                ],
                beginButton: new Button({
                    text: "취소",
                    press: function () {
                        oDialog.close();
                    }
                })
            });
        
            oDialog.open();
        },
        
        // 결재자 목록을 검색하는 함수
        _onValueHelpSearch: function () {
            const oDialog = this.byId("Sbmframg");  // 팝업 참조
            const oInput = sap.ui.getCore().byId("Sbmframg-inputApprover");
        
            // 서버에서 결재자 목록을 검색 (예시)
            const oModel = this.getView().getModel();
            const oFilter = new Filter("ApproverName", FilterOperator.Contains, oInput.getValue());
            oModel.read("/ApproversSet", {
                filters: [oFilter],
                success: function (oData) {
                    const oList = sap.ui.getCore().byId("Sbmframg-approverList");
                    oList.setModel(new JSONModel(oData));  // 검색된 데이터를 리스트에 바인딩
                },
                error: function () {
                    MessageToast.show("검색 오류 발생");
                }
            });
        },
        
        // 결재자를 선택했을 때 호출되는 함수
        _onApproverSelect: function (oEvent) {
            const oSelectedItem = oEvent.getSource();
            const sApproverName = oSelectedItem.getTitle();  // 선택된 결재자의 이름
            const oInput = sap.ui.getCore().byId("Sbmframg-inputApprover");
        
            // 선택된 결재자를 입력 필드에 설정
            oInput.setValue(sApproverName);
            this.byId("Sbmframg").close();  // 팝업 닫기
        }
        
       
        
        
				
    });
});