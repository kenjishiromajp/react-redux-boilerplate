import { connect } from 'react-redux';
import { actions as todolistActions } from '../reducers/TodoListReducer';
import TodoList from '../components/TodoList';


const mapDispatchToProps = {
  ...todolistActions,
};

const mapStateToProps = _ => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
