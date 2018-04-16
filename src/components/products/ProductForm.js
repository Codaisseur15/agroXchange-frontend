import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import Dialog, { DialogContent, DialogContentText, withMobileDialog, } from 'material-ui/Dialog'
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails, } from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import '../../styles/ProductForm.css'
import { fetchCodes } from '../../actions/codes'
import Search from '@material-ui/icons/Search'
import Grid from 'material-ui/Grid';

const classes = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    width: 200,
  },
  menu: {
    width: 200,
  },
}

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'COP',
    label: 'COL $'
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
]

class ProductForm extends PureComponent {
  state = {
    currency: 'EUR',
    open: false,
    code:'',
    edit: false
  }

  style = {
  direction: 'row',
  justify: 'center',
  alignItems: 'center',
  }

  propTypes = {
    classes: PropTypes.object.isRequired,
  }


  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {picture, ...rest} = this.state
    this.props.onSubmit(rest, picture)
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleClick = code => {
    this.setState({
      code: code,
      open: false
    })
  }

  handleFileChange = (e) => {
    this.setState({
      picture: e.target.files[0]
    })
  }

  componentWillMount = () => {
    this.props.fetchCodes()
  }


  render() {
    const { fullScreen, codes, vegetables, fruits, beans } = this.props
    const initialValues = this.props.initialValues || {}

    let product = codes.filter(i => i.code.match(this.state.code) )
    let title =''
    if (product.length > 0){  title = ( product[0].titleeng   )}

    if (this.props.edit === true ) {
      this.setState({edit: true})
    }

    if(codes)
      return(
        <form onSubmit={ this.handleSubmit } className="form-container">



          <Paper className="paper">

          { this.state.edit === false &&
          <div id="addProduct">

              <Button
                onClick={this.handleClickOpen}
                variant="raised"
              >
                <Search /> Products
              </Button>

              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                aria-labelledby="responsive-dialog-title"
              >

                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Vegetables ({vegetables.length})</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <DialogContent>
                      <DialogContentText>
                        {vegetables.map(veg => {
                            return <div key={veg.code}>
                              <Button
                                color="primary"
                                className="button"
                                size="small"
                                type="button"
                                onClick={_ => this.handleClick(veg.code)}
                              >
                                {veg.titleeng}
                              </Button>
                            </div>
                          }
                        )}
                      </DialogContentText>
                    </DialogContent>

                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Fruits & Nuts ({fruits.length})</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <DialogContent>
                      <DialogContentText>
                        {fruits.map(fruit =>
                          <div key={fruit.code}>
                            <Button
                              size="small"
                              color="primary"
                              className="button"
                              type="button"
                              onClick={_ => this.handleClick(fruit.code)}
                            >
                              {fruit.titleeng}
                            </Button>
                          </div>
                        )}
                      </DialogContentText>
                    </DialogContent>

                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Beans & Crop ({beans.length})</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <DialogContent>
                      <DialogContentText>
                        {beans.map(bean =>
                          <div key={bean.code}>
                            <Button
                              size="small"
                              color="primary"
                              className="button"
                              type="button"
                              onClick={_ => this.handleClick(bean.code)}
                            >
                              {bean.titleeng}
                            </Button>
                          </div>
                        )}
                      </DialogContentText>
                    </DialogContent>

                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Dialog>
            </div>

          }
          <br />

          <div><h3>{   title  }</h3></div>



        <TextField
          id="description"
          name="description"
          label="Description"
          style={ classes.textField }
          value={ this.state.description || initialValues.description || '' }
          onChange={ this.handleChange }
          margin="normal"
        />

          <TextField
            id="certification"
            name="certificate"
            label="Certification"
            style={classes.textField}
            value={this.state.certificate || initialValues.certificate || '' }
            onChange={this.handleChange}
            margin="normal"
          />


              <TextField
                id="price"
                name="price"
                label="Price per Kg"
                value={this.state.price || initialValues.price || '' }
                onChange={this.handleChange}
                type="number"
                style={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />

            <TextField
              id="currency"
              name="currency"
              select
              label="Please select your currency"
              style={ classes.textField }
              value={ this.state.currency || initialValues.currency || ''  }
              onChange={ this.handleChange }
              margin="normal"
            >
              { currencies.map(option => (
                <MenuItem key={ option.value } value={ option.value } >
                  { option.label }
                </MenuItem>
              ))}
            </TextField>


        <TextField
          label="Volume"
          id="volume"
          name="volume"
          value={ this.state.volume || initialValues.volume || '' }
          onChange={ this.handleChange }
          style={ classes.textField }
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        />



        <TextField
          id="harvested"
          name="harvested"
          label="Harvested Date"
          type="date"
          defaultValue={new Date}
            value={this.state.harvested || initialValues.harvested || '' }
          onChange={ this.handleChange }
          style={ classes.textField }
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="expired"
            name="expiration"
          label="Expiry Date"
          type="date"
            defaultValue={new Date}
            value={this.state.expiration || initialValues.expiration || '' }
          onChange={ this.handleChange }
          style={ classes.textField }
          InputLabelProps={{
            shrink: true,
          }}
        />

          <div className="upload">
            <label htmlFor="photo">Please Upload a Photo </label>
            <input
              accept="image/*"
              id="raised-button-file"
              type="file"
              name="photo"
              className="upload-input"
              style={classes.textField}
              onChange={this.handleFileChange}
            />
          </div>

        <Button
          color="primary"
          className="submit-btn"
          type="submit"
          style={{
            display: 'block',
            margin: 'auto',
            marginTop: 20,
            marginBottom: 20
          }}
        >
          Save
        </Button>

        </Paper>
      </form>
    )
  }

}

const mapStateToProps = (state, props) => ({
  codes: state.codes,
  vegetables: state.codes.filter(x => x.code.match(/^07/) ),
  fruits: state.codes.filter(x => x.code.match(/^08/)),
  beans: state.codes.filter(x => x.code.match(/^09/))
})

export default compose(
  withMobileDialog(),
  connect(mapStateToProps, { fetchCodes })
)(ProductForm)
