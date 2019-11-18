sap.ui.define(["yelcho/reuse/BaseComponent"], function(UIComponent) {
	"use strict"
	return UIComponent.extend("yelcho.reuse.suppliers.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			UIComponent.prototype.init.apply(this, arguments)

			this.attachEvent("nestedComponentEvent", this._onNestedComponentEvent, this);
			this.getRouter().initialize()
		},
		_onNestedComponentEvent: function(oEvent) {
			const sEventName = oEvent.getParameter("name");
			const mParameters = oEvent.getParameter("parameters");

			switch(sEventName) {
				case "toProduct":
					this.fireEvent("toProduct", {
						productID: mParameters.productID
					});
					break;
				default:
					// other events are not supported
					throw new Error("Unknown event" + sEventName + "is received from the nested component")
			}
		}
	})
})
