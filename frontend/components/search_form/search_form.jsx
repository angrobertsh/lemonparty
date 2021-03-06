import React from 'react';

class SearchForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      days: this.props.days,
      hours: this.props.hours,
      food: this.props.food
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field){
    return (e) => {
      if(e.currentTarget.type === "checkbox"){
        let newState = this.state[field];
        if(e.currentTarget.checked){
          newState.push(e.currentTarget.value);
        } else {
          let index = newState.indexOf(e.currentTarget.value);
          newState.splice(index, 1);
        }
        this.setState({[field]: newState});
      } else {
        this.setState({[field]: e.currentTarget.value})
      }
	  }
  }

  handleSubmit(e){
		e.preventDefault();
    document.getElementById("splash").classList.add("hide");
    Promise.resolve(this.props.updateFilterStore("food", this.state.food))
      .then(this.props.updateFilterStore("days", this.state.days))
      .then(this.props.updateFilter("hours", this.state.hours))
	}

  componentWillReceiveProps(nextProps){
    this.setState({food: nextProps.food, days: nextProps.days, hours: nextProps.hours});
  }

  componentDidMount(){
    window.setTimeout(() => {
      this.searchForm.querySelectorAll("*").forEach((el) => {
        el.classList.add("fade-in");
      });
    }, 100);
  }

          // <input type="checkbox" className="search-form-toggle"> { this.state.food ? "Anything!" : "This!" } </input>
          // <div className="search-form-days-hours">
          //   <div className="search-form-hours">
          //     <header className="search-form-days-header search-form-header">When would you like to eat it?</header>
          //     <input type="radio" value="breakfast" className="breakfast search-form-input" onChange={this.update("hours")} checked={this.state.hours === "breakfast"} />Breakfast
          //     <input type="radio" value="lunch" className="lunch search-form-input" onChange={this.update("hours")} checked={this.state.hours === "lunch"} />Lunch
          //     <input type="radio" value="dinner" className="dinner search-form-input" onChange={this.update("hours")} checked={this.state.hours === "dinner"} />Dinner
          //     <input type="radio" value="latenight" className="latenight search-form-input" onChange={this.update("hours")} checked={this.state.hours === "late-night"} />Late-night
          //     <input type="radio" value="anytime" className="now search-form-input" onChange={this.update("hours")} checked={this.state.hours === "anytime"} />Anytime
          //   </div>
          //   <div className="search-form-days">
          //     <header className="search-form-days">And on what day?</header>
          //     <input type="checkbox" onChange={this.update("days")} value="Sunday" checked={this.state.days.includes("Sunday")} />S
          //     <input type="checkbox" onChange={this.update("days")} value="Monday" checked={this.state.days.includes("Monday")} />M
          //     <input type="checkbox" onChange={this.update("days")} value="Tuesday" checked={this.state.days.includes("Tuesday")} />T
          //     <input type="checkbox" onChange={this.update("days")} value="Wednesday" checked={this.state.days.includes("Wednesday")} />W
          //     <input type="checkbox" onChange={this.update("days")} value="Thursday" checked={this.state.days.includes("Thursday")} />T
          //     <input type="checkbox" onChange={this.update("days")} value="Friday" checked={this.state.days.includes("Friday")} />F
          //     <input type="checkbox" onChange={this.update("days")} value="Saturday" checked={this.state.days.includes("Saturday")} />S
          //     <button className="submit-button">{ this.state.hours || this.state.days.length > 0 || this.state.food ? "This food at this time and date" : "Anything right now!" }</button>
          //   </div>
          // </div>


  render() {
    return (
      <div className="search-form-container" ref={ searchForm => this.searchForm = searchForm }>
        <div id="leslie-container">
          <div id="leslie" className="to-fade-in"></div>
        </div>
        <form onSubmit={this.handleSubmit} className="search-form">
          <div className="search-form-food">
            <header className="search-form-food-header search-form-header to-fade-in-slower">What would you like to eat?</header>
            <input type="text" onChange={ this.update("food") } value={this.state.food} placeholder="Food goes here!" className="search-form-input search-form-input-food to-fade-in-even-slower"/>
          </div>
          <button className="submit-button to-fade-in-slowest">{ this.state.food ? "This!" : "Anything!" }</button>
        </form>
      </div>
    );
  }

}

export default SearchForm;
