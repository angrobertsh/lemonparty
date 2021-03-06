import React from 'react';
import merge from 'lodash/merge';

class LemonForm extends React.Component{
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateFormLemon = this.updateFormLemon.bind(this);
    this.openWidget = this.openWidget.bind(this);
  }

  openWidget(){
    cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      (error, images) => {
        if(error === null) {
          this.props.updateLemonForm({url: images[0].url});
        }
      }
    );
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
    // let editModeCheck = sessionStorage.getItem("robertslemonpartykey") === 'xe8v6pai7ct';
    let editModeCheck = !!this.props.currentUser

    if (this.props.formOpen) {
      return (
        <div id="lemon-form-container">
          <div id="lemon-form-with-heading">
            <div id="lemon-form">
              <div id="lemon-form-topbar">
                <div id="close-lemon-form" onClick={this.props.toggleLemonForm}>Close</div>
                <div id="lemon-form-heading">
                  <div id="lemon-form-heading-text" className="slowbounce">
                    Click the map to set your tree!
                  </div>
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
                      <div>
                        {`Editing tree at ${lemon.location}`}
                      </div>
                      <div id="reset-form" onClick={this.props.clearLemonForm}>Reset</div>
                    </div>
                  }
                  <div id="tree-desc">
                    <div id="tree-container">
                      <div id="tree-label" className="lemon-form-label">
                        Tree:
                      </div>
                      <select id="tree-select" name="tree" value={lemon.tree} onChange={this.updateFormLemon}>
                        <option value="Lemon">Lemon</option>
                        <option value="Lime">Lime</option>
                        <option value="Orange">Orange</option>
                        { editModeCheck && <option value="REAL">REAL</option>}
                      </select>
                    </div>

                    <div id="desc-label">
                      <div className="lemon-form-label">
                        Description:
                      </div>
                      <div id="desc-input">
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
              { editModeCheck &&
                <div id="image-upload-area">
                  <div id="image-upload" onClick={this.openWidget}>Upload Image</div>
                  <div id="edit-image" style={{backgroundImage: `url(${lemon.url})`}} />
                </div>
              }
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
