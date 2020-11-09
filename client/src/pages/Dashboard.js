import React from 'react'
import { connect } from 'react-redux'
import { loadTransactions, removeTransaction } from '../store/actions/transactionActions'
import CreateTransaction from '../components/transaction/CrerateTransaction'
import UpdateTransaction from '../components/transaction/UpdateTransaction'

class Dashboard extends React.Component {
    state = {
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }

    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    componentDidMount() { 
        this.props.loadTransactions()
    }

    render() {
        let { auth, transactions } = this.props
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome to {auth.user.name} </h1>
                    <p>Your email is {auth.user.email} </p>

                    <button
                        className='btn btn-primary'
                        onClick={this.openCreateModal}>
                        Create New Transaction
                    </button>

                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        isClose={this.closeCreateModal}/>
                    <br />
                    <div className="mt-2">
                    <h1>Transactions: </h1>
                    {transactions.length > 0 ? <ul className='list-group'>
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className='list-group-item mt-3'>
                                    <p>Amount: {transaction.amount}</p>
                                    <p>Type: {transaction.type}</p>
                                    <p>Note: {transaction.note}</p>

                                    {this.state.id === transaction._id ?
                                        <UpdateTransaction
                                            isOpen={this.state.updateModalOpen}
                                            close={this.closeUpdateModal}
                                            transaction={transaction}
                                        /> :
                                        null
                                    }
                                    <button 
                                        className='btn btn-danger mr-2'
                                        onClick={() => this.props.removeTransaction(transaction._id)}>
                                            Remove
                                    </button>
                                    <button 
                                        className='btn btn-success'
                                        onClick={() => this.openUpdateModal(transaction._id)}>Update</button>
                                </li>
                            ))
                        }
                    </ul> : <p>There is no transaction</p>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions, removeTransaction })(Dashboard)