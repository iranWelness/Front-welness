import React from 'react';
import { Button } from '@material-ui/core';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.initialFilled = 33;
  }

  renderOptions(start, end) {
    let result = [];
    for (let i = start; i < end; i++) {
      result.push(<option key={'option-' + i} value={String(i)}>{i}</option>);
    }
    return result;
  }

  render() {
    return (<div>
      {/* <h5>ساخت بازی</h5> */}
      {/* <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>مربع های پر</ControlLabel>
          <FormControl className="difficulty-select" defaultValue={this.initialFilled} inputRef={input => this.initialFilled = input} componentClass="select" placeholder="select">
            <option value="17">17 - خیلی سخت</option>
            {this.renderOptions(18, 26)}
            <option value="26">26 - سخت</option>
            {this.renderOptions(27, 33)}
            <option value="33">33 - معمولی</option>
            {this.renderOptions(34, 40)}
            <option value="40">40 - آسان</option>
            {this.renderOptions(41, 50)}
            <option value="50">50 - تازه وارد</option>
            {this.renderOptions(50, 65)}
            <option value="65">65 - کودکانه</option>
            {this.renderOptions(66, 81)}
            <option value="81">81 - حل شده</option>
          </FormControl>
        </FormGroup>
      </form> */}
      <Button className="generate-btn" onClick={() => {
        this.props.onGenerate(33);
      }}>بازی جدید</Button>
      {/* <p className="instructions">تعداد مربع های پرشده را انتخاب و سپس بر روی بازی جدید کلیک کنید</p> */}
    </div>);
  }
}
