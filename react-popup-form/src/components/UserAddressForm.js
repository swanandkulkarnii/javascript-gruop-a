import React from "react";
import "./PopupForm.css";

function UserAddressForm(props) {
  return props.trigger ? (
    <>
      <div className="popup-box">
        <div className="box">
          <button
            type="button"
            className="close-icon"
            onClick={() => props.settrigger(false)}
          >
            x
          </button>
          <form className="form-horizontal form-popup" id="userFormAddress">
            <div className="container">
              <div className="col-xs-4">
                <div className="form-group">
                  Addres Line 1
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  Address Line 2
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  City
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  State
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  Pincode
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  Country
                  <input type="text" className="form-control" />
                </div>
                <button type="button" className="btn btn-primary">
                  Add Data
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => props.settrigger(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default UserAddressForm;
