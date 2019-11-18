sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/base/util/deepClone"
], function(UIComponent, JSONModel, deepClone) {
		"use strict"

		return UIComponent.extend("yelcho.mydemo.comprouting.Component", {
			metadata: {
				manifest: "json"
			},
			init: function() {
				// call the init function of the parent
				UIComponent.prototype.init.apply(this, arguments)

				this.attachEvent("nestedComponentEvent", this._onNestedComponentEvent, this);

				// create the views based on the url/hash
				this.getRouter().initialize()

				// set data model
				var oData = {
					recipient: {
						name: "Graham Robbo"
					}
				}
				var oModel = new JSONModel(oData)
				this.setModel(oModel, "jsonModel")
			},
			_onNestedComponentEvent: function(oEvent) {
				const sEventName = oEvent.getParameter("name");
				const mParameters = oEvent.getParameter("parameters");

				switch(sEventName) {
					case "toSupplier":
						this.getRouter().navTo("suppliers", {}, {
							suppliers: {
								route: "detail",
								parameters: {
									id: mParameters.supplierID
								},
								componentTargetInfo: {
									products: {
										route: "list",
										parameters: {
											basepath: mParameters.supplierKey
										}
									}
								}
							}
						});
						break;
					case "toCategory":
						this.getRouter().navTo("categories", {}, {
							categories: {
								route: "detail",
								parameters: {
									id: mParameters.categoryID
								},
								componentTargetInfo: {
									products: {
										route: "list",
										parameters: {
											basepath: mParameters.categoryKey
										}
									}
								}
							}
						});
						break;
					case "toProduct":
						this.getRouter().navTo("products", {}, {
							products: {
								route: "detail",
								parameters: {
									id: mParameters.productID
								}
							}
						});
						break;
					default:
						// other events are not supported
						throw new Error("Unknown event" + sEventName + "is received from the nested component")
				}
			},
			setSelectedMenuItem: function(sKey) {
				const oRootView = this.getRootControl();

				if (oRootView) {
					oRootView.byId("navigationList").setSelectedKey(sKey);
				}
			}
		})
	}
)
