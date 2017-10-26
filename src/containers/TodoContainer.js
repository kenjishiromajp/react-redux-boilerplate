import { connect } from 'react-redux';
import { actions as todoActions } from '../reducers/TodoReducer';
import Todo from '../components/Todo';


const mapDispatchToProps = {
  ...todoActions,
};

const mapStateToProps = _ => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
