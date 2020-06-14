import React from 'react';

class LemonForm extends React.Component{
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateFormLemon = this.updateFormLemon.bind(this);
  }

  submitForm(){
    !!this.props.formLemon.id ? this.props.updateLemon(this.props.formLemon) : this.props.createLemon(this.props.formLemon);
  }

  updateFormLemon(e){
    this.props.updateLemonForm({[e.currentTarget.name]: e.currentTarget.value});
  }

  render(){
    const lemon = this.props.formLemon;
    const openClass = this.props.formOpen ? "" : "hidden";

    return (
      <div id="lemon-form-container" className={openClass}>
        { lemon && lemon.id &&
          <div>
            {`Editing tree at ${lemon.location}`}
            <div onClick={this.props.clearLemonForm}>Reset</div>
          </div>
        }
        <div id="close-lemon-form" onClick={this.props.toggleLemonForm}>X</div>
        <div id="lemon-form">
          <input type="text" name="lat" value={lemon.lat} disabled />
          <input type="text" name="lng" value={lemon.lng} disabled />
          <select name="tree" value={lemon.tree} onChange={this.updateFormLemon}>
            <option value="Lemon">Lemon</option>
            <option value="Lime">Lime</option>
            <option value="Orange">Orange</option>
          </select>
          <input type="text" name="location" placeholder="Location" value={lemon.location} onChange={this.updateFormLemon} />
          <input type="text" name="note" placeholder="Say something nice about Robert... I mean this tree" value={lemon.note} onChange={this.updateFormLemon} />
          <input type="text" name="finder" placeholder="Your name" value={lemon.finder} onChange={this.updateFormLemon}/>
          { this.props.errors.length > 0 && <div id="lemon-errors">{`Error: ${this.props.errors.join(', ')}`}</div>}
          <div id="lemon-form-submit" onClick={this.submitForm}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}

export default LemonForm;
