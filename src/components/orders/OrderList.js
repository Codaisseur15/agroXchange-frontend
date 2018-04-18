import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card from "material-ui/Card";
import {CardHeader,CardMedia } from "material-ui/Card";
import Button from 'material-ui/Button'
import Table, { TableBody, TableCell, TableRow } from "material-ui/Table";
import { InputLabel } from 'material-ui/Input';
import { FormControl } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import { fetchOrdersByBuyer, fetchOrdersBySeller } from  '../../actions/orders';
import { jwtPayload } from '../../jwt';


import { translate } from 'react-i18next'

const style = theme => ({
  card: {
    height: 400,
    width: 300,
    margin: 20,
    textAlign: "center",
    display: "inline-block"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  media: {
    height: 100
  },
  table: {
    width: " 10px",
    fontSize: "10px",
    textAlign: "center"
  },
  seller: {
    textAlign: "left",
    fontSize: "5px"
  }
});


class OrderList extends PureComponent {
  state = {
    status: ''
  }

  componentWillMount() {
    const received = this.props.location.pathname.split('/r')[1]
    return received ? this.props.fetchOrdersBySeller() : this.props.fetchOrdersByBuyer()
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value  })
    console.log(event.target.value)
  }

  renderFilteredOrder = () => {
   if (this.state.status === 'Pending'||'Approved'||'Bought'||'Declined') {
    return (
      <div>
        {this.props.orders
          .filter(order => order.status === this.state.status)
          .map(order => (
         <Card className={this.props.classes.card} zDepth={3} circle={true}>
           <CardHeader avatar={"#" + order.id} />
           <CardMedia>
             <img
                className={this.props.classes.media}
                src={order.product.photo}
                alt=""
              />
           </CardMedia>
               <Table className={this.props.classes.table}>
                <TableBody>
                   <TableRow>
                      <TableCell>{this.props.t('Order Volume')}</TableCell>
                      <TableCell>{order.volume}</TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell>{this.props.t('Comments')}</TableCell>
                      <TableCell>{order.comments}</TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell>{this.props.t('Status')}</TableCell>
                      <TableCell>{order.status}</TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell>{this.props.t('Ordered date')}</TableCell>
                      <TableCell>{order.date}</TableCell>
                   </TableRow>
                 </TableBody>
               </Table>
               <Link to={`/orders/${order.id}`}>
                 <Button size="small"  color="primary">
                   {this.props.t('SEE DETAILS')}
                 </Button>
               </Link>
                 <Button size="small"  color="primary" onClick={() => this.props.history.goBack()}>
                  {this.props.t('GO BACK')}
                 </Button>
           </Card>
         ))}
       </div>
     )}
     else if (this.state.status === 'All') {
      return (
        <div>
          {this.props.orders.map(order => (
           <Card className={this.props.classes.card} zDepth={3} circle={true}>
             <CardHeader avatar={"#" + order.id} />
             <CardMedia>
               <img
                  className={this.props.classes.media}
                  src={order.product.photo}
                  alt=""
                />
             </CardMedia>
                 <Table className={this.props.classes.table}>
                  <TableBody>
                     <TableRow>
                        <TableCell>{this.props.t('Order Volume')}</TableCell>
                        <TableCell>{order.volume}</TableCell>
                     </TableRow>
                     <TableRow>
                        <TableCell>{this.props.t('Comments')}</TableCell>
                        <TableCell>{order.comments}</TableCell>
                     </TableRow>
                     <TableRow>
                        <TableCell>{this.props.t('Status')}</TableCell>
                        <TableCell>{order.status}</TableCell>
                     </TableRow>
                     <TableRow>
                        <TableCell>{this.props.t('Ordered date')}</TableCell>
                        <TableCell>{order.date}</TableCell>
                     </TableRow>
                   </TableBody>
                 </Table>
                 <Link to={`/orders/${order.id}`}>
                   <Button size="small"  color="primary">
                     {this.props.t('SEE DETAILS')}
                   </Button>
                 </Link>
                   <Button size="small"  color="primary" onClick={() => this.props.history.goBack()}>
                    {this.props.t('GO BACK')}
                   </Button>
             </Card>
           ))}
         </div>
       )}
    }

    render() {
      const { classes} = this.props
      return (
        <div>
          <form>
            <div
              style={{
                width: "400px",
                margin: 0,
                marginTop: "20px"
              }}
            >
              <form
                style={{
                  width: "400px",
                  dislay: "flex",
                  marginTop: "20px"
                }}
                autoComplete="off"
              >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="satus">Status</InputLabel>
                  <Select
                    value={this.state.status}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "status",
                      id: "status"
                    }}
                  >
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
                    <MenuItem value={"Declined"}>Declined</MenuItem>
                    <MenuItem value={"Bought"}>Bought</MenuItem>
                    <MenuItem value={"All"}>All</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
          </form>
          {this.renderFilteredOrder()}
         </div>
    )
  }
}

const mapStateToProps = function(state) {
  const jwtDecoded = state.currentUser ? jwtPayload(state.currentUser.jwt) : {}
  return {
    currentUser: state.currentUser,
    currentUserId: jwtDecoded.id,
    currentProfileId: jwtDecoded.profileId,
    orders: state.orders,
  }
}

export default compose(
  translate('orders'),
  connect(mapStateToProps, { fetchOrdersByBuyer, fetchOrdersBySeller }),
  withStyles(style)
)(OrderList)
