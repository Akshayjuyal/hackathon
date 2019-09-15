import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import "../../styles/searchbar.css";
import axios from 'axios';
import SearchIcon from "@material-ui/icons/Search";
import * as urlconf from "../../config/config.json";



export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      companies: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] :  this.state.companies.length > 0 ? this.state.companies.filter(comp =>
      // comp.name.toLowerCase().slice(0, inputLength) === inputValue
      comp.name.toLowerCase().includes(inputValue)
    ) : []
  };
  
  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    this.props.onSearchSelection(suggestion.name);
    return suggestion.name
  };

  componentWillMount(){
    axios.get(urlconf.default.base_url+"/getCompanyList").then(
        resp => {
            this.setState({companies: resp.data.company_name_list});
        }
    );    
  }


  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for company Name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
        <div className="center-div">
            <SearchIcon 
               style={{
                  position: "absolute",
                  zIndex: "1",
                  left: "1.7%",
                  top: "13%"
                }}
            />
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        </div>
    );
  }
}