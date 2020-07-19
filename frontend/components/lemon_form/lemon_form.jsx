import React from 'react';
import merge from 'lodash/merge';

class LemonForm extends React.Component{
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateFormLemon = this.updateFormLemon.bind(this);
  }

  submitForm(){
    !!this.props.formLemon.id ? this.props.updateLemon(this.props.formLemon) :
      this.props.createLemon(merge(this.props.formLemon, { token: sessionStorage.getItem("robertslemonpartykey") }));
  }

  updateFormLemon(e){
    this.props.updateLemonForm({[e.currentTarget.name]: e.currentTarget.value});
  }

  render(){
    const lemon = this.props.formLemon;

    if (this.props.formOpen) {
      return (
        <div id="lemon-form-container">
          <div id="lemon-form-with-heading">
            <div id="lemon-form">
              <div id="lemon-form-topbar">
                <div id="close-lemon-form" onClick={this.props.toggleLemonForm}>Close</div>
                <div id="lemon-form-heading">
                  Click the map to set your tree!
                </div>
              </div>
              <div id="lemon-form-area-container">
                <div id="lemon-form-area">
                  <div id="latlng" className="hide">
                    <div className="lemon-form-label">
                      Position:
                    </div>
                    <div id="latlng-inputs-container">
                      <div id="latlng-inputs">
                        <input type="text" id="latlng-input1" className="latlng-input" name="lat" value={lemon.lat} disabled />
                        <input type="text" id="latlng-input2" className="latlng-input" name="lng" value={lemon.lng} disabled />
                      </div>
                      <div id="latlng-label2">
                        (click the map to change position!)
                      </div>
                    </div>
                  </div>
                  { lemon && lemon.id &&
                    <div id="edit-bar">
                      {`Editing tree at ${lemon.location}`}
                      <div id="reset-form" onClick={this.props.clearLemonForm}>Reset</div>
                    </div>
                  }
                  <div className="input-area flex align-center">
                    <div className="flex column start m-15 flex-1">
                      <div className="lemon-form-label">
                        Tree:
                      </div>
                      <select name="tree" value={lemon.tree} onChange={this.updateFormLemon}>
                        <option value="Lemon">Lemon</option>
                        <option value="Lime">Lime</option>
                        <option value="Orange">Orange</option>
                      </select>
                    </div>

                    <div className="flex column start m-15 flex-4">
                      <div className="lemon-form-label">
                        Description:
                      </div>
                      <div className="flex center w-100">
                        <input type="text" id="location" name="location" placeholder="Description" value={lemon.location} onChange={this.updateFormLemon} />
                      </div>
                    </div>
                  </div>
                  <div className="input-area flex column">
                    <textarea name="note" placeholder="Say something nice about Robert" value={lemon.note} onChange={this.updateFormLemon} />
                    { this.props.errors.length > 0 && <div id="lemon-errors">{`Error: ${this.props.errors.join(', ')}`}</div>}
                  </div>
                  <div className="input-area flex align-center">
                    <div className="flex column start m-15 flex-1">
                      <div className="lemon-form-label">
                        Your Name:
                      </div>
                      <div className="flex">
                        <input type="text" name="finder" placeholder="Your name" value={lemon.finder} onChange={this.updateFormLemon}/>
                      </div>
                    </div>
                    <div id="lemon-form-submit" onClick={this.submitForm}>
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default LemonForm;
